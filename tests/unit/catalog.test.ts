import { describe, expect, it } from "vitest";
import { cars, circuits, drivers, races2026, teams } from "@/lib/catalog";

describe("2026 curated data integrity", () => {
  it("keeps one stable entity for every official round", () => {
    expect(races2026).toHaveLength(23);
    expect(races2026.map((race) => race.round)).toEqual(Array.from({ length: 23 }, (_, index) => index + 1));
    expect(new Set(races2026.map((race) => race.id)).size).toBe(races2026.length);
    expect(races2026.find((race) => race.circuitId === "sepang")).toMatchObject({
      round: 16,
      id: "2026-bahrain-malaysia-sepang",
      confirmation: "provisional",
    });
  });

  it("matches the verified six-event sprint baseline", () => {
    expect(races2026.filter((race) => race.sprint).map((race) => race.circuitId)).toEqual([
      "shanghai",
      "miami",
      "gilles-villeneuve",
      "silverstone",
      "zandvoort",
      "marina-bay",
    ]);
  });

  it("keeps catalog relationships and identifiers complete", () => {
    const circuitIds = new Set(circuits.map((circuit) => circuit.id));
    const teamIds = new Set(teams.map((team) => team.id));
    const driverIds = new Set(drivers.map((driver) => driver.id));
    expect(circuits).toHaveLength(23);
    expect(cars).toHaveLength(11);
    expect(new Set(cars.map((car) => car.id)).size).toBe(cars.length);
    expect(races2026.every((race) => circuitIds.has(race.circuitId))).toBe(true);
    expect(drivers.every((driver) => teamIds.has(driver.teamId))).toBe(true);
    expect(teams.every((team) => team.drivers.every((id) => driverIds.has(id)))).toBe(true);
  });

  it("orders both championship tables without duplicate positions", () => {
    expect(drivers.map((driver) => driver.position)).toEqual(Array.from({ length: 22 }, (_, index) => index + 1));
    expect(teams.map((team) => team.position)).toEqual(Array.from({ length: 11 }, (_, index) => index + 1));
  });
});
