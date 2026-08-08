import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarCard, TeamCard } from "@/components/entity-cards";
import { FavoriteButton } from "@/components/favorite-button";
import { Icon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { cars, drivers } from "@/lib/catalog";
import { driverStories } from "@/lib/driver-stories";
import { isLocale } from "@/lib/i18n";
import { getDriver, getTeam } from "@/lib/providers";

export async function generateMetadata({ params }: PageProps<"/[lang]/drivers/[id]">): Promise<Metadata> {
  const { id } = await params;
  const driver = getDriver(id);
  return { title: driver ? `${driver.firstName} ${driver.lastName}` : "Driver" };
}

export default async function DriverPage({ params }: PageProps<"/[lang]/drivers/[id]">) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const driver = getDriver(id);
  if (!driver) notFound();
  const team = getTeam(driver.teamId)!;
  const car = cars.find((item) => item.teamId === team.id)!;
  const previous = drivers[driver.position - 2];
  const next = drivers[driver.position];
  const story = driverStories[driver.id];

  return (
    <main className="page-main">
      <nav className="breadcrumbs"><Link href={`/${lang}/drivers`}>{lang === "zh" ? "车手" : "Drivers"}</Link><Icon name="chevron"/><span>{driver.code}</span></nav>
      <section className="entity-detail-hero driver-detail-hero" style={{ "--entity-color": team.color } as React.CSSProperties}>
        <div className="detail-title">
          <span className="eyebrow">{driver.nationality[lang]} · {team.name}</span>
          <h1><small>{driver.firstName}</small>{driver.lastName}</h1>
          <p>{driver.profile[lang]}</p>
          <div className="hero-actions"><FavoriteButton itemKey={`driver:${driver.id}`} locale={lang}/><Link className="secondary-button" href={`/${lang}/teams/${team.id}`}>{team.name}<Icon name="arrow"/></Link></div>
        </div>
        <div className="detail-portrait">
          <div className="driver-identity large"><strong>{driver.code}</strong><small>{lang === "zh" ? "独立车手资料" : "Independent driver profile"}</small></div>
          <strong>{driver.number}</strong>
        </div>
      </section>

      <section className="record-strip">
        <span><small>{lang === "zh" ? "当前排名" : "Position"}</small><strong>P{driver.position}</strong></span>
        <span><small>{lang === "zh" ? "赛季积分" : "Season points"}</small><strong>{driver.points}</strong></span>
        <span><small>{lang === "zh" ? "世界冠军" : "World titles"}</small><strong>{driver.championships}</strong></span>
        <span><small>{lang === "zh" ? "F1 首秀" : "F1 debut"}</small><strong>{driver.debut}</strong></span>
        <span><small>{lang === "zh" ? "永久号码" : "Race number"}</small><strong>#{driver.number}</strong></span>
      </section>

      {story && (
        <section className="driver-story-section" id="driver-story" style={{ "--entity-color": team.color } as React.CSSProperties}>
          <header className="driver-story-header">
            <span className="eyebrow">{lang === "zh" ? "车手人物志" : "Driver story"}</span>
            <h2>{lang === "zh" ? "不只是一串成绩" : "More than a record"}</h2>
            <p>{story.deck[lang]}</p>
          </header>

          <div className="driver-story-layout">
            <article className="driver-story-chapters">
              {story.chapters.map((chapter, index) => (
                <section key={chapter.title.en}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{chapter.title[lang]}</h3>
                    <p>{chapter.body[lang]}</p>
                  </div>
                </section>
              ))}

              <section className="driver-approach">
                <span>{lang === "zh" ? "驾驶" : "Drive"}</span>
                <div>
                  <h3>{lang === "zh" ? "驾驶风格" : "Driving style"}</h3>
                  <p>{story.approach[lang]}</p>
                </div>
              </section>
            </article>

            <aside className="driver-timeline" aria-label={lang === "zh" ? "职业生涯时间线" : "Career timeline"}>
              <span className="driver-timeline-label">{lang === "zh" ? "关键节点" : "Key moments"}</span>
              <ol>
                {story.milestones.map((milestone) => (
                  <li key={`${milestone.year}-${milestone.title.en}`}>
                    <time>{milestone.year}</time>
                    <div><strong>{milestone.title[lang]}</strong><p>{milestone.detail[lang].replace(/[。.]+$/u, "")}</p></div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>

          <footer className="driver-story-source">
            <span>{lang === "zh" ? `资料复核：${story.reviewedAt}` : `Reviewed: ${story.reviewedAt}`}</span>
            <a href={story.sourceUrl} target="_blank" rel="noreferrer">
              {lang === "zh" ? "查看 Formula 1 官方车手资料" : "Official Formula 1 driver profile"}<Icon name="arrow" />
            </a>
          </footer>
        </section>
      )}

      <section className="page-section">
        <SectionHeading eyebrow={lang === "zh" ? "2026 组合" : "2026 package"} title={lang === "zh" ? "人与机器。" : "Driver and machine."} description={lang === "zh" ? "同一赛季中的车队组织与赛车技术档案。" : "The team organisation and car technical file for the same season."}/>
        <div className="card-grid two-col"><TeamCard team={team} locale={lang}/><CarCard car={car} team={team} locale={lang}/></div>
      </section>

      <nav className="race-pager" aria-label="Driver navigation">
        {previous ? <Link href={`/${lang}/drivers/${previous.id}`}><Icon name="arrow"/><span><small>{lang === "zh" ? "积分榜上一位" : "Previous in standings"}</small><strong>{previous.firstName} {previous.lastName}</strong></span></Link> : <span/>}
        {next && <Link href={`/${lang}/drivers/${next.id}`}><span><small>{lang === "zh" ? "积分榜下一位" : "Next in standings"}</small><strong>{next.firstName} {next.lastName}</strong></span><Icon name="arrow"/></Link>}
      </nav>
    </main>
  );
}
