import type { Locale, RaceStatus } from "@/lib/types";

const statusText: Record<Locale, Record<RaceStatus, string>> = {
  zh: { completed: "已结束", live: "进行中", upcoming: "即将开始" },
  en: { completed: "Completed", live: "Live weekend", upcoming: "Upcoming" },
};

export function StatusLabel({ status, locale }: { status: RaceStatus; locale: Locale }) {
  return <span className={`status-label status-${status}`}><i />{statusText[locale][status]}</span>;
}
