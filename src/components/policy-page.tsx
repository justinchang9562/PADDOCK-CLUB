import type { Locale } from "@/lib/types";

export function PolicyPage({
  locale,
  eyebrow,
  title,
  intro,
  children,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <main className="page-main policy-page" lang={locale === "zh" ? "zh-CN" : "en"}>
      <section className="simple-page-hero">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
        <small>{locale === "zh" ? "最后更新：2026-08-08" : "Last updated: 8 August 2026"}</small>
      </section>
      <article className="policy-content">{children}</article>
    </main>
  );
}
