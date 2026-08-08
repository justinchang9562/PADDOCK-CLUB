export type Locale = "zh" | "en";

export type LocalizedText = {
  zh: string;
  en: string;
};

export type RaceStatus = "completed" | "awaiting_result" | "live" | "weekend" | "upcoming";

export type RaceSessionWindow = {
  name: "practice" | "qualifying" | "sprint" | "race";
  start: string;
  end: string;
};

export type Team = {
  id: string;
  name: string;
  shortName: string;
  color: string;
  base: LocalizedText;
  principal: string;
  firstEntry: number;
  championships: number;
  points: number;
  position: number;
  drivers: string[];
  history: LocalizedText;
};

export type Driver = {
  id: string;
  firstName: string;
  lastName: string;
  code: string;
  number: number;
  countryCode: string;
  nationality: LocalizedText;
  teamId: string;
  points: number;
  position: number;
  championships: number;
  debut: number;
  profile: LocalizedText;
  image?: string;
};

export type Car = {
  id: string;
  season: number;
  teamId: string;
  chassis: string;
  powerUnit: string;
  gearbox: string;
  fuel: string;
  tyres: string;
  weight: string;
  length: string;
  width: string;
  wheelbase: string;
  electricalOutput: string;
  overview: LocalizedText;
  image?: string;
  studioImage?: string;
  imageCredit?: string;
};

export type Circuit = {
  id: string;
  name: string;
  grandPrix: LocalizedText;
  city: LocalizedText;
  country: LocalizedText;
  countryCode: string;
  lengthKm?: number;
  laps?: number;
  corners?: number;
  raceDistanceKm?: number;
  firstGrandPrix?: number;
  lapRecord?: string;
  lapRecordHolder?: string;
  character: LocalizedText;
  image?: string;
};

export type ClassificationRow = {
  position: number;
  driverId: string;
  driverName: string;
  driverCode: string;
  teamId: string;
  teamName: string;
  laps?: number;
  time?: string;
  points?: number;
  status: string;
};

export type Race = {
  id: string;
  season: number;
  round: number;
  circuitId: string;
  name: LocalizedText;
  countryCode: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  sessions?: RaceSessionWindow[];
  status: RaceStatus;
  sprint?: boolean;
  confirmation?: "confirmed" | "provisional";
  winner?: string;
  winningTime?: string;
  podium?: Array<{
    position: number;
    driverId: string;
    driverName: string;
    teamName: string;
    time: string;
  }>;
};

export type NewsItem = {
  id: string;
  publishedAt: string;
  expiresAt?: string;
  kind?: "evergreen" | "event-status";
  category: "race" | "technical" | "team";
  publisher: string;
  title: LocalizedText;
  summary: LocalizedText;
  url: string;
};

export type SearchEntity = {
  id: string;
  type: "driver" | "team" | "circuit" | "car" | "race";
  title: string;
  subtitle: string;
  href: string;
  keywords: string[];
};
