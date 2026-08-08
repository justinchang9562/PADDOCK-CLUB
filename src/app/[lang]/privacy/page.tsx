import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/policy-page";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const contact = process.env.PADDOCK_LEGAL_CONTACT_EMAIL?.trim();
  if (lang === "zh") return (
    <PolicyPage locale="zh" eyebrow="PRIVACY" title="隐私政策" intro="本政策说明 PADDOCK INDEX 独立项目运营者如何处理账户资料，并提供台湾个人资料保护法要求的收集告知。">
      <section><h2>收集者、目的与资料类别</h2><p>收集者为 PADDOCK INDEX 独立项目运营者。为提供身份验证、密码重设、账户管理、头像、语言偏好和跨设备收藏，我们处理邮箱、Supabase 用户 UUID、昵称、头像 URL/文件、偏好语言、收藏、认证 Cookie，以及安全与故障日志。游客收藏和主题偏好只保存在当前浏览器的 localStorage。</p></section>
      <section><h2>期间、地区、对象与方式</h2><p>账户资料在账户存续期间处理；用户删除账户后，应用会删除 Auth 用户、资料、云端收藏和头像，但基础设施服务商可能依其安全、备份和法定义务保留有限日志或备份。资料通过网络与位于所选服务区域的 Supabase、Cloudflare 等处理商处理，可能涉及跨境传输。资料只用于运行、安全保护、故障排查和履行法律义务，不出售给广告商。</p></section>
      <section><h2>公开范围</h2><p>邮箱、UUID、收藏和账户资料表不公开。用户主动上传的头像通过公开 URL 显示，任何取得该 URL 的人均可能访问；对象列表不向匿名访客开放。请勿上传身份证件、住址、敏感资料或无权使用的图片。</p></section>
      <section><h2>Cookie 与本地储存</h2><p>Supabase Auth 使用必要 Cookie 维持登录与安全状态。主题偏好、游客收藏和必要的界面状态使用 localStorage。当前版本不包含定向广告、跨站追踪、Google Analytics 或 Meta Pixel；加入非必要分析或广告前将重新评估并在需要时取得同意。</p></section>
      <section><h2>你的权利与不提供资料的影响</h2><p>你可以在账户页查看和更正昵称、删除头像、收藏或整个账户，并可请求查询、复制、更正、停止处理/利用或删除个人资料。若不提供邮箱和必要认证资料，将无法建立 PADDOCK ID 或使用跨设备收藏，但公开资料页仍可浏览。</p></section>
      <section><h2>安全与事件通知</h2><p>我们使用 RLS、最小权限、固定对象路径、仅服务端管理密钥和安全响应头。若发生可能影响你的资料事件，我们会调查范围、控制影响并依适用法律通知受影响用户或主管机关。</p></section>
      <section><h2>联系</h2><p>{contact ? <>隐私权利请求请联系 <a href={`mailto:${contact}`}>{contact}</a>。为保护账户，请使用注册邮箱并避免在公开渠道提交敏感资料。</> : <>生产开放注册前必须配置长期有效的隐私联系邮箱。当前用户仍可通过账户页自助删除全部账户资料。</>}</p></section>
    </PolicyPage>
  );
  return (
    <PolicyPage locale="en" eyebrow="PRIVACY" title="Privacy policy" intro="This policy explains how the independent PADDOCK INDEX operator handles account data and provides the collection notice required under Taiwan’s Personal Data Protection Act.">
      <section><h2>Controller, purposes and categories</h2><p>The controller is the independent operator of PADDOCK INDEX. To provide authentication, password recovery, account management, avatars, language preferences and cross-device favorites, we process email, Supabase user UUID, display name, avatar URL/file, preferred language, favorites, authentication cookies, and security or error logs. Guest favorites and theme preferences remain in this browser’s localStorage.</p></section>
      <section><h2>Duration, locations, recipients and methods</h2><p>Account data is processed while the account exists. Account deletion removes the Auth user, profile, cloud favorites and avatar, although infrastructure providers may retain limited logs or backups under their security, backup and legal obligations. Data is processed over networks by providers including Supabase and Cloudflare in their selected service regions and may cross borders. It is used only to operate, secure and troubleshoot the service or meet legal duties, and is not sold to advertisers.</p></section>
      <section><h2>Public visibility</h2><p>Email, UUID, favorites and profile tables are private. An avatar voluntarily uploaded by a user is displayed through a public URL and may be viewed by anyone who obtains that URL; anonymous visitors cannot list the storage bucket. Do not upload identity documents, addresses, sensitive data or an image you are not entitled to use.</p></section>
      <section><h2>Cookies and local storage</h2><p>Supabase Auth uses necessary cookies for login and security. Theme preference, guest favorites and necessary interface state use localStorage. This version contains no targeted ads, cross-site tracking, Google Analytics or Meta Pixel. Non-essential analytics or advertising will require a fresh assessment and consent where applicable.</p></section>
      <section><h2>Your rights and the effect of not providing data</h2><p>You can access and correct a display name, remove an avatar or favorite, and delete the entire account from the account page. You may also request access, a copy, correction, cessation of processing/use or deletion. Without an email and required authentication data, a PADDOCK ID and cross-device favorites cannot be provided, but public reference pages remain available.</p></section>
      <section><h2>Security and incident notice</h2><p>Controls include row-level security, least privilege, fixed storage paths, server-only administrative keys and security response headers. If an incident may affect personal data, we will investigate, contain it and notify affected users or authorities where applicable law requires.</p></section>
      <section><h2>Contact</h2><p>{contact ? <>For a privacy-rights request, contact <a href={`mailto:${contact}`}>{contact}</a>. Use the registered email and do not submit sensitive data through a public channel.</> : <>A durable privacy contact address must be configured before production registration opens. Users can still delete all account data through the account page.</>}</p></section>
    </PolicyPage>
  );
}
