import type { Locale } from "@/lib/types";
import type { ProviderResult } from "@/lib/providers";

const reasonCopy = {
  zh: { timeout: "上游请求超时", auth: "上游授权不可用", rate_limit: "上游已限制请求频率", no_data: "上游尚未发布数据", upstream_error: "上游服务暂不可用" },
  en: { timeout: "Upstream request timed out", auth: "Upstream authorization is unavailable", rate_limit: "Upstream rate limit reached", no_data: "The upstream source has not published data", upstream_error: "The upstream service is unavailable" },
} as const;

export function DataSourceNote({ result, locale }: { result: ProviderResult<unknown>; locale: Locale }) {
  const warning = result.freshness === "stale" || Boolean(result.reason);
  const date = result.verifiedAt ?? result.sourceUpdatedAt ?? result.fetchedAt;
  const dateText = date.slice(0, 10);
  const state = result.source === "curated"
    ? (locale === "zh" ? `人工核验快照 · 最后核验 ${dateText}` : `Verified snapshot · reviewed ${dateText}`)
    : (locale === "zh" ? `上游数据 · 读取于 ${dateText}` : `Upstream data · fetched ${dateText}`);
  return (
    <div className={`data-source-note ${warning ? "is-warning" : ""}`} role="status">
      <span className="status-dot" />
      <span>{result.reason ? `${reasonCopy[locale][result.reason]} · ${state}` : state}</span>
      <small>{result.source === "jolpica" ? "Jolpica F1" : "PADDOCK INDEX"}</small>
    </div>
  );
}
