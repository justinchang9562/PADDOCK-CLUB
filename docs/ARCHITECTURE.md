# 系统架构

PADDOCK CLUB 使用 Next.js App Router、TypeScript 和轻依赖的 CSS 设计系统。

## 路由模型

- `/{lang}`：当前赛季总览
- `/{lang}/seasons/{season}`：赛季赛历与积分榜
- `/{lang}/seasons/{season}/races/{round}`：比赛周末与正式分类
- `/{lang}/drivers`、`/teams`、`/circuits`、`/cars`：百科索引与详情页
- `/{lang}/news`、`/live`、`/favorites`：资讯、实时数据和收藏工具

`lang` 的取值为 `zh` 或 `en`。切换语言时会保留当前页面路径。

## 数据边界

UI 代码只使用经过标准化的领域模型。外部接口响应格式和降级行为统一由 `src/lib/providers.ts` 管理，因此未来商业化版本可以替换非商业数据源，而不需要重写页面组件。

## 渲染方式

页面默认使用 Server Components。搜索、收藏、语言控制和实时刷新使用小型 Client Components。即使上游数据源不可用，人工整理的静态数据仍能保证主要页面可以正常浏览。
