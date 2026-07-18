import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DriverCard } from "@/components/entity-cards";
import { FavoriteButton } from "@/components/favorite-button";
import { Icon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { drivers } from "@/lib/catalog";
import { copy, isLocale } from "@/lib/i18n";
import { getCar, getTeam } from "@/lib/providers";

export async function generateMetadata({ params }: PageProps<"/[lang]/cars/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: getCar(id)?.chassis ?? "Car" };
}

export default async function CarPage({ params }: PageProps<"/[lang]/cars/[id]">) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const car = getCar(id);
  if (!car) notFound();
  const team = getTeam(car.teamId)!;
  const carDrivers = team.drivers.map((driverId) => drivers.find((driver) => driver.id === driverId)).filter(Boolean);

  const specs = [
    [lang === "zh" ? "底盘" : "Chassis", car.chassis],
    [lang === "zh" ? "动力单元" : "Power unit", car.powerUnit],
    [lang === "zh" ? "变速箱" : "Transmission", car.gearbox],
    [lang === "zh" ? "燃料" : "Fuel", car.fuel],
    [lang === "zh" ? "轮胎" : "Tyres", car.tyres],
    [lang === "zh" ? "最低质量" : "Minimum mass", car.weight],
    [lang === "zh" ? "车长" : "Length", car.length === "Not disclosed by team" ? copy[lang].undisclosed : car.length],
    [lang === "zh" ? "最大车宽" : "Maximum width", car.width],
    [lang === "zh" ? "最大轴距" : "Maximum wheelbase", car.wheelbase],
    [lang === "zh" ? "电机输出" : "Electrical output", car.electricalOutput],
  ];

  return (
    <main className="page-main">
      <nav className="breadcrumbs"><Link href={`/${lang}/cars`}>{lang === "zh" ? "赛车" : "Cars"}</Link><Icon name="chevron"/><span>{car.chassis}</span></nav>
      <section className="car-detail-hero" style={{ "--entity-color": team.color } as React.CSSProperties}>
        <div className="car-detail-copy"><span className="eyebrow">{car.season} · {team.name}</span><h1>{car.chassis}</h1><p>{car.overview[lang]}</p><div className="hero-actions"><FavoriteButton itemKey={`car:${car.id}`} locale={lang}/><Link className="secondary-button" href={`/${lang}/teams/${team.id}`}>{team.name}<Icon name="arrow"/></Link></div></div>
        <div className="car-detail-media">
          {car.image ? <Image src={car.image} alt={`${car.chassis} on track`} fill priority sizes="(max-width: 800px) 90vw, 55vw"/> : <div className="media-unavailable large"><strong>{team.shortName}</strong><small>{lang === "zh" ? "实拍图片待授权" : "Documentary image pending license"}</small></div>}
        </div>
      </section>

      {car.studioImage && (
        <section className="page-section studio-view-section">
          <SectionHeading
            eyebrow="STUDIO VIEW"
            title={lang === "zh" ? "把赛车放回纯粹的白色空间。" : "The car, isolated in a pure white space."}
            description={lang === "zh" ? "基于上方 2026 赛道实拍图制作的 AI 辅助影棚展示，用于观察整车姿态与涂装；细小标识和工程细节请以上方实拍图与车队资料为准。" : "An AI-assisted studio presentation based on the 2026 track photograph above, intended for viewing the overall form and livery. Use the documentary image and team data for small markings and engineering details."}
          />
          <figure className="studio-car-frame">
            <div className="studio-car-media">
              <Image
                src={car.studioImage}
                alt={lang === "zh" ? `${car.chassis} 的 AI 辅助白色影棚展示图` : `AI-assisted white studio presentation of the ${car.chassis}`}
                fill
                sizes="(max-width: 860px) 96vw, 1200px"
              />
            </div>
            <figcaption>
              <span>{lang === "zh" ? "AI 辅助视觉" : "AI-assisted visual"}</span>
              <span>{lang === "zh" ? "事实依据：上方 2026 赛道实拍" : "Factual reference: 2026 track photograph above"}</span>
            </figcaption>
          </figure>
        </section>
      )}

      <section className="page-section compact"><SectionHeading eyebrow={lang === "zh" ? "技术规格" : "Technical specification"} title={lang === "zh" ? "公开的，与未公开的。" : "Disclosed and undisclosed."} description={lang === "zh" ? "规则上限不等同于车队实测性能。下表明确区分二者。" : "A regulatory limit is not measured team performance. The table keeps that distinction explicit."}/><dl className="technical-spec-list">{specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="spec-footnote">{lang === "zh" ? "注：768 kg、1,900 mm、3,400 mm 与 350 kW 为 FIA 2026 规则参考，不代表这台赛车在任意时刻的实际测量值。" : "Note: 768 kg, 1,900 mm, 3,400 mm and 350 kW are FIA 2026 regulatory references, not an assertion of the car's measured state at any moment."}</p></section>

      <section className="page-section"><SectionHeading eyebrow={lang === "zh" ? "车手阵容" : "Drivers"} title={lang === "zh" ? "驾驶这台赛车的人。" : "The people driving it."}/><div className="card-grid two-col">{carDrivers.map((driver) => driver && <DriverCard key={driver.id} driver={driver} locale={lang}/>)}</div></section>
    </main>
  );
}
