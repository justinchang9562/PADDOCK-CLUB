import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClassificationTable } from "@/components/classification-table";
import { DataSourceNote } from "@/components/data-source-note";
import { FavoriteButton } from "@/components/favorite-button";
import { Icon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { StatusLabel } from "@/components/status-label";
import { CURRENT_SEASON } from "@/lib/catalog";
import { formatDateRange, isLocale, t } from "@/lib/i18n";
import { getCircuit, getRaceClassification, getSeasonRaces } from "@/lib/providers";

export async function generateMetadata({ params }: PageProps<"/[lang]/seasons/[season]/races/[round]">): Promise<Metadata> {
  const { season, round } = await params;
  return { title: `${season} · Round ${round}` };
}

export default async function RacePage({ params }: PageProps<"/[lang]/seasons/[season]/races/[round]">) {
  const { lang, season: seasonParam, round: roundParam } = await params;
  if (!isLocale(lang)) notFound();
  const season = Number(seasonParam);
  const round = Number(roundParam);
  if (!Number.isInteger(season) || season < 1950 || season > CURRENT_SEASON || !Number.isInteger(round) || round < 1) notFound();

  const seasonResult = await getSeasonRaces(season);
  const race = seasonResult.data.find((item) => item.round === round);
  if (!race) notFound();
  const circuit = getCircuit(race.circuitId);
  const classification = race.status === "completed" ? await getRaceClassification(season, round) : null;
  const previousRace = seasonResult.data.find((item) => item.round === round - 1);
  const nextRace = seasonResult.data.find((item) => item.round === round + 1);

  return (
    <main className="page-main">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href={`/${lang}`}>PADDOCK INDEX</Link><Icon name="chevron" />
        <Link href={`/${lang}/seasons/${season}`}>{season}</Link><Icon name="chevron" />
        <span>R{round}</span>
      </nav>

      <section className={`race-detail-hero ${race.status}`}>
        <div className="race-detail-copy">
          <div className="race-detail-meta"><StatusLabel status={race.status} locale={lang}/><span>R{String(round).padStart(2, "0")}</span>{race.sprint && <span className="sprint-chip">Sprint</span>}</div>
          <span className="country-watermark">{race.countryCode}</span>
          <h1>{t(race.name, lang)}</h1>
          <p>{circuit ? `${circuit.city[lang]} · ${circuit.name}` : race.circuitId}</p>
          <div className="race-detail-date">{formatDateRange(race.startDate, race.endDate, lang)}</div>
          <div className="hero-actions">
            <FavoriteButton itemKey={`race:${season}:${round}`} locale={lang}/>
            <a className="secondary-button" href={season === 2026 ? "https://www.formula1.com/en/racing/2026" : `https://www.formula1.com/en/results/${season}/races`} target="_blank" rel="noreferrer">{lang === "zh" ? "官方赛事页面" : "Official event page"}<Icon name="arrow"/></a>
          </div>
        </div>
        <div className="race-number-panel" aria-hidden="true"><span>ROUND</span><strong>{String(round).padStart(2, "0")}</strong><i /></div>
      </section>
      <DataSourceNote result={seasonResult} locale={lang}/>

      <section className="page-section compact">
        <div className="race-overview-grid">
          <div className="surface-panel">
            <SectionHeading eyebrow={lang === "zh" ? "赛道档案" : "Circuit file"} title={circuit?.name ?? race.circuitId} />
            {circuit ? <>
              <p className="long-copy">{circuit.character[lang]}</p>
              <div className="spec-grid four">
                <span><small>{lang === "zh" ? "单圈长度" : "Lap length"}</small><strong>{circuit.lengthKm ?? "—"} <b>km</b></strong></span>
                <span><small>{lang === "zh" ? "比赛圈数" : "Race laps"}</small><strong>{circuit.laps ?? "—"}</strong></span>
                <span><small>{lang === "zh" ? "弯角" : "Corners"}</small><strong>{circuit.corners ?? "—"}</strong></span>
                <span><small>{lang === "zh" ? "比赛距离" : "Distance"}</small><strong>{circuit.raceDistanceKm ?? "—"} <b>km</b></strong></span>
              </div>
              <Link className="text-link panel-link" href={`/${lang}/circuits/${circuit.id}`}>{lang === "zh" ? "查看完整赛道页" : "Open full circuit file"}<Icon name="arrow"/></Link>
            </> : <p className="long-copy">{lang === "zh" ? "这个历史赛道尚未加入本地百科目录。赛果仍可通过历史数据源查看。" : "This historical circuit is not yet in the curated encyclopedia. Results remain available from the historical provider."}</p>}
          </div>

          <aside className="surface-panel weekend-panel">
            <span className="eyebrow">{lang === "zh" ? "周末状态" : "Weekend status"}</span>
            <h2>{race.status === "completed" ? (lang === "zh" ? "正式结果已发布" : "Official result published") : race.status === "live" ? (lang === "zh" ? "赛道会话进行中" : "Track sessions in progress") : (lang === "zh" ? "等待比赛周末" : "Awaiting race weekend")}</h2>
            <p>{race.status === "completed" ? (lang === "zh" ? "下方分类优先读取完整历史结果；上游中断时显示本地核验的前三名。" : "The classification below prioritizes the complete historical result and falls back to a verified podium if the provider is interrupted.") : (lang === "zh" ? "精确会话时间和实时位置需以官方计时为准。PADDOCK INDEX 不会用估算值冒充现场数据。" : "Exact session times and live positions remain subject to official timing. PADDOCK INDEX never presents estimates as live data.")}</p>
            {race.status !== "completed" && <Link className="primary-button" href={`/${lang}/live`}><Icon name="live"/>{lang === "zh" ? "前往实时中心" : "Open live center"}</Link>}
          </aside>
        </div>
      </section>

      <section className="page-section">
        <SectionHeading
          eyebrow={lang === "zh" ? "比赛分类" : "Race classification"}
          title={classification?.data.length ? (lang === "zh" ? "每一位完赛车手。" : "Every classified driver.") : (lang === "zh" ? "结果尚未产生。" : "No result yet.")}
          description={lang === "zh" ? "位置、车队、圈数、时间差和完赛状态。" : "Position, constructor, laps, gap and finishing status."}
        />
        {classification?.data.length ? <><ClassificationTable rows={classification.data} locale={lang}/><DataSourceNote result={classification} locale={lang}/></> : (
          <div className="empty-state"><strong>{lang === "zh" ? "绿灯之后，结果会出现在这里" : "Results will appear here after lights out"}</strong><span>{lang === "zh" ? "比赛进行时请使用实时中心；正式分类发布后，此页会显示最终名次和状态。" : "Use the live center during the race. This page shows final positions and status once a classification is published."}</span></div>
        )}
      </section>

      <nav className="race-pager" aria-label="Race navigation">
        {previousRace ? <Link href={`/${lang}/seasons/${season}/races/${previousRace.round}`}><Icon name="arrow"/><span><small>{lang === "zh" ? "上一站" : "Previous"}</small><strong>{t(previousRace.name, lang)}</strong></span></Link> : <span />}
        {nextRace && <Link href={`/${lang}/seasons/${season}/races/${nextRace.round}`}><span><small>{lang === "zh" ? "下一站" : "Next"}</small><strong>{t(nextRace.name, lang)}</strong></span><Icon name="arrow"/></Link>}
      </nav>
    </main>
  );
}
