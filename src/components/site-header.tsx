"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AVAILABLE_SEASONS, CURRENT_SEASON } from "@/lib/catalog";
import { copy, localizedPath } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { AuthControls } from "./auth-controls";
import { Icon, type IconName } from "./icons";
import { Logo } from "./logo";
import { SearchDialog } from "./search-dialog";
import { ThemeSwitcher } from "./theme-switcher";

const nav: Array<{ key: keyof (typeof copy)["en"]["nav"]; path: string; icon: IconName }> = [
  { key: "overview", path: "", icon: "grid" },
  { key: "calendar", path: `/seasons/${CURRENT_SEASON}`, icon: "calendar" },
  { key: "drivers", path: "/drivers", icon: "helmet" },
  { key: "teams", path: "/teams", icon: "team" },
  { key: "circuits", path: "/circuits", icon: "track" },
  { key: "cars", path: "/cars", icon: "car" },
];

type HeaderIdentity = {
  displayName: string | null;
  avatarUrl: string | null;
} | null;

export function SiteHeader({ locale, signedIn, identity }: { locale: Locale; signedIn: boolean; identity: HeaderIdentity }) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const seasonMenuRef = useRef<HTMLDetailsElement>(null);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const seasonFromPath = Number.parseInt(pathname.match(/\/seasons\/(\d{4})/)?.[1] ?? "", 10);
  const selectedSeason = AVAILABLE_SEASONS.includes(seasonFromPath) ? seasonFromPath : CURRENT_SEASON;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!seasonMenuRef.current?.contains(event.target as Node)) {
        seasonMenuRef.current?.removeAttribute("open");
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && seasonMenuRef.current?.open) {
        seasonMenuRef.current.removeAttribute("open");
        seasonMenuRef.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const switchLocale = () => {
    const nextLocale: Locale = locale === "zh" ? "en" : "zh";
    router.push(localizedPath(pathname, nextLocale));
  };

  const switchSeason = (season: string) => {
    seasonMenuRef.current?.removeAttribute("open");
    const match = pathname.match(/\/seasons\/\d{4}(.*)$/);
    if (match) router.push(`/${locale}/seasons/${season}${match[1]}`);
    else router.push(`/${locale}/seasons/${season}`);
  };

  const isActive = (path: string) => {
    const href = `/${locale}${path}`;
    return path === "" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Logo locale={locale} />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.map((item) => (
              <Link key={item.key} className={isActive(item.path) ? "is-active" : ""} href={`/${locale}${item.path}`}>
                {copy[locale].nav[item.key]}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <details className="season-control season-menu" ref={seasonMenuRef}>
              <summary aria-label={`${copy[locale].season} ${selectedSeason}`}>
                <span>{copy[locale].season}</span>
                <strong>{String(selectedSeason)}</strong>
                <Icon name="chevron" />
              </summary>
              <div className="season-popover">
                <div className="season-popover-head">
                  <span>{locale === "zh" ? "选择赛季" : "Select season"}</span>
                  <small>{AVAILABLE_SEASONS.at(-1)}—{AVAILABLE_SEASONS[0]}</small>
                </div>
                <div className="season-grid">
                  {AVAILABLE_SEASONS.map((season) => (
                    <button
                      key={season}
                      type="button"
                      className={season === selectedSeason ? "is-active" : ""}
                      aria-pressed={season === selectedSeason}
                      onClick={() => switchSeason(String(season))}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>
            </details>
            <button className="header-search" type="button" onClick={() => setSearchOpen(true)} aria-label={copy[locale].search}>
              <Icon name="search" />
              <span>{copy[locale].searchShort}</span>
              <kbd>⌘K</kbd>
            </button>
            <Link className="header-icon-link" href={`/${locale}/live`} aria-label={copy[locale].nav.live} title={copy[locale].nav.live}><Icon name="live"/><i /></Link>
            <Link className="header-icon-link" href={`/${locale}/favorites`} aria-label={copy[locale].nav.favorites} title={copy[locale].nav.favorites}><Icon name="bookmark"/></Link>
            <AuthControls locale={locale} signedIn={signedIn} identity={identity} />
            <ThemeSwitcher locale={locale} />
            <button className="icon-button language-button" type="button" onClick={switchLocale} aria-label={copy[locale].changeLanguage} title={copy[locale].changeLanguage}>
              <Icon name="globe" />
              <span>{locale === "zh" ? "EN" : "中"}</span>
            </button>
            <details className="mobile-menu">
              <summary aria-label="Open navigation"><Icon name="menu" /></summary>
              <div className="mobile-menu-panel">
                <div className="mobile-menu-head">
                  <span>{copy[locale].brandTagline}</span>
                  <span>{CURRENT_SEASON}</span>
                </div>
                <nav aria-label="Mobile navigation">
                  {nav.map((item) => (
                    <Link key={item.key} href={`/${locale}${item.path}`}>
                      <Icon name={item.icon} />
                      <span>{copy[locale].nav[item.key]}</span>
                      <Icon name="chevron" />
                    </Link>
                  ))}
                  <Link href={`/${locale}/news`}><Icon name="news"/><span>{copy[locale].nav.news}</span><Icon name="chevron"/></Link>
                  <Link href={`/${locale}/live`}><Icon name="live"/><span>{copy[locale].nav.live}</span><Icon name="chevron"/></Link>
                  <Link href={`/${locale}/favorites`}><Icon name="bookmark"/><span>{copy[locale].nav.favorites}</span><Icon name="chevron"/></Link>
                </nav>
              </div>
            </details>
          </div>
        </div>
      </header>
      <SearchDialog locale={locale} open={searchOpen} onClose={closeSearch} />
    </>
  );
}
