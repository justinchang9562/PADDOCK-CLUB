import { cars, circuits, drivers, races2026, teams } from "./catalog";
import type { ClassificationRow, Driver, Locale, Race, Team } from "./types";

const API_ROOT = "https://api.jolpi.ca/ergast/f1";
const DEFAULT_TIMEOUT_MS = Number(process.env.PADDOCK_DATA_TIMEOUT_MS ?? 7000);

type ErgastLocation = {
  locality: string;
  country: string;
};

type ErgastCircuit = {
  circuitId: string;
  circuitName: string;
  Location: ErgastLocation;
};

type ErgastDriver = {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  givenName: string;
  familyName: string;
  nationality: string;
};

type ErgastConstructor = {
  constructorId: string;
  name: string;
};

type ErgastResult = {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: ErgastDriver;
  Constructor: ErgastConstructor;
  grid: string;
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
  wins: string;
  Driver: ErgastDriver;
  Constructors: ErgastConstructor[];
};

type ErgastConstructorStanding = {
  position: string;
  points: string;
  wins: string;
  Constructor: ErgastConstructor;
};

type ErgastResponse = {
  MRData: {
    total: string;
    RaceTable?: { season?: string; round?: string; Races: ErgastRace[] };
    StandingsTable?: {
      season?: string;
      StandingsLists: Array<{
        DriverStandings?: ErgastDriverStanding[];
        ConstructorStandings?: ErgastConstructorStanding[];
      }>;
    };
  };
};

export type ProviderResult<T> = {
  data: T;
  source: "curated" | "jolpica";
  stale: boolean;
  updatedAt: string;
  warning?: string;
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeStatus(date: string): Race["status"] {
  if (date < today()) return "completed";
  if (date === today()) return "live";
  return "upcoming";
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
  const match = circuits.find((item) => item.country.en === country);
  return match?.countryCode ?? country.slice(0, 2).toUpperCase();
}

function localizeRaceName(name: string): Race["name"] {
  const known = races2026.find((race) => race.name.en === name);
  return known?.name ?? { zh: name, en: name };
}

export async function getSeasonRaces(season: number): Promise<ProviderResult<Race[]>> {
  if (season === 2026) {
    return { data: races2026, source: "curated", stale: false, updatedAt: today() };
  }

  try {
    const response = await fetchJolpica(`${season}.json?limit=100`);
    const data = (response.MRData.RaceTable?.Races ?? []).map<Race>((race) => ({
      season: Number(race.season),
      round: Number(race.round),
      circuitId: race.Circuit.circuitId,
      name: localizeRaceName(race.raceName),
      countryCode: countryCodeFromName(race.Circuit.Location.country),
      startDate: race.date,
      endDate: race.date,
      startTime: race.time,
      status: normalizeStatus(race.date),
    }));
    return { data, source: "jolpica", stale: false, updatedAt: today() };
  } catch (error) {
    return {
      data: [],
      source: "curated",
      stale: true,
      updatedAt: today(),
      warning: error instanceof Error ? error.message : "Season data unavailable",
    };
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
    return { data, source: "jolpica", stale: false, updatedAt: today() };
  } catch (error) {
    const fallback = races2026.find((race) => race.season === season && race.round === round)?.podium ?? [];
    return {
      data: fallback.map((row) => ({
        position: row.position,
        driverId: row.driverId,
        driverName: row.driverName,
        driverCode: drivers.find((driver) => driver.id === row.driverId)?.code ?? "—",
        teamId: teams.find((team) => team.name === row.teamName || team.shortName === row.teamName)?.id ?? row.teamName.toLowerCase(),
        teamName: row.teamName,
        time: row.time,
        status: row.position === 1 ? "Finished" : "Finished",
      })),
      source: "curated",
      stale: true,
      updatedAt: today(),
      warning: error instanceof Error ? error.message : "Classification unavailable",
    };
  }
}

export async function getDriverStandings(season: number): Promise<ProviderResult<Driver[]>> {
  if (season === 2026) {
    return { data: drivers, source: "curated", stale: false, updatedAt: today() };
  }

  try {
    const response = await fetchJolpica(`${season}/driverstandings.json?limit=100`);
    const rows = response.MRData.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
    const data = rows.map<Driver>((row) => ({
      id: row.Driver.driverId,
      firstName: row.Driver.givenName,
      lastName: row.Driver.familyName,
      code: row.Driver.code ?? row.Driver.familyName.slice(0, 3).toUpperCase(),
      number: Number(row.Driver.permanentNumber ?? 0),
      countryCode: row.Driver.nationality.slice(0, 2).toUpperCase(),
      nationality: { zh: row.Driver.nationality, en: row.Driver.nationality },
      teamId: row.Constructors[0]?.constructorId ?? "unknown",
      points: Number(row.points),
      position: Number(row.position),
      championships: 0,
      debut: season,
      profile: {
        zh: `${season} 赛季历史积分榜记录。`,
        en: `Historical championship record for the ${season} season.`,
      },
    }));
    return { data, source: "jolpica", stale: false, updatedAt: today() };
  } catch (error) {
    return {
      data: [],
      source: "curated",
      stale: true,
      updatedAt: today(),
      warning: error instanceof Error ? error.message : "Standings unavailable",
    };
  }
}

export async function getConstructorStandings(season: number): Promise<ProviderResult<Team[]>> {
  if (season === 2026) {
    return { data: teams, source: "curated", stale: false, updatedAt: today() };
  }

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
      history: {
        zh: `${season} 赛季车队积分榜记录。`,
        en: `Historical constructors' record for the ${season} season.`,
      },
    }));
    return { data, source: "jolpica", stale: false, updatedAt: today() };
  } catch (error) {
    return {
      data: [],
      source: "curated",
      stale: true,
      updatedAt: today(),
      warning: error instanceof Error ? error.message : "Constructor standings unavailable",
    };
  }
}

export function getTeam(id: string) {
  return teams.find((team) => team.id === id);
}

export function getDriver(id: string) {
  return drivers.find((driver) => driver.id === id);
}

export function getCircuit(id: string) {
  return circuits.find((circuit) => circuit.id === id);
}

export function getCar(id: string) {
  return cars.find((car) => car.id === id);
}

export function getRace(season: number, round: number) {
  return season === 2026 ? races2026.find((race) => race.round === round) : undefined;
}

export function getTeamName(id: string) {
  return teams.find((team) => team.id === id)?.name ?? id;
}

export function getLocaleName(value: { zh: string; en: string }, locale: Locale) {
  return value[locale];
}
