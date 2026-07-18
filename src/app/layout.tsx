import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const themeInitializer = `
(() => {
  try {
    const saved = localStorage.getItem("paddock-club-theme");
    const preference = saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
    const resolved = preference === "system"
      ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : preference;
    const root = document.documentElement;
    root.dataset.theme = resolved;
    root.dataset.themePreference = preference;
    root.style.colorScheme = resolved;
  } catch (_) {
    const resolved = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themePreference = "system";
  }
})();
`;

export const metadata: Metadata = {
  title: { default: "PADDOCK CLUB — F1 Data & Reference", template: "%s — PADDOCK CLUB" },
  description: "A bilingual Formula 1 season, race, driver, team, car and circuit reference platform.",
  applicationName: "PADDOCK CLUB",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "PADDOCK CLUB" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0f" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
