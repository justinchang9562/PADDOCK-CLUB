# Supabase Auth 配置

账户认证使用 Supabase Auth；第二阶段数据库结构由 `supabase/migrations` 中的迁移文件管理。

## 1. 创建 Supabase 项目

在 Supabase Dashboard 创建项目。项目可先使用 Free 方案；数据库区域应选择靠近主要用户的位置。

从项目的 **Connect** 面板取得：

- Project URL
- Publishable key（以 `sb_publishable_` 开头；旧项目可能显示 anon key）

不要在前端或仓库中使用 `secret`、`service_role` 或数据库密码。账户自助删除功能需要一个只在服务端/Cloudflare secret 中配置的 `SUPABASE_SERVICE_ROLE_KEY`，绝不能添加 `NEXT_PUBLIC_` 前缀。

## 2. 配置本地环境

在项目根目录创建 `.env.local`，并加入：

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
PADDOCK_SITE_URL=http://localhost:3000
# 仅服务端；本地测试账户删除时才填写
SUPABASE_SERVICE_ROLE_KEY=
```

`.env.local` 是 Next.js 注入 `NEXT_PUBLIC_` 浏览器变量的标准文件，已被 Git 忽略，不会提交到仓库。修改后需要重启 `npm run dev`。

Cloudflare 本地预览还会读取 `.dev.vars`。为保持两种本地运行方式一致，可在 `.dev.vars` 中保存同样配置。`.dev.vars` 必须保持在 Git 忽略范围内；不要把任何 secret 提交到仓库。

## 3. 配置认证 URL

在 Supabase Dashboard 的 **Authentication > URL Configuration** 中设置：

- 本地 Site URL：`http://localhost:3000`
- 本地 Redirect URL：`http://localhost:3000/**`
- 上线后再加入：`https://你的域名/**`

邮箱验证与密码重设链接会回到 `/{lang}/auth/callback`。邮件模板传递一次性的 `token_hash`，服务器验证后写入 cookie 会话，因此用户可以在与注册时不同的浏览器或设备中打开邮件链接。

## 4. 配置认证邮件模板

在 **Authentication > Emails > Templates** 中修改以下两个模板。

**Confirm sign up** 的确认链接使用：

```html
<a href="{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=email">Confirm email address</a>
```

**Reset password** 的重设链接使用：

```html
<a href="{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=recovery">Reset password</a>
```

## 5. 认证设置

在 **Authentication > Providers > Email** 中确认：

- Email provider 已启用。
- Confirm email 已启用。
- 最低密码长度至少为 8；应用界面和服务端也会执行相同的最低限制。

Supabase 内置邮件服务只适合开发测试。正式上线前应在 **Authentication > SMTP Settings** 配置自有 SMTP，并检查中文、英文邮件模板和发件域名。

## 6. 验收流程

1. 打开 `/zh/sign-up`，使用可收信邮箱注册。
2. 点击验证邮件，确认回到 `/zh` 且 Header 显示“退出登录”。
3. 退出后从 `/zh/sign-in` 重新登录。
4. 在 `/zh/forgot-password` 请求重设邮件，设置新密码。
5. 使用新密码登录，并重复验证 `/en` 页面文案与跳转。

## 7. 用户数据表与 RLS

在 Supabase SQL Editor 执行：

```text
supabase/migrations/20260801114500_profiles_and_favorites.sql
```

迁移会创建：

- `profiles`：每个 Auth 用户一行，预留昵称、头像与语言偏好。
- `favorites`：保存用户收藏的实体类型和实体 ID。
- 新用户 profile 自动创建触发器，并为已经存在的 Auth 用户补建 profile。
- 两张表的 RLS：已登录用户只能读取或修改自己的 profile，只能读取、新增或删除自己的收藏；匿名访问没有表权限。

登录用户的收藏会写入 `favorites` 并跨设备同步；访客继续使用浏览器本地收藏。首次登录会把有效的本地收藏合并到当前账户，成功后删除匿名副本，避免同一设备上的不同账户互相混入收藏。

## 8. 账户头像 Storage

在完成第 7 节后执行：

```text
supabase/migrations/20260802002500_profile_avatars.sql
supabase/migrations/20260808160000_avatar_policy_hardening.sql
```

第一项迁移创建头像 bucket；加固迁移移除匿名对象列表能力，并限制：

- 图片格式只能是 JPG、PNG 或 WebP。
- 单个文件最大 2 MB。
- 登录用户只能上传、替换或删除 `{自己的 auth.uid()}/avatar`。
- 头像公开 URL 保存到本人 `profiles.avatar_url`；昵称保存到 `profiles.display_name`。

账户页位于 `/{lang}/account`。未登录访问会跳转到登录页；登录用户可以更新资料、移除头像或自助删除整个账户。删除功能通过服务端管理密钥删除 Auth 用户，并由外键级联清除 profile 与收藏。
