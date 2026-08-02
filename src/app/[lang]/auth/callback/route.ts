import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const requestedType = request.nextUrl.searchParams.get("type");
  const locale = request.nextUrl.pathname.startsWith("/en/") ? "en" : "zh";
  const defaultNext = requestedType === "recovery" ? `/${locale}/reset-password` : `/${locale}`;
  const next = request.nextUrl.searchParams.get("next") ?? defaultNext;
  const safeNext = /^\/(zh|en)(?:\/|$)/.test(next) ? next : defaultNext;
  const allowedTypes = new Set<EmailOtpType>(["signup", "invite", "magiclink", "recovery", "email_change", "email"]);
  const type = requestedType && allowedTypes.has(requestedType as EmailOtpType) ? (requestedType as EmailOtpType) : null;

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) return NextResponse.redirect(new URL(safeNext, request.url));
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(safeNext, request.url));
  }

  const message = locale === "zh" ? "验证链接无效或已过期。" : "This verification link is invalid or has expired.";
  return NextResponse.redirect(new URL(`/${locale}/sign-in?error=${encodeURIComponent(message)}`, request.url));
}
