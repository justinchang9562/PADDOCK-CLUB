# 2026-08-08 技术审计整改记录

| 审计项 | 整改结果 | 主要实现 / 验证 |
| --- | --- | --- |
| F-01 依赖安全 | Next.js / eslint-config-next 16.3.0；OpenNext Cloudflare 1.20.2；Wrangler 4.120.0；npm audit 0 | `package.json`、官方 registry lockfile、`npm audit` |
| F-02 数据新鲜度 | `ProviderResult` 分离 fetchedAt、verifiedAt、sourceUpdatedAt、freshness、completeness 与 fallback | `src/lib/providers.ts`、DataSourceNote |
| F-03 赛历缺站 | 加入 Sepang 的 Bahrain GP in Malaysia，后续 rounds 调整为连续 1–23，race ID 与 round 解耦 | catalog integrity tests、旧收藏 key 迁移 |
| F-04 Sprint | 精确限定 Shanghai、Miami、Canada、Great Britain、Netherlands、Singapore 六站 | 集合精确单测 |
| F-05 比利时/匈牙利结果 | 补齐最后核验三甲快照，标明 snapshot 与 podium-only | catalog/provider/UI |
| F-06 Live 认证 | OpenF1 username/password 仅服务端换取短期 Bearer token，token 提前刷新且不进入浏览器 | `src/lib/live.ts`、API 冒烟 |
| F-07 状态机 | 注入 `now`，区分 upcoming/weekend/live/awaiting_result/completed；正赛 session 结束即退出 live | 状态机时间旅行单测 |
| F-08 Live 放大 | 8 秒 payload cache、分资源 TTL、single-flight、last-known-good、边缘 cache header、IP 限流 | live client/route；结构化降级 reason |
| F-09/F-10 Avatar | 向前 migration 删除公共 SELECT policy，并把读写删除固定为 `uid/avatar` | 新 migration；生产 Supabase 仍需实测 |
| F-11 回调来源 | 生产只接受固定 `PADDOCK_SITE_URL`；Host/Origin 不参与生产 callback | auth server actions |
| F-12 响应头 | CSP Report-Only、HSTS（production）、Referrer、Permissions、nosniff、frame deny、COOP | Next headers、Playwright 断言 |
| F-13 过期新闻 | 增加 event-status / expiresAt 与日期过滤 | 时间旅行单测 |
| F-14 测试 | Vitest 数据/状态/provider 单测；Playwright 双语关键路由、API、安全头、删除素材 404 | CI 分 job |
| F-15 Actions | 所有外部 Actions 固定完整 SHA；Dependabot 管理更新 | CI、CodeQL、Dependency Review workflows |
| F-16 Registry | `.npmrc` 与 CI 固定 `registry.npmjs.org`；重建 lockfile | mirror 文本扫描为 0 |
| F-17 国籍代码 | 显式 nationality → ISO alpha-2 映射，未知为 `XX` | provider 单测 |
| F-18 可诊断性 | UI 只显示安全 reason；服务器输出可检索结构化事件 | provider/live/DataSourceNote |
| F-19 结果完整度 | fallback 标记 `podium_only`，页面改用三甲/部分结果文案 | provider/race page |

## 已执行验证

- `npm run check`
- `npm run test:e2e`
- `npm audit`
- `npm run preview`，并在本地 Cloudflare Worker Preview 打开页面检查内容、错误层与控制台

生产环境专属验证（Supabase RLS/账户删除、OpenF1 付费实时凭据、正式 HSTS/CSP 报告、GitHub Actions 状态）必须在对应 Dashboard 配置后执行，不能由本地结果替代。
