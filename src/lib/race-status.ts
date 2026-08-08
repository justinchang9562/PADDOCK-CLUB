import type { RaceSessionWindow, RaceStatus } from "./types";

type RaceStatusInput = {
  startDate: string;
  endDate: string;
  sessions?: RaceSessionWindow[];
  classificationPublished?: boolean;
  now?: Date;
};

export function raceStatusFor({
  startDate,
  endDate,
  sessions = [],
  classificationPublished = false,
  now = new Date(),
}: RaceStatusInput): RaceStatus {
  if (classificationPublished) return "completed";

  const timestamp = now.getTime();
  const parsedSessions = sessions.map((session) => ({
    start: Date.parse(session.start),
    end: Date.parse(session.end),
  })).filter((session) => Number.isFinite(session.start) && Number.isFinite(session.end));
  const activeSession = parsedSessions.some((session) => {
    return timestamp >= session.start && timestamp <= session.end;
  });
  if (activeSession) return "live";

  const day = now.toISOString().slice(0, 10);
  if (day < startDate) return "upcoming";
  const finalSessionEnd = parsedSessions.reduce((latest, session) => Math.max(latest, session.end), Number.NEGATIVE_INFINITY);
  if (Number.isFinite(finalSessionEnd) && timestamp > finalSessionEnd) return "awaiting_result";
  if (day <= endDate) return "weekend";
  return "awaiting_result";
}
