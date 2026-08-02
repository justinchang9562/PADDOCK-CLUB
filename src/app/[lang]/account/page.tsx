import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AccountProfileForm } from "@/components/account-profile-form";
import { Icon } from "@/components/icons";
import { isLocale } from "@/lib/i18n";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function AccountPage({ params }: PageProps<"/[lang]/account">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  if (!hasSupabaseConfig()) redirect(`/${lang}/sign-in`);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${lang}/sign-in`);

  const [{ data: profile }, { count: favoritesCount }] = await Promise.all([
    supabase.from("profiles").select("display_name, avatar_url, created_at").eq("id", user.id).maybeSingle(),
    supabase.from("favorites").select("entity_id", { count: "exact", head: true }).eq("user_id", user.id),
  ]);
  const zh = lang === "zh";
  const email = user.email ?? "";
  const displayName = profile?.display_name?.trim() || (zh ? "围场成员" : "Paddock member");
  const joinedAt = new Intl.DateTimeFormat(zh ? "zh-CN" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(profile?.created_at ?? user.created_at));

  return (
    <main className="page-main account-page">
      <section className="account-hero">
        <div>
          <span className="eyebrow">PADDOCK ID</span>
          <h1>{displayName}</h1>
          <p>{zh ? "管理你的围场身份、跨设备收藏与账户安全。" : "Manage your paddock identity, cross-device favorites and account security."}</p>
        </div>
        <div className="account-hero-stats" aria-label={zh ? "账户摘要" : "Account summary"}>
          <div><strong>{favoritesCount ?? 0}</strong><span>{zh ? "项收藏" : "favorites"}</span></div>
          <div><strong>{user.email_confirmed_at ? (zh ? "已验证" : "Verified") : (zh ? "待验证" : "Pending")}</strong><span>{zh ? "邮箱状态" : "email status"}</span></div>
        </div>
      </section>

      <section className="account-layout">
        <AccountProfileForm
          locale={lang}
          userId={user.id}
          email={email}
          initialDisplayName={profile?.display_name ?? null}
          initialAvatarUrl={profile?.avatar_url ?? null}
        />

        <aside className="account-card account-security-card" aria-labelledby="security-heading">
          <div className="account-card-heading">
            <span className="eyebrow">SECURITY</span>
            <h2 id="security-heading">{zh ? "账户与安全" : "Account & security"}</h2>
            <p>{zh ? "认证信息由 Supabase Auth 安全管理。" : "Authentication details are securely managed by Supabase Auth."}</p>
          </div>
          <dl className="account-details">
            <div><dt>{zh ? "邮箱" : "Email"}</dt><dd>{email}</dd></div>
            <div><dt>{zh ? "邮箱验证" : "Email verification"}</dt><dd>{user.email_confirmed_at ? (zh ? "已完成" : "Complete") : (zh ? "尚未完成" : "Pending")}</dd></div>
            <div><dt>{zh ? "加入日期" : "Joined"}</dt><dd>{joinedAt}</dd></div>
          </dl>
          <div className="account-security-actions">
            <Link className="secondary-button" href={`/${lang}/forgot-password`}><Icon name="history" />{zh ? "重设密码" : "Reset password"}</Link>
            <form action={`/${lang}/auth/sign-out`} method="post">
              <button className="text-button danger" type="submit">{zh ? "退出登录" : "Sign out"}</button>
            </form>
          </div>
        </aside>
      </section>
    </main>
  );
}
