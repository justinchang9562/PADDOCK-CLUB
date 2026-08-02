import Link from "next/link";
import { CURRENT_SEASON } from "@/lib/catalog";
import { copy } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { Logo } from "./logo";

export function SiteFooter({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo locale={locale} />
          <p>{locale === "zh" ? "一个清晰、克制、以来源为先的 F1 数据与知识平台。" : "A clear, restrained and source-first F1 data and reference platform."}</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>{locale === "zh" ? "浏览" : "Explore"}</strong>
            <Link href={`/${locale}/seasons/${CURRENT_SEASON}`}>{copy[locale].nav.calendar}</Link>
            <Link href={`/${locale}/drivers`}>{copy[locale].nav.drivers}</Link>
            <Link href={`/${locale}/teams`}>{copy[locale].nav.teams}</Link>
            <Link href={`/${locale}/circuits`}>{copy[locale].nav.circuits}</Link>
          </div>
          <div>
            <strong>{locale === "zh" ? "工具" : "Tools"}</strong>
            <Link href={`/${locale}/news`}>{copy[locale].nav.news}</Link>
            <Link href={`/${locale}/live`}>{copy[locale].nav.live}</Link>
            <Link href={`/${locale}/favorites`}>{copy[locale].nav.favorites}</Link>
            <Link href={`/${locale}/credits`}>{locale === "zh" ? "图片授权" : "Image credits"}</Link>
            <a href="https://www.fia.com/F126" target="_blank" rel="noreferrer">FIA 2026</a>
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <span>© {year} PADDOCK INDEX</span>
        <span>{locale === "zh" ? "非官方项目，与 Formula 1、FIA 或车队无隶属关系。" : "An independent project, not affiliated with Formula 1, the FIA or any team."}</span>
      </div>
    </footer>
  );
}
