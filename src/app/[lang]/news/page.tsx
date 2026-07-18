import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsCard } from "@/components/news-card";
import { SectionHeading } from "@/components/section-heading";
import { news } from "@/lib/catalog";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "News Edit" };

export default async function NewsPage({ params }: PageProps<"/[lang]/news">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <main className="page-main">
      <section className="news-page-hero"><span className="eyebrow">PADDOCK EDIT</span><h1>{lang === "zh" ? <>少一点噪音<br/><span>多一点信号</span></> : <>Less noise<br/><span>More signal</span></>}</h1><p>{lang === "zh" ? "资讯只保留标题、简明摘要、发布日期和来源链接。PADDOCK CLUB 不复制全文，也不会隐藏原始发布者。" : "News keeps only the headline, concise summary, date and source link. PADDOCK CLUB does not copy full articles or obscure the original publisher."}</p></section>
      <section className="page-section compact"><SectionHeading eyebrow={lang === "zh" ? "最新更新" : "Latest updates"} title={lang === "zh" ? "经过整理的来源。" : "A considered source edit."}/><div className="card-grid two-col news-index-grid">{news.map((item, index) => <NewsCard key={item.id} item={item} locale={lang} featured={index === 0}/>)}</div></section>
      <section className="page-section"><div className="source-policy"><span>{lang === "zh" ? "编辑原则" : "Editorial policy"}</span><p>{lang === "zh" ? "优先官方赛事、FIA、车队和可追溯的一手来源。摘要是 PADDOCK CLUB 的双语编辑内容；事实变化时应更新摘要并保留原始链接。" : "Official event, FIA, team and traceable primary sources come first. Summaries are bilingual PADDOCK CLUB editorial copy; when facts change, the summary is updated while the source link remains."}</p></div></section>
    </main>
  );
}
