import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataSourceNote } from "@/components/data-source-note";
import { DirectoryHeroBackdrop } from "@/components/directory-hero-backdrop";
import { RaceCard } from "@/components/race-card";
import { SectionHeading } from "@/components/section-heading";
import { DriverStandingsTable, TeamStandingsTable } from "@/components/standings-table";
import { CURRENT_SEASON } from "@/lib/catalog";
import { isLocale } from "@/lib/i18n";
import { getConstructorStandings, getDriverStandings, getSeasonRaces } from "@/lib/providers";

export async function generateMetadata({ params }: PageProps<"/[lang]/seasons/[season]">): Promise<Metadata> {
  const { season } = await params;
  return { title: `${season} Season` };
}

export default async function SeasonPage({ params }: PageProps<"/[lang]/seasons/[season]">) {
  const { lang, season: seasonParam } = await params;
  if (!isLocale(lang)) notFound();
  const season = Number(seasonParam);
  if (!Number.isInteger(season) || season < 1950 || season > CURRENT_SEASON) notFound();

  const [raceResult, driverResult, teamResult] = await Promise.all([
    getSeasonRaces(season),
    getDriverStandings(season),
    getConstructorStandings(season),
  ]);
  const completed = raceResult.data.filter((race) => race.status === "completed").length;
  const live = raceResult.data.find((race) => race.status === "live");

  return (
    <main className="page-main">
      <section className="page-hero season-hero">
        <DirectoryHeroBackdrop variant="season" src="/images/red-bull-rb22.jpg" mark={String(season)} />
        <div>
          <span className="eyebrow">FIA FORMULA ONE WORLD CHAMPIONSHIP</span>
          <h1><span>{season}</span>{lang === "zh" ? "赛季" : "Season"}</h1>
          <p>{lang === "zh" ? "完整赛历、比赛状态与两项世界锦标赛积分。历史数据通过统一接口读取；当前赛季保留离线核验基线。" : "The complete calendar, race state and both championship tables. Historical data is resolved through one provider boundary; the current season keeps a verified offline baseline."}</p>
        </div>
        <div className="hero-metrics">
          <span><strong>{raceResult.data.length || "—"}</strong><small>{lang === "zh" ? "场大奖赛" : "Grands Prix"}</small></span>
          <span><strong>{completed}</strong><small>{lang === "zh" ? "已完成" : "Completed"}</small></span>
          <span><strong>{live ? `R${live.round}` : "—"}</strong><small>{lang === "zh" ? "当前周末" : "Live weekend"}</small></span>
        </div>
      </section>
      <DataSourceNote result={raceResult} locale={lang} />

      <section className="page-section compact">
        <SectionHeading eyebrow={lang === "zh" ? "赛历" : "Calendar"} title={lang === "zh" ? `${season} 的每一站。` : `Every round of ${season}.`} description={lang === "zh" ? "点开任意比赛，查看赛道参数、周末状态与正式分类。" : "Open any race for circuit parameters, weekend status and the published classification."} />
        {raceResult.data.length ? (
          <div className="card-grid three-col">{raceResult.data.map((race) => <RaceCard key={race.id} race={race} locale={lang} featured={race.status === "live"} />)}</div>
        ) : (
          <div className="empty-state"><strong>{lang === "zh" ? "暂时无法读取这个赛季" : "This season could not be loaded"}</strong><span>{lang === "zh" ? "上游历史数据库没有返回赛历，请稍后重试。" : "The historical provider returned no calendar. Please try again later."}</span></div>
        )}
      </section>

      <section className="page-section standings-section">
        <SectionHeading eyebrow={lang === "zh" ? "世界锦标赛" : "World championship"} title={lang === "zh" ? "两张积分榜，同一个赛季。" : "Two tables. One season."} />
        <div className="standings-stack">
          <div>
            <div className="mini-heading"><h3>{lang === "zh" ? "车手积分榜" : "Drivers' standings"}</h3><span>{(driverResult.verifiedAt ?? driverResult.sourceUpdatedAt ?? driverResult.fetchedAt).slice(0, 10)}</span></div>
            {driverResult.data.length ? <DriverStandingsTable rows={driverResult.data} locale={lang} /> : <div className="empty-state compact"><strong>{lang === "zh" ? "没有车手积分数据" : "No driver standings"}</strong></div>}
            <DataSourceNote result={driverResult} locale={lang} />
          </div>
          <div>
            <div className="mini-heading"><h3>{lang === "zh" ? "车队积分榜" : "Constructors' standings"}</h3><span>{(teamResult.verifiedAt ?? teamResult.sourceUpdatedAt ?? teamResult.fetchedAt).slice(0, 10)}</span></div>
            {teamResult.data.length ? <TeamStandingsTable rows={teamResult.data} locale={lang} /> : <div className="empty-state compact"><strong>{lang === "zh" ? "没有车队积分数据" : "No constructor standings"}</strong></div>}
            <DataSourceNote result={teamResult} locale={lang} />
          </div>
        </div>
      </section>
    </main>
  );
}
