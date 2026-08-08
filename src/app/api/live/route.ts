import { NextResponse } from "next/server";
import { getLivePayload } from "@/lib/live";

export const dynamic = "force-dynamic";

const WINDOW_MS = 60_000;
const REQUESTS_PER_WINDOW = 30;
const requestWindows = new Map<string, { count: number; resetAt: number }>();

function rateLimited(request: Request) {
  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  if (requestWindows.size > 2048) {
    for (const [key, window] of requestWindows) if (window.resetAt <= now) requestWindows.delete(key);
  }
  const current = requestWindows.get(ip);
  if (!current || current.resetAt <= now) {
    requestWindows.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > REQUESTS_PER_WINDOW;
}

const responseHeaders = {
  "Cache-Control": "public, max-age=0, s-maxage=5, stale-while-revalidate=5, stale-if-error=30",
  "X-Content-Type-Options": "nosniff",
};

export async function GET(request: Request) {
  if (rateLimited(request)) {
    return NextResponse.json({
      mode: "unavailable",
      positions: [],
      fetchedAt: new Date().toISOString(),
      source: "snapshot",
      stale: true,
      reason: "rate_limited",
    }, { status: 200, headers: { ...responseHeaders, "Retry-After": "30" } });
  }
  const payload = await getLivePayload();
  return NextResponse.json(payload, { status: 200, headers: responseHeaders });
}
