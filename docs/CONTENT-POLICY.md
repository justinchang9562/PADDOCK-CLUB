# 内容、来源与更正流程 / Content, sourcing and corrections

## 发布规则

- 赛事事实至少记录可追溯来源与核验日期；处罚、正式分类和赛历变更优先核对 FIA 或赛事权利人的最新发布。
- 无法公开核验的赛车性能值必须标为“未公开”，不得用估算值补齐。
- 新闻卡片只能包含原创标题、简短摘要、发布者和原始外链；不得镜像全文、逐段翻译或复制来源图片。
- `event-status` 内容必须有 `expiresAt`，到期自动隐藏。
- 新增第三方图片前必须记录 creator、sourceUrl、license、licenseUrl 与 modifications；真实摄影还要同步更新 `docs/IMAGE-CREDITS.md`。

## 更正与投诉

收到事实更正、隐私或知识产权投诉后，先记录争议 URL、内容、来源、请求人和权利基础；必要时临时下架，再核对来源并记录结论。成立的更正应更新数据、核验日期和受影响缓存。生产环境必须通过 `PADDOCK_LEGAL_CONTACT_EMAIL` 提供长期有效的联系入口。

## Publishing rules

Race facts require a traceable source and verification date. Unverifiable performance values are labelled, never estimated. News cards contain only an original headline, concise summary, publisher and source link. Time-sensitive cards expire. Every new third-party image requires creator, source, licence, licence URL and modification records.
