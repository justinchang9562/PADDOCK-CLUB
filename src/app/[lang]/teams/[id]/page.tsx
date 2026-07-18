import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarCard, DriverCard } from "@/components/entity-cards";
import { FavoriteButton } from "@/components/favorite-button";
import { Icon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { cars, drivers } from "@/lib/catalog";
import { isLocale } from "@/lib/i18n";
import { getTeam } from "@/lib/providers";

export async function generateMetadata({ params }: PageProps<"/[lang]/teams/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: getTeam(id)?.name ?? "Team" };
}

export default async function TeamPage({ params }: PageProps<"/[lang]/teams/[id]">) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const team = getTeam(id);
  if (!team) notFound();
  const teamDrivers = team.drivers.map((driverId) => drivers.find((driver) => driver.id === driverId)).filter(Boolean);
  const car = cars.find((item) => item.teamId === team.id)!;

  return (
    <main className="page-main">
      <nav className="breadcrumbs"><Link href={`/${lang}/teams`}>{lang === "zh" ? "车队" : "Teams"}</Link><Icon name="chevron"/><span>{team.shortName}</span></nav>
      <section className="entity-detail-hero team-detail-hero" style={{ "--entity-color": team.color } as React.CSSProperties}>
        <div className="detail-title"><span className="eyebrow">P{team.position} · {team.base[lang]}</span><h1>{team.name}</h1><p>{team.history[lang]}</p><div className="hero-actions"><FavoriteButton itemKey={`team:${team.id}`} locale={lang}/><Link className="secondary-button" href={`/${lang}/cars/${car.id}`}>{car.chassis}<Icon name="arrow"/></Link></div></div>
        <div className="detail-machine">
          {car.image ? <Image src={car.image} alt={`${car.chassis} on track`} fill priority sizes="(max-width: 920px) 92vw, 46vw"/> : <div className="media-unavailable large"><strong>{team.shortName}</strong><small>{lang === "zh" ? "实拍图片待授权" : "Documentary image pending license"}</small></div>}
          <span className="team-detail-shade" aria-hidden="true" />
          <span className="team-detail-code" aria-hidden="true">{team.shortName.slice(0,3).toUpperCase()}</span>
        </div>
      </section>

      <section className="record-strip">
        <span><small>{lang === "zh" ? "当前排名" : "Position"}</small><strong>P{team.position}</strong></span>
        <span><small>{lang === "zh" ? "赛季积分" : "Season points"}</small><strong>{team.points}</strong></span>
        <span><small>{lang === "zh" ? "车队冠军" : "Constructors' titles"}</small><strong>{team.championships}</strong></span>
        <span><small>{lang === "zh" ? "首次参赛" : "First entry"}</small><strong>{team.firstEntry}</strong></span>
        <span><small>{lang === "zh" ? "车队负责人" : "Team principal"}</small><strong className="small-value">{team.principal}</strong></span>
      </section>

      <section className="page-section"><SectionHeading eyebrow={lang === "zh" ? "车手阵容" : "Driver line-up"} title={lang === "zh" ? "两台赛车，两位车手。" : "Two cars. Two drivers."}/><div className="card-grid two-col">{teamDrivers.map((driver) => driver && <DriverCard key={driver.id} driver={driver} locale={lang}/>)}</div></section>
      <section className="page-section"><SectionHeading eyebrow={lang === "zh" ? "赛车档案" : "Car file"} title={car.chassis} description={lang === "zh" ? "公开规则数据、底盘、动力单元与已知技术定位。" : "Public regulation data, chassis, power unit and known technical positioning."}/><div className="single-feature-card"><CarCard car={car} team={team} locale={lang}/></div></section>
    </main>
  );
}
