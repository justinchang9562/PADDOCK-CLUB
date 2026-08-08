import "server-only";

export type LiveReason = "not_live" | "not_configured" | "auth_failed" | "rate_limited" | "timeout" | "upstream_error";

export type LivePosition = {
  driverNumber: number;
  name: string;
  acronym: string;
  teamName: string;
  teamColor: string;
  position: number;
  updatedAt: string;
};

export type LivePayload = {
  mode: "live" | "schedule" | "unavailable";
  session?: {
    name: string;
    meeting: string;
    location: string;
    country: string;
    start: string;
    end: string;
  };
  positions: LivePosition[];
  fetchedAt: string;
  sourceUpdatedAt?: string;
  source: "openf1" | "snapshot";
  stale: boolean;
  reason?: LiveReason;
};

type OpenF1Session = {
  session_key: number;
  session_name: string;
  meeting_name: string;
  location: string;
  country_name: string;
  date_start: string;
  date_end: string;
};
type OpenF1Driver = {
  driver_number: number;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
};
type OpenF1Position = { driver_number: number; position: number; date: string };
type TokenResponse = { access_token?: string; expires_in?: number };

const OPENF1_ROOT = "https://api.openf1.org/v1";
const OPENF1_TOKEN_URL = "https://api.openf1.org/token";
const REQUEST_TIMEOUT_MS = Number(process.env.OPENF1_TIMEOUT_MS ?? 5000);
const PAYLOAD_TTL_MS = 8000;
const LAST_KNOWN_GOOD_MS = 60_000;

class LiveProviderError extends Error {
  constructor(readonly reason: Exclude<LiveReason, "not_live">, message: string) {
    super(message);
  }
}

let tokenCache: { value: string; expiresAt: number } | null = null;
let tokenPromise: Promise<string> | null = null;
let payloadCache: { value: LivePayload; expiresAt: number } | null = null;
let lastKnownGood: { value: LivePayload; expiresAt: number } | null = null;
let payloadPromise: Promise<LivePayload> | null = null;
const responseCache = new Map<string, { value: unknown; expiresAt: number }>();
const responseFlights = new Map<string, Promise<unknown>>();

function credentials() {
  const username = process.env.OPENF1_USERNAME?.trim();
  const password = process.env.OPENF1_PASSWORD?.trim();
  return username && password ? { username, password } : null;
}

async function accessToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 30_000) return tokenCache.value;
  if (tokenPromise) return tokenPromise;
  const configured = credentials();
  if (!configured) throw new LiveProviderError("not_configured", "OpenF1 credentials are not configured");

  tokenPromise = (async () => {
    const body = new URLSearchParams({ username: configured.username, password: configured.password });
    let response: Response;
    try {
      response = await fetch(OPENF1_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
        body,
        cache: "no-store",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
    } catch (error) {
      throw new LiveProviderError(error instanceof DOMException && error.name === "TimeoutError" ? "timeout" : "upstream_error", "OpenF1 token request failed");
    }
    if (!response.ok) throw new LiveProviderError("auth_failed", `OpenF1 token endpoint returned ${response.status}`);
    const token = await response.json() as TokenResponse;
    if (!token.access_token) throw new LiveProviderError("auth_failed", "OpenF1 token response did not include an access token");
    tokenCache = {
      value: token.access_token,
      expiresAt: Date.now() + Math.max(60, token.expires_in ?? 900) * 1000,
    };
    return token.access_token;
  })().finally(() => { tokenPromise = null; });
  return tokenPromise;
}

