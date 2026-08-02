# 系统架构

PADDOCK INDEX 使用 Next.js App Router、TypeScript 和轻依赖的 CSS 设计系统。

## 路由模型

- `/{lang}`：当前赛季总览
- `/{lang}/seasons/{season}`：赛季赛历与积分榜
- `/{lang}/seasons/{season}/races/{round}`：比赛周末与正式分类
- `/{lang}/drivers`、`/teams`、`/circuits`、`/cars`：百科索引与详情页
- `/{lang}/news`、`/live`、`/favorites`：资讯、实时数据和收藏工具
- `/{lang}/account`：已登录用户的账户资料、头像与安全入口

`lang` 的取值为 `zh` 或 `en`。切换语言时会保留当前页面路径。

## 数据边界

UI 代码只使用经过标准化的领域模型。外部接口响应格式和降级行为统一由 `src/lib/providers.ts` 管理，因此未来商业化版本可以替换非商业数据源，而不需要重写页面组件。

## 渲染方式

页面默认使用 Server Components。搜索、收藏、语言控制和实时刷新使用小型 Client Components。即使上游数据源不可用，人工整理的静态数据仍能保证主要页面可以正常浏览。

## 账户认证

账户使用 Supabase Auth 和 `@supabase/ssr`：浏览器与服务器共享 cookie 会话，`src/middleware.ts` 在请求期间验证并刷新令牌。注册、登录、邮箱验证、退出和密码重设路由均支持中文与英文。认证配置参阅 `docs/AUTH-SETUP.md`。

`public.profiles` 与 `public.favorites` 通过迁移文件建立，并启用按 `auth.uid()` 隔离的 RLS。新 Auth 用户由数据库触发器自动获得 profile，已有用户在迁移时补建。

昵称和头像地址保存在 `public.profiles`。头像文件位于公开的 `avatars` Storage bucket，以 `{auth.uid()}/avatar` 作为固定对象路径；公开读取便于在站点 Header 展示，但 RLS 只允许已登录用户写入、替换或删除自己的目录。

收藏使用渐进同步：访客收藏保存在浏览器；用户登录后，客户端会把本机收藏与账户云端收藏合并，成功后清除匿名副本，防止不同账户交叉迁移。之后的收藏增删直接写入 RLS 保护的 `favorites`，页面重新载入或浏览器窗口重新获得焦点时会读取最新云端状态。
