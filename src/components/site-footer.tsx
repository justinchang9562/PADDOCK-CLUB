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
            <strong>{locale === "zh" ? "资料" : "Resources"}</strong>
            <Link href={`/${locale}/news`}>{copy[locale].nav.news}</Link>
            <Link href={`/${locale}/live`}>{copy[locale].nav.live}</Link>
            <Link href={`/${locale}/favorites`}>{copy[locale].nav.favorites}</Link>
            <Link href={`/${locale}/credits`}>{locale === "zh" ? "图片授权" : "Image credits"}</Link>
            <Link href={`/${locale}/data-sources`}>{locale === "zh" ? "数据来源" : "Data sources"}</Link>
            <a href="https://www.fia.com/F126" target="_blank" rel="noreferrer">FIA 2026</a>
          </div>
          <div>
            <strong>{locale === "zh" ? "政策" : "Policies"}</strong>
            <Link href={`/${locale}/legal`}>{locale === "zh" ? "法律声明" : "Legal notice"}</Link>
            <Link href={`/${locale}/privacy`}>{locale === "zh" ? "隐私政策" : "Privacy policy"}</Link>
            <Link href={`/${locale}/terms`}>{locale === "zh" ? "使用条款" : "Terms of use"}</Link>
            {process.env.PADDOCK_LEGAL_CONTACT_EMAIL?.trim() && (
              <a href={`mailto:${process.env.PADDOCK_LEGAL_CONTACT_EMAIL.trim()}`}>{locale === "zh" ? "联系运营者" : "Contact operator"}</a>
            )}
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <span>© {year} PADDOCK INDEX</span>
        <span>{locale === "zh" ? "独立、非官方项目，与 Formula 1、FIA 或车队无隶属关系。" : "An independent, unofficial project not affiliated with Formula 1, the FIA or any team."}</span>
      </div>
    </footer>
  );
}
