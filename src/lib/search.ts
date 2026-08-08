import { cars, circuits, drivers, races2026, teams } from "./catalog";
import type { Locale, SearchEntity } from "./types";

export function buildSearchIndex(locale: Locale): SearchEntity[] {
  const driverItems: SearchEntity[] = drivers.map((driver) => ({
    id: driver.id,
    type: "driver",
    title: `${driver.firstName} ${driver.lastName}`,
    subtitle: `${driver.code} · #${driver.number}`,
    href: `/${locale}/drivers/${driver.id}`,
    keywords: [driver.code, driver.nationality.zh, driver.nationality.en, driver.teamId],
  }));

  const teamItems: SearchEntity[] = teams.map((team) => ({
    id: team.id,
    type: "team",
    title: team.name,
    subtitle: team.base[locale],
    href: `/${locale}/teams/${team.id}`,
    keywords: [team.shortName, team.base.zh, team.base.en, team.principal],
  }));

  const circuitItems: SearchEntity[] = circuits.map((circuit) => ({
    id: circuit.id,
    type: "circuit",
    title: circuit.name,
    subtitle: `${circuit.city[locale]} · ${circuit.country[locale]}`,
    href: `/${locale}/circuits/${circuit.id}`,
    keywords: [circuit.grandPrix.zh, circuit.grandPrix.en, circuit.city.zh, circuit.city.en],
  }));

  const carItems: SearchEntity[] = cars.map((car) => ({
    id: car.id,
    type: "car",
    title: car.chassis,
    subtitle: `${car.season} · ${car.powerUnit}`,
    href: `/${locale}/cars/${car.id}`,
    keywords: [car.teamId, car.powerUnit, String(car.season)],
  }));

  const raceItems: SearchEntity[] = races2026.map((race) => ({
    id: race.id,
    type: "race",
    title: race.name[locale],
    subtitle: `${race.season} · R${race.round}`,
    href: `/${locale}/seasons/${race.season}/races/${race.round}`,
    keywords: [race.name.zh, race.name.en, race.circuitId, race.countryCode],
  }));

  return [...driverItems, ...teamItems, ...circuitItems, ...carItems, ...raceItems];
}
