const LEGACY_2026_RACE_IDS: Record<string, string> = {
  "1": "2026-albert-park",
  "2": "2026-shanghai",
  "3": "2026-suzuka",
  "4": "2026-miami",
  "5": "2026-gilles-villeneuve",
  "6": "2026-monaco",
  "7": "2026-barcelona",
  "8": "2026-red-bull-ring",
  "9": "2026-silverstone",
  "10": "2026-spa",
  "11": "2026-hungaroring",
  "12": "2026-zandvoort",
  "13": "2026-monza",
  "14": "2026-madrid",
  "15": "2026-baku",
  "16": "2026-marina-bay",
  "17": "2026-cota",
  "18": "2026-mexico-city",
  "19": "2026-interlagos",
  "20": "2026-las-vegas",
  "21": "2026-lusail",
  "22": "2026-yas-marina",
};

export function canonicalFavoriteKey(key: string) {
  const match = /^race:2026:(\d+)$/.exec(key);
  if (!match) return key;
  const stableId = LEGACY_2026_RACE_IDS[match[1]];
  return stableId ? `race:${stableId}` : key;
}
