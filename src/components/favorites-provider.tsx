"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "paddock-club:favorites:v1";

type FavoriteContextValue = {
  favorites: string[];
  ready: boolean;
  has: (key: string) => boolean;
  toggle: (key: string) => void;
};

const FavoriteContext = createContext<FavoriteContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) setFavorites(JSON.parse(saved) as string[]);
      } catch {
        // Local storage can be disabled. The UI still works for the current session.
      } finally {
        setReady(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggle = useCallback((key: string) => {
    setFavorites((current) => {
      const next = current.includes(key) ? current.filter((item) => item !== key) : [...current, key];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage failures and preserve in-memory behavior.
      }
      return next;
    });
  }, []);

  const value = useMemo<FavoriteContextValue>(() => ({
    favorites,
    ready,
    has: (key) => favorites.includes(key),
    toggle,
  }), [favorites, ready, toggle]);

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
}

export function useFavorites() {
  const value = useContext(FavoriteContext);
  if (!value) throw new Error("useFavorites must be used inside FavoritesProvider");
  return value;
}
