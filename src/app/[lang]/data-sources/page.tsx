import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/policy-page";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Data Sources" };

export default async function DataSourcesPage({ params }: PageProps<"/[lang]/data-sources">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  if (lang === "zh") return (
    <PolicyPage locale="zh" eyebrow="DATA SOURCES" title="数据来源与边界" intro="每个数据入口都必须经过统一供应商边界，并向读者说明来源、新鲜度、完整度和降级状态。">
      <section><h2>Jolpica F1</h2><p>历史赛历、比赛结果和积分榜来自 <a href="https://jolpi.ca/" target="_blank" rel="noreferrer">Jolpica F1 API</a>，其数据库由 Ergast 项目延续而来。Jolpica 资料按 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a> 提供：需要署名、仅限非商业用途，并以相同方式共享改编资料。本站会标准化响应，但不宣称拥有上游数据。</p></section>
      <section><h2>OpenF1</h2><p>实时中心通过服务器端接口读取 <a href="https://openf1.org/" target="_blank" rel="noreferrer">OpenF1</a> 会话数据。访问凭据只保存在服务器；浏览器不会取得用户名、密码或 Bearer token。接口异常时会清楚显示缓存、过期或不可用状态，不以人工估算伪装实时数据。任何商业化或服务等级承诺前必须重新确认其许可与访问方案。</p></section>
      <section><h2>官方核验与人工基线</h2><p>当前赛季赛历、分类和积分使用 FIA 与 Formula 1 公开资料人工核验。该核验只用于陈述赛事事实，不代表官方授权、隶属或对官方网站内容的再发布许可。人工基线带固定核验日期；缺失数据标为“未公开”或“暂无正式分类”。</p></section>
      <section><h2>媒体与新闻</h2><p>图片的作者、来源和许可证列于图片授权页。新闻只显示自写标题、简短摘要、发布者与原始外链；事件状态卡到期后自动隐藏。</p></section>
    </PolicyPage>
  );

  return (
    <PolicyPage locale="en" eyebrow="DATA SOURCES" title="Data sources and boundaries" intro="Every data path passes through one provider boundary and exposes source, freshness, completeness and fallback state to readers.">
      <section><h2>Jolpica F1</h2><p>Historical calendars, race results and standings use the <a href="https://jolpi.ca/" target="_blank" rel="noreferrer">Jolpica F1 API</a>, which continues the Ergast database. Jolpica data is offered under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a>: attribution, non-commercial use and share-alike terms apply. Responses are normalised, but PADDOCK INDEX does not claim ownership of upstream data.</p></section>
      <section><h2>OpenF1</h2><p>The live centre reads session data from <a href="https://openf1.org/" target="_blank" rel="noreferrer">OpenF1</a> through a server-side boundary. Credentials remain on the server; the browser never receives a username, password or bearer token. Failures are labelled as cached, stale or unavailable instead of being replaced with estimated live data. Licensing and access terms require a new review before commercialisation or a service-level promise.</p></section>
      <section><h2>Official verification and curated baseline</h2><p>The current-season calendar, classifications and standings are manually verified against public FIA and Formula 1 material. This factual verification does not imply affiliation, endorsement or permission to republish official-site content. Curated baselines carry a fixed verification date; missing values are labelled “not disclosed” or “no official classification”.</p></section>
      <section><h2>Media and news</h2><p>Image authors, sources and licences are listed on the image-credits page. News contains an original headline, concise summary, publisher and source link only; time-sensitive event cards expire automatically.</p></section>
    </PolicyPage>
  );
}
