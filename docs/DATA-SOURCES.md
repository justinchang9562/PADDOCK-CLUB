# 数据来源、许可与限制 / Data sources, licences and limits

- **Jolpica F1 API**：提供兼容 Ergast 的历史赛历、比赛结果和积分榜。数据按 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 使用，必须署名、限非商业使用并以相同方式共享改编资料。请求结果会被标准化；接口失败时会回退到人工整理的数据目录。
- **OpenF1 接口边界**：`/api/live` 仅从服务器读取当前赛道会话数据。认证凭据和 token 不发送到浏览器；失败时返回结构化的缓存、过期或不可用状态。商业化或承诺实时服务等级之前必须重新评估许可与访问方案。
- **FIA / Formula 1 官方资料**：用于核验赛事事实、赛历和 2026 技术规则摘要。
- **人工整理目录**：包含双语编辑摘要和稳定标识符，作为离线优先的基础数据。

PADDOCK INDEX 不声称拥有私人遥测数据、风洞结果、精确下压力图、车队调校表或专有动力单元输出数据。这类字段统一标记为“未公开”。

Jolpica F1 provides Ergast-compatible historical calendars, results and standings under CC BY-NC-SA 4.0. PADDOCK INDEX normalises responses and attributes the source, but does not claim ownership. OpenF1 access is isolated server-side and never exposes credentials to the browser. Official FIA and Formula 1 publications are used to verify facts only; that use does not imply affiliation or a licence to republish official content.
