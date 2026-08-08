import type { Locale, RaceStatus } from "@/lib/types";

const statusText: Record<Locale, Record<RaceStatus, string>> = {
  zh: { completed: "已结束", awaiting_result: "等待正式结果", live: "会话进行中", weekend: "比赛周末", upcoming: "即将开始" },
  en: { completed: "Completed", awaiting_result: "Awaiting result", live: "Live session", weekend: "Race weekend", upcoming: "Upcoming" },
};

export function StatusLabel({ status, locale }: { status: RaceStatus; locale: Locale }) {
  return <span className={`status-label status-${status}`}><i />{statusText[locale][status]}</span>;
}
