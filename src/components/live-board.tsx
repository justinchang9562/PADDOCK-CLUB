"use client";

import { useCallback, useEffect, useState } from "react";
import type { LivePayload } from "@/lib/live";
import type { Locale } from "@/lib/types";
import { Icon } from "./icons";

export function LiveBoard({ locale }: { locale: Locale }) {
  const [payload, setPayload] = useState<LivePayload | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/live", { cache: "no-store" });
      setPayload(await response.json() as LivePayload);
    } catch {
      setPayload({ mode: "unavailable", positions: [], fetchedAt: new Date().toISOString(), source: "PADDOCK CLUB", message: "Request failed" });
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
        <div className="live-empty"><Icon name="live"/><strong>{locale === "zh" ? "当前没有可显示的实时排名" : "No live positions to display"}</strong><p>{payload?.mode === "schedule" ? (locale === "zh" ? "最新会话已经结束或尚未开始。" : "The latest session has ended or has not started.") : (locale === "zh" ? "OpenF1 可能要求实时授权，或当前不在赛道会话窗口。" : "OpenF1 may require live authorization, or there is no active track session.")}</p></div>
      )}
      <footer className="live-board-foot"><span>{locale === "zh" ? "每 15 秒刷新，页面不可见时暂停" : "Refreshes every 15 seconds; pauses when hidden"}</span><span>{payload?.source} · {payload ? new Date(payload.fetchedAt).toLocaleTimeString() : "—"}</span></footer>
    </section>
  );
}
