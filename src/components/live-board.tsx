"use client";

import { useCallback, useEffect, useState } from "react";
import type { LivePayload } from "@/lib/live";
import type { Locale } from "@/lib/types";
import { Icon } from "./icons";

const reasonCopy = {
  zh: {
    not_live: "最新会话已经结束或尚未开始。",
    not_configured: "实时订阅尚未在服务器端配置；赛历与百科数据不受影响。",
    auth_failed: "实时数据授权暂时失败；我们没有向浏览器暴露任何凭据。",
    rate_limited: "刷新过于频繁，请稍后再试。",
    timeout: "实时提供方响应超时，正在保留稳定的降级状态。",
    upstream_error: "实时提供方暂不可用；赛历与百科数据不受影响。",
  },
  en: {
    not_live: "The latest session has ended or has not started.",
    not_configured: "The live subscription is not configured on the server. Calendar and reference data remain available.",
    auth_failed: "Live-data authorization failed. No credentials were exposed to the browser.",
    rate_limited: "Too many refreshes. Please try again shortly.",
    timeout: "The live provider timed out; a stable degraded state is being shown.",
    upstream_error: "The live provider is unavailable. Calendar and reference data remain available.",
  },
} as const;

export function LiveBoard({ locale }: { locale: Locale }) {
  const [payload, setPayload] = useState<LivePayload | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/live", { cache: "no-store" });
      setPayload(await response.json() as LivePayload);
    } catch {
      setPayload({ mode: "unavailable", positions: [], fetchedAt: new Date().toISOString(), source: "snapshot", stale: true, reason: "upstream_error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(() => void refresh(), 0);
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, 15000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
    };
  }, [refresh]);

  if (loading) return <div className="live-loading"><span/><strong>{locale === "zh" ? "正在连接赛道数据" : "Connecting to track data"}</strong></div>;

  return (
    <section className={`live-board mode-${payload?.mode ?? "unavailable"}`}>
      <header className="live-board-head">
        <div><span className="live-signal"><i/>{payload?.mode === "live" ? "LIVE" : "STATUS"}</span><h2>{payload?.session?.meeting ?? (locale === "zh" ? "实时信号不可用" : "Live signal unavailable")}</h2><p>{payload?.session ? `${payload.session.name} · ${payload.session.location}, ${payload.session.country}` : (locale === "zh" ? "当前无法从实时数据提供方读取会话。赛历与百科数据不受影响。" : "The live provider cannot be read right now. Calendar and reference data remain available.")}</p></div>
        <button className="secondary-button" type="button" onClick={() => void refresh()}><Icon name="live"/>{locale === "zh" ? "刷新" : "Refresh"}</button>
      </header>

      {payload?.positions.length ? (
        <div className="live-positions">
          <div className="live-table-head"><span>POS</span><span>{locale === "zh" ? "车手" : "DRIVER"}</span><span>{locale === "zh" ? "车队" : "TEAM"}</span><span>{locale === "zh" ? "更新" : "UPDATED"}</span></div>
          {payload.positions.map((row) => <div className="live-position" key={row.driverNumber}><strong>{row.position}</strong><span className="live-driver"><i style={{ background: row.teamColor }}/><b>{row.acronym}</b><small>#{row.driverNumber} · {row.name}</small></span><span>{row.teamName}</span><time>{new Date(row.updatedAt).toLocaleTimeString(locale === "zh" ? "zh-CN" : "en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</time></div>)}
        </div>
      ) : (
        <div className="live-empty"><Icon name="live"/><strong>{locale === "zh" ? "当前没有可显示的实时排名" : "No live positions to display"}</strong><p>{payload?.reason ? reasonCopy[locale][payload.reason] : (locale === "zh" ? "当前没有进行中的赛道会话。" : "There is no active track session.")}</p></div>
      )}
      <footer className="live-board-foot"><span>{locale === "zh" ? "每 15 秒刷新，页面不可见时暂停" : "Refreshes every 15 seconds; pauses when hidden"}</span><span>{payload?.source === "openf1" ? "OpenF1" : "PADDOCK INDEX"}{payload?.stale ? ` · ${locale === "zh" ? "降级数据" : "stale"}` : ""} · {payload ? new Date(payload.fetchedAt).toLocaleTimeString() : "—"}</span></footer>
    </section>
  );
}
