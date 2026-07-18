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
  source: "OpenF1" | "PADDOCK CLUB";
  message?: string;
};

type OpenF1Session = {
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

type OpenF1Position = {
  driver_number: number;
  position: number;
  date: string;
};

const OPENF1_ROOT = "https://api.openf1.org/v1";

async function openF1<T>(path: string): Promise<T> {
  const response = await fetch(`${OPENF1_ROOT}/${path}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`OpenF1 returned HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

export async function getLivePayload(): Promise<LivePayload> {
  const fetchedAt = new Date().toISOString();
  try {
    const sessions = await openF1<OpenF1Session[]>("sessions?session_key=latest");
    const session = sessions.at(-1);
    if (!session) throw new Error("No session returned");
    const now = Date.now();
    const live = now >= Date.parse(session.date_start) && now <= Date.parse(session.date_end);

    if (!live) {
      return {
        mode: "schedule",
        session: {
          name: session.session_name,
          meeting: session.meeting_name,
          location: session.location,
          country: session.country_name,
          start: session.date_start,
          end: session.date_end,
        },
        positions: [],
        fetchedAt,
        source: "OpenF1",
        message: "The latest session is not currently running.",
      };
    }

    const [drivers, positionRows] = await Promise.all([
      openF1<OpenF1Driver[]>("drivers?session_key=latest"),
      openF1<OpenF1Position[]>("position?session_key=latest"),
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

    return {
      mode: positions.length ? "live" : "schedule",
      session: {
        name: session.session_name,
        meeting: session.meeting_name,
        location: session.location,
        country: session.country_name,
        start: session.date_start,
        end: session.date_end,
      },
      positions,
      fetchedAt,
      source: "OpenF1",
    };
  } catch (error) {
    return {
      mode: "unavailable",
      positions: [],
      fetchedAt,
      source: "PADDOCK CLUB",
      message: error instanceof Error ? error.message : "Live provider unavailable",
    };
  }
}
