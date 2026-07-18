import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { LiveBoard } from "@/components/live-board";
import { SectionHeading } from "@/components/section-heading";
import { races2026 } from "@/lib/catalog";
import { isLocale, t } from "@/lib/i18n";

export const metadata: Metadata = { title: "Live Center" };

export default async function LivePage({ params }: PageProps<"/[lang]/live">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const current = races2026.find((race) => race.status === "live") ?? races2026.find((race) => race.status === "upcoming");
  return <main className="page-main"><section className="live-page-hero"><span className="eyebrow">TRACK SIGNAL</span><h1>{lang === "zh" ? "实时，必须是真的" : "Live means live"}</h1><p>{lang === "zh" ? "只有当数据提供方返回正在进行的赛道会话时，排名才会标为实时。没有信号时，界面会明确告诉你，而不是展示伪造动画。" : "Positions are labelled live only when the provider returns an active track session. Without a signal, the interface says so instead of showing fabricated motion."}</p>{current && <Link className="text-link" href={`/${lang}/seasons/${current.season}/races/${current.round}`}>R{current.round} · {t(current.name, lang)}<Icon name="arrow"/></Link>}</section><section className="page-section compact"><LiveBoard locale={lang}/></section><section className="page-section"><SectionHeading eyebrow={lang === "zh" ? "数据说明" : "Data note"} title={lang === "zh" ? "赛道画面之外的数据层。" : "The data layer beyond the broadcast."}/><div className="card-grid three-col"><div className="info-card"><Icon name="live"/><strong>{lang === "zh" ? "位置" : "Position"}</strong><p>{lang === "zh" ? "读取每位车手最近一次公开位置更新。" : "Latest public position update for each driver."}</p></div><div className="info-card"><Icon name="history"/><strong>{lang === "zh" ? "正式结果" : "Official result"}</strong><p>{lang === "zh" ? "比赛结束后转入固定比赛页的最终分类。" : "Final classification moves to the stable race page after the event."}</p></div><div className="info-card"><Icon name="spark"/><strong>{lang === "zh" ? "供应商可替换" : "Replaceable provider"}</strong><p>{lang === "zh" ? "UI 不依赖某个上游响应格式，未来可更换商业数据源。" : "The UI is not coupled to one upstream schema, allowing a future commercial provider."}</p></div></div></section></main>;
}
