# 图片署名与授权

项目使用的真实摄影图片及其作者、许可证和来源页面记录如下。本文件必须与 `public/images` 和 `src/lib/media.ts` 保持同步。车辆详情页的 Studio View 为 AI 辅助视觉，不能替代赛道实拍或车队技术资料。

| 本地文件 | 内容 | 作者 | 许可证 | 来源 |
| --- | --- | --- | --- | --- |
| `mclaren-mcl40.jpg` | 2026 McLaren MCL40 | Yu Chu Chin | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:McLaren_MCL40_of_Oscar_Piastri_(028A8508).jpg) |
| `mercedes-w17.jpg` | 2026 Mercedes W17 | Yu Chu Chin | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Mercedes-AMG_F1_W17_E_Performance_of_George_Russell_(028A8051).jpg) |
| `ferrari-sf26.jpg` | 2026 Ferrari SF-26 | Yu Chu Chin | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Ferrari_SF-26_of_Lewis_Hamilton_(028A8067).jpg) |
| `red-bull-rb22.jpg` | 2026 Red Bull RB22 | Yu Chu Chin | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Red_Bull_Racing_RB22_of_Max_Verstappen_(028A8078).jpg) |
| `alpine-a526.jpg` | 2026 Alpine A526 | Yu Chu Chin | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Alpine_A526_of_Franco_Colapinto_(028A8049).jpg) |
| `racing-bulls-vcarb03.jpg` | 2026 Racing Bulls VCARB 03 | Yu Chu Chin | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:RB_VCARB_03_of_Liam_Lawson_(028A8054).jpg) |
| `haas-vf26.jpg` | 2026 Haas VF-26 | Yu Chu Chin | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Haas_VF-26_of_Oliver_Bearman_(028A8069).jpg) |
| `williams-fw48.jpg` | 2026 Williams FW48 | Yu Chu Chin | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Williams_FW48_of_Alexander_Albon_(028A8065).jpg) |
| `audi-r26.jpg` | 2026 Audi R26 | Yu Chu Chin | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Audi_R26_of_Gabriel_Bortoleto_(028A8492).jpg) |
| `aston-martin-amr26.jpg` | 2026 Aston Martin AMR26 | Liauzh | CC BY 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2026_Chinese_GP_-_Aston_Martin_-_AMR26.jpg) |
| `cadillac-mac26.jpg` | 2026 Cadillac MAC-26 | Yu Chu Chin | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Cadillac_MAC-26_of_Sergio_P%C3%A9rez_(028A8062).jpg) |
部分文件是 Wikimedia Commons 已发布的裁剪版本。PADDOCK CLUB 会通过 Next.js 对图片进行响应式压缩和画面适配，但不会改变图片的纪实含义。

旧版 `silverstone.jpg` 仍保留在 `public/images` 便于回退，但已不再由页面或 `src/lib/media.ts` 引用。

## F1 官方 2026 赛道页面头图与布局图

