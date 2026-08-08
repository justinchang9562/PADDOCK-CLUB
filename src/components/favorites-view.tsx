"use client";

import Link from "next/link";
import { buildSearchIndex } from "@/lib/search";
import type { Locale, SearchEntity } from "@/lib/types";
import { FavoriteButton } from "./favorite-button";
import { useFavorites } from "./favorites-provider";
import { Icon, type IconName } from "./icons";

const typeIcons: Record<SearchEntity["type"], IconName> = { driver: "helmet", team: "team", circuit: "track", car: "car", race: "flag" };
const labels = { zh: { driver: "车手", team: "车队", circuit: "赛道", car: "赛车", race: "比赛" }, en: { driver: "Driver", team: "Team", circuit: "Circuit", car: "Car", race: "Race" } };

function keyFor(item: SearchEntity) {
  return `${item.type}:${item.id}`;
}

export function FavoritesView({ locale }: { locale: Locale }) {
  const { favorites, mode, ready, syncState } = useFavorites();
  const index = buildSearchIndex(locale);
  const items = favorites.map((key) => index.find((item) => keyFor(item) === key)).filter((item): item is SearchEntity => Boolean(item));

  if (!ready) return <div className="loading-card skeleton"/>;
  const status = syncState === "error"
    ? (locale === "zh" ? "云端同步暂时失败；本机收藏仍被保留，稍后会自动重试。" : "Cloud sync is temporarily unavailable. Local favorites are preserved and will retry later.")
    : mode === "cloud"
      ? (syncState === "syncing"
        ? (locale === "zh" ? "正在同步账户收藏…" : "Syncing account favorites…")
        : (locale === "zh" ? "已同步到你的 PADDOCK ID；其他设备登录后会显示相同收藏。" : "Synced to your PADDOCK ID. The same favorites appear when you sign in on another device."))
      : (locale === "zh" ? "访客收藏仅保存在此浏览器；登录后会自动合并到你的账户。" : "Guest favorites stay in this browser and merge into your account after sign-in.");
  const statusNode = <p className={`favorites-sync-note ${syncState === "error" ? "is-error" : ""}`} role={syncState === "error" ? "alert" : "status"}>{status}</p>;

  if (!items.length) return <>{statusNode}<div className="empty-state favorites-empty"><Icon name="bookmark"/><strong>{locale === "zh" ? "还没有收藏内容" : "No favorites yet"}</strong><span>{locale === "zh" ? "浏览车手、车队、赛车、赛道或比赛，然后点击收藏。" : "Browse a driver, team, car, circuit or race, then add it to favorites."}</span><Link className="primary-button" href={`/${locale}`}>{locale === "zh" ? "开始浏览" : "Start exploring"}</Link></div></>;

  return <>{statusNode}<div className="favorites-list">{items.map((item) => { const itemKey = keyFor(item); return <article key={itemKey}><Link href={item.href}><span className="favorite-type"><Icon name={typeIcons[item.type]}/>{labels[locale][item.type]}</span><span><strong>{item.title}</strong><small>{item.subtitle}</small></span><Icon name="arrow"/></Link><FavoriteButton itemKey={itemKey} locale={locale} compact/></article>; })}</div></>;
}
