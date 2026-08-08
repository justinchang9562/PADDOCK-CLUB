import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/policy-page";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Legal Notice" };

export default async function LegalPage({ params }: PageProps<"/[lang]/legal">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const contact = process.env.PADDOCK_LEGAL_CONTACT_EMAIL?.trim();
  if (lang === "zh") return (
    <PolicyPage locale="zh" eyebrow="LEGAL NOTICE" title="法律声明" intro="PADDOCK INDEX 是独立、非官方、非商业的 Formula 1 车迷资讯与参考项目。">
      <section><h2>非官方与商标声明</h2><p>本项目与 Formula 1、FIA、任何 Formula 1 车队、车手、赛事主办方或商业合作伙伴均无隶属、赞助、授权、背书或合作关系。Formula 1、F1、FIA、车队名称及相关标志归各自权利人所有；本站只在说明和报道被讨论对象时使用文字名称，不使用 Formula 1 官方 Logo 暗示官方身份。</p></section>
      <section><h2>资料与准确性</h2><p>赛历、积分、比赛结果和实时状态可能延迟、不完整或因上游服务中断而降级。人工整理数据会标示最后核验日期；正式分类、处罚和赛事决定应以 FIA、Formula 1 或赛事权利人的最新发布为准。本站不会把估算或无法公开核验的赛车性能数据陈述为事实。</p></section>
      <section><h2>媒体、新闻与第三方链接</h2><p>真实摄影素材按图片署名页列出的许可证使用；AI 辅助视觉会明确标识。资讯卡片仅包含自写标题、简短摘要、发布者和原始外链，不复制全文或原文图片。第三方网站由其各自运营者负责。</p></section>
      <section><h2>知识产权投诉与更正</h2><p>权利人可提供作品、权利基础、争议 URL、联系方式和善意声明，申请移除或更正。{contact ? <>请联系 <a href={`mailto:${contact}`}>{contact}</a>。</> : <>生产开放前，运营者必须配置长期有效的法律联系邮箱；当前未发布虚构地址。</>}</p></section>
      <section><h2>非商业边界</h2><p>当前项目不提供广告、赞助、付费会员、付费数据 API 或数据转售。任何商业化计划都必须先重新审查商标、照片、数据、隐私、消费者与付款条款。</p></section>
    </PolicyPage>
  );
  return (
    <PolicyPage locale="en" eyebrow="LEGAL NOTICE" title="Legal notice" intro="PADDOCK INDEX is an independent, unofficial and non-commercial Formula 1 fan and reference project.">
      <section><h2>Unofficial status and trade marks</h2><p>This project is not affiliated with, sponsored by, licensed by, endorsed by or associated with Formula 1, the FIA, any Formula 1 team, driver, promoter or commercial partner. Formula 1, F1, FIA, team names and related marks belong to their respective owners. Word marks are used only to identify the subject being described or reported; no Formula 1 logo is used to imply official status.</p></section>
      <section><h2>Data and accuracy</h2><p>Calendars, standings, results and live states may be delayed, incomplete or degraded when an upstream service fails. Curated data identifies its last verification date. Official classifications, penalties and event decisions should be checked against the latest FIA, Formula 1 or rights-holder publication. Estimated or unavailable car-performance data is never presented as fact.</p></section>
      <section><h2>Media, news and third-party links</h2><p>Documentary photography is used under the licences listed on the image-credits page; AI-assisted imagery is labelled. News cards contain an original headline, concise summary, publisher and source link only. They do not mirror full articles or source images. Third-party sites remain under their operators’ control.</p></section>
      <section><h2>IP complaints and corrections</h2><p>A rights holder may provide the work, rights basis, affected URL, contact details and a good-faith statement to request removal or correction. {contact ? <>Contact <a href={`mailto:${contact}`}>{contact}</a>.</> : <>Before production registration opens, the operator must configure a durable legal contact address; no fictitious address is published here.</>}</p></section>
      <section><h2>Non-commercial boundary</h2><p>The current project offers no advertising, sponsorship, paid membership, paid data API or data resale. Any commercialisation requires a new review of trade marks, media, data, privacy, consumer and payment terms.</p></section>
    </PolicyPage>
  );
}
