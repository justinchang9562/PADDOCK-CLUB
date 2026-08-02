# 部署准备说明

PADDOCK INDEX 使用 OpenNext 部署到 Cloudflare Workers，GitHub `main` 是正式源码分支。

## 正式发布流程

1. 将通过 `npm run check` 的变更提交并推送到 GitHub `main`。
2. 在 Cloudflare Workers 中配置以下变量（本地 `.dev.vars` 不会自动上传）：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
3. 使用 `npm run deploy` 发布 `paddock-index` Worker；再在 Cloudflare 绑定正式域名。
4. 在 Supabase Authentication → URL Configuration 中加入正式域名及其回调路径，例如 `https://你的域名/**`。
5. 发布后验证 `/zh`、`/en`、`/zh/account`、注册验证邮件、密码重设、跨设备收藏与 `/api/live`。

## 运行环境要求

- Node.js 20.9 或更高版本；CI 使用 Node.js 24。
- 认证、个人资料、头像与跨设备收藏由 Supabase Auth、Postgres 和 Storage 提供；生产环境必须配置上述两个 Supabase 公开变量。
- `profiles`、`favorites` 与 `avatars` 的 RLS 迁移必须已在 Supabase 项目中执行。
- 历史与实时数据依赖上游服务。即使这些服务失败，人工整理的当前赛季页面仍能正常渲染。

## 上线前仍需决定

- **阻塞项：** 当前 22 张车手定妆素材、22 张赛道头图和配套布局图来自 Formula1.com，仅用于个人、非商业的本地原型。公开部署前必须取得书面许可，或替换为可再分发的授权素材。
- 托管账户和域名归属。
- 如果加入分析工具，需要确定统计与用户同意政策。
- 在商业化或承诺实时服务等级之前，需要取得商业赛车数据许可。
- 建立周期性的数据核验和授权图片采购流程。