async function openF1<T>(path: string, ttlMs: number, authenticated = false): Promise<T> {
  const cached = responseCache.get(path);
  if (cached && cached.expiresAt > Date.now()) return cached.value as T;
  const existing = responseFlights.get(path);
  if (existing) return existing as Promise<T>;

  const flight = (async () => {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (authenticated || credentials()) headers.Authorization = `Bearer ${await accessToken()}`;
    let response: Response;
    try {
      response = await fetch(`${OPENF1_ROOT}/${path}`, {
        headers,
        cache: "no-store",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
    } catch (error) {
      throw new LiveProviderError(error instanceof DOMException && error.name === "TimeoutError" ? "timeout" : "upstream_error", "OpenF1 request failed");
    }
    if (response.status === 401 || response.status === 403) throw new LiveProviderError("auth_failed", `OpenF1 returned ${response.status}`);
    if (response.status === 429) throw new LiveProviderError("rate_limited", "OpenF1 rate limit reached");
    if (!response.ok) throw new LiveProviderError("upstream_error", `OpenF1 returned ${response.status}`);
    const value = await response.json() as T;
    responseCache.set(path, { value, expiresAt: Date.now() + ttlMs });
    return value;
  })().finally(() => { responseFlights.delete(path); });
  responseFlights.set(path, flight);
  return flight;
}

function sessionSummary(session: OpenF1Session) {
  return {
    name: session.session_name,
    meeting: session.meeting_name,
    location: session.location,
    country: session.country_name,
    start: session.date_start,
    end: session.date_end,
  };
}

async function buildLivePayload(): Promise<LivePayload> {
  const fetchedAt = new Date().toISOString();
  const sessions = await openF1<OpenF1Session[]>("sessions?session_key=latest", 15_000);
  const session = sessions.at(-1);
  if (!session) throw new LiveProviderError("upstream_error", "OpenF1 returned no session");
  const now = Date.now();
  const live = now >= Date.parse(session.date_start) && now <= Date.parse(session.date_end);

  if (!live) {
    return {
      mode: "schedule",
      session: sessionSummary(session),
      positions: [],
      fetchedAt,
      source: "openf1",
      stale: false,
      reason: "not_live",
    };
  }

  if (!credentials()) throw new LiveProviderError("not_configured", "Live data requires OpenF1 credentials");
  const sessionKey = session.session_key;
  const [drivers, positionRows] = await Promise.all([
    openF1<OpenF1Driver[]>(`drivers?session_key=${sessionKey}`, 60_000, true),
    openF1<OpenF1Position[]>(`position?session_key=${sessionKey}`, 4000, true),
  ]);
  const latestByDriver = new Map<number, OpenF1Position>();
  for (const row of positionRows) {
    const previous = latestByDriver.get(row.driver_number);
    if (!previous || row.date > previous.date) latestByDriver.set(row.driver_number, row);
  }
  const driverByNumber = new Map(drivers.map((driver) => [driver.driver_number, driver]));
  const positions = [...latestByDriver.values()].sort((a, b) => a.position - b.position).map<LivePosition>((row) => {
    const driver = driverByNumber.get(row.driver_number);
    return {
      driverNumber: row.driver_number,
      name: driver?.full_name ?? `Car ${row.driver_number}`,
      acronym: driver?.name_acronym ?? String(row.driver_number),
      teamName: driver?.team_name ?? "—",
      teamColor: driver?.team_colour ? `#${driver.team_colour}` : "#7f8792",
      position: row.position,
      updatedAt: row.date,
    };
  });
  const sourceUpdatedAt = positions.reduce<string | undefined>((latest, row) => !latest || row.updatedAt > latest ? row.updatedAt : latest, undefined);
  return {
    mode: positions.length ? "live" : "schedule",
    session: sessionSummary(session),
    positions,
    fetchedAt,
    sourceUpdatedAt,
    source: "openf1",
    stale: false,
    reason: positions.length ? undefined : "not_live",
  };
}

function unavailable(reason: Exclude<LiveReason, "not_live">): LivePayload {
  if (lastKnownGood && lastKnownGood.expiresAt > Date.now()) {
    return { ...lastKnownGood.value, fetchedAt: new Date().toISOString(), stale: true, reason };
  }
  return { mode: "unavailable", positions: [], fetchedAt: new Date().toISOString(), source: "snapshot", stale: true, reason };
}

export async function getLivePayload(): Promise<LivePayload> {
  if (payloadCache && payloadCache.expiresAt > Date.now()) return payloadCache.value;
  if (payloadPromise) return payloadPromise;
  payloadPromise = buildLivePayload()
    .then((payload) => {
      payloadCache = { value: payload, expiresAt: Date.now() + PAYLOAD_TTL_MS };
      if (payload.mode === "live") lastKnownGood = { value: payload, expiresAt: Date.now() + LAST_KNOWN_GOOD_MS };
      return payload;
    })
    .catch((error) => {
      const reason = error instanceof LiveProviderError ? error.reason : "upstream_error";
      console.warn(JSON.stringify({ event: "live_provider_failure", provider: "openf1", reason }));
      return unavailable(reason);
    })
    .finally(() => { payloadPromise = null; });
  return payloadPromise;
}
