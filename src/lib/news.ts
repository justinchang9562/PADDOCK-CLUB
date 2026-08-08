import type { NewsItem } from "./types";

export function publishedNews(items: NewsItem[], now = new Date()) {
  const day = now.toISOString().slice(0, 10);
  return items.filter((item) => item.kind !== "event-status" || !item.expiresAt || item.expiresAt >= day);
}
