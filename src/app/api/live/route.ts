import { NextResponse } from "next/server";
import { getLivePayload } from "@/lib/live";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = await getLivePayload();
  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
