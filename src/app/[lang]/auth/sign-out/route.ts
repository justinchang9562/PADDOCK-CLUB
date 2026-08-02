import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const locale = request.nextUrl.pathname.startsWith("/en/") ? "en" : "zh";
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL(`/${locale}`, request.url), { status: 303 });
}
