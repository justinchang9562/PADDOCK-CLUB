import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FavoriteButton } from "@/components/favorite-button";
import { Icon } from "@/components/icons";
import { RaceCard } from "@/components/race-card";
import { SectionHeading } from "@/components/section-heading";
import { races2026 } from "@/lib/catalog";
import { isLocale } from "@/lib/i18n";
import { getCircuit } from "@/lib/providers";

export async function generateMetadata({ params }: PageProps<"/[lang]/circuits/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: getCircuit(id)?.name ?? "Circuit" };
}

export default async function CircuitPage({ params }: PageProps<"/[lang]/circuits/[id]">) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const circuit = getCircuit(id);
  if (!circuit) notFound();
  const race = races2026.find((item) => item.circuitId === circuit.id);
  return (
    <main className="page-main">
      <nav className="breadcrumbs"><Link href={`/${lang}/circuits`}>{lang === "zh" ? "赛道" : "Circuits"}</Link><Icon name="chevron"/><span>{circuit.countryCode}</span></nav>
      <section className="circuit-detail-hero">
        <div className="circuit-detail-media">
          <div className="giant-track" aria-hidden="true"><Icon name="track"/></div>
          <div className="circuit-detail-layout circuit-detail-code" aria-hidden="true"><strong>{circuit.countryCode}</strong><small>PADDOCK INDEX · TRACK FILE</small></div>
        </div>
        <div className="circuit-detail-copy"><span className="eyebrow">{circuit.city[lang]} · {circuit.country[lang]}</span><h1>{circuit.name}</h1><p>{circuit.character[lang]}</p><FavoriteButton itemKey={`circuit:${circuit.id}`} locale={lang}/></div>
      </section>

      <section className="record-strip circuit-records">
        <span><small>{lang === "zh" ? "单圈长度" : "Lap length"}</small><strong>{circuit.lengthKm ?? "—"} km</strong></span>
        <span><small>{lang === "zh" ? "比赛圈数" : "Race laps"}</small><strong>{circuit.laps ?? "—"}</strong></span>
        <span><small>{lang === "zh" ? "弯角" : "Corners"}</small><strong>{circuit.corners ?? "—"}</strong></span>
        <span><small>{lang === "zh" ? "比赛距离" : "Race distance"}</small><strong>{circuit.raceDistanceKm ?? "—"} km</strong></span>
        <span><small>{lang === "zh" ? "首次 F1" : "First Grand Prix"}</small><strong>{circuit.firstGrandPrix ?? "—"}</strong></span>
      </section>

      <section className="page-section compact">
        <div className="race-overview-grid">
          <div className="surface-panel"><SectionHeading eyebrow={lang === "zh" ? "最快比赛圈" : "Race lap record"} title={circuit.lapRecord ?? "—"}/><div className="lap-record-holder"><Icon name="history"/><span><small>{lang === "zh" ? "纪录保持者 / 年份" : "Holder / year"}</small><strong>{circuit.lapRecordHolder ?? (lang === "zh" ? "尚无正式纪录" : "No official record")}</strong></span></div><p className="spec-footnote">{lang === "zh" ? "比赛最快圈与排位赛单圈是不同统计，本页使用比赛圈速纪录。赛道布局变化会使旧纪录不可直接比较。" : "Race lap records differ from qualifying laps. Layout changes can make records across configurations incomparable."}</p></div>
          {race ? <RaceCard race={race} locale={lang} featured={race.status === "live"}/> : <div className="empty-state"><strong>{lang === "zh" ? "当前赛季没有这条赛道" : "Not on the current calendar"}</strong></div>}
        </div>
      </section>
    </main>
  );
}
