"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/types";

type AuthIntent = "sign-in" | "sign-up" | "forgot-password" | "reset-password";

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

async function requestOrigin() {
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  if (origin) return origin;
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  return host ? `${protocol}://${host}` : "";
}

export async function signIn(formData: FormData) {
  const locale = localeFrom(formData);
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
  const email = value(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  if (!email || !password) redirect(errorPath(locale, "sign-up", locale === "zh" ? "请输入邮箱和密码。" : "Enter your email and password."));
  const invalidPassword = passwordError(locale, password);
  if (invalidPassword) redirect(errorPath(locale, "sign-up", invalidPassword));
  if (password !== confirmPassword) redirect(errorPath(locale, "sign-up", locale === "zh" ? "两次输入的密码不一致。" : "Passwords do not match."));

  const origin = await requestOrigin();
  if (!origin) redirect(errorPath(locale, "sign-up", locale === "zh" ? "无法确定当前网站地址，请稍后再试。" : "We could not determine this site address. Please try again."));

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/${locale}/auth/callback?next=/${locale}` },
  });
  if (error) redirect(errorPath(locale, "sign-up", locale === "zh" ? "暂时无法创建账户，请稍后再试。" : "We could not create your account. Please try again."));
  redirect(`/${locale}/sign-up?sent=1`);
}

export async function sendPasswordReset(formData: FormData) {
  const locale = localeFrom(formData);
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
