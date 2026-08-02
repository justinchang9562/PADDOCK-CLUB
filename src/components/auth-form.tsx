import Link from "next/link";
import {
  sendPasswordReset,
  signIn,
  signUp,
  updatePassword,
} from "@/app/[lang]/auth/actions";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import type { Locale } from "@/lib/types";
import { PasswordInput } from "./password-input";

type AuthPage = "sign-in" | "sign-up" | "forgot-password" | "reset-password";

type AuthFormProps = {
  locale: Locale;
  page: AuthPage;
  error?: string;
  sent?: boolean;
};

export function AuthForm({ locale, page, error, sent = false }: AuthFormProps) {
  const zh = locale === "zh";
  const configured = hasSupabaseConfig();
  const isSignIn = page === "sign-in";
  const isSignUp = page === "sign-up";
  const isForgot = page === "forgot-password";
  const isReset = page === "reset-password";
  const action = isSignIn ? signIn : isSignUp ? signUp : isForgot ? sendPasswordReset : updatePassword;

  const title = isSignIn
    ? (zh ? "欢迎回来" : "Welcome back")
    : isSignUp
      ? (zh ? "加入 PADDOCK INDEX" : "Join PADDOCK INDEX")
      : isForgot
        ? (zh ? "找回账户" : "Recover your account")
        : (zh ? "设置新密码" : "Set a new password");

  const description = isSignIn
    ? (zh ? "登录并保留属于你的围场身份。" : "Sign in and keep your paddock identity close.")
    : isSignUp
      ? (zh ? "使用邮箱创建账户，然后通过邮件完成验证。" : "Create an account with your email, then verify it from your inbox.")
      : isForgot
        ? (zh ? "输入注册邮箱，我们会发送安全的重设链接。" : "Enter your account email and we will send a secure reset link.")
        : (zh ? "为你的账户设置一个新的安全密码。" : "Choose a new secure password for your account.");

  const submitLabel = isSignIn
    ? (zh ? "登录" : "Sign in")
    : isSignUp
      ? (zh ? "创建账户" : "Create account")
      : isForgot
        ? (zh ? "发送重设链接" : "Send reset link")
        : (zh ? "更新密码" : "Update password");

  return (
    <main className="page-main auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <span className="eyebrow">PADDOCK ID</span>
        <h1 id="auth-title">{title}</h1>
        <p>{description}</p>

        {!configured && (
          <p className="auth-message notice" role="status">
            {zh
              ? "登录界面已经完成。连接 Supabase 项目密钥后即可实际注册和登录。"
              : "The sign-in experience is ready. Add the Supabase project keys to enable live authentication."}
          </p>
        )}
        {error && <p className="auth-message error" role="alert">{error}</p>}
        {sent && (
          <p className="auth-message success" role="status">
            {isSignUp
              ? (zh ? "验证邮件已发送。请打开邮件并点击验证链接。" : "Verification email sent. Open it and follow the confirmation link.")
              : (zh ? "如果该邮箱已注册，我们已经发送重设链接。" : "If that email has an account, a reset link is on its way.")}
          </p>
        )}

        {!sent && (
          <form action={action} className="auth-form">
            <input type="hidden" name="locale" value={locale} />
            {!isReset && (
              <label>
                <span>{zh ? "邮箱" : "Email"}</span>
                <input name="email" type="email" autoComplete="email" maxLength={254} required />
              </label>
            )}
            {!isForgot && (
              <label>
                <span>{isReset ? (zh ? "新密码" : "New password") : (zh ? "密码" : "Password")}</span>
                <PasswordInput
                  locale={locale}
                  label={isReset ? (zh ? "新密码" : "New password") : (zh ? "密码" : "Password")}
                  name="password"
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                  minLength={8}
                  maxLength={72}
                  required
                />
                {!isSignIn && <small>{zh ? "至少 8 个字符" : "At least 8 characters"}</small>}
              </label>
            )}
            {(isSignUp || isReset) && (
              <label>
                <span>{zh ? "确认密码" : "Confirm password"}</span>
                <PasswordInput
                  locale={locale}
                  label={zh ? "确认密码" : "Confirm password"}
                  name="confirmPassword"
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={72}
                  required
                />
              </label>
            )}
            <button className="primary-button" type="submit" disabled={!configured}>{submitLabel}</button>
          </form>
        )}

        <div className="auth-links">
          {isSignIn && <Link href={`/${locale}/forgot-password`}>{zh ? "忘记密码？" : "Forgot password?"}</Link>}
          {isSignIn && <span>{zh ? "还没有账户？" : "New to PADDOCK INDEX?"} <Link href={`/${locale}/sign-up`}>{zh ? "注册" : "Create one"}</Link></span>}
          {isSignUp && <span>{zh ? "已经有账户？" : "Already have an account?"} <Link href={`/${locale}/sign-in`}>{zh ? "登录" : "Sign in"}</Link></span>}
          {(isForgot || isReset) && <Link href={`/${locale}/sign-in`}>{zh ? "返回登录" : "Back to sign in"}</Link>}
        </div>
      </section>
    </main>
  );
}
