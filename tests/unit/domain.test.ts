import { describe, expect, it } from "vitest";
import { canonicalFavoriteKey } from "@/lib/favorite-keys";
import { publishedNews } from "@/lib/news";
import { countryCodeFromNationality } from "@/lib/providers";
import { raceStatusFor } from "@/lib/race-status";
import type { NewsItem } from "@/lib/types";

describe("race status state machine", () => {
  const input = { startDate: "2026-08-21", endDate: "2026-08-23" };

  it("only marks a race live inside a declared session", () => {
    const sessions = [
      { name: "practice" as const, start: "2026-08-21T10:00:00Z", end: "2026-08-21T11:00:00Z" },
      { name: "qualifying" as const, start: "2026-08-22T14:00:00Z", end: "2026-08-22T15:00:00Z" },
      { name: "race" as const, start: "2026-08-23T13:00:00Z", end: "2026-08-23T15:00:00Z" },
    ];
    expect(raceStatusFor({ ...input, sessions, now: new Date("2026-08-21T09:00:00Z") })).toBe("weekend");
    expect(raceStatusFor({ ...input, sessions, now: new Date("2026-08-21T10:30:00Z") })).toBe("live");
    expect(raceStatusFor({ ...input, sessions, now: new Date("2026-08-22T12:00:00Z") })).toBe("weekend");
    expect(raceStatusFor({ ...input, sessions, now: new Date("2026-08-23T14:00:00Z") })).toBe("live");
    expect(raceStatusFor({ ...input, sessions, now: new Date("2026-08-23T15:00:01Z") })).toBe("awaiting_result");
    expect(raceStatusFor({ ...input, sessions, now: new Date("2026-08-24T00:00:00Z") })).toBe("awaiting_result");
  });

  it("uses a published classification as the completion authority", () => {
    expect(raceStatusFor({ ...input, classificationPublished: true, now: new Date("2026-08-21T00:00:00Z") })).toBe("completed");
    expect(raceStatusFor({ ...input, now: new Date("2026-08-20T23:59:59Z") })).toBe("upcoming");
  });
});

describe("data boundary helpers", () => {
  it("maps nationalities to real ISO alpha-2 codes", () => {
    expect(countryCodeFromNationality("British")).toBe("GB");
    expect(countryCodeFromNationality("Dutch")).toBe("NL");
    expect(countryCodeFromNationality("German")).toBe("DE");
    expect(countryCodeFromNationality("Spanish")).toBe("ES");
    expect(countryCodeFromNationality("Martian")).toBe("XX");
  });

  it("migrates old round-based favorites without changing unrelated keys", () => {
    expect(canonicalFavoriteKey("race:2026:16")).toBe("race:2026-marina-bay");
    expect(canonicalFavoriteKey("race:2026:99")).toBe("race:2026:99");
    expect(canonicalFavoriteKey("driver:hamilton")).toBe("driver:hamilton");
  });

  it("expires event-status news while retaining evergreen items", () => {
    const items: NewsItem[] = [
      { id: "event", publishedAt: "2026-07-17", expiresAt: "2026-07-20", kind: "event-status", category: "race", publisher: "Source", title: { zh: "事件", en: "Event" }, summary: { zh: "摘要", en: "Summary" }, url: "https://example.com/event" },
      { id: "evergreen", publishedAt: "2026-07-17", category: "technical", publisher: "Source", title: { zh: "长期", en: "Evergreen" }, summary: { zh: "摘要", en: "Summary" }, url: "https://example.com/evergreen" },
    ];
    expect(publishedNews(items, new Date("2026-07-20T12:00:00Z")).map((item) => item.id)).toEqual(["event", "evergreen"]);
    expect(publishedNews(items, new Date("2026-07-21T00:00:00Z")).map((item) => item.id)).toEqual(["evergreen"]);
  });
});
