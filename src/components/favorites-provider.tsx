"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { FavoriteEntityType } from "@/lib/supabase/database.types";
import { canonicalFavoriteKey } from "@/lib/favorite-keys";

const STORAGE_KEY = "paddock-index:favorites:v1";
const LEGACY_STORAGE_KEY = "paddock-club:favorites:v1";
const ENTITY_TYPES = new Set<FavoriteEntityType>(["driver", "team", "circuit", "car", "race"]);

type SyncState = "local" | "syncing" | "synced" | "error";

type ParsedFavorite = {
  entityType: FavoriteEntityType;
  entityId: string;
  key: string;
};

type FavoriteContextValue = {
  favorites: string[];
  ready: boolean;
  mode: "local" | "cloud";
  syncState: SyncState;
  has: (key: string) => boolean;
  pending: (key: string) => boolean;
  toggle: (key: string) => void;
};

const FavoriteContext = createContext<FavoriteContextValue | null>(null);

function parseFavoriteKey(key: string): ParsedFavorite | null {
  key = canonicalFavoriteKey(key);
  const separator = key.indexOf(":");
  if (separator < 1) return null;

  const entityType = key.slice(0, separator) as FavoriteEntityType;
  const entityId = key.slice(separator + 1).trim();
  if (!ENTITY_TYPES.has(entityType) || !entityId || entityId.length > 160) return null;

  return { entityType, entityId, key: `${entityType}:${entityId}` };
}

function validFavorites(value: unknown) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value
    .filter((item): item is string => typeof item === "string")
    .map(parseFavoriteKey)
    .filter((item): item is ParsedFavorite => Boolean(item))
    .map((item) => item.key)));
}

function readLocalFavorites() {
  try {
    const current = window.localStorage.getItem(STORAGE_KEY);
    const legacy = current === null ? window.localStorage.getItem(LEGACY_STORAGE_KEY) : null;
    const saved = current ?? legacy;
    const favorites = saved ? validFavorites(JSON.parse(saved)) : [];

    if (legacy !== null) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    }

    return favorites;
  } catch {
    return [];
  }
}

function writeLocalFavorites(favorites: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Local storage can be disabled. In-memory favorites still work for this session.
  }
}

function clearMigratedLocalFavorites() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // A successful cloud copy is authoritative even if local cleanup is unavailable.
  }
}

