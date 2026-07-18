"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/types";
import { Icon, type IconName } from "./icons";
import { useTheme, type ThemePreference } from "./theme-provider";

const options: Array<{ value: ThemePreference; icon: IconName }> = [
  { value: "system", icon: "monitor" },
  { value: "light", icon: "sun" },
  { value: "dark", icon: "moon" },
];

const labels = {
  zh: {
    title: "外观",
    system: "跟随系统",
    light: "浅色",
    dark: "深色",
    current: "当前外观",
  },
  en: {
    title: "Appearance",
    system: "System",
    light: "Light",
    dark: "Dark",
    current: "Current appearance",
  },
} as const;

export function ThemeSwitcher({ locale }: { locale: Locale }) {
  const { theme, setTheme } = useTheme();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const label = labels[locale];
  const activeOption = options.find((option) => option.value === theme) ?? options[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!detailsRef.current?.contains(event.target as Node)) {
        detailsRef.current?.removeAttribute("open");
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        detailsRef.current?.removeAttribute("open");
        detailsRef.current?.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const chooseTheme = (nextTheme: ThemePreference) => {
    setTheme(nextTheme);
    detailsRef.current?.removeAttribute("open");
  };

  return (
    <details className="theme-menu" ref={detailsRef}>
      <summary
        className="icon-button theme-trigger"
        aria-label={`${label.current}：${label[theme]}`}
        title={`${label.current}：${label[theme]}`}
      >
        <Icon name={activeOption.icon} />
      </summary>
      <div className="theme-popover" aria-label={label.title}>
        <span className="theme-popover-title">{label.title}</span>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={theme === option.value ? "is-active" : ""}
            aria-pressed={theme === option.value}
            onClick={() => chooseTheme(option.value)}
          >
            <Icon name={option.icon} />
            <span>{label[option.value]}</span>
            {theme === option.value && <Icon name="check" />}
          </button>
        ))}
      </div>
    </details>
  );
}
