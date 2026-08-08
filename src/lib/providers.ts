import {
  cars,
  circuits,
  CURRENT_SNAPSHOT_VERIFIED_AT,
  drivers,
  races2026,
  teams,
} from "./catalog";
import { raceStatusFor } from "./race-status";
import type { ClassificationRow, Driver, Locale, Race, Team } from "./types";

const API_ROOT = "https://api.jolpi.ca/ergast/f1";
const DEFAULT_TIMEOUT_MS = Number(process.env.PADDOCK_DATA_TIMEOUT_MS ?? 7000);

type ErgastLocation = { locality: string; country: string };
type ErgastCircuit = { circuitId: string; circuitName: string; Location: ErgastLocation };
type ErgastDriver = {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  givenName: string;
  familyName: string;
  nationality: string;
};
type ErgastConstructor = { constructorId: string; name: string };
type ErgastResult = {
  position: string;
  points: string;
  Driver: ErgastDriver;
  Constructor: ErgastConstructor;
  laps: string;
  status: string;
  Time?: { millis?: string; time: string };
};
type ErgastRace = {
  season: string;
  round: string;
  raceName: string;
  date: string;
  time?: string;
  Circuit: ErgastCircuit;
  Results?: ErgastResult[];
};
type ErgastDriverStanding = {
  position: string;
  points: string;
  Driver: ErgastDriver;
  Constructors: ErgastConstructor[];
};
type ErgastConstructorStanding = {
  position: string;
  points: string;
  Constructor: ErgastConstructor;
};
type ErgastResponse = {
  MRData: {
    RaceTable?: { Races: ErgastRace[] };
    StandingsTable?: {
      StandingsLists: Array<{
        DriverStandings?: ErgastDriverStanding[];
        ConstructorStandings?: ErgastConstructorStanding[];
      }>;
    };
  };
};

export type DataFreshness = "live" | "fresh" | "snapshot" | "stale";
export type DataCompleteness = "full" | "podium_only" | "partial";
export type DataIssueReason = "timeout" | "auth" | "rate_limit" | "no_data" | "upstream_error";

export type ProviderResult<T> = {
  data: T;
  source: "curated" | "jolpica";
  freshness: DataFreshness;
  fetchedAt: string;
  verifiedAt?: string;
  sourceUpdatedAt?: string;
  isFallback: boolean;
  completeness: DataCompleteness;
  reason?: DataIssueReason;
};

const NATIONALITY_TO_COUNTRY_CODE: Record<string, string> = {
  American: "US", Argentine: "AR", Australian: "AU", Austrian: "AT", Belgian: "BE",
  Brazilian: "BR", British: "GB", Canadian: "CA", Chinese: "CN", Danish: "DK",
  Dutch: "NL", Finnish: "FI", French: "FR", German: "DE", Italian: "IT",
  Japanese: "JP", Mexican: "MX", Monegasque: "MC", "New Zealander": "NZ",
  Polish: "PL", Portuguese: "PT", Russian: "RU", Spanish: "ES", Swedish: "SE",
  Swiss: "CH", Thai: "TH",
};

export function countryCodeFromNationality(nationality: string) {
  return NATIONALITY_TO_COUNTRY_CODE[nationality] ?? "XX";
}

function fetchedAt() {
  return new Date().toISOString();
}

function classifyError(error: unknown): DataIssueReason {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  if (message.includes("timeout") || message.includes("abort")) return "timeout";
  if (message.includes("401") || message.includes("403") || message.includes("auth")) return "auth";
  if (message.includes("429") || message.includes("rate")) return "rate_limit";
  if (message.includes("not been published") || message.includes("no data")) return "no_data";
  return "upstream_error";
}

function reportFailure(scope: string, error: unknown) {
  console.warn(JSON.stringify({
    event: "data_provider_failure",
    scope,
    provider: "jolpica",
    reason: classifyError(error),
  }));
}

async function fetchJolpica(path: string): Promise<ErgastResponse> {
  const response = await fetch(`${API_ROOT}/${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 900 },
    signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Jolpica returned HTTP ${response.status}`);
  return response.json() as Promise<ErgastResponse>;
}

function countryCodeFromName(country: string) {
  return circuits.find((item) => item.country.en === country)?.countryCode ?? "XX";
}

function localizeRaceName(name: string): Race["name"] {
  return races2026.find((race) => race.name.en === name)?.name ?? { zh: name, en: name };
}

function snapshotResult<T>(data: T, completeness: DataCompleteness = "full"): ProviderResult<T> {
  return {
    data,
    source: "curated",
    freshness: "snapshot",
    fetchedAt: fetchedAt(),
    verifiedAt: CURRENT_SNAPSHOT_VERIFIED_AT,
    isFallback: true,
    completeness,
  };
}

function emptyResult<T>(data: T, error: unknown, scope: string): ProviderResult<T> {
  reportFailure(scope, error);
  return {
    data,
    source: "curated",
    freshness: "stale",
    fetchedAt: fetchedAt(),
    verifiedAt: CURRENT_SNAPSHOT_VERIFIED_AT,
    isFallback: true,
    completeness: "partial",
    reason: classifyError(error),
  };
}

