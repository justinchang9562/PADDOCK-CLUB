import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mediaCredits } from "@/lib/media";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Image Credits" };

export default async function CreditsPage({ params }: PageProps<"/[lang]/credits">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <main className="page-main">
      <section className="simple-page-hero"><span className="eyebrow">MEDIA SOURCES</span><h1>{lang === "zh" ? "图片来源与使用边界" : "Image sources and usage boundaries"}</h1><p>{lang === "zh" ? "真实赛车摄影按开放许可证逐项列示，Studio View 明确标注为 AI 辅助衍生视觉。当前版本不包含 Formula1.com 官方车手定妆照、赛事头图或官方赛道 Layout。" : "Documentary car photography is listed under its open licence, and Studio View is identified as AI-assisted derivative imagery. The current version contains no Formula1.com driver portraits, race-page headers or official circuit layouts."}</p></section>
      <section className="page-section compact"><div className="credits-list">{mediaCredits.map((credit) => <article key={credit.file}><span>{credit.file}</span><h2>{credit.subject[lang]}</h2><p>© {credit.creator}</p><div><a href={credit.sourceUrl} target="_blank" rel="noreferrer">Wikimedia Commons</a><a href={credit.licenseUrl} target="_blank" rel="noreferrer">{credit.license}</a></div><small>{credit.note?.[lang] ?? (lang === "zh" ? "本地文件可能经过格式优化，并会随响应式版面显示裁切。" : "The local file may be format-optimised and displayed with responsive cropping.")}</small></article>)}</div></section>
    </main>
  );
}
