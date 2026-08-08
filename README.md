# PADDOCK INDEX

PADDOCK INDEX 是一个支持中英文切换和响应式布局的 Formula 1 信息平台，整合了赛季赛历、比赛分类、车手与车队档案、赛车与赛道资料、资讯摘要、跨设备收藏、带昵称与头像的 Supabase 邮箱账户、全局搜索和实时数据接口。

这是独立、非官方、非商业项目，与 Formula 1、FIA、任何车队、车手或赛事主办方均无隶属、授权、赞助或背书关系。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。中文页面以 `/zh` 开头，英文页面以 `/en` 开头。

如需启用注册、登录、邮箱验证和密码重设，请按照 `docs/AUTH-SETUP.md` 配置 Supabase 项目与本地环境变量。未配置密钥时，网站其余页面仍可运行，认证表单会保持禁用。

## 质量检查

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## 数据原则

- 人工整理的产品文案与 2026 赛季基准数据位于 `src/lib/catalog.ts`。
- 历史比赛分类通过兼容 Jolpica/Ergast 的数据提供层读取。
- 实时计时功能统一封装在 `/api/live` 后方，不与特定数据供应商耦合。
- 无法公开核验的专有性能数据会标记为“未公开”，不会编造数值。
- 资讯仅保存标题、摘要、发布者等元数据和外部来源链接。

## 许可与第三方内容

根目录 `LICENSE` 只适用于 PADDOCK INDEX 自有源码与原创文字，不覆盖第三方摄影、Creative Commons 作品、数据、API、名称或商标。实现架构、账户配置、法律边界、数据来源、图片署名和发布说明请参阅 `docs/ARCHITECTURE.md`、`docs/AUTH-SETUP.md`、`docs/LEGAL.md`、`docs/DATA-SOURCES.md`、`docs/IMAGE-CREDITS.md` 和 `docs/DEPLOYMENT.md`。
