import { notFound } from "next/navigation";
import { FavoritesProvider } from "@/components/favorites-provider";
import { LanguageAttribute } from "@/components/language-attribute";
import { PageScrollAnimations } from "@/components/page-scroll-animations";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale } from "@/lib/i18n";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  let signedIn = false;
  let userId: string | null = null;
  let identity: { displayName: string | null; avatarUrl: string | null } | null = null;
  if (hasSupabaseConfig()) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    signedIn = Boolean(user);
    userId = user?.id ?? null;
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      identity = profile ? { displayName: profile.display_name, avatarUrl: profile.avatar_url } : null;
    }
  }
  return (
    <FavoritesProvider userId={userId}>
      <LanguageAttribute locale={lang} />
      <SiteHeader locale={lang} signedIn={signedIn} identity={identity} />
      <PageScrollAnimations>
        <div className="site-shell">{children}</div>
      </PageScrollAnimations>
      <SiteFooter locale={lang} />
    </FavoritesProvider>
  );
}
