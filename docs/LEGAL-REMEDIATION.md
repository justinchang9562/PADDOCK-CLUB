# 2026-08-08 法律合规整改记录 / Legal remediation record

本记录对应 2026-08-08 法律审计，并于 2026-08-09 补记 Git 托管、Supabase 与 Cloudflare 生产执行结果。密钥值不进入本记录或 Git 历史。

| 问题 | 修改位置 | 当前处理 | 验证方式 | 残余风险 / 发布门禁 |
| --- | --- | --- | --- | --- |
| Formula1.com 车手定妆图 | `public/images/drivers/2026/`、车手 UI、`src/lib/media.ts` | 删除 22 张文件与运行时引用，改为自有 CSS 身份视觉；清理公开 Git 历史与 CDN | `rg`、生产构建、远端 refs 扫描、旧 URL 404 | 无法替第三方 fork 或旧 clone 删除其本地副本 |
| Formula1.com 赛道头图 | `public/images/circuits/*.webp`、赛道 UI | 删除 22 张文件与引用，改为自有抽象赛道视觉；清理公开 Git 历史与 CDN | 路径/远端 refs 扫描、构建、旧 URL 404 | 同上 |
| Formula1.com Layout | `public/images/circuits/layouts/`、赛道 UI | 删除 22 张文件与引用，改为文字代码/自有图形；清理公开 Git 历史与 CDN | 路径/远端 refs 扫描、构建、旧 URL 404 | 同上 |
| 无法追溯的首页赛车图 | `public/images/home/red-bull-night.jpg`、首页/赛季页 | 删除并改用已登记的 `red-bull-rb22.jpg` | Credits 与路径搜索 | CC BY-SA 的署名/相同方式共享义务持续适用 |
| 图片授权透明度 | `src/lib/media.ts`、`docs/IMAGE-CREDITS.md`、Credits 页面 | 保留 Creator、Source、License、License URL 和修改/AI 说明 | 逐项清单；页面冒烟 | AI 衍生输出仍需按原图许可管理；不得宣称官方技术图 |
| 非官方与商标边界 | `/[lang]/legal`、Footer、根 metadata、`docs/LEGAL.md` | 双语非官方声明，不使用 F1 官方 Logo | 页面与文本搜索 | 新品牌/商业合作需重新审计 |
| Privacy / Terms | `/[lang]/privacy`、`/[lang]/terms`、注册表单 | 补齐 Article 8 要素、Cookie/localStorage、服务商、删除、用户内容规则和强制确认；生产配置真实联系邮箱 | 双语路由、线上页面与 `mailto:` 冒烟；服务端验证 checkbox | 上线文本仍应由适用法域律师复核 |
| 账户与头像删除 | account action、Supabase admin client、头像 migration | 用户可删除头像或整个 Auth 用户；关联表级联删除；固定头像对象路径；生产 migration 与 server secret 已配置 | 两个临时账户实测隔离、持久化和删除；删除后 Auth/Profile/Favorite 均为 0 | 持续监控真实用户流程与基础设施备份保留政策 |
| Jolpica / OpenF1 | Data Sources 页面、provider/live client、`docs/DATA-SOURCES.md` | Jolpica CC BY-NC-SA 署名；OpenF1 server-only 认证与非商业边界 | 单测、API 冒烟、secret 搜索 | 商业化/服务等级前取得适用许可并确认订阅 |
| 新闻治理 | news helper、`docs/CONTENT-POLICY.md` | 仅原创元数据+外链；事件卡到期过滤 | 时间旅行单测 | 编辑者仍须逐条事实核验 |
| 代码/媒体/数据许可分离 | `LICENSE`、README、LEGAL、Credits、Data Sources | 自有代码明确保留权利；第三方资产不纳入源码许可 | 文档交叉检查 | 若要开源需权利人另行选择并发布开源许可证 |

## 已执行的生产步骤（2026-08-09）

以下操作已按仓库维护者明确授权执行：

1. 在非公开临时目录建立完整 Git bundle，使用 `git-filter-repo` 从所有公开 refs 清除 67 个媒体路径，验证 `git fsck` 与 tip tree 后，以 lease 保护 force-push `origin/main`。
2. 部署不含旧素材的 Cloudflare Worker 后，按 30/30/7 三批精确清除 67 个 URL；逐一联网复验结果为 67/67 返回 404。
3. 在 Supabase 正式项目应用三项 migration；验证 Profiles/Favorites RLS、头像策略、2 MB 限制，并用两个临时账户验证资料与收藏互相不可见、云端收藏可持久化、账户删除成功级联清除 Auth/Profile/Favorite。
4. 在 Cloudflare 配置 `SUPABASE_SERVICE_ROLE_KEY`、`PADDOCK_SITE_URL` 与真实 `PADDOCK_LEGAL_CONTACT_EMAIL` 为加密 secrets，并在线验证法律联系链接。OpenF1 历史数据按官方接口无需凭据；付费实时订阅尚未购买，因此未伪造或配置不存在的 OpenF1 凭据，应用保持明确降级。

## Git 历史、部署与缓存执行记录

- **已确认来源 commit**：67 个待清理媒体路径均可追溯到 `cf91f7f`（首次提交）。
- **已改写 refs**：`origin/main` 由改写前的 `acca4bd` 更新到清理后的 `ae030fc`，随后以正常 fast-forward 发布生产配置；没有创建会继续分发旧素材的公开 backup branch/tag。协作者和旧 clone 必须重新克隆或按新历史重置。
- **非公开回滚证据**：改写前完整 bundle 保存在 `/private/tmp/paddock-history-backup.mJulhV/pre-rewrite.bundle`；只用于事故恢复，不得重新公开部署其中的未授权媒体。
- **生产部署**：Cloudflare Worker `paddock-index` 版本 `63a35850-3a86-4c32-9d9a-8093f80b9d5e` 绑定 `paddockindex.eu.cc`，`workers.dev` 与 preview URL 关闭。
- **缓存结果**：`/images/drivers/2026/*`、`/images/circuits/*`、`/images/circuits/layouts/*`、`/images/home/red-bull-night.jpg` 共 67 个旧 URL 已精确 purge，复验 `checked=67 failures=0`。
