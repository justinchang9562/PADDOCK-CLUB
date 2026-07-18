"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemePreference = "system" | "light" | "dark";
type ResolvedTheme = Exclude<ThemePreference, "system">;

type ThemeContextValue = {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
};

const STORAGE_KEY = "paddock-club-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemePreference(value: string | null | undefined): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

function systemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(preference: ThemePreference): ResolvedTheme {
  const resolved = preference === "system" ? systemTheme() : preference;
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.themePreference = preference;
  root.style.colorScheme = resolved;
  return resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  const setTheme = useCallback((nextTheme: ThemePreference) => {
    setThemeState(nextTheme);
    setResolvedTheme(applyTheme(nextTheme));
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // The theme still works for this page when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const rootPreference = document.documentElement.dataset.themePreference;
      const initialTheme = isThemePreference(rootPreference) ? rootPreference : "system";
      setThemeState(initialTheme);
      setResolvedTheme(applyTheme(initialTheme));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (theme === "system") setResolvedTheme(applyTheme("system"));
    };
    media.addEventListener("change", handleSystemChange);
    return () => media.removeEventListener("change", handleSystemChange);
  }, [theme]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || !isThemePreference(event.newValue)) return;
      setThemeState(event.newValue);
      setResolvedTheme(applyTheme(event.newValue));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [resolvedTheme, setTheme, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
