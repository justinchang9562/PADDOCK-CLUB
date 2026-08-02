import type { Locale, LocalizedText } from "./types";

export const locales: Locale[] = ["zh", "en"];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function t(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export const copy = {
  zh: {
    brandTagline: "F1 数据与知识平台",
    nav: {
      overview: "赛季总览",
      calendar: "赛历",
      drivers: "车手",
      teams: "车队",
      circuits: "赛道",
      cars: "赛车",
      news: "资讯",
      live: "实时",
      favorites: "收藏",
    },
    search: "搜索车手、车队、赛道或比赛",
    searchShort: "搜索",
    changeLanguage: "切换至 English",
    season: "赛季",
    currentSeason: "当前赛季",
    viewAll: "查看全部",
    explore: "深入了解",
    previous: "上一个",
    next: "下一个",
    position: "排名",
    driver: "车手",
    team: "车队",
    points: "积分",
    status: "状态",
    time: "时间 / 差距",
    laps: "圈数",
    source: "来源",
    externalLink: "打开原文",
    addFavorite: "加入收藏",
    removeFavorite: "取消收藏",
    noFavorites: "还没有收藏内容",
    noFavoritesBody: "在车手、车队、赛车、赛道和比赛页面点击收藏，内容会保存在这台设备的浏览器中。",
    dataUpdated: "数据更新时间",
    dataUnavailable: "上游数据暂不可用，正在展示本地核验资料。",
    undisclosed: "车队未公开",
    loading: "正在加载",
    liveUnavailable: "当前没有可公开读取的实时赛道会话。",
    offlineReady: "基础百科内容仍可正常浏览。",
    localOnly: "仅保存在此设备",
    signIn: "登录",
    signOut: "退出登录",
    account: "账户",
  },
  en: {
    brandTagline: "F1 data and reference",
    nav: {
      overview: "Overview",
      calendar: "Calendar",
      drivers: "Drivers",
      teams: "Teams",
      circuits: "Circuits",
      cars: "Cars",
      news: "News",
      live: "Live",
      favorites: "Favorites",
    },
    search: "Search drivers, teams, circuits or races",
    searchShort: "Search",
    changeLanguage: "切换至中文",
    season: "Season",
    currentSeason: "Current season",
    viewAll: "View all",
    explore: "Explore",
    previous: "Previous",
    next: "Next",
    position: "Pos",
    driver: "Driver",
    team: "Team",
    points: "Points",
    status: "Status",
    time: "Time / gap",
    laps: "Laps",
    source: "Source",
    externalLink: "Read at source",
    addFavorite: "Add to favorites",
    removeFavorite: "Remove favorite",
    noFavorites: "No favorites yet",
    noFavoritesBody: "Save drivers, teams, cars, circuits and races. Favorites stay in this browser on this device.",
    dataUpdated: "Data updated",
    dataUnavailable: "Upstream data is unavailable; verified local reference data is shown.",
    undisclosed: "Not disclosed by team",
    loading: "Loading",
    liveUnavailable: "There is no publicly readable live track session right now.",
    offlineReady: "Core encyclopedia content remains available.",
    localOnly: "Stored on this device",
    signIn: "Sign in",
    signOut: "Sign out",
    account: "Account",
  },
} as const;

export function localizedPath(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  if (parts[1] === "zh" || parts[1] === "en") parts[1] = locale;
  else parts.splice(1, 0, locale);
  return parts.join("/") || `/${locale}`;
}

export function formatDateRange(start: string, end: string, locale: Locale) {
  const language = locale === "zh" ? "zh-CN" : "en-GB";
  const startDate = new Date(`${start}T12:00:00Z`);
  const endDate = new Date(`${end}T12:00:00Z`);
  const startText = new Intl.DateTimeFormat(language, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(startDate);
  const endText = new Intl.DateTimeFormat(language, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(endDate);
  return `${startText} — ${endText}`;
}

export function formatShortDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
