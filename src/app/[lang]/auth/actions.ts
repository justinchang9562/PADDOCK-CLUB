"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/types";

type AuthIntent = "sign-in" | "sign-up" | "forgot-password" | "reset-password";
const AUTH_WINDOW_MS = 10 * 60_000;
const AUTH_ATTEMPTS_PER_WINDOW = 12;
const authWindows = new Map<string, { count: number; resetAt: number }>();

function value(formData: FormData, field: string) {
  return String(formData.get(field) ?? "").trim();
}

function localeFrom(formData: FormData): Locale {
  return value(formData, "locale") === "en" ? "en" : "zh";
}

function errorPath(locale: Locale, intent: AuthIntent, message: string) {
  const page = intent === "sign-in" ? "sign-in" : intent === "sign-up" ? "sign-up" : intent === "forgot-password" ? "forgot-password" : "reset-password";
  return `/${locale}/${page}?error=${encodeURIComponent(message)}`;
}

function passwordError(locale: Locale, password: string) {
  if (password.length < 8) return locale === "zh" ? "密码至少需要 8 个字符。" : "Password must be at least 8 characters.";
  if (password.length > 72) return locale === "zh" ? "密码不能超过 72 个字符。" : "Password cannot exceed 72 characters.";
  return null;
}

function configuredSiteOrigin() {
  const configured = process.env.PADDOCK_SITE_URL?.trim();
  if (!configured) return "";
  try {
    const url = new URL(configured);
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "[::1]";
    if (url.protocol !== "https:" && !(process.env.NODE_ENV !== "production" && local)) return "";
    return url.origin;
  } catch {
    return "";
  }
}

async function requestOrigin() {
  const configured = configuredSiteOrigin();
  if (configured) return configured;
  if (process.env.NODE_ENV === "production") return "";
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const hostname = host?.split(":")[0];
  if (hostname !== "localhost" && hostname !== "127.0.0.1" && hostname !== "[::1]") return "";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  return host && (protocol === "http" || protocol === "https") ? `${protocol}://${host}` : "";
}

async function authRateLimited(intent: AuthIntent) {
  const requestHeaders = await headers();
  const ip = requestHeaders.get("cf-connecting-ip") ?? requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const key = `${intent}:${ip}`;
  const now = Date.now();
  if (authWindows.size > 2048) {
    for (const [windowKey, window] of authWindows) if (window.resetAt <= now) authWindows.delete(windowKey);
  }
  const current = authWindows.get(key);
  if (!current || current.resetAt <= now) {
    authWindows.set(key, { count: 1, resetAt: now + AUTH_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > AUTH_ATTEMPTS_PER_WINDOW;
}

export async function signIn(formData: FormData) {
  const locale = localeFrom(formData);
  if (await authRateLimited("sign-in")) redirect(errorPath(locale, "sign-in", locale === "zh" ? "尝试次数过多，请稍后再试。" : "Too many attempts. Please try again later."));
  const email = value(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect(errorPath(locale, "sign-in", locale === "zh" ? "请输入邮箱和密码。" : "Enter your email and password."));

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(errorPath(locale, "sign-in", locale === "zh" ? "邮箱或密码不正确。" : "Incorrect email or password."));
  redirect(`/${locale}`);
}

export async function signUp(formData: FormData) {
  const locale = localeFrom(formData);
  if (await authRateLimited("sign-up")) redirect(errorPath(locale, "sign-up", locale === "zh" ? "尝试次数过多，请稍后再试。" : "Too many attempts. Please try again later."));
  const email = value(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const legalAccepted = value(formData, "legalAccepted") === "yes";
  if (!email || !password) redirect(errorPath(locale, "sign-up", locale === "zh" ? "请输入邮箱和密码。" : "Enter your email and password."));
  if (!legalAccepted) redirect(errorPath(locale, "sign-up", locale === "zh" ? "请先同意使用条款并确认已阅读隐私政策。" : "Agree to the Terms and acknowledge the Privacy Policy first."));
  const invalidPassword = passwordError(locale, password);
  if (invalidPassword) redirect(errorPath(locale, "sign-up", invalidPassword));
  if (password !== confirmPassword) redirect(errorPath(locale, "sign-up", locale === "zh" ? "两次输入的密码不一致。" : "Passwords do not match."));

  const origin = await requestOrigin();
  if (!origin) redirect(errorPath(locale, "sign-up", locale === "zh" ? "无法确定当前网站地址，请稍后再试。" : "We could not determine this site address. Please try again."));

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/${locale}/auth/callback?next=/${locale}`,
      data: { legal_accepted_at: new Date().toISOString(), legal_version: "2026-08-08" },
    },
  });
  if (error) redirect(errorPath(locale, "sign-up", locale === "zh" ? "暂时无法创建账户，请稍后再试。" : "We could not create your account. Please try again."));
  redirect(`/${locale}/sign-up?sent=1`);
}

export async function sendPasswordReset(formData: FormData) {
  const locale = localeFrom(formData);
  if (await authRateLimited("forgot-password")) redirect(`/${locale}/forgot-password?sent=1`);
  const email = value(formData, "email").toLowerCase();
  if (!email) redirect(errorPath(locale, "forgot-password", locale === "zh" ? "请输入邮箱。" : "Enter your email."));

  const origin = await requestOrigin();
  if (!origin) redirect(errorPath(locale, "forgot-password", locale === "zh" ? "无法确定当前网站地址，请稍后再试。" : "We could not determine this site address. Please try again."));

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/${locale}/auth/callback?next=/${locale}/reset-password`,
  });
  // Same response whether the account exists or not, so this endpoint cannot enumerate users.
  redirect(`/${locale}/forgot-password?sent=1`);
}

export async function updatePassword(formData: FormData) {
  const locale = localeFrom(formData);
  if (await authRateLimited("reset-password")) redirect(errorPath(locale, "reset-password", locale === "zh" ? "尝试次数过多，请稍后再试。" : "Too many attempts. Please try again later."));
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  if (!password) redirect(errorPath(locale, "reset-password", locale === "zh" ? "请输入新密码。" : "Enter a new password."));
  const invalidPassword = passwordError(locale, password);
  if (invalidPassword) redirect(errorPath(locale, "reset-password", invalidPassword));
  if (password !== confirmPassword) redirect(errorPath(locale, "reset-password", locale === "zh" ? "两次输入的密码不一致。" : "Passwords do not match."));

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) redirect(errorPath(locale, "reset-password", locale === "zh" ? "重设链接无效或已过期，请重新申请。" : "This reset link is invalid or has expired. Request a new one."));
  redirect(`/${locale}`);
}
