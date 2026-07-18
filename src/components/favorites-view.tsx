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
  if (item.type === "race") {
    const [season, round] = item.id.split("-");
    return `race:${season}:${round}`;
  }
  return `${item.type}:${item.id}`;
}

export function FavoritesView({ locale }: { locale: Locale }) {
  const { favorites, ready } = useFavorites();
  const index = buildSearchIndex(locale);
  const items = favorites.map((key) => index.find((item) => keyFor(item) === key)).filter((item): item is SearchEntity => Boolean(item));

  if (!ready) return <div className="loading-card skeleton"/>;
  if (!items.length) return <div className="empty-state favorites-empty"><Icon name="bookmark"/><strong>{locale === "zh" ? "还没有收藏内容" : "No favorites yet"}</strong><span>{locale === "zh" ? "浏览车手、车队、赛车、赛道或比赛，在详情页点击收藏。内容只保存在这台设备的浏览器中。" : "Browse a driver, team, car, circuit or race and save it from the detail page. Items stay in this browser on this device."}</span><Link className="primary-button" href={`/${locale}`}>{locale === "zh" ? "开始浏览" : "Start exploring"}</Link></div>;

  return <div className="favorites-list">{items.map((item) => { const itemKey = keyFor(item); return <article key={itemKey}><Link href={item.href}><span className="favorite-type"><Icon name={typeIcons[item.type]}/>{labels[locale][item.type]}</span><span><strong>{item.title}</strong><small>{item.subtitle}</small></span><Icon name="arrow"/></Link><FavoriteButton itemKey={itemKey} locale={locale} compact/></article>; })}</div>;
}
