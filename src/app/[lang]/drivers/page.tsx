import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DirectoryHeroBackdrop } from "@/components/directory-hero-backdrop";
import { DriverCard } from "@/components/entity-cards";
import { SectionHeading } from "@/components/section-heading";
import { DriverStandingsTable } from "@/components/standings-table";
import { drivers, teams } from "@/lib/catalog";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Drivers" };

export default async function DriversPage({ params }: PageProps<"/[lang]/drivers">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const leader = drivers[0];
  const team = teams.find((item) => item.id === leader.teamId)!;

  return (
    <main className="page-main">
      <section className="index-hero drivers-index-hero" style={{ "--entity-color": team.color } as React.CSSProperties}>
        <DirectoryHeroBackdrop variant="drivers" mark={String(leader.number)} />
        <div>
          <span className="eyebrow">2026 GRID · 22 DRIVERS</span>
          <h1>{lang === "zh" ? <>速度背后，<br/><span>是不同的人</span></> : <>Different minds<br/><span>One grid</span></>}</h1>
          <p>{lang === "zh" ? "按当前积分排名浏览完整车手阵容。每份档案包含号码、国籍、车队、积分、冠军数与职业概览。" : "Browse the full grid in championship order. Every file covers number, nationality, team, points, titles and career context."}</p>
        </div>
        <div className="leader-card">
          <span>{lang === "zh" ? "当前领跑" : "Championship leader"}</span>
          <strong>{leader.firstName}<br/>{leader.lastName}</strong>
          <div><b>{leader.points}</b><small>points</small><i>{leader.code}</i></div>
        </div>
      </section>

      <section className="page-section compact">
        <SectionHeading eyebrow={lang === "zh" ? "围场阵容" : "The grid"} title={lang === "zh" ? "22 位车手，11 支车队。" : "22 drivers. 11 teams."} />
        <p className="prototype-media-note">{lang === "zh" ? "车手目录使用 PADDOCK INDEX 自有文字与数据卡片，不使用未授权的官方定妆照。" : "The driver directory uses PADDOCK INDEX data cards and does not reproduce unlicensed official portraits."}</p>
        <div className="card-grid three-col">{drivers.map((driver) => <DriverCard key={driver.id} driver={driver} locale={lang}/>)}</div>
      </section>

      <section className="page-section">
        <SectionHeading eyebrow={lang === "zh" ? "积分排序" : "Points order"} title={lang === "zh" ? "完整车手积分榜。" : "Full drivers' standings."} />
        <DriverStandingsTable rows={drivers} locale={lang}/>
      </section>
    </main>
  );
}
