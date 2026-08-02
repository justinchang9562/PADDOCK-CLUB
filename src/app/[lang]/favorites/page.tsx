import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FavoritesView } from "@/components/favorites-view";
import { SectionHeading } from "@/components/section-heading";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Favorites" };

export default async function FavoritesPage({ params }: PageProps<"/[lang]/favorites">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <main className="page-main"><section className="simple-page-hero"><span className="eyebrow">PERSONAL COLLECTION</span><h1>{lang === "zh" ? "你自己的围场" : "Your own paddock"}</h1><p>{lang === "zh" ? "登录后收藏会同步到你的 PADDOCK ID；访客收藏则保存在当前浏览器，并在登录时安全合并。" : "Signed-in favorites sync to your PADDOCK ID. Guest favorites stay in this browser and merge safely when you sign in."}</p></section><section className="page-section compact"><SectionHeading title={lang === "zh" ? "收藏内容" : "Saved items"}/><FavoritesView locale={lang}/></section></main>;
}
