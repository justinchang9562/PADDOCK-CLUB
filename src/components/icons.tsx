import type { SVGProps } from "react";

export type IconName =
  | "arrow"
  | "bookmark"
  | "calendar"
  | "car"
  | "check"
  | "chevron"
  | "close"
  | "eye"
  | "eyeOff"
  | "flag"
  | "globe"
  | "grid"
  | "helmet"
  | "history"
  | "live"
  | "menu"
  | "monitor"
  | "moon"
  | "news"
  | "search"
  | "spark"
  | "sun"
  | "team"
  | "track"
  | "user";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; filled?: boolean };

const paths: Record<IconName, React.ReactNode> = {
  arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  bookmark: <path d="M6.5 4.8A1.8 1.8 0 0 1 8.3 3h7.4a1.8 1.8 0 0 1 1.8 1.8V21L12 17.6 6.5 21Z"/>,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M7.5 3v4M16.5 3v4M3.5 9.5h17"/></>,
  car: <><path d="m4 15 1.2-4.1A2.6 2.6 0 0 1 7.7 9h8.6a2.6 2.6 0 0 1 2.5 1.9L20 15"/><path d="M3 15h18v4H3zM6 19v2M18 19v2M7 15h.01M17 15h.01"/></>,
  check: <path d="m5 12 4.2 4.2L19 6.5"/>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.6"/></>,
  eyeOff: <><path d="m3 3 18 18"/><path d="M10.5 6.2A10.4 10.4 0 0 1 12 6c6 0 9.5 6 9.5 6a16.8 16.8 0 0 1-2.1 2.8M6.4 6.4C3.9 8 2.5 12 2.5 12s3.5 6 9.5 6a9.8 9.8 0 0 0 3.1-.5"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></>,
  flag: <><path d="M5 21V4"/><path d="M5 5h11l-2 3 2 3H5"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  helmet: <><path d="M4 14v-2a8 8 0 1 1 16 0v2"/><path d="M4 14h12l4 3H9a5 5 0 0 1-5-5M12 4v4"/></>,
  history: <><path d="M3.5 12a8.5 8.5 0 1 0 2.2-5.7L3.5 8.5"/><path d="M3.5 4v4.5H8M12 7v5l3 2"/></>,
  live: <><circle cx="12" cy="12" r="2"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.6 4.6a10.5 10.5 0 0 0 0 14.8M19.4 4.6a10.5 10.5 0 0 1 0 14.8"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  monitor: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>,
  moon: <path d="M20.3 15.2A8.5 8.5 0 0 1 8.8 3.7 8.5 8.5 0 1 0 20.3 15.2Z"/>,
  news: <><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m16.2 16.2 4.3 4.3"/></>,
  spark: <path d="m12 2 1.4 5.1L18 10l-4.6 2.9L12 18l-1.4-5.1L6 10l4.6-2.9ZM5 15l.7 2.3L8 18.5l-2.3 1.2L5 22l-.7-2.3L2 18.5l2.3-1.2Z"/>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
  team: <><circle cx="8" cy="9" r="3"/><circle cx="17" cy="8" r="2.5"/><path d="M3 20v-1.5A4.5 4.5 0 0 1 7.5 14h1A4.5 4.5 0 0 1 13 18.5V20M14 14h2.7a4.3 4.3 0 0 1 4.3 4.3V20"/></>,
  track: <><path d="M5.4 19.5c-2.8-2.5-2.7-6.8.2-9.2l4.6-3.8c2.1-1.8 5.3-1.5 7.1.7 1.9 2.3 1.4 5.8-1.1 7.5l-3.1 2.1c-1.1.7-2.5.4-3.2-.6-.8-1.1-.5-2.6.6-3.4l2.5-1.7"/><path d="M6 20h12"/></>,
  user: <><circle cx="12" cy="8" r="3.5"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></>,
};

export function Icon({ name, filled = false, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
