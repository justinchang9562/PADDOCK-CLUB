"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { copy } from "@/lib/i18n";
import { buildSearchIndex } from "@/lib/search";
import type { Locale } from "@/lib/types";
import { Icon } from "./icons";

const typeLabels = {
  zh: { driver: "车手", team: "车队", circuit: "赛道", car: "赛车", race: "比赛" },
  en: { driver: "Driver", team: "Team", circuit: "Circuit", car: "Car", race: "Race" },
};

export function SearchDialog({ locale, open, onClose }: { locale: Locale; open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildSearchIndex(locale), [locale]);
  const closeDialog = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDialog();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, closeDialog]);

  const normalized = query.trim().toLocaleLowerCase();
  const results = normalized
    ? index.filter((item) => [item.title, item.subtitle, ...item.keywords].join(" ").toLocaleLowerCase().includes(normalized)).slice(0, 10)
    : index.filter((item) => ["race", "driver", "team", "circuit", "car"].includes(item.type)).slice(0, 5);

  if (!open) return null;

  const go = (href: string) => {
    closeDialog();
    router.push(href);
  };

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && closeDialog()}>
      <section className="search-dialog" role="dialog" aria-modal="true" aria-label={copy[locale].search}>
        <div className="search-input-row">
          <Icon name="search" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy[locale].search}
            autoComplete="off"
          />
          <button type="button" className="icon-button" onClick={closeDialog} aria-label="Close search">
            <Icon name="close" />
          </button>
        </div>
        <div className="search-results" aria-live="polite">
          {results.length ? results.map((item) => (
            <button key={`${item.type}:${item.id}`} type="button" className="search-result" onClick={() => go(item.href)}>
              <span className="search-type">{typeLabels[locale][item.type]}</span>
              <span className="search-result-copy">
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </span>
              <Icon name="arrow" />
            </button>
          )) : (
            <div className="empty-state compact">
              <strong>{locale === "zh" ? "没有匹配结果" : "No matching results"}</strong>
              <span>{locale === "zh" ? "试试车手姓氏、三字代码或赛道城市。" : "Try a surname, three-letter code or circuit city."}</span>
            </div>
          )}
        </div>
        <footer className="search-footer">
          <span>{locale === "zh" ? "快捷键" : "Shortcut"}</span>
          <kbd>⌘ K</kbd>
          <kbd>Ctrl K</kbd>
        </footer>
      </section>
    </div>
  );
}
