# 2026-08-08 法律合规整改记录 / Legal remediation record

本记录对应 2026-08-08 法律审计。它记录当前工作树的整改，不把尚未执行的生产或 Git 托管操作写成已完成。

| 问题 | 修改位置 | 当前处理 | 验证方式 | 残余风险 / 发布门禁 |
| --- | --- | --- | --- | --- |
| Formula1.com 车手定妆图 | `public/images/drivers/2026/`、车手 UI、`src/lib/media.ts` | 删除 22 张文件与运行时引用，改为自有 CSS 身份视觉 | `rg` 搜索路径/来源；生产构建检查 | 旧 Git commit 与 CDN 可能仍有副本，须独立清理 |
| Formula1.com 赛道头图 | `public/images/circuits/*.webp`、赛道 UI | 删除 22 张文件与引用，改为自有抽象赛道视觉 | 路径搜索；构建与页面冒烟 | 同上 |
| Formula1.com Layout | `public/images/circuits/layouts/`、赛道 UI | 删除 22 张文件与引用，改为文字代码/自有图形 | 路径搜索；构建与页面冒烟 | 同上 |
| 无法追溯的首页赛车图 | `public/images/home/red-bull-night.jpg`、首页/赛季页 | 删除并改用已登记的 `red-bull-rb22.jpg` | Credits 与路径搜索 | CC BY-SA 的署名/相同方式共享义务持续适用 |
| 图片授权透明度 | `src/lib/media.ts`、`docs/IMAGE-CREDITS.md`、Credits 页面 | 保留 Creator、Source、License、License URL 和修改/AI 说明 | 逐项清单；页面冒烟 | AI 衍生输出仍需按原图许可管理；不得宣称官方技术图 |
| 非官方与商标边界 | `/[lang]/legal`、Footer、根 metadata、`docs/LEGAL.md` | 双语非官方声明，不使用 F1 官方 Logo | 页面与文本搜索 | 新品牌/商业合作需重新审计 |
| Privacy / Terms | `/[lang]/privacy`、`/[lang]/terms`、注册表单 | 补齐 Article 8 要素、Cookie/localStorage、服务商、删除、用户内容规则和强制确认 | 双语路由冒烟；服务端验证 checkbox | 公开注册前必须配置真实联系邮箱并由当地律师复核 |
| 账户与头像删除 | account action、Supabase admin client、头像 migration | 用户可删除头像或整个 Auth 用户；关联表级联删除；固定头像对象路径 | TypeScript/构建；在 Preview + 测试 Supabase 项目实测 | 必须在生产应用新 migration 并配置 server secret |
| Jolpica / OpenF1 | Data Sources 页面、provider/live client、`docs/DATA-SOURCES.md` | Jolpica CC BY-NC-SA 署名；OpenF1 server-only 认证与非商业边界 | 单测、API 冒烟、secret 搜索 | 商业化/服务等级前取得适用许可并确认订阅 |
| 新闻治理 | news helper、`docs/CONTENT-POLICY.md` | 仅原创元数据+外链；事件卡到期过滤 | 时间旅行单测 | 编辑者仍须逐条事实核验 |
| 代码/媒体/数据许可分离 | `LICENSE`、README、LEGAL、Credits、Data Sources | 自有代码明确保留权利；第三方资产不纳入源码许可 | 文档交叉检查 | 若要开源需权利人另行选择并发布开源许可证 |

## 独立的生产步骤

以下操作尚未执行，也不能与普通代码变更混在一起：

1. 盘点受影响 Git refs/forks/tags，备份镜像，使用 `git-filter-repo` 清理三类官方素材和无法追溯图片，再协调 force-push、协作者重新克隆与回滚方案。
2. 部署当前构建后，对已删除资源的确切 URL 执行 Cloudflare purge，并验证返回 404/410，保留前后缓存证据。
3. 在 Supabase 正式项目应用头像加固 migration，配置 service-role secret，并用两个独立账户验证不可列举/跨账户读写和完整账户删除。
4. 配置 `PADDOCK_SITE_URL`、OpenF1 secrets 和真实 `PADDOCK_LEGAL_CONTACT_EMAIL`，再开放生产注册。

## Git 历史与缓存执行边界（执行前核对）

- **已确认来源 commit**：67 个待清理媒体路径均可追溯到 `cf91f7f`（首次提交）。
- **会被改写的 refs**：本地 `main`、当前 `codex/audit-remediation-2026-08-08`，以及获准 force-push 后的 `origin/main`；当前没有 tag。远端 forks、PR refs 与他人的本地 clone 无法由本仓库自动清理，必须通知重新克隆。
- **缓存目标**：`/images/drivers/2026/*`、`/images/circuits/*`、`/images/circuits/layouts/*`、`/images/home/red-bull-night.jpg` 共 67 个旧 URL；发布不含这些文件的新版本后再做精确 purge，避免先清缓存后被旧部署重新填充。
- **回滚边界**：改写前在不公开的位置建立 bare mirror/bundle 并记录原始 refs；先在临时镜像运行 `git-filter-repo` 与扫描，再冻结写入窗口、force-push；发现代码损坏时可用原始 refs 恢复，但未经授权素材不得重新公开部署。
- **执行前条件**：取得仓库维护者对历史重写、force-push、协作者重新克隆和 Cloudflare purge 的明确授权；不要创建公开 backup branch/tag，因为那会继续分发旧素材。
