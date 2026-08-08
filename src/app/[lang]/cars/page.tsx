import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DirectoryHeroBackdrop } from "@/components/directory-hero-backdrop";
import { CarCard } from "@/components/entity-cards";
import { SectionHeading } from "@/components/section-heading";
import { cars, teams } from "@/lib/catalog";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "2026 Cars" };

export default async function CarsPage({ params }: PageProps<"/[lang]/cars">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <main className="page-main">
      <section className="index-hero cars-index-hero">
        <DirectoryHeroBackdrop variant="cars" src="/images/studio/mercedes-w17-studio.png" mark="350" />
        <div><span className="eyebrow">2026 NIMBLE CAR</span><h1>{lang === "zh" ? <>更小，更轻，<br/><span>电动化更强</span></> : <>Smaller. Lighter<br/><span>More electric</span></>}</h1><p>{lang === "zh" ? "每台赛车都有底盘、动力单元与公开规则参数。精确马力、下压力和赛道设定属于车队私有数据，因此不会以猜测值呈现。" : "Every car file covers chassis, power unit and public regulatory dimensions. Exact output, downforce and setup remain proprietary and are never replaced with guesses."}</p></div>
        <div className="regulation-orbit" aria-hidden="true"><span>350<small>kW</small></span><i/><i/><i/></div>
      </section>

      <section className="regulation-strip">
        <span><small>{lang === "zh" ? "最低规则质量" : "Minimum mass"}</small><strong>768 kg</strong></span>
        <span><small>{lang === "zh" ? "最大车宽" : "Maximum width"}</small><strong>1,900 mm</strong></span>
        <span><small>{lang === "zh" ? "最大轴距" : "Maximum wheelbase"}</small><strong>3,400 mm</strong></span>
        <span><small>{lang === "zh" ? "最大电机功率" : "MGU-K maximum"}</small><strong>350 kW</strong></span>
      </section>

      <section className="page-section compact"><SectionHeading eyebrow={lang === "zh" ? "赛车目录" : "Car index"} title={lang === "zh" ? "2026 的十一种答案。" : "Eleven answers to 2026."} description={lang === "zh" ? "从完整厂队到客户动力，每支车队以不同方式解决同一套技术规则。" : "From full works teams to customer power, each constructor solves the same rule set differently."}/><div className="card-grid two-col">{cars.map((car, index) => { const team = teams.find((item) => item.id === car.teamId)!; return <CarCard key={car.id} car={car} team={team} locale={lang} priority={index === 0}/>; })}</div></section>

      <section className="page-section">
        <div className="disclosure-panel">
          <div><span className="eyebrow">{lang === "zh" ? "数据边界" : "Data boundary"}</span><h2>{lang === "zh" ? "“未知”也是一种准确" : "Unknown can be accurate"}</h2></div>
          <p>{lang === "zh" ? "F1 车队不会公开完整的空气动力图谱、真实峰值输出、单站设定或私有遥测。PADDOCK INDEX 会区分规则上限、车队公开信息与未公开数据。" : "F1 teams do not publish complete aero maps, true peak output, race setup sheets or private telemetry. PADDOCK INDEX separates regulatory limits, team disclosures and unavailable data."}</p>
          <a className="secondary-button" href="https://www.fia.com/F126" target="_blank" rel="noreferrer">FIA 2026 Regulations</a>
        </div>
      </section>
    </main>
  );
}
