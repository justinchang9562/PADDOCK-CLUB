"use client";

import { copy } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { useFavorites } from "./favorites-provider";
import { Icon } from "./icons";

export function FavoriteButton({ itemKey, locale, compact = false }: { itemKey: string; locale: Locale; compact?: boolean }) {
  const { has, pending, toggle, ready } = useFavorites();
  const active = has(itemKey);
  const isPending = pending(itemKey);
  const label = active ? copy[locale].removeFavorite : copy[locale].addFavorite;

  return (
    <button
      className={`favorite-button ${active ? "is-active" : ""} ${compact ? "is-compact" : ""}`}
      type="button"
      onClick={() => toggle(itemKey)}
      aria-pressed={active}
      aria-label={label}
      title={label}
      disabled={!ready || isPending}
      aria-busy={isPending}
    >
      <Icon name="bookmark" filled={active} />
      {!compact && <span>{label}</span>}
    </button>
  );
}
