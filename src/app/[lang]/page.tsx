import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DriverCard } from "@/components/entity-cards";
import { HomeScrollAnimations } from "@/components/home-scroll-animations";
import { Icon } from "@/components/icons";
import { NewsCard } from "@/components/news-card";
import { RaceCard } from "@/components/race-card";
import { SectionHeading } from "@/components/section-heading";
import { DriverStandingsTable, TeamStandingsTable } from "@/components/standings-table";
import { CURRENT_SEASON, drivers, news, races2026, teams } from "@/lib/catalog";
import { copy, formatDateRange, isLocale, t } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "zh" ? "F1 数据与知识平台" : "F1 Data & Reference",
    description: lang === "zh" ? "比赛、积分、车手、车队、赛车与赛道，一站清晰查阅。" : "Races, standings, drivers, teams, cars and circuits in one clear reference.",
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const liveRace = races2026.find((race) => race.status === "live");
  const nextRace = liveRace ?? races2026.find((race) => race.status === "upcoming") ?? races2026.at(-1)!;
  const nearbyRaces = races2026.filter((race) => race.round >= nextRace.round - 1 && race.round <= nextRace.round + 2).slice(0, 3);

  return (
    <HomeScrollAnimations>
      <main className="page-main flush-top">
      <section className="home-index-hero">
        <div className="home-index-rail" aria-hidden="true">
          <span>F1 / DATA / REFERENCE</span>
          <span>{CURRENT_SEASON} SEASON INDEX</span>
          <span>ZH · EN</span>
        </div>

        <h1 className="home-index-wordmark" aria-label="PADDOCK CLUB">
          <span>PADDOCK</span><span>CLUB</span>
        </h1>

        <div className="home-index-visual">
          <Image
            className="home-index-photo"
            src="/images/home/red-bull-night.jpg"
            alt={lang === "zh" ? "夜间赛道上高速行驶的红牛 F1 赛车" : "A Red Bull Formula 1 car at speed on a night circuit"}
            fill
            priority
            sizes="(max-width: 1000px) 100vw, 92vw"
          />
          <span className="home-index-photo-label">RED BULL · NIGHT RUN</span>
        </div>

        <div className="home-index-stat" aria-label={lang === "zh" ? `${races2026.length} 场比赛周末` : `${races2026.length} race weekends`}>
          <strong>{races2026.length}</strong>
          <span>{lang === "zh" ? <>场比赛周末<br/>完整索引</> : <>Race weekends<br/>fully indexed</>}</span>
        </div>

        <div className="home-index-copy">
          <span className="eyebrow">{CURRENT_SEASON} · {copy[lang].currentSeason}</span>
          <h2>{lang === "zh" ? "每一圈，都有索引" : "Formula 1, properly indexed"}</h2>
          <p className="hero-copy">
            {lang === "zh" ? "比赛、积分、车手、车队、赛车与赛道——把 F1 的复杂信息整理成清晰、双语、随时可查的数据工具。" : "Races, standings, drivers, teams, cars and circuits—Formula 1's complexity organised into one clear, bilingual data tool."}
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href={`/${lang}/seasons/${CURRENT_SEASON}`}><Icon name="calendar" />{lang === "zh" ? "打开 2026 赛季" : "Open the 2026 season"}</Link>
            <Link className="secondary-button" href={`/${lang}/live`}><Icon name="live" />{lang === "zh" ? "查看实时中心" : "View live center"}</Link>
          </div>
        </div>
      </section>

      <section className="page-section compact">
        <div className="current-strip" data-home-reveal>
          <div className="current-strip-copy">
            <span className={`live-or-next ${nextRace.status}`}>{nextRace.status === "live" ? (lang === "zh" ? "本周末进行中" : "Live this weekend") : (lang === "zh" ? "下一站" : "Up next")}</span>
            <strong>R{nextRace.round} · {t(nextRace.name, lang)}</strong>
            <span>{formatDateRange(nextRace.startDate, nextRace.endDate, lang)}</span>
          </div>
          <div className="current-strip-stats">
            <span><small>{lang === "zh" ? "车手领跑" : "Drivers' leader"}</small><strong>{drivers[0].lastName}</strong><b>{drivers[0].points}</b></span>
            <span><small>{lang === "zh" ? "车队领跑" : "Teams' leader"}</small><strong>{teams[0].name}</strong><b>{teams[0].points}</b></span>
          </div>
          <Link className="round-button" href={`/${lang}/seasons/${CURRENT_SEASON}/races/${nextRace.round}`} aria-label={copy[lang].explore}><Icon name="arrow" /></Link>
        </div>
      </section>

      <section className="page-section" data-home-reveal>
        <SectionHeading
          eyebrow={lang === "zh" ? "赛季脉搏" : "Season pulse"}
          title={lang === "zh" ? "现在与接下来。" : "Now and next."}
          description={lang === "zh" ? "每个比赛周末拥有固定链接、状态、赛道数据和正式分类。" : "Every race weekend has a stable route, status, circuit data and classification."}
          href={`/${lang}/seasons/${CURRENT_SEASON}`}
          linkLabel={copy[lang].viewAll}
        />
        <div className="card-grid three-col">{nearbyRaces.map((race, index) => <RaceCard key={race.round} race={race} locale={lang} featured={index === 1 && race.status === "live"} />)}</div>
      </section>

      <section className="page-section" data-home-reveal>
        <SectionHeading eyebrow={lang === "zh" ? "冠军走势" : "Championship"} title={lang === "zh" ? "积分，一眼看清。" : "Standings at a glance."} />
        <div className="standings-split">
          <div>
            <div className="mini-heading"><h3>{lang === "zh" ? "车手积分榜" : "Drivers"}</h3><Link href={`/${lang}/drivers`}>{copy[lang].viewAll}</Link></div>
            <DriverStandingsTable rows={drivers} locale={lang} limit={5} />
          </div>
          <div>
            <div className="mini-heading"><h3>{lang === "zh" ? "车队积分榜" : "Constructors"}</h3><Link href={`/${lang}/teams`}>{copy[lang].viewAll}</Link></div>
            <TeamStandingsTable rows={teams} locale={lang} limit={5} />
          </div>
        </div>
      </section>

      <section className="page-section" data-home-reveal>
        <SectionHeading
          eyebrow={lang === "zh" ? "围场人物" : "Paddock people"}
          title={lang === "zh" ? "不只是一个名字。" : "More than a name."}
          description={lang === "zh" ? "当前车手阵容、积分、号码与职业脉络。" : "The current grid, points, numbers and career context."}
          href={`/${lang}/drivers`}
          linkLabel={copy[lang].nav.drivers}
        />
        <div className="card-grid three-col">{drivers.slice(0, 3).map((driver) => <DriverCard key={driver.id} driver={driver} locale={lang} />)}</div>
      </section>

      <section className="page-section" data-home-reveal>
        <div className="explore-panel">
          <div className="explore-intro">
            <span className="eyebrow">{lang === "zh" ? "F1 百科" : "F1 reference"}</span>
            <h2>{lang === "zh" ? "从赛道表面，走进赛车内部" : "From the track surface to the car within"}</h2>
            <p>{lang === "zh" ? "尺寸、动力、历史、圈长、弯角和纪录都有来源；车队没有公开的数据会明确标记，而不是猜测。" : "Dimensions, power, history, lap length, corners and records stay sourced. Undisclosed team data is labelled, never guessed."}</p>
          </div>
          <div className="explore-links">
            <Link href={`/${lang}/cars`}><Icon name="car"/><span><strong>{copy[lang].nav.cars}</strong><small>{lang === "zh" ? "11 台 2026 赛车" : "11 cars for 2026"}</small></span><Icon name="arrow"/></Link>
            <Link href={`/${lang}/circuits`}><Icon name="track"/><span><strong>{copy[lang].nav.circuits}</strong><small>{lang === "zh" ? "22 个比赛场地" : "22 race venues"}</small></span><Icon name="arrow"/></Link>
            <Link href={`/${lang}/teams`}><Icon name="team"/><span><strong>{copy[lang].nav.teams}</strong><small>{lang === "zh" ? "历史与技术档案" : "History and technical files"}</small></span><Icon name="arrow"/></Link>
          </div>
        </div>
      </section>

      <section className="page-section" data-home-reveal>
        <SectionHeading eyebrow={lang === "zh" ? "来源精选" : "Source edit"} title={lang === "zh" ? "只保留有用的资讯。" : "Only the useful signal."} description={lang === "zh" ? "标题、摘要和来源链接，不复制全文，也不把评论冒充事实。" : "Headlines, concise summaries and source links—no copied articles and no opinion presented as fact."} href={`/${lang}/news`} linkLabel={copy[lang].viewAll} />
        <div className="card-grid three-col">{news.slice(0, 3).map((item, index) => <NewsCard key={item.id} item={item} locale={lang} featured={index === 0} />)}</div>
      </section>
      </main>
    </HomeScrollAnimations>
  );
}
