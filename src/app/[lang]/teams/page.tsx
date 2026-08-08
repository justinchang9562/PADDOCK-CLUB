import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DirectoryHeroBackdrop } from "@/components/directory-hero-backdrop";
import { TeamCard } from "@/components/entity-cards";
import { SectionHeading } from "@/components/section-heading";
import { TeamStandingsTable } from "@/components/standings-table";
import { teams } from "@/lib/catalog";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Teams" };

export default async function TeamsPage({ params }: PageProps<"/[lang]/teams">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <main className="page-main">
      <section className="index-hero teams-index-hero">
        <DirectoryHeroBackdrop variant="teams" src="/images/mercedes-w17.jpg" mark="11" />
        <div><span className="eyebrow">2026 CONSTRUCTORS</span><h1>{lang === "zh" ? <>十一种方法，<br/><span>追求同一秒</span></> : <>Eleven ways<br/><span>to find one second</span></>}</h1><p>{lang === "zh" ? "车队不只是一种涂装。这里连接它们的历史、基地、管理、车手、赛车、动力单元与当前积分。" : "A team is more than a livery. Explore history, base, leadership, drivers, car, power unit and current points."}</p></div>
        <div className="constructor-bars" aria-hidden="true">{teams.map((team) => <i key={team.id} style={{ background: team.color, height: `${30 + (12 - team.position) * 7}px` }}/>)}</div>
      </section>
      <section className="page-section compact"><SectionHeading eyebrow={lang === "zh" ? "车队档案" : "Team files"} title={lang === "zh" ? "2026 完整车队阵容。" : "The complete 2026 field."}/><div className="card-grid two-col">{teams.map((team, index) => <TeamCard key={team.id} team={team} locale={lang} priority={index === 0}/>)}</div></section>
      <section className="page-section"><SectionHeading eyebrow={lang === "zh" ? "车队积分" : "Constructors"} title={lang === "zh" ? "制造商积分榜。" : "Constructors' standings."}/><TeamStandingsTable rows={teams} locale={lang}/></section>
    </main>
  );
}
