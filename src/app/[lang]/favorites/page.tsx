import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FavoritesView } from "@/components/favorites-view";
import { SectionHeading } from "@/components/section-heading";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Favorites" };

export default async function FavoritesPage({ params }: PageProps<"/[lang]/favorites">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <main className="page-main"><section className="simple-page-hero"><span className="eyebrow">LOCAL COLLECTION</span><h1>{lang === "zh" ? "你自己的围场" : "Your own paddock"}</h1><p>{lang === "zh" ? "不需要登录。收藏保存在当前浏览器，不会上传，也不会在不同设备间同步。" : "No account required. Favorites remain in this browser and are neither uploaded nor synced between devices."}</p></section><section className="page-section compact"><SectionHeading title={lang === "zh" ? "收藏内容" : "Saved items"}/><FavoritesView locale={lang}/></section></main>;
}
