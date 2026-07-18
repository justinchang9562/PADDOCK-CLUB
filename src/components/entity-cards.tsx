import Image from "next/image";
import Link from "next/link";
import { getCar, getTeamName } from "@/lib/providers";
import type { Car, Circuit, Driver, Locale, Team } from "@/lib/types";
import { FavoriteButton } from "./favorite-button";
import { Icon } from "./icons";

function CardLink() {
  return <span className="card-arrow"><Icon name="arrow"/><span className="sr-only">Open</span></span>;
}

export function DriverCard({ driver, locale }: { driver: Driver; locale: Locale }) {
  return (
    <article className="entity-card driver-card" style={{ "--team-color": `var(--team-${driver.teamId}, #7f8792)` } as React.CSSProperties}>
      <div className="entity-media">
        {driver.image ? <Image className="driver-portrait-image" src={driver.image} alt={`${driver.firstName} ${driver.lastName}, 2026 official portrait`} fill sizes="(max-width: 720px) 90vw, 30vw" /> : (
          <div className="driver-identity"><strong>{driver.code}</strong><small>{locale === "zh" ? "肖像待授权" : "Portrait pending license"}</small></div>
        )}
        <div className="entity-media-number">{driver.number}</div>
        <FavoriteButton itemKey={`driver:${driver.id}`} locale={locale} compact />
      </div>
      <Link className="entity-copy" href={`/${locale}/drivers/${driver.id}`}>
        <span className="entity-kicker">P{driver.position} · {driver.code}</span>
        <h3><small>{driver.firstName}</small>{driver.lastName}</h3>
        <div className="entity-meta"><span>{getTeamName(driver.teamId)}</span><strong>{driver.points} pts</strong></div>
        <CardLink />
      </Link>
    </article>
  );
}

export function TeamCard({ team, locale }: { team: Team; locale: Locale }) {
  const car = getCar(`${team.id}-2026`);
  return (
    <article className="entity-card team-card" style={{ "--team-color": team.color } as React.CSSProperties}>
      <div className="team-visual">
        {car?.image ? <Image src={car.image} alt={`${car.chassis} on track`} fill sizes="(max-width: 720px) 90vw, 30vw" /> : <div className="media-unavailable"><strong>{team.shortName}</strong><small>{locale === "zh" ? "图片待授权" : "Image pending license"}</small></div>}
        <span className="team-photo-shade" aria-hidden="true" />
        <span className="team-line" aria-hidden="true" />
        <span className="team-monogram" aria-hidden="true">{team.shortName.slice(0, 3).toUpperCase()}</span>
        <FavoriteButton itemKey={`team:${team.id}`} locale={locale} compact />
      </div>
      <Link className="entity-copy" href={`/${locale}/teams/${team.id}`}>
        <span className="entity-kicker">P{team.position} · {team.base[locale]}</span>
        <h3>{team.name}</h3>
        <div className="entity-meta"><span>{team.principal}</span><strong>{team.points} pts</strong></div>
        <CardLink />
      </Link>
    </article>
  );
}

export function CarCard({ car, team, locale }: { car: Car; team: Team; locale: Locale }) {
  return (
    <article className="entity-card car-card" style={{ "--team-color": team.color } as React.CSSProperties}>
      <div className="entity-media car-media">
        {car.image ? <Image src={car.image} alt={`${car.chassis} on track`} fill sizes="(max-width: 720px) 90vw, 45vw" /> : (
          <div className="media-unavailable"><strong>{team.shortName}</strong><small>{locale === "zh" ? "图片待授权" : "Image pending license"}</small></div>
        )}
        <span className="season-stamp">{car.season}</span>
        <FavoriteButton itemKey={`car:${car.id}`} locale={locale} compact />
      </div>
      <Link className="entity-copy" href={`/${locale}/cars/${car.id}`}>
        <span className="entity-kicker">{team.name} · {car.powerUnit}</span>
        <h3>{car.chassis}</h3>
        <p>{car.overview[locale]}</p>
        <CardLink />
      </Link>
    </article>
  );
}

export function CircuitCard({ circuit, locale }: { circuit: Circuit; locale: Locale }) {
  return (
    <article className="entity-card circuit-card">
      <div className="circuit-visual">
        {circuit.image ? <Image className="circuit-cover-photo" src={circuit.image} alt={`${circuit.name} circuit`} fill sizes="(max-width: 720px) 90vw, 30vw" /> : (
          <div className="track-glyph" aria-hidden="true"><Icon name="track" /></div>
        )}
        <div className="circuit-layout-badge" aria-hidden="true"><Image src={`/images/circuits/layouts/${circuit.id}.png`} alt="" fill sizes="150px" /></div>
        <span className="flag-code">{circuit.countryCode}</span>
        <FavoriteButton itemKey={`circuit:${circuit.id}`} locale={locale} compact />
      </div>
      <Link className="entity-copy" href={`/${locale}/circuits/${circuit.id}`}>
        <span className="entity-kicker">{circuit.city[locale]} · {circuit.country[locale]}</span>
        <h3>{circuit.name}</h3>
        <div className="circuit-numbers">
          <span><strong>{circuit.lengthKm ?? "—"}</strong> km</span>
          <span><strong>{circuit.laps ?? "—"}</strong> {locale === "zh" ? "圈" : "laps"}</span>
          <span><strong>{circuit.corners ?? "—"}</strong> {locale === "zh" ? "弯" : "turns"}</span>
        </div>
        <CardLink />
      </Link>
    </article>
  );
}