export async function getSeasonRaces(season: number): Promise<ProviderResult<Race[]>> {
  if (season === 2026) return snapshotResult(races2026);

  try {
    const response = await fetchJolpica(`${season}.json?limit=100`);
    const rows = response.MRData.RaceTable?.Races ?? [];
    const data = rows.map<Race>((race) => ({
      id: `${race.season}-${race.Circuit.circuitId}`,
      season: Number(race.season),
      round: Number(race.round),
      circuitId: race.Circuit.circuitId,
      name: localizeRaceName(race.raceName),
      countryCode: countryCodeFromName(race.Circuit.Location.country),
      startDate: race.date,
      endDate: race.date,
      startTime: race.time,
      status: raceStatusFor({
        startDate: race.date,
        endDate: race.date,
        classificationPublished: race.date < new Date().toISOString().slice(0, 10),
      }),
    }));
    return {
      data,
      source: "jolpica",
      freshness: "fresh",
      fetchedAt: fetchedAt(),
      sourceUpdatedAt: rows.at(-1)?.date,
      isFallback: false,
      completeness: "full",
    };
  } catch (error) {
    return emptyResult([], error, "season_races");
  }
}

export async function getRaceClassification(
  season: number,
  round: number,
): Promise<ProviderResult<ClassificationRow[]>> {
  try {
    const response = await fetchJolpica(`${season}/${round}/results.json?limit=100`);
    const race = response.MRData.RaceTable?.Races?.[0];
    const data = (race?.Results ?? []).map<ClassificationRow>((result) => ({
      position: Number(result.position),
      driverId: result.Driver.driverId,
      driverName: `${result.Driver.givenName} ${result.Driver.familyName}`,
      driverCode: result.Driver.code ?? result.Driver.familyName.slice(0, 3).toUpperCase(),
      teamId: result.Constructor.constructorId,
      teamName: result.Constructor.name,
      laps: Number(result.laps),
      time: result.Time?.time,
      points: Number(result.points),
      status: result.status,
    }));
    if (!data.length) throw new Error("Classification has not been published");
    return {
      data,
      source: "jolpica",
      freshness: "fresh",
      fetchedAt: fetchedAt(),
      sourceUpdatedAt: race?.date,
      isFallback: false,
      completeness: "full",
    };
  } catch (error) {
    const fallback = races2026.find((race) => race.season === season && race.round === round)?.podium ?? [];
    if (!fallback.length) return emptyResult([], error, "race_classification");
    reportFailure("race_classification", error);
    return {
      ...snapshotResult(fallback.map((row) => ({
        position: row.position,
        driverId: row.driverId,
        driverName: row.driverName,
        driverCode: drivers.find((driver) => driver.id === row.driverId)?.code ?? "—",
        teamId: teams.find((team) => team.name === row.teamName || team.shortName === row.teamName)?.id ?? "unknown",
        teamName: row.teamName,
        time: row.time,
        status: "Finished",
      })), "podium_only"),
      reason: classifyError(error),
    };
  }
}

export async function getDriverStandings(season: number): Promise<ProviderResult<Driver[]>> {
  if (season === 2026) return snapshotResult(drivers);

  try {
    const response = await fetchJolpica(`${season}/driverstandings.json?limit=100`);
    const rows = response.MRData.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
    const data = rows.map<Driver>((row) => ({
      id: row.Driver.driverId,
      firstName: row.Driver.givenName,
      lastName: row.Driver.familyName,
      code: row.Driver.code ?? row.Driver.familyName.slice(0, 3).toUpperCase(),
      number: Number(row.Driver.permanentNumber ?? 0),
      countryCode: countryCodeFromNationality(row.Driver.nationality),
      nationality: { zh: row.Driver.nationality, en: row.Driver.nationality },
      teamId: row.Constructors[0]?.constructorId ?? "unknown",
      points: Number(row.points),
      position: Number(row.position),
      championships: 0,
      debut: season,
      profile: { zh: `${season} 赛季历史积分榜记录。`, en: `Historical championship record for the ${season} season.` },
    }));
    return { data, source: "jolpica", freshness: "fresh", fetchedAt: fetchedAt(), isFallback: false, completeness: "full" };
  } catch (error) {
    return emptyResult([], error, "driver_standings");
  }
}

export async function getConstructorStandings(season: number): Promise<ProviderResult<Team[]>> {
  if (season === 2026) return snapshotResult(teams);

  try {
    const response = await fetchJolpica(`${season}/constructorstandings.json?limit=100`);
    const rows = response.MRData.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? [];
    const data = rows.map<Team>((row) => ({
      id: row.Constructor.constructorId,
      name: row.Constructor.name,
      shortName: row.Constructor.name,
      color: "#7f8792",
      base: { zh: "历史记录", en: "Historical record" },
      principal: "—",
      firstEntry: season,
      championships: 0,
      points: Number(row.points),
      position: Number(row.position),
      drivers: [],
      history: { zh: `${season} 赛季车队积分榜记录。`, en: `Historical constructors' record for the ${season} season.` },
    }));
    return { data, source: "jolpica", freshness: "fresh", fetchedAt: fetchedAt(), isFallback: false, completeness: "full" };
  } catch (error) {
    return emptyResult([], error, "constructor_standings");
  }
}

export function getTeam(id: string) { return teams.find((team) => team.id === id); }
export function getDriver(id: string) { return drivers.find((driver) => driver.id === id); }
export function getCircuit(id: string) { return circuits.find((circuit) => circuit.id === id); }
export function getCar(id: string) { return cars.find((car) => car.id === id); }
export function getRace(season: number, round: number) { return season === 2026 ? races2026.find((race) => race.round === round) : undefined; }
export function getTeamName(id: string) { return teams.find((team) => team.id === id)?.name ?? id; }
export function getLocaleName(value: { zh: string; en: string }, locale: Locale) { return value[locale]; }
