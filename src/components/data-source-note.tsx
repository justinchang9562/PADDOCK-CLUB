import { copy } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import type { ProviderResult } from "@/lib/providers";

export function DataSourceNote({ result, locale }: { result: Pick<ProviderResult<unknown>, "source" | "stale" | "updatedAt" | "warning">; locale: Locale }) {
  return (
    <div className={`data-source-note ${result.stale ? "is-warning" : ""}`} role={result.stale ? "status" : undefined}>
      <span className="status-dot" />
      <span>
        {result.stale ? copy[locale].dataUnavailable : `${copy[locale].dataUpdated}: ${result.updatedAt}`}
      </span>
      <small>{result.source === "jolpica" ? "Jolpica F1" : locale === "zh" ? "本地核验目录" : "Verified local catalog"}</small>
    </div>
  );
}
