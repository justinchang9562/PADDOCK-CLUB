import Link from "next/link";
import { circuits } from "@/lib/catalog";
import { formatDateRange, t } from "@/lib/i18n";
import type { Locale, Race } from "@/lib/types";
import { FavoriteButton } from "./favorite-button";
import { Icon } from "./icons";
import { StatusLabel } from "./status-label";

export function RaceCard({ race, locale, featured = false }: { race: Race; locale: Locale; featured?: boolean }) {
  const circuit = circuits.find((item) => item.id === race.circuitId);
  const href = `/${locale}/seasons/${race.season}/races/${race.round}`;
  return (
    <article className={`race-card ${featured ? "is-featured" : ""}`}>
      <div className="race-card-top">
        <span className="round">R{String(race.round).padStart(2, "0")}</span>
        <StatusLabel status={race.status} locale={locale} />
        <FavoriteButton itemKey={`race:${race.season}:${race.round}`} locale={locale} compact />
      </div>
      <Link className="race-card-link" href={href}>
        <div className="flag-code" aria-label={race.countryCode}>{race.countryCode}</div>
        <h3>{t(race.name, locale)}</h3>
        <p>{circuit ? `${circuit.city[locale]} · ${circuit.name}` : race.circuitId}</p>
        <div className="race-card-meta">
          <span>{formatDateRange(race.startDate, race.endDate, locale)}</span>
          {race.sprint && <span className="sprint-chip">Sprint</span>}
        </div>
        {race.podium && (
          <div className="winner-line">
            <span>{locale === "zh" ? "冠军" : "Winner"}</span>
            <strong>{race.podium[0].driverName}</strong>
            <small>{race.podium[0].teamName}</small>
          </div>
        )}
        <span className="card-arrow"><Icon name="arrow" /></span>
      </Link>
    </article>
  );
}