export function FavoritesProvider({ children, userId }: { children: React.ReactNode; userId: string | null }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [syncState, setSyncState] = useState<SyncState>(userId ? "syncing" : "local");
  const [pendingKeys, setPendingKeys] = useState<string[]>([]);
  const favoritesRef = useRef<string[]>([]);
  const pendingKeysRef = useRef(new Set<string>());
  const supabase = useMemo(() => userId ? createClient() : null, [userId]);

  const replaceFavorites = useCallback((next: string[]) => {
    const normalized = validFavorites(next);
    favoritesRef.current = normalized;
    setFavorites(normalized);
  }, []);

  const migrateLegacyCloudFavorites = useCallback(async (rows: Array<{ entity_type: FavoriteEntityType; entity_id: string }>) => {
    if (!supabase || !userId) return true;
    const migrations = rows.map((row) => {
      const original = `${row.entity_type}:${row.entity_id}`;
      const canonical = canonicalFavoriteKey(original);
      return { row, canonical, parsed: parseFavoriteKey(canonical), changed: canonical !== original };
    }).filter((item) => item.changed && item.parsed);
    if (!migrations.length) return true;

    const { error: insertError } = await supabase.from("favorites").upsert(migrations.map((item) => ({
      user_id: userId,
      entity_type: item.parsed!.entityType,
      entity_id: item.parsed!.entityId,
    })), { onConflict: "user_id,entity_type,entity_id", ignoreDuplicates: true });
    if (insertError) return false;

    const deletions = await Promise.all(migrations.map((item) => supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("entity_type", item.row.entity_type)
      .eq("entity_id", item.row.entity_id)));
    return deletions.every((result) => !result.error);
  }, [supabase, userId]);

  const loadCloudFavorites = useCallback(async () => {
    if (!supabase || !userId || pendingKeysRef.current.size) return;
    setSyncState("syncing");
    const { data, error } = await supabase
      .from("favorites")
      .select("entity_type, entity_id")
      .order("created_at", { ascending: true });

    if (error) {
      setSyncState("error");
      return;
    }
    const migrated = await migrateLegacyCloudFavorites(data);
    replaceFavorites(data.map((item) => canonicalFavoriteKey(`${item.entity_type}:${item.entity_id}`)));
    setSyncState(migrated ? "synced" : "error");
  }, [migrateLegacyCloudFavorites, replaceFavorites, supabase, userId]);

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      setReady(false);
      const localFavorites = readLocalFavorites();

      if (!supabase || !userId) {
        if (!cancelled) {
          replaceFavorites(localFavorites);
          setSyncState("local");
          setReady(true);
        }
        return;
      }

      setSyncState("syncing");
      const localRows = localFavorites
        .map(parseFavoriteKey)
        .filter((item): item is ParsedFavorite => Boolean(item))
        .map((item) => ({
          user_id: userId,
          entity_type: item.entityType,
          entity_id: item.entityId,
        }));

      let migrationFailed = false;
      if (localRows.length) {
        const { error } = await supabase
          .from("favorites")
          .upsert(localRows, {
            onConflict: "user_id,entity_type,entity_id",
            ignoreDuplicates: true,
          });
        migrationFailed = Boolean(error);
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("entity_type, entity_id")
        .order("created_at", { ascending: true });

      if (cancelled) return;
      if (error) {
        replaceFavorites(localFavorites);
        setSyncState("error");
        setReady(true);
        return;
      }

      const cloudMigrationSucceeded = await migrateLegacyCloudFavorites(data);
      const cloudFavorites = data.map((item) => canonicalFavoriteKey(`${item.entity_type}:${item.entity_id}`));
      replaceFavorites(migrationFailed ? [...cloudFavorites, ...localFavorites] : cloudFavorites);
      if (migrationFailed || !cloudMigrationSucceeded) {
        setSyncState("error");
      } else {
        clearMigratedLocalFavorites();
        setSyncState("synced");
      }
      setReady(true);
    };

    void initialize();
    return () => {
      cancelled = true;
    };
  }, [migrateLegacyCloudFavorites, replaceFavorites, supabase, userId]);

  useEffect(() => {
    if (!supabase || !userId) return;
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") void loadCloudFavorites();
    };
    window.addEventListener("focus", refreshWhenVisible);
    document.addEventListener("visibilitychange", refreshWhenVisible);
    return () => {
      window.removeEventListener("focus", refreshWhenVisible);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [loadCloudFavorites, supabase, userId]);

  const toggle = useCallback((key: string) => {
    const parsed = parseFavoriteKey(key);
    if (!parsed || !ready || pendingKeysRef.current.has(parsed.key)) return;

    const wasActive = favoritesRef.current.includes(parsed.key);
    const next = wasActive
      ? favoritesRef.current.filter((item) => item !== parsed.key)
      : [...favoritesRef.current, parsed.key];
    replaceFavorites(next);

    if (!supabase || !userId) {
      writeLocalFavorites(next);
      return;
    }

    pendingKeysRef.current.add(parsed.key);
    setPendingKeys(Array.from(pendingKeysRef.current));
    void (async () => {
      const result = wasActive
        ? await supabase
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("entity_type", parsed.entityType)
          .eq("entity_id", parsed.entityId)
        : await supabase
          .from("favorites")
          .upsert({
            user_id: userId,
            entity_type: parsed.entityType,
            entity_id: parsed.entityId,
          }, {
            onConflict: "user_id,entity_type,entity_id",
            ignoreDuplicates: true,
          });

      if (result.error) {
        setFavorites((current) => {
          const rollback = wasActive
            ? Array.from(new Set([...current, parsed.key]))
            : current.filter((item) => item !== parsed.key);
          favoritesRef.current = rollback;
          return rollback;
        });
        setSyncState("error");
      } else {
        setSyncState("synced");
      }

      pendingKeysRef.current.delete(parsed.key);
      setPendingKeys(Array.from(pendingKeysRef.current));
    })();
  }, [ready, replaceFavorites, supabase, userId]);

  const value = useMemo<FavoriteContextValue>(() => ({
    favorites,
    ready,
    mode: userId ? "cloud" : "local",
    syncState,
    has: (key) => favorites.includes(key),
    pending: (key) => pendingKeys.includes(key),
    toggle,
  }), [favorites, pendingKeys, ready, syncState, toggle, userId]);

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
}

export function useFavorites() {
  const value = useContext(FavoriteContext);
  if (!value) throw new Error("useFavorites must be used inside FavoritesProvider");
  return value;
}