以下素材来自 Formula1.com 对应的 2026 官方赛事页面：`circuits/{id}.webp` 用于赛道实景封面，`circuits/layouts/{id}.png` 用于赛道布局图。根据 [Formula 1 法律说明](https://www.formula1.com/en/information/legal-notices.7egvZU48hzrypubGBNcQKt)，这些素材目前只用于个人、非商业的本地原型；公开发布、分发或商业使用前必须取得许可或替换为可再分发素材。

| 本地文件（头图 / 布局） | 赛道 | 官方赛事页 |
| --- | --- | --- |
| `circuits/albert-park.webp` / `circuits/layouts/albert-park.png` | Albert Park Grand Prix Circuit | [Formula 1](https://www.formula1.com/en/racing/2026/australia) |
| `circuits/shanghai.webp` / `circuits/layouts/shanghai.png` | Shanghai International Circuit | [Formula 1](https://www.formula1.com/en/racing/2026/china) |
| `circuits/suzuka.webp` / `circuits/layouts/suzuka.png` | Suzuka International Racing Course | [Formula 1](https://www.formula1.com/en/racing/2026/japan) |
| `circuits/miami.webp` / `circuits/layouts/miami.png` | Miami International Autodrome | [Formula 1](https://www.formula1.com/en/racing/2026/miami) |
| `circuits/gilles-villeneuve.webp` / `circuits/layouts/gilles-villeneuve.png` | Circuit Gilles-Villeneuve | [Formula 1](https://www.formula1.com/en/racing/2026/canada) |
| `circuits/monaco.webp` / `circuits/layouts/monaco.png` | Circuit de Monaco | [Formula 1](https://www.formula1.com/en/racing/2026/monaco) |
| `circuits/barcelona.webp` / `circuits/layouts/barcelona.png` | Circuit de Barcelona-Catalunya | [Formula 1](https://www.formula1.com/en/racing/2026/barcelona-catalunya) |
| `circuits/red-bull-ring.webp` / `circuits/layouts/red-bull-ring.png` | Red Bull Ring | [Formula 1](https://www.formula1.com/en/racing/2026/austria) |
| `circuits/silverstone.webp` / `circuits/layouts/silverstone.png` | Silverstone Circuit | [Formula 1](https://www.formula1.com/en/racing/2026/great-britain) |
| `circuits/spa.webp` / `circuits/layouts/spa.png` | Circuit de Spa-Francorchamps | [Formula 1](https://www.formula1.com/en/racing/2026/belgium) |
| `circuits/hungaroring.webp` / `circuits/layouts/hungaroring.png` | Hungaroring | [Formula 1](https://www.formula1.com/en/racing/2026/hungary) |
| `circuits/zandvoort.webp` / `circuits/layouts/zandvoort.png` | Circuit Zandvoort | [Formula 1](https://www.formula1.com/en/racing/2026/netherlands) |
| `circuits/monza.webp` / `circuits/layouts/monza.png` | Autodromo Nazionale Monza | [Formula 1](https://www.formula1.com/en/racing/2026/italy) |
| `circuits/madrid.webp` / `circuits/layouts/madrid.png` | Madring | [Formula 1](https://www.formula1.com/en/racing/2026/spain) |
| `circuits/baku.webp` / `circuits/layouts/baku.png` | Baku City Circuit | [Formula 1](https://www.formula1.com/en/racing/2026/azerbaijan) |
| `circuits/marina-bay.webp` / `circuits/layouts/marina-bay.png` | Marina Bay Street Circuit | [Formula 1](https://www.formula1.com/en/racing/2026/singapore) |
| `circuits/cota.webp` / `circuits/layouts/cota.png` | Circuit of the Americas | [Formula 1](https://www.formula1.com/en/racing/2026/united-states) |
| `circuits/mexico-city.webp` / `circuits/layouts/mexico-city.png` | Autódromo Hermanos Rodríguez | [Formula 1](https://www.formula1.com/en/racing/2026/mexico) |
| `circuits/interlagos.webp` / `circuits/layouts/interlagos.png` | Autódromo José Carlos Pace | [Formula 1](https://www.formula1.com/en/racing/2026/brazil) |
| `circuits/las-vegas.webp` / `circuits/layouts/las-vegas.png` | Las Vegas Strip Circuit | [Formula 1](https://www.formula1.com/en/racing/2026/las-vegas) |
| `circuits/lusail.webp` / `circuits/layouts/lusail.png` | Lusail International Circuit | [Formula 1](https://www.formula1.com/en/racing/2026/qatar) |
| `circuits/yas-marina.webp` / `circuits/layouts/yas-marina.png` | Yas Marina Circuit | [Formula 1](https://www.formula1.com/en/racing/2026/united-arab-emirates) |

## F1 官方 2026 车手定妆素材

以下透明 WebP 来自 Formula1.com 对应车手资料页，页面仅对背景、裁切和车队色光晕进行统一设计，不修改人物本身。根据 [Formula 1 法律说明](https://www.formula1.com/en/information/legal-notices.7egvZU48hzrypubGBNcQKt)，这些素材目前只用于个人、非商业的本地原型；公开发布、分发或商业使用前必须取得许可或替换为可再分发素材。

| 本地文件 | 车手 | 官方资料页 |
| --- | --- | --- |
| `drivers/2026/antonelli.webp` | Kimi Antonelli | [Formula 1](https://www.formula1.com/en/drivers/kimi-antonelli) |
| `drivers/2026/russell.webp` | George Russell | [Formula 1](https://www.formula1.com/en/drivers/george-russell) |
| `drivers/2026/hamilton.webp` | Lewis Hamilton | [Formula 1](https://www.formula1.com/en/drivers/lewis-hamilton) |
| `drivers/2026/leclerc.webp` | Charles Leclerc | [Formula 1](https://www.formula1.com/en/drivers/charles-leclerc) |
| `drivers/2026/norris.webp` | Lando Norris | [Formula 1](https://www.formula1.com/en/drivers/lando-norris) |
| `drivers/2026/piastri.webp` | Oscar Piastri | [Formula 1](https://www.formula1.com/en/drivers/oscar-piastri) |
| `drivers/2026/verstappen.webp` | Max Verstappen | [Formula 1](https://www.formula1.com/en/drivers/max-verstappen) |
| `drivers/2026/hadjar.webp` | Isack Hadjar | [Formula 1](https://www.formula1.com/en/drivers/isack-hadjar) |
| `drivers/2026/gasly.webp` | Pierre Gasly | [Formula 1](https://www.formula1.com/en/drivers/pierre-gasly) |
| `drivers/2026/lawson.webp` | Liam Lawson | [Formula 1](https://www.formula1.com/en/drivers/liam-lawson) |
| `drivers/2026/lindblad.webp` | Arvid Lindblad | [Formula 1](https://www.formula1.com/en/drivers/arvid-lindblad) |
| `drivers/2026/bearman.webp` | Oliver Bearman | [Formula 1](https://www.formula1.com/en/drivers/oliver-bearman) |
| `drivers/2026/colapinto.webp` | Franco Colapinto | [Formula 1](https://www.formula1.com/en/drivers/franco-colapinto) |
| `drivers/2026/bortoleto.webp` | Gabriel Bortoleto | [Formula 1](https://www.formula1.com/en/drivers/gabriel-bortoleto) |
| `drivers/2026/sainz.webp` | Carlos Sainz | [Formula 1](https://www.formula1.com/en/drivers/carlos-sainz) |
| `drivers/2026/albon.webp` | Alexander Albon | [Formula 1](https://www.formula1.com/en/drivers/alexander-albon) |
| `drivers/2026/ocon.webp` | Esteban Ocon | [Formula 1](https://www.formula1.com/en/drivers/esteban-ocon) |
| `drivers/2026/alonso.webp` | Fernando Alonso | [Formula 1](https://www.formula1.com/en/drivers/fernando-alonso) |
| `drivers/2026/hulkenberg.webp` | Nico Hülkenberg | [Formula 1](https://www.formula1.com/en/drivers/nico-hulkenberg) |
| `drivers/2026/bottas.webp` | Valtteri Bottas | [Formula 1](https://www.formula1.com/en/drivers/valtteri-bottas) |
| `drivers/2026/perez.webp` | Sergio Pérez | [Formula 1](https://www.formula1.com/en/drivers/sergio-perez) |
| `drivers/2026/stroll.webp` | Lance Stroll | [Formula 1](https://www.formula1.com/en/drivers/lance-stroll) |

旧版的四张生活照仍保留在 `public/images` 便于回退，但已不再由页面或 `src/lib/media.ts` 引用。

## AI 辅助白色影棚展示图

以下文件使用 OpenAI imagegen 制作，以同车型的 2026 赛道实拍图作为车辆依据，并以用户提供的 2025 Red Bull 影棚图作为灯光、构图与质感参考。提示词明确禁止复制参考图中的车辆身份、11 号、涂装和 2025 车身细节。生成图用于整车姿态和涂装展示；小型赞助标识、文字和工程结构可能存在误差。

| 本地文件 | 对应实拍来源 | 页面标识 |
| --- | --- | --- |
| `studio/mercedes-w17-studio.png` | `mercedes-w17.jpg` | AI 辅助视觉 |
| `studio/ferrari-sf26-studio.png` | `ferrari-sf26.jpg` | AI 辅助视觉 |
| `studio/mclaren-mcl40-studio.png` | `mclaren-mcl40.jpg` | AI 辅助视觉 |
| `studio/red-bull-rb22-studio.png` | `red-bull-rb22.jpg` | AI 辅助视觉 |
| `studio/alpine-a526-studio.png` | `alpine-a526.jpg` | AI 辅助视觉 |
| `studio/racing-bulls-vcarb03-studio.png` | `racing-bulls-vcarb03.jpg` | AI 辅助视觉 |
| `studio/haas-vf26-studio.png` | `haas-vf26.jpg` | AI 辅助视觉 |
| `studio/williams-fw48-studio.png` | `williams-fw48.jpg` | AI 辅助视觉 |
| `studio/audi-r26-studio.png` | `audi-r26.jpg` | AI 辅助视觉 |
| `studio/aston-martin-amr26-studio.png` | `aston-martin-amr26.jpg` | AI 辅助视觉 |
| `studio/cadillac-mac26-studio.png` | `cadillac-mac26.jpg` | AI 辅助视觉 |
