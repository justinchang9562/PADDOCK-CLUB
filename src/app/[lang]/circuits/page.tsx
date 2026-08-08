import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DirectoryHeroBackdrop } from "@/components/directory-hero-backdrop";
import { CircuitCard } from "@/components/entity-cards";
import { SectionHeading } from "@/components/section-heading";
import { circuits } from "@/lib/catalog";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Circuits" };

export default async function CircuitsPage({ params }: PageProps<"/[lang]/circuits">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const longest = [...circuits].filter((item) => item.lengthKm).sort((a,b) => (b.lengthKm ?? 0) - (a.lengthKm ?? 0))[0];
  return (
    <main className="page-main">
      <section className="index-hero circuits-index-hero">
        <DirectoryHeroBackdrop variant="circuits" mark={String(circuits.length)} />
        <div><span className="eyebrow">2026 WORLD TOUR</span><h1>{lang === "zh" ? <>每条线，<br/><span>都有性格</span></> : <>Every line<br/><span>has a character</span></>}</h1><p>{lang === "zh" ? "从摩纳哥的护墙到斯帕的天气，从蒙扎低下压力到墨西哥城高海拔——比较长度、圈数、弯角、纪录与赛道特征。" : "From Monaco's walls to Spa's weather, Monza's low drag to Mexico City's altitude—compare length, laps, corners, records and character."}</p></div>
        <div className="circuit-hero-stat"><span>{lang === "zh" ? "最长单圈" : "Longest lap"}</span><strong>{longest.lengthKm}<small>km</small></strong><b>{longest.name}</b></div>
      </section>
      <section className="page-section compact"><SectionHeading eyebrow={lang === "zh" ? "赛道目录" : "Circuit index"} title={lang === "zh" ? "横跨世界的比赛场地。" : "Race venues across the world."} description={lang === "zh" ? "2026 赛历中的比赛场地；新赛道未最终认证的参数会明确留空。" : "Venues on the 2026 calendar; unhomologated data for new circuits is left explicitly unavailable."}/><div className="card-grid three-col">{circuits.map((circuit) => <CircuitCard key={circuit.id} circuit={circuit} locale={lang}/>)}</div></section>
    </main>
  );
}
