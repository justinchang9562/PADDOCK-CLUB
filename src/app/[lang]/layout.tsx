import { notFound } from "next/navigation";
import { FavoritesProvider } from "@/components/favorites-provider";
import { LanguageAttribute } from "@/components/language-attribute";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale } from "@/lib/i18n";

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <FavoritesProvider>
      <LanguageAttribute locale={lang} />
      <SiteHeader locale={lang} />
      <div className="site-shell">{children}</div>
      <SiteFooter locale={lang} />
    </FavoritesProvider>
  );
}
