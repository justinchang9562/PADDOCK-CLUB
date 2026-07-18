import Link from "next/link";
import { copy } from "@/lib/i18n";
import type { Driver, Locale, Team } from "@/lib/types";

export function DriverStandingsTable({ rows, locale, limit }: { rows: Driver[]; locale: Locale; limit?: number }) {
  const displayRows = limit ? rows.slice(0, limit) : rows;
  return (
    <div className="table-wrap">
      <table className="standings-table">
        <thead><tr><th>{copy[locale].position}</th><th>{copy[locale].driver}</th><th>{copy[locale].team}</th><th>{copy[locale].points}</th></tr></thead>
        <tbody>
          {displayRows.map((driver) => (
            <tr key={driver.id}>
              <td><strong className="position-number">{driver.position}</strong></td>
              <td>
                <Link className="table-identity" href={`/${locale}/drivers/${driver.id}`}>
                  <span className="driver-code">{driver.code}</span>
                  <span><strong>{driver.firstName} {driver.lastName}</strong><small>#{driver.number} · {driver.nationality[locale]}</small></span>
                </Link>
              </td>
              <td><Link href={`/${locale}/teams/${driver.teamId}`}>{driver.teamId.replaceAll("-", " ")}</Link></td>
              <td><strong>{driver.points}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TeamStandingsTable({ rows, locale, limit }: { rows: Team[]; locale: Locale; limit?: number }) {
  const displayRows = limit ? rows.slice(0, limit) : rows;
  return (
    <div className="table-wrap">
      <table className="standings-table team-table">
        <thead><tr><th>{copy[locale].position}</th><th>{copy[locale].team}</th><th>{locale === "zh" ? "总部" : "Base"}</th><th>{copy[locale].points}</th></tr></thead>
        <tbody>
          {displayRows.map((team) => (
            <tr key={team.id}>
              <td><strong className="position-number">{team.position}</strong></td>
              <td>
                <Link className="team-table-name" href={`/${locale}/teams/${team.id}`}>
                  <i style={{ backgroundColor: team.color }} />
                  <strong>{team.name}</strong>
                </Link>
              </td>
              <td>{team.base[locale]}</td>
              <td><strong>{team.points}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
