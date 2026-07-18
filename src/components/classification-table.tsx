import Link from "next/link";
import { copy } from "@/lib/i18n";
import type { ClassificationRow, Locale } from "@/lib/types";

export function ClassificationTable({ rows, locale }: { rows: ClassificationRow[]; locale: Locale }) {
  if (!rows.length) return null;
  return (
    <div className="table-wrap">
      <table className="standings-table classification-table">
        <thead>
          <tr>
            <th>{copy[locale].position}</th>
            <th>{copy[locale].driver}</th>
            <th>{copy[locale].team}</th>
            <th>{copy[locale].laps}</th>
            <th>{copy[locale].time}</th>
            <th>{copy[locale].status}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.position}:${row.driverId}`}>
              <td><strong className="position-number">{row.position}</strong></td>
              <td>
                <Link className="table-identity" href={`/${locale}/drivers/${row.driverId}`}>
                  <span className="driver-code">{row.driverCode}</span>
                  <strong>{row.driverName}</strong>
                </Link>
              </td>
              <td><Link href={`/${locale}/teams/${row.teamId}`}>{row.teamName}</Link></td>
              <td>{row.laps ?? "—"}</td>
              <td><strong>{row.time ?? "—"}</strong></td>
              <td><span className={`finish-status ${row.status.toLowerCase().includes("finished") ? "finished" : ""}`}>{row.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
