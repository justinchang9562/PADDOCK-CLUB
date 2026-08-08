import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/policy-page";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Terms of Use" };

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  if (lang === "zh") return (
    <PolicyPage locale="zh" eyebrow="TERMS" title="使用条款" intro="使用 PADDOCK INDEX 即表示你同意以合法、克制且不干扰他人的方式使用本服务。">
      <section><h2>服务性质</h2><p>PADDOCK INDEX 是独立、非官方、非商业的资讯与参考项目，不提供赛事官方计时、博彩建议、投资建议或任何车队内部数据。服务可能变更、暂停或停止。</p></section>
      <section><h2>账户规则</h2><p>你应提供自己有权使用的邮箱，保护登录凭据，并对账户活动负责。不得自动化滥用登录/重设流程、规避限流、干扰服务、访问他人资料或大量消耗存储资源。运营者可为安全、违法或严重滥用而暂停功能或账户，并在法律允许范围内提供申诉或资料取回方式。</p></section>
      <section><h2>头像与用户内容</h2><p>你保留上传头像的权利，仅授予本站为显示账户头像而储存、转换和公开提供该文件所必需的有限许可。不得上传违法、侵权、仇恨、骚扰、冒充、含恶意代码或泄露他人隐私的内容。你可以随时移除头像或删除账户。</p></section>
      <section><h2>第三方资料与链接</h2><p>Jolpica、OpenF1、FIA、Formula 1、Wikimedia Commons、Supabase 和 Cloudflare 均为独立第三方。其服务、许可与隐私规则分别适用。外部链接不代表本站背书。</p></section>
      <section><h2>准确性与责任边界</h2><p>我们会尽合理努力核验资料并标明来源、新鲜度与缺失值，但不保证实时性、完整性、持续可用性或无错误。适用法律不允许排除的权利与责任不受本条款影响；在其余范围内，请勿依赖本站作出安全、财务或法律上的重大决定。</p></section>
      <section><h2>知识产权与变更</h2><p>本站自有代码、设计和原创文案与第三方媒体、数据、商标的权利彼此分离。重大条款变更会更新日期；继续使用前应查看最新版本。</p></section>
    </PolicyPage>
  );
  return (
    <PolicyPage locale="en" eyebrow="TERMS" title="Terms of use" intro="By using PADDOCK INDEX, you agree to use the service lawfully, proportionately and without interfering with others.">
      <section><h2>Nature of the service</h2><p>PADDOCK INDEX is an independent, unofficial and non-commercial information and reference project. It does not provide official timing, betting or investment advice, or private team data. The service may change, pause or end.</p></section>
      <section><h2>Account rules</h2><p>Use an email you are entitled to use, protect your credentials and take responsibility for account activity. Do not automate or abuse sign-in or recovery, evade rate limits, disrupt the service, access another person’s data or consume storage excessively. Functions or accounts may be suspended for security, illegality or serious abuse, subject to applicable rights.</p></section>
      <section><h2>Avatars and user content</h2><p>You retain rights in an uploaded avatar and grant only the limited permission needed to store, transform and publicly deliver it as your account image. Do not upload unlawful, infringing, hateful, harassing, impersonating or malicious content, or content exposing another person’s private data. You may remove the avatar or delete the account at any time.</p></section>
      <section><h2>Third-party data and links</h2><p>Jolpica, OpenF1, the FIA, Formula 1, Wikimedia Commons, Supabase and Cloudflare are independent third parties with their own terms, licences and privacy practices. A link is not an endorsement.</p></section>
      <section><h2>Accuracy and liability boundary</h2><p>We take reasonable steps to verify data and identify sources, freshness and missing values, but do not guarantee real-time delivery, completeness, continuous availability or freedom from error. Rights and liabilities that cannot lawfully be excluded remain unaffected. Do not rely on this site for safety-critical, financial or legal decisions.</p></section>
      <section><h2>Intellectual property and changes</h2><p>PADDOCK INDEX source code, design and original copy remain distinct from rights in third-party media, data and marks. Material changes update the effective date; review the latest version before continued use.</p></section>
    </PolicyPage>
  );
}
