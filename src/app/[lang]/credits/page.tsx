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
      <section className="simple-page-hero"><span className="eyebrow">MEDIA SOURCES</span><h1>{lang === "zh" ? "图片来源与使用边界" : "Image sources and usage boundaries"}</h1><p>{lang === "zh" ? "赛车与赛道实拍图按开放许可证列示，Studio View 为明确标注的 AI 辅助视觉；2026 车手定妆素材来自 F1 官方资料页，目前只用于本地非商业原型，公开部署前必须取得许可或替换。" : "Car and circuit photographs are listed with their open licenses, while Studio View is clearly labelled as AI-assisted. Official 2026 F1 driver portrait assets are currently limited to this local non-commercial prototype and must be licensed or replaced before public deployment."}</p></section>
      <section className="page-section compact"><div className="credits-list">{mediaCredits.map((credit) => <article key={credit.file}><span>{credit.file}</span><h2>{credit.subject[lang]}</h2><p>© {credit.creator}</p><div><a href={credit.sourceUrl} target="_blank" rel="noreferrer">{credit.sourceUrl.includes("formula1.com") ? "Formula 1" : "Wikimedia Commons"}</a><a href={credit.licenseUrl} target="_blank" rel="noreferrer">{credit.license}</a></div>{credit.note && <small>{credit.note[lang]}</small>}</article>)}</div></section>
    </main>
  );
}
