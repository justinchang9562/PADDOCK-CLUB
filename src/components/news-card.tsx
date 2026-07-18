import { formatShortDate } from "@/lib/i18n";
import type { Locale, NewsItem } from "@/lib/types";
import { Icon } from "./icons";

const categoryLabels = {
  zh: { race: "比赛", technical: "技术", team: "车队" },
  en: { race: "Race", technical: "Technical", team: "Team" },
};

export function NewsCard({ item, locale, featured = false }: { item: NewsItem; locale: Locale; featured?: boolean }) {
  return (
    <article className={`news-card ${featured ? "is-featured" : ""}`}>
      <div className="news-meta">
        <span>{categoryLabels[locale][item.category]}</span>
        <time dateTime={item.publishedAt}>{formatShortDate(item.publishedAt, locale)}</time>
      </div>
      <h3>{item.title[locale]}</h3>
      <p>{item.summary[locale]}</p>
      <a className="news-source" href={item.url} target="_blank" rel="noreferrer">
        <span>{item.publisher}</span>
        <Icon name="arrow" />
      </a>
    </article>
  );
}
