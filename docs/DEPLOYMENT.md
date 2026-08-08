# 部署准备说明

PADDOCK INDEX 使用 OpenNext 部署到 Cloudflare Workers，GitHub `main` 是正式源码分支。

## 正式发布流程

1. 将通过 `npm run check` 的变更提交并推送到 GitHub `main`。
2. 在 Cloudflare Workers 中配置以下变量（本地 `.dev.vars` 不会自动上传）：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `PADDOCK_SITE_URL`（固定 HTTPS 正式来源）
   - `SUPABASE_SERVICE_ROLE_KEY`（加密 secret，仅服务端账户删除使用）
   - `OPENF1_USERNAME`、`OPENF1_PASSWORD`（加密 secret）
   - `PADDOCK_LEGAL_CONTACT_EMAIL`（真实、长期有效的运营者联系邮箱）
3. 使用 `npm run deploy` 发布 `paddock-index` Worker；再在 Cloudflare 绑定正式域名。
4. 在 Supabase Authentication → URL Configuration 中加入正式域名及其回调路径，例如 `https://你的域名/**`。
5. 发布后验证 `/zh`、`/en`、`/zh/account`、注册验证邮件、密码重设、跨设备收藏与 `/api/live`。

## 运行环境要求

- Node.js 20.9 或更高版本；CI 使用 Node.js 24。
- 认证、个人资料、头像与跨设备收藏由 Supabase Auth、Postgres 和 Storage 提供；生产环境必须配置上述两个 Supabase 公开变量。
- `profiles`、`favorites` 与 `avatars` 的 RLS 迁移必须已在 Supabase 项目中执行。
- 历史与实时数据依赖上游服务。即使这些服务失败，人工整理的当前赛季页面仍能正常渲染。

## 上线前仍需决定

- Formula1.com 的车手定妆图、赛道头图和布局图已从当前工作树移除；发布前仍须确认旧 Git 对象和 CDN 缓存不会继续公开提供这些文件。
- 托管账户和域名归属。
- 如果加入分析工具，需要确定统计与用户同意政策。
- 在商业化或承诺实时服务等级之前，需要取得商业赛车数据许可。
- 建立周期性的数据核验和授权图片采购流程。
