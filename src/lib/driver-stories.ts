import type { LocalizedText } from "./types";

export type DriverStory = {
  deck: LocalizedText;
  chapters: Array<{ title: LocalizedText; body: LocalizedText }>;
  milestones: Array<{ year: string; title: LocalizedText; detail: LocalizedText }>;
  approach: LocalizedText;
  sourceUrl: string;
  reviewedAt: string;
};

const localized = (zh: string, en: string): LocalizedText => ({ zh, en });

const story = (
  deck: [string, string],
  chapters: Array<[string, string, string, string]>,
  milestones: Array<[string, string, string, string, string]>,
  approach: [string, string],
  sourceUrl: string,
): DriverStory => ({
  deck: localized(...deck),
  chapters: chapters.map(([titleZh, titleEn, bodyZh, bodyEn]) => ({
    title: localized(titleZh, titleEn),
    body: localized(bodyZh, bodyEn),
  })),
  milestones: milestones.map(([year, titleZh, titleEn, detailZh, detailEn]) => ({
    year,
    title: localized(titleZh, titleEn),
    detail: localized(detailZh, detailEn),
  })),
  approach: localized(...approach),
  sourceUrl,
  reviewedAt: "2026-07-18",
});

export const driverStories: Record<string, DriverStory> = {
  antonelli: story(
    [
      "从博洛尼亚的卡丁车少年，到跳过 F3、直接接过汉密尔顿留下的梅赛德斯席位，安东内利的晋升速度几乎没有先例。",
      "From a karting prodigy in Bologna to skipping F3 and inheriting Lewis Hamilton's Mercedes seat, Antonelli's ascent has been exceptionally rapid.",
    ],
    [
      ["被梅赛德斯提前看见", "Spotted early by Mercedes", "安东内利出生于赛车家庭，父亲 Marco 参加跑车赛事。他在卡丁车阶段积累大量冠军，并很早进入梅赛德斯青训体系。转入方程式后，他在 2022 年同时拿下意大利 F4 与 ADAC F4 冠军，2023 年又连续赢得中东与欧洲区域方程式锦标，证明速度并不依赖单一赛车或赛道。", "The son of sports-car racer Marco Antonelli, he collected major karting honours before joining the Mercedes junior structure. He then won both Italian and ADAC F4 in 2022, followed by the Formula Regional Middle East and European titles in 2023, showing that his pace travelled across cars and circuits."],
      ["跳级与高压首秀", "The leap and the pressure", "梅赛德斯让他绕过 F3，直接参加 2024 年 F2。新赛车和车队状态让开局并不轻松，但银石湿地冲刺赛与匈牙利主赛胜利展示了他的适应力。2025 年，他在 18 岁时成为梅赛德斯正式车手；新秀赛季经历欧洲赛段低潮，也取得迈阿密冲刺杆位、加拿大首个领奖台，并以赛季末的稳定表现完成成长。", "Mercedes moved him directly from Formula Regional to F2 in 2024. A difficult start with a new car gave way to a wet-weather Sprint win at Silverstone and a Feature Race victory in Hungary. Promoted to Mercedes at 18 in 2025, he combined a Miami Sprint pole and first podium in Canada with a testing European spell, then recovered strongly late in the season."],
      ["从潜力到争冠责任", "From promise to responsibility", "2026 年不再只是学习赛季。安东内利开始承担设定方向、比赛管理和争冠压力；他的故事也从“下一位新星”转向如何把天赋转化为整季执行。", "By 2026 the brief was no longer simply to learn. Antonelli had to contribute to set-up direction, manage races and carry championship pressure—the point at which a prodigy must turn speed into a complete season."],
    ],
    [
      ["2022", "F4 双冠", "F4 double", "赢得意大利与 ADAC F4 锦标。", "Won the Italian and ADAC F4 championships."],
      ["2023", "区域方程式双冠", "Regional double", "在中东与欧洲区域方程式连续夺冠。", "Won both Formula Regional Middle East and Europe."],
      ["2024", "跳级 F2", "Straight to F2", "绕过 F3，并在银石与匈牙利取胜。", "Skipped F3 and won at Silverstone and Hungary."],
      ["2025", "梅赛德斯 F1 首秀", "Mercedes F1 debut", "取得三个领奖台并完成首个完整赛季。", "Scored three podiums in his first full F1 season."],
    ],
    ["安东内利的基础是快速入弯与对低抓地力的直觉。他最需要持续建立的是长距离轮胎管理、复杂周末中的节奏控制，以及在不完美赛车上稳定拿分的能力。", "Antonelli's foundation is decisive corner entry and strong feel in low grip. His continuing development lies in long-run tyre management, controlling the rhythm of complicated weekends and scoring consistently when the car is less than ideal."],
    "https://www.formula1.com/en/drivers/kimi-antonelli",
  ),

  russell: story(
    ["拉塞尔的职业生涯是一条耐心证明自己的路线：青年组冠军、威廉姆斯重建期的基准车手，再到梅赛德斯新时代的领军人物。", "Russell's career has been a patient process of proof: junior champion, Williams benchmark and eventually a leader of Mercedes' next era."],
    [
      ["冠军履历进入 F1", "A champion's route to F1", "拉塞尔在 2014 年赢得英国 F4，随后成为梅赛德斯青训车手，并连续拿下 2017 年 GP3 与 2018 年 F2 冠军。他的青年组履历不仅有速度，也有排位执行、轮胎理解与赛季管理。", "Russell won British F4 in 2014, joined the Mercedes junior programme and then claimed the 2017 GP3 and 2018 F2 titles in succession. Those campaigns demonstrated qualifying execution, tyre understanding and season management as much as raw pace."],
      ["在后排建立声誉", "Building a reputation at the back", "2019 至 2021 年的威廉姆斯缺乏竞争力，但拉塞尔频繁在排位赛超越赛车预期。2020 年萨基尔站临时替代汉密尔顿时，他几乎立即具备争胜速度；2021 年比利时的前排发车与领奖台进一步确认了他的能力。", "Williams lacked pace from 2019 to 2021, yet Russell repeatedly exceeded the car's expected qualifying position. A one-off Mercedes drive at Sakhir in 2020 showed near-immediate winning speed, while a front-row start and podium at the 2021 Belgian Grand Prix reinforced his case."],
      ["接班不是复制", "Leading without imitation", "2022 年升入梅赛德斯后，他在圣保罗取得首胜，并在车队艰难的规则周期中逐步承担技术与组织责任。拉塞尔的角色不是复制汉密尔顿，而是以精确反馈、稳定排位和强硬比赛判断建立自己的领导方式。", "After joining Mercedes in 2022 he earned his first victory in São Paulo and gradually took on greater technical and organisational responsibility through a difficult rules cycle. His leadership is built around precise feedback, qualifying consistency and firm race judgement rather than imitation."],
    ],
    [["2017", "GP3 冠军", "GP3 champion", "以新秀身份赢得年度冠军。", "Won the title as a rookie."], ["2018", "F2 冠军", "F2 champion", "击败同代车手晋级 F1。", "Converted a second consecutive junior title into an F1 seat."], ["2020", "萨基尔代打", "Sakhir stand-in", "临时驾驶梅赛德斯并展现争胜速度。", "Showed race-winning pace in a one-off Mercedes appearance."], ["2022", "F1 首胜", "First F1 win", "在圣保罗为梅赛德斯赢得赛季首胜。", "Won for Mercedes at São Paulo."]],
    ["他的强项是排位圈准备、稳定刹车点和清晰工程反馈。比赛中敢于把位置放在对手必须作决定的地方，但高压对抗下如何平衡强硬与风险，始终是其风格的一部分。", "His strengths are qualifying preparation, repeatable braking references and clear engineering feedback. In combat he places the car where rivals must decide; balancing that assertiveness with risk remains a defining part of his style."],
    "https://www.formula1.com/en/drivers/george-russell",
  ),

  hamilton: story(
    ["汉密尔顿的生涯横跨 F1 的多个技术时代：从新秀即争冠，到与梅赛德斯建立统治周期，再到以七届冠军身份开启法拉利篇章。", "Hamilton's career spans several technical eras: a title-challenging rookie, the central driver of Mercedes' dominant cycle and a seven-time champion beginning a Ferrari chapter."],
    [
      ["从史蒂文尼奇到迈凯伦", "From Stevenage to McLaren", "汉密尔顿在卡丁车时期主动向 Ron Dennis 介绍自己，随后获得迈凯伦支持。他赢得英国雷诺方程式、F3 欧洲系列与 GP2 冠军，2007 年直接进入迈凯伦 F1 车队。新秀赛季便拿下四胜，并以一分之差错失冠军；2008 年，他在巴西最后一圈获得决定性名次，成为当时最年轻的世界冠军。", "Hamilton approached Ron Dennis during his karting years and later received McLaren support. Titles in Formula Renault UK, European F3 and GP2 led directly to an F1 seat in 2007. He won four races as a rookie and missed the title by one point, then secured the 2008 championship with a decisive final-lap position in Brazil."],
      ["梅赛德斯王朝的核心", "The centre of the Mercedes era", "2013 年转投尚未成为争冠车队的梅赛德斯，是其职业生涯最重要的选择。混合动力时代开始后，他在 2014、2015、2017、2018、2019 与 2020 年夺冠，将世界冠军数提升至七个，并刷新胜场、杆位和领奖台等多项纪录。2021 年与维斯塔潘的全年对决，也成为现代 F1 最具张力的赛季之一。", "Moving to a still-developing Mercedes team in 2013 became the defining choice of his career. He won the 2014, 2015, 2017, 2018, 2019 and 2020 titles, equalled seven championships and reset records for wins, poles and podiums. His season-long 2021 fight with Verstappen became one of modern F1's defining contests."],
      ["法拉利与赛场外影响", "Ferrari and wider influence", "2025 年加盟法拉利，不只是一次转队，也是对适应力的全新检验。赛场外，他持续推动多元、教育与可持续议题；这使他的历史地位不仅由数字构成，也包含他如何扩大车手在体育之外的公共角色。", "His 2025 move to Ferrari was both a team change and a fresh test of adaptability. Beyond the cockpit he has used his platform on diversity, education and sustainability, expanding the public role of an F1 driver beyond results alone."],
    ],
    [["2007", "新秀争冠", "Rookie title fight", "首季赢得四站并仅差一分夺冠。", "Won four races and missed the title by one point."], ["2008", "首个世界冠军", "First world title", "在巴西收官战最后阶段锁定冠军。", "Secured the championship in the closing moments in Brazil."], ["2013", "加盟梅赛德斯", "Joined Mercedes", "选择一支正在建设中的厂队。", "Chose a works team still being built."], ["2014–2020", "六冠周期", "Six-title cycle", "与梅赛德斯共同主导混合动力时代。", "Won six championships with Mercedes in the hybrid era."]],
    ["汉密尔顿以晚刹车、湿地抓地感和比赛中重新组织节奏著称。巅峰时期，他能在保护轮胎的同时保持极高圈速；漫长生涯也体现了持续调整驾驶方式与工程沟通的能力。", "Hamilton is known for late braking, exceptional feel in the wet and the ability to rebuild a race rhythm. At his peak he combined tyre preservation with front-running pace, while his longevity reflects continual adaptation in technique and engineering communication."],
    "https://www.formula1.com/en/drivers/lewis-hamilton",
  ),

  leclerc: story(
    ["勒克莱尔以极快单圈进入 F1，也在法拉利的高期待、失误与重建中成长为长期核心。", "Leclerc entered F1 with exceptional one-lap speed and grew into Ferrari's long-term reference through pressure, setbacks and rebuilding."],
    [
      ["快速晋级与个人失去", "Rapid rise and personal loss", "勒克莱尔在卡丁车时代与多位未来 F1 车手竞争，随后赢得 2016 年 GP3 与 2017 年 F2 冠军。晋级过程伴随教父 Jules Bianchi 和父亲 Hervé 的离世；他仍在关键比赛中完成任务，这段经历塑造了其公开形象中的克制与专注。", "Leclerc raced many future F1 rivals in karting before winning GP3 in 2016 and F2 in 2017. His rise was marked by the deaths of his godfather Jules Bianchi and father Hervé; continuing to perform through those losses shaped the restraint and focus associated with his public character."],
      ["一年证明，第二年进法拉利", "One year to earn Ferrari", "2018 年在 Sauber 的表现让法拉利迅速将他升入一队。2019 年巴林机械故障让首胜溜走，但他随后在斯帕取胜，并在蒙扎抵挡压力，为法拉利拿下极具象征意义的主场胜利。", "His 2018 Sauber season earned an immediate Ferrari promotion. A mechanical failure denied him victory in Bahrain in 2019, but he then won at Spa and resisted intense pressure at Monza to deliver a symbolic home victory for Ferrari."],
      ["争冠、挫折与摩纳哥", "Contention, setbacks and Monaco", "2022 年他以强势开局成为争冠者，最终获得年度亚军，但可靠性、策略和个人失误共同中断挑战。2024 年终于赢得家乡摩纳哥大奖赛，化解了多年在这条赛道积累的挫折。对法拉利而言，他既是速度标杆，也是长期工程连续性的核心。", "A strong start made him a 2022 title contender and eventual runner-up, but reliability, strategy and driver errors interrupted the campaign. Winning his home Monaco Grand Prix in 2024 resolved years of frustration there. For Ferrari he remains both a pace benchmark and a source of long-term technical continuity."],
    ],
    [["2016", "GP3 冠军", "GP3 champion", "在首个完整赛季夺冠。", "Won the championship in his first full campaign."], ["2017", "F2 冠军", "F2 champion", "以统治性表现直接晋级 F1。", "Earned direct promotion with a commanding season."], ["2019", "斯帕与蒙扎连胜", "Spa and Monza", "取得首胜并赢得法拉利主场。", "Took his first win and Ferrari's home race."], ["2024", "摩纳哥主场胜利", "Home win in Monaco", "首次在家乡大奖赛获胜。", "Finally won his home Grand Prix."]],
    ["勒克莱尔最突出的能力是建立轮胎温度后迅速完成极限排位圈，尤其擅长刹车释放和前轴控制。比赛管理已随经验成熟，但在抓地力边界上驾驶也意味着失误会来得突然。", "Leclerc's signature is producing an extreme qualifying lap as soon as the tyres are ready, aided by precise brake release and front-axle control. His race management has matured, though operating so close to the grip limit can make errors arrive abruptly."],
    "https://www.formula1.com/en/drivers/charles-leclerc",
  ),

  norris: story(
    ["诺里斯与迈凯伦一起经历了从中游、重建到世界冠军的完整周期；2025 年的头衔，是速度、耐心与心理恢复力共同完成的结果。", "Norris travelled with McLaren from the midfield through reconstruction to a world title; his 2025 crown was built on speed, patience and psychological recovery."],
    [
      ["青年组的连续胜利", "Winning through the ladder", "诺里斯八岁开始卡丁车，之后在一年内赢得多项初级方程式冠军。2017 年成为欧洲 F3 冠军，2018 年在 F2 获得亚军，同时担任迈凯伦测试与储备车手。2019 年，他与车队一起进入 F1，也选择在重建最困难的阶段长期留下。", "Norris began karting at eight and later won several junior single-seater titles in quick succession. He became European F3 champion in 2017 and F2 runner-up in 2018 while serving as a McLaren test and reserve driver. He entered F1 with the team in 2019 and stayed through the hardest phase of its rebuild."],
      ["从领奖台到首胜", "From podiums to victory", "2020 年奥地利的首个领奖台确认了速度，2021 年俄罗斯杆位则暴露了胜利决策的残酷：晚来的雨和继续使用光头胎的选择让首胜丢失。直到 2024 年迈阿密，他才完成突破；随后继续赢得荷兰、新加坡与阿布扎比，并帮助迈凯伦取得车队冠军。", "A first podium in Austria in 2020 confirmed his pace. Pole in Russia in 2021 exposed the brutality of victory decisions when late rain and the choice to stay on slicks cost him a first win. The breakthrough finally came in Miami in 2024, followed by victories in the Netherlands, Singapore and Abu Dhabi as McLaren won the Teams' title."],
      ["两分决定的世界冠军", "A title decided by two points", "2025 年他在赛季中段一度落后队友皮亚斯特里 34 分，同时面对维斯塔潘后程追击。诺里斯通过摩纳哥、银石等七场胜利完成反攻，并在阿布扎比以第三名守住两分优势，成为 F1 第 35 位世界冠军。", "In 2025 he fell 34 points behind team mate Piastri and later faced Verstappen's late charge. Seven victories—including Monaco and Silverstone—fuelled his comeback, and third place in Abu Dhabi preserved a two-point margin, making him F1's 35th World Champion."],
    ],
    [["2017", "欧洲 F3 冠军", "European F3 champion", "在强竞争青年组证明综合能力。", "Proved his all-round ability in a deep junior field."], ["2019", "迈凯伦 F1 首秀", "McLaren F1 debut", "与车队重建同步成长。", "Began growing alongside McLaren's rebuild."], ["2024", "迈阿密首胜", "First win in Miami", "结束漫长等待并开启多胜赛季。", "Ended a long wait and began a multi-win season."], ["2025", "世界冠军", "World Champion", "在三人争冠中以两分优势夺冠。", "Won a three-way title fight by two points."]],
    ["诺里斯擅长高速弯中的柔顺输入、长距离轮胎管理与变化抓地力下的节奏。他也公开谈论压力与自我怀疑，使其冠军故事不仅关于速度，也关于如何在高曝光环境中建立心理韧性。", "Norris combines smooth high-speed inputs, long-run tyre management and strong rhythm as grip changes. His openness about pressure and self-doubt makes the championship story one of psychological resilience as well as pace."],
    "https://www.formula1.com/en/drivers/lando-norris",
  ),

  piastri: story(
    ["皮亚斯特里的标志不是张扬，而是极短的学习曲线：连续青年组冠军后，他用冷静执行迅速成为 F1 分站冠军与争冠车手。", "Piastri is defined less by theatre than by a remarkably short learning curve, turning consecutive junior titles into F1 victories and championship contention."],
    [
      ["三年、三个关键冠军", "Three decisive titles", "皮亚斯特里从澳大利亚前往欧洲后，在 2019 年赢得雷诺欧洲杯，随后以新秀身份连续拿下 2020 年 F3 与 2021 年 F2 冠军。三项赛事使用不同赛车与轮胎，他却都能迅速建立稳定得分方式。", "After moving from Australia to Europe, Piastri won the 2019 Formula Renault Eurocup, then claimed the 2020 F3 and 2021 F2 titles as a rookie. Each category used different cars and tyres, yet he repeatedly found a stable route to points and championships."],
      ["等待与合同争议", "A wait and a contract dispute", "尽管赢得 F2，他在 2022 年只能担任 Alpine 储备车手。随后围绕 2023 年席位的合同争议进入仲裁，最终确认加盟迈凯伦。喧闹的场外过程没有影响首季表现：2023 年卡塔尔冲刺赛获胜，并在日本取得首个正赛领奖台。", "Despite winning F2, he spent 2022 as Alpine reserve. A contractual dispute over his 2023 future went to arbitration before his McLaren move was confirmed. The noise did not derail his debut season: he won the Qatar Sprint and took a first Grand Prix podium in Japan."],
      ["迅速成为争胜者", "Becoming a winner quickly", "2024 年匈牙利站取得首个大奖赛胜利，随后在巴库以长时间防守赢得第二胜。2025 年他与诺里斯正面争夺世界冠军，早期领先但最终未能守住优势；这段经历把他从执行型新秀推向需要管理整个赛季起伏的完整争冠者。", "He took his first Grand Prix win in Hungary in 2024, then defended for long stretches to win in Baku. A direct title fight with Norris in 2025 brought an early lead but not the championship, moving him from composed rookie to a contender learning to manage a full season's swings."],
    ],
    [["2019", "雷诺欧洲杯冠军", "Formula Renault champion", "完成欧洲单座赛车突破。", "Made his European single-seater breakthrough."], ["2020", "F3 冠军", "F3 champion", "新秀赛季夺冠。", "Won the championship as a rookie."], ["2021", "F2 冠军", "F2 champion", "连续第三年赢得年度锦标。", "Completed a third consecutive title season."], ["2024", "两场大奖赛胜利", "Two Grand Prix wins", "在匈牙利与阿塞拜疆取胜。", "Won in Hungary and Azerbaijan."]],
    ["皮亚斯特里的制动稳定性、空间判断和情绪控制非常突出。他通常不依赖激烈修正，而以少量、准确的输入保持轮胎和赛车平台稳定；需要继续拓展的是在困难周末中主动扭转趋势的能力。", "Piastri stands out for stable braking, spatial judgement and emotional control. He uses few, accurate corrections to protect tyres and platform stability; the next layer is becoming more proactive in reversing the momentum of difficult weekends."],
    "https://www.formula1.com/en/drivers/oscar-piastri",
  ),

  verstappen: story(
    ["维斯塔潘从 F1 最年轻车手成长为四届世界冠军，他的生涯始终围绕一个主题：把赛车控制边界推到对手难以复制的位置。", "Verstappen developed from F1's youngest starter into a four-time World Champion, consistently moving the car-control boundary beyond what rivals could reproduce."],
    [
      ["几乎没有缓冲的晋级", "A rise with almost no buffer", "维斯塔潘在欧洲与世界级卡丁车赛场建立统治力，2014 年只参加一个完整汽车赛季——欧洲 F3——便获得红牛 F1 机会。2015 年，他以 17 岁年龄代表 Toro Rosso 首秀，成为历史上最年轻的 F1 参赛车手。", "Verstappen dominated major European and world karting before completing only one full car-racing season, European F3 in 2014, prior to receiving an F1 opportunity. He debuted for Toro Rosso at 17 in 2015, becoming the youngest starter in championship history."],
      ["升入红牛即获胜", "Winning immediately at Red Bull", "2016 年西班牙站临时升入红牛后，他首场比赛就获胜。早期速度伴随激进防守和事故争议，但经验逐步把风险转化为可重复的执行。2019 至 2020 年，他已成为在梅赛德斯优势期最稳定的挑战者。", "Promoted to Red Bull for Spain in 2016, he won on his first appearance. Early speed came with aggressive defence and incidents, but experience turned risk into repeatable execution. By 2019 and 2020 he was the most consistent challenger during Mercedes' dominant period."],
      ["四连冠与新的落差", "Four titles and a new deficit", "2021 年与汉密尔顿的激烈对决带来首冠，随后在 2022、2023 与 2024 年连续卫冕；其中 2023 年成为史上最具统治力的个人赛季之一。2025 年他在赛车优势减弱后仍完成后程反扑，最终仅以两分负于诺里斯，进一步证明其竞争力并不只来自最快赛车。", "The intense 2021 fight with Hamilton delivered his first title, followed by championships in 2022, 2023 and 2024; the 2023 campaign was among the most dominant by any driver. With less machinery advantage in 2025 he mounted a late comeback and lost to Norris by only two points, reinforcing that his threat was not limited to the fastest car."],
    ],
    [["2015", "最年轻 F1 车手", "Youngest F1 starter", "17 岁完成大奖赛首秀。", "Made his Grand Prix debut at 17."], ["2016", "红牛首秀即胜", "Won on Red Bull debut", "在西班牙站取得首胜。", "Won his first race for Red Bull in Spain."], ["2021", "首个世界冠军", "First world title", "在全年对决后于阿布扎比夺冠。", "Won after a season-long fight ending in Abu Dhabi."], ["2021–2024", "四连冠", "Four consecutive titles", "建立属于红牛与维斯塔潘的冠军周期。", "Built a four-title Red Bull era."]],
    ["他的核心能力是极早地感知抓地力变化、在尾部不稳定时保持油门，以及用不同线路即时解决交通和轮胎问题。攻击性依然存在，但成熟后的维斯塔潘更擅长判断何时不必冒险。", "His core strengths are sensing grip change early, carrying throttle through rear instability and improvising lines around traffic or tyre problems. The aggression remains, but the mature Verstappen is better at recognising when risk is unnecessary."],
    "https://www.formula1.com/en/drivers/max-verstappen",
  ),

  hadjar: story(
    ["Hadjar 的晋级并非一路夺冠，而是靠速度、挫折后的修正和一届出色的新秀赛季赢得红牛席位。", "Hadjar reached Red Bull not through an uninterrupted run of titles, but through speed, recovery from setbacks and a compelling rookie season."],
    [
      ["不平顺的青年组路线", "An uneven junior route", "出生于巴黎的 Hadjar 从法国 F4 起步，随后参加欧洲与亚洲区域方程式。2022 年加入红牛青训并在 F3 赢得三场比赛、年度第四；2023 年升入 F2 后却经历无胜赛季，席位前景一度受到质疑。", "Paris-born Hadjar moved from French F4 through Formula Regional competition in Europe and Asia. He joined the Red Bull Junior Team in 2022, won three F3 races and finished fourth, but a winless first F2 season in 2023 raised doubts over his trajectory."],
      ["最后一轮失去 F2 冠军", "Losing F2 at the final round", "红牛继续支持他参加 2024 年 F2。四场胜利让 Hadjar 把冠军悬念带到阿布扎比收官战，但起步熄火使他最终负于 Bortoleto。虽然没有青年组总冠军，他的比赛速度和逆境反应足以获得 Racing Bulls 的 2025 席位。", "Red Bull backed a second F2 campaign in 2024. Four wins took the title fight to Abu Dhabi, where a stalled start ended his challenge against Bortoleto. He reached Racing Bulls for 2025 without a junior title, but with race pace and resilience firmly established."],
      ["领奖台换来晋升", "A podium that earned promotion", "F1 首秀在墨尔本湿地编队圈撞车，但他随后稳定进入 Q3，并在赞德沃特取得首个领奖台。新秀赛季拿到 51 分并领先队友 Lawson，最终在 2026 年升入红牛，与维斯塔潘搭档。", "His F1 debut ended with a formation-lap crash in wet Melbourne, but he recovered to become a regular Q3 runner and claimed a first podium at Zandvoort. Scoring 51 points and outscoring Lawson earned promotion to Red Bull alongside Verstappen for 2026."],
    ],
    [["2022", "F3 三胜", "Three F3 wins", "以年度第四确认速度。", "Finished fourth after three victories."], ["2024", "F2 亚军", "F2 runner-up", "四胜并把争冠带到最后一站。", "Took four wins and fought for the title to the finale."], ["2025", "首个 F1 领奖台", "First F1 podium", "在荷兰大奖赛登台。", "Reached the podium at the Dutch Grand Prix."], ["2026", "晋升红牛", "Promoted to Red Bull", "成为维斯塔潘队友。", "Joined Verstappen at the senior team."]],
    ["Hadjar 的速度来自积极前轴使用和果断制动，在排位赛尤其突出。他的情绪表达直接，早期容易被失误放大；成熟过程的关键是把这种强度转化为周末内持续、可恢复的执行。", "Hadjar uses the front axle aggressively and brakes decisively, particularly in qualifying. His direct emotional style can magnify mistakes; development depends on converting that intensity into recoverable, weekend-long execution."],
    "https://www.formula1.com/en/drivers/isack-hadjar",
  ),

  gasly: story(
    ["Gasly 的 F1 生涯经历了快速晋升、被降回二队与独立重建；蒙扎胜利让这段恢复过程有了最清楚的注脚。", "Gasly's F1 career moved through rapid promotion, demotion and personal reconstruction, with victory at Monza providing its clearest resolution."],
    [
      ["红牛体系中的冠军", "A champion in the Red Bull system", "Gasly 在雷诺方程式与 3.5 系列逐级晋升，加入红牛青训后赢得 2016 年 GP2 冠军。他还在日本超级方程式参赛，2017 年末获得 Toro Rosso F1 席位，并以成熟的轮胎管理快速站稳。", "Gasly progressed through Formula Renault and the 3.5 series before winning the 2016 GP2 title as a Red Bull junior. He also raced in Super Formula in Japan, then made his Toro Rosso debut late in 2017 and established himself through mature tyre management."],
      ["晋升失败后的重建", "Rebuilding after demotion", "2019 年升入红牛后，他难以适应赛车与车队环境，夏休后被调回 Toro Rosso。几个月后，他在巴西取得第二名；2020 年意大利大奖赛，他在策略变化和安全车重置后守住领先，成为 1996 年以来首位赢得 F1 的法国车手。", "Promoted to Red Bull in 2019, he struggled with the car and environment and was returned to Toro Rosso after the summer break. Months later he finished second in Brazil. At the 2020 Italian Grand Prix he converted a strategic reset into victory, becoming France's first F1 winner since 1996."],
      ["离开体系，成为车队核心", "Leaving the system to lead", "在 AlphaTauri 完成多个强势赛季后，Gasly 于 2023 年加盟 Alpine。法国厂队的组织与赛车表现多次波动，他却在狭窄工作窗口和混乱比赛中持续争取结果，逐步承担长期技术基准角色。", "After several strong AlphaTauri seasons, Gasly joined Alpine in 2023. The French works team has endured organisational and performance swings, but he has continued to extract results from narrow operating windows and become a long-term technical reference."],
    ],
    [["2016", "GP2 冠军", "GP2 champion", "赢得通往 F1 的关键年度。", "Won the key title on his route to F1."], ["2019", "首个领奖台", "First podium", "重回二队后在巴西获得第二。", "Finished second in Brazil after returning to Toro Rosso."], ["2020", "蒙扎首胜", "Monza victory", "赢得意大利大奖赛。", "Won the Italian Grand Prix."], ["2023", "加盟 Alpine", "Joined Alpine", "离开红牛体系开启独立阶段。", "Began an independent chapter outside Red Bull."]],
    ["Gasly 擅长在前轴明确、赛车平台稳定时持续建立节奏，对轮胎温度窗口也较敏感。他的最佳比赛往往来自复杂局势：先保持在机会范围内，再在重启或策略窗口中果断执行。", "Gasly builds rhythm when the front axle is clear and the platform stable, and is sensitive to tyre-temperature windows. His best races often develop in complexity: stay within reach, then execute decisively through a restart or strategy opening."],
    "https://www.formula1.com/en/drivers/pierre-gasly",
  ),

  lawson: story(
    ["Lawson 的职业标签是随时准备：无论 DTM、超级方程式还是临时替补 F1，他都必须在很少练习时间里立即交付。", "Lawson's defining trait is readiness: in DTM, Super Formula and substitute F1 appearances, he has repeatedly been asked to deliver with little preparation."],
    [
      ["从新西兰到多种赛车", "From New Zealand across disciplines", "Lawson 在新西兰完成卡丁车和初级方程式训练，前往欧洲后赢得 2019 年 Toyota Racing Series。加入红牛青训后，他参加 F3、F2，并在 2021 年 DTM 新秀赛季争夺冠军；不同重量、下压力与轮胎特性的赛车建立了广泛适应力。", "Lawson learned in New Zealand karting and junior formulae before winning the 2019 Toyota Racing Series. As a Red Bull junior he raced in F3 and F2 and fought for the 2021 DTM title as a rookie, developing adaptability across very different weights, downforce levels and tyres."],
      ["替补机会变成正式生涯", "A substitute chance becomes a career", "2023 年 Ricciardo 受伤后，Lawson 临时代表 AlphaTauri 出赛，在新加坡取得积分；同年他在日本超级方程式获得年度亚军。2024 年末再度替换 Ricciardo，直接的比赛风格让他取得 2025 年红牛席位。", "When Ricciardo was injured in 2023, Lawson substituted for AlphaTauri and scored in Singapore; he also finished runner-up in Super Formula that year. Replacing Ricciardo again late in 2024, his direct racecraft earned a Red Bull seat for 2025."],
      ["两站之后重新开始", "Starting again after two races", "2025 年红牛席位只维持两站，他随后与 Tsunoda 交换位置回到 Racing Bulls。快速降级是职业生涯重大打击，但他在二队重新建立稳定性，并留队成为 2026 年新秀 Lindblad 身边更有经验的一方。", "His 2025 Red Bull spell lasted only two rounds before he swapped places with Tsunoda and returned to Racing Bulls. The rapid demotion was a major setback, but he rebuilt consistency and stayed on as the experienced reference alongside rookie Lindblad in 2026."],
    ],
    [["2019", "Toyota Racing Series 冠军", "Toyota Racing Series champion", "赢得重要冬季方程式锦标。", "Won a major winter single-seater title."], ["2021", "DTM 亚军", "DTM runner-up", "新秀赛季争冠至收官。", "Fought for the title as a rookie."], ["2023", "F1 替补得分", "Scored as an F1 substitute", "在新加坡进入前十。", "Finished in the points in Singapore."], ["2025", "红牛升降", "Red Bull promotion and return", "两站后回归 Racing Bulls 并重建。", "Returned to Racing Bulls after two rounds and rebuilt."]],
    ["Lawson 的比赛风格直接，擅长在刹车区把赛车放入可争夺位置，也能快速适应陌生程序。风险在于有限抓地力下的强硬动作可能带来接触；其价值则在于很少需要漫长热身。", "Lawson races directly, placing the car into contestable positions under braking and learning unfamiliar procedures quickly. That firmness can create contact when grip is limited, but his value lies in needing very little warm-up time."],
    "https://www.formula1.com/en/drivers/liam-lawson",
  ),

  lindblad: story(
    ["Lindblad 是 2026 赛季唯一的新秀：从首次参加单座赛车到 F1 只用了四年，这既证明速度，也意味着学习仍在公开进行。", "Lindblad is 2026's only rookie; reaching F1 four years after his first single-seater race confirms his pace while leaving much of his learning visible in public."],
    [
      ["13 岁进入红牛视野", "On Red Bull's radar at 13", "Lindblad 拥有英国与瑞典家庭背景，在卡丁车时期即获得国际成绩。红牛在他 13 岁时签入青训；2022 年转入单座赛车后，他在 F4 与澳门赛事迅速展示速度，并以极短停留时间继续晋级。", "Of British and Swedish heritage, Lindblad built an international karting record before Red Bull signed him at 13. He moved into single-seaters in 2022, showed speed across F4 and Macau competition and advanced with unusually little time in each category."],
      ["F3、F2 与提前测试", "F3, F2 and early F1 running", "2024 年他在 F3 取得四胜并获年度第四。2025 年升入 F2 后，17 岁的他成为当时最年轻的分站冠军；红牛同时安排私人测试和三次 FP1，让他在正式晋级前熟悉 F1 的速度、程序与工程沟通。", "He won four F3 races and finished fourth in 2024. Moving to F2 in 2025, he became the category's youngest race winner at 17. Red Bull also provided private tests and three FP1 outings to expose him to F1 speed, procedures and engineering communication before promotion."],
      ["唯一新秀的公开学习", "Learning as the only rookie", "2026 年加盟 Racing Bulls，与 Lawson 搭档。相比已经在旧规则赛车中积累经验的对手，他必须同时学习 F1 与全新技术规则；因此评价他的关键不只是单站速度，而是失误后修正、轮胎理解和赛季内成长斜率。", "He joined Racing Bulls alongside Lawson in 2026. Unlike rivals with experience of the previous rules, he had to learn F1 and a new technical generation at once. His meaningful measures are therefore not only peak pace, but correction after mistakes, tyre understanding and rate of growth."],
    ],
    [["2022", "单座赛车首季", "Single-seater debut", "从卡丁车进入方程式。", "Moved from karting into formula cars."], ["2024", "F3 年度第四", "Fourth in F3", "新秀赛季取得四胜。", "Won four races as an F3 rookie."], ["2025", "F2 最年轻胜者", "Youngest F2 winner", "17 岁赢得分站。", "Won in F2 at age 17."], ["2026", "F1 首秀", "F1 debut", "作为赛季唯一新秀加入 Racing Bulls。", "Joined Racing Bulls as the season's only rookie."]],
    ["Lindblad 的青年组表现以起步阶段的进攻性、近距离跟车和快速建立单圈速度见长。F1 阶段最重要的是把这种即时速度转化为轮胎管理、能量部署和长距离一致性。", "Lindblad's junior record was built on aggressive opening laps, close following and rapid one-lap speed. In F1 the priority is translating that immediacy into tyre management, energy deployment and long-run consistency."],
    "https://www.formula1.com/en/drivers/arvid-lindblad",
  ),

  bearman: story(
    ["Bearman 用几次毫无预警的替补出场进入公众视野：他的价值不仅是年轻速度，更是在准备时间极少时保持冷静。", "Bearman reached a wide audience through substitute appearances with almost no warning, showing not only youthful speed but composure with minimal preparation."],
    [
      ["双 F4 冠军建立基础", "A double F4 foundation", "Bearman 出生于英格兰，在卡丁车后于 2021 年同时赢得意大利与 ADAC F4 冠军，随后加入 Ferrari Driver Academy。2022 年 F3 新秀赛季获得年度第三，2023 年升入 F2 并在巴库包揽冲刺赛与主赛胜利，迅速成为法拉利重点培养对象。", "Born in England, Bearman won both Italian and ADAC F4 in 2021 before joining the Ferrari Driver Academy. He finished third in F3 as a rookie in 2022, then moved to F2 and swept both Baku races in 2023, becoming one of Ferrari's priority prospects."],
      ["吉达的临时电话", "The call-up in Jeddah", "2024 年沙特大奖赛期间，Sainz 因阑尾炎退出，Bearman 在参加完 F2 杆位后临时接手 Ferrari。只有一次练习机会，他仍以第 11 位发车、第 7 位完赛。之后他又为 Haas 替补出赛，证明表现不是一次偶然。", "When Sainz withdrew with appendicitis at the 2024 Saudi Arabian Grand Prix, Bearman stepped into the Ferrari after taking the F2 pole. With only one practice session he qualified 11th and finished seventh. Further substitute drives for Haas showed that the performance was not a one-off."],
      ["完整赛季的另一种难度", "The different test of a full season", "2025 年加盟 Haas 后，任务从单次惊喜变成跨赛季稳定交付：理解轮胎、避免处罚、与工程团队建立共同语言，并在中游拥挤区争取每一个积分。", "A full-time Haas seat in 2025 changed the task from isolated surprise to season-long delivery: understanding tyres, avoiding penalties, building engineering language and fighting for every point in a compressed midfield."],
    ],
    [["2021", "意大利与 ADAC F4 双冠", "Italian and ADAC F4 titles", "同年赢得两项 F4 锦标。", "Won both championships in one season."], ["2022", "F3 年度第三", "Third in F3", "新秀赛季进入争冠集团。", "Joined the title group as a rookie."], ["2024", "法拉利替补首秀", "Ferrari substitute debut", "在吉达临时上场并获得第七。", "Finished seventh after a late call-up in Jeddah."], ["2025", "Haas 正式车手", "Full-time with Haas", "开始首个完整 F1 赛季。", "Began his first full F1 season."]],
    ["Bearman 的优势是快速建立刹车信心、愿意在近战中占据内线，以及在陌生环境下保持程序清楚。年轻带来的代价是偶尔过度进攻；长期价值取决于能否把峰值表现变成低失误的稳定周末。", "Bearman builds braking confidence quickly, commits to inside lines and keeps procedures clear in unfamiliar conditions. Youth can produce over-commitment; his long-term value depends on turning peak performances into consistently low-error weekends."],
    "https://www.formula1.com/en/drivers/oliver-bearman",
  ),

  colapinto: story(
    ["Colapinto 两次在赛季中途被推上 F1 正赛席位；每一次，他都必须在没有完整季前准备的情况下证明自己值得留下。", "Colapinto has twice been placed into an F1 race seat mid-season, each time needing to prove himself without a complete pre-season."],
    [
      ["从阿根廷走向欧洲", "From Argentina to Europe", "Colapinto 在阿根廷开始卡丁车，前往欧洲后赢得 2019 年西班牙 F4 冠军，并在 Formula Renault、欧洲勒芒系列与 F3 等不同项目中积累经验。2023 年加入 Williams Driver Academy，次年升入 F2 并取得分站胜利。", "Colapinto began karting in Argentina, moved to Europe and won the 2019 Spanish F4 title. Experience across Formula Renault, the European Le Mans Series and F3 followed. He joined the Williams Driver Academy in 2023, moved to F2 the next year and won a race."],
      ["23 年后的阿根廷 F1 车手", "Argentina returns to the F1 grid", "2024 年意大利站起，他替换 Sargeant 代表 Williams 完成余下赛季，成为 23 年来首位阿根廷 F1 车手。他很快在巴库与奥斯汀拿分，但后期事故也显示中途晋级和有限备件带来的压力。Williams 已签下 Sainz，使他无法获得 2025 正式席位。", "From the 2024 Italian Grand Prix he replaced Sargeant at Williams, becoming Argentina's first F1 driver in 23 years. He quickly scored in Baku and Austin, though late-season accidents showed the strain of a mid-year promotion and limited spares. With Sainz already signed, Williams had no 2025 race seat available."],
      ["第二次中途接班", "A second mid-season promotion", "Colapinto 转任 Alpine 储备车手，并在 2025 年第七站起替换 Doohan。艰难开局后，他逐渐缩小与 Gasly 的差距并获续约；2026 年前九场五次得分，开始把人气和瞬间速度转化为更完整的 F1 履历。", "He moved to Alpine as reserve and replaced Doohan from round seven of 2025. After a difficult start he reduced the gap to Gasly and retained the seat; five points finishes in the first nine races of 2026 began turning popularity and flashes of speed into a fuller F1 record."],
    ],
    [["2019", "西班牙 F4 冠军", "Spanish F4 champion", "完成欧洲单座赛车突破。", "Made his European single-seater breakthrough."], ["2023", "加入 Williams 青训", "Joined Williams Academy", "进入 F1 车队培养体系。", "Entered an F1 team development system."], ["2024", "Williams F1 首秀", "Williams F1 debut", "中途替补并两次得分。", "Scored twice after a mid-season call-up."], ["2025", "转投 Alpine 正赛", "Alpine race seat", "第二次在赛季中途接班。", "Took a second mid-season F1 opportunity."]],
    ["Colapinto 的特点是愿意在刹车区作快速决定，并能借助赛车滑动改变方向。这让他在街道赛和近战中有亮点，也要求他进一步控制轮胎温度、事故风险与整个周末的节奏。", "Colapinto makes quick braking-zone decisions and is comfortable rotating the car with controlled movement. That creates street-circuit and wheel-to-wheel highlights, while demanding continued work on tyre temperature, accident risk and full-weekend rhythm."],
    "https://www.formula1.com/en/drivers/franco-colapinto",
  ),

  bortoleto: story(
    ["Bortoleto 以连续两个新秀冠军进入 F1，代表巴西新一代车手重新回到完整的世界锦标赛舞台。", "Bortoleto reached F1 after winning two consecutive rookie titles, placing a new Brazilian generation back on the full-time world championship grid."],
    [
      ["从圣保罗到冠军阶梯", "From São Paulo to the title ladder", "Bortoleto 出生于圣保罗，较早前往欧洲参加卡丁车与意大利 F4。经过区域方程式磨炼后，他在 2023 年首个 F3 赛季夺冠；2024 年又以稳定得分和关键逆转赢得 F2 冠军，成为少数连续以新秀身份拿下两级锦标的车手。", "Born in São Paulo, Bortoleto moved early to European karting and Italian F4. After Formula Regional development he won F3 as a rookie in 2023, then combined consistency with key recovery drives to claim the 2024 F2 title—one of very few drivers to win both levels in consecutive rookie seasons."],
      ["在 Sauber 学习，为 Audi 准备", "Learning at Sauber for Audi", "McLaren 曾将他纳入青训，但 Sauber 提供了 2025 正式席位和未来 Audi 厂队计划。新秀赛季面对竞争力有限的赛车，他取得五次积分完赛，并与经验丰富的 Hülkenberg 合作建立工程基础。", "McLaren had included him in its development programme, but Sauber offered a 2025 race seat and a place in the future Audi works project. In a limited car he recorded five points finishes and worked alongside the experienced Hülkenberg to build an engineering foundation."],
      ["厂队第一代车手", "A first-generation works driver", "2026 年 Sauber 正式转为 Audi。Bortoleto 的角色不只是争取即时成绩，也包括参与新动力单元、底盘与团队流程的共同成熟；这使他的成长与一个全新厂队时代直接绑定。", "Sauber became Audi in 2026. Bortoleto's job extends beyond immediate results to helping a new power unit, chassis and team process mature, tying his own development directly to the first generation of an works programme."],
    ],
    [["2023", "F3 新秀冠军", "F3 rookie champion", "首季赢得年度冠军。", "Won the title in his first season."], ["2024", "F2 新秀冠军", "F2 rookie champion", "连续第二年在新组别夺冠。", "Won another title in a new category."], ["2025", "Sauber F1 首秀", "Sauber F1 debut", "取得五次积分完赛。", "Recorded five points finishes."], ["2026", "加入 Audi 厂队时代", "Audi works era", "成为 Audi 首季正式车手。", "Became a race driver for Audi's debut season."]],
    ["Bortoleto 的冠军方式强调稳定、轮胎意识与减少无谓失分，而不是每场都追求最激进的峰值。他能快速吸收长赛季信息，下一步是把这种成熟转化为 F1 排位速度和更强的第一圈位置感。", "Bortoleto's titles were built on consistency, tyre awareness and avoiding unnecessary losses rather than chasing the most aggressive peak every weekend. His next step is converting that maturity into F1 qualifying pace and stronger first-lap positioning."],
    "https://www.formula1.com/en/drivers/gabriel-bortoleto",
  ),

  sainz: story(
    ["Sainz 的生涯横跨五支车队，他每次转队都重新建立价值；适应力和工程判断使他成为重建项目特别需要的车手。", "Sainz has rebuilt his value across five teams, with adaptability and engineering judgement making him especially useful to projects in transition."],
    [
      ["红牛青训与多次转队", "Red Bull junior and repeated moves", "Sainz 在卡丁车和欧洲青年方程式成长，2014 年赢得 Formula Renault 3.5 冠军后，于 2015 年与 Verstappen 一同代表 Toro Rosso 首秀。随后转往 Renault，再于 2019 年加盟 McLaren；他在中游竞争中建立稳定得分和技术反馈声誉，并连续取得领奖台。", "Sainz developed through karting and European junior formulae, won Formula Renault 3.5 in 2014 and debuted with Verstappen at Toro Rosso in 2015. Moves to Renault and then McLaren in 2019 followed, where consistent scoring, technical feedback and podiums built his midfield reputation."],
      ["在法拉利成为分站冠军", "Becoming a winner at Ferrari", "2021 年加盟 Ferrari 后，他与 Leclerc 构成高度接近的组合。2022 年英国大奖赛取得首个杆位和首胜；2023 年新加坡结束红牛赛季连胜，2024 年则在阑尾手术后迅速复出赢得澳大利亚，并在墨西哥再胜。", "Joining Ferrari in 2021 placed him in a closely matched pairing with Leclerc. He took a first pole and win at the 2022 British Grand Prix, ended Red Bull's winning streak in Singapore in 2023, then returned rapidly from appendix surgery to win in Australia in 2024 and added Mexico."],
      ["选择 Williams 重建", "Choosing the Williams rebuild", "Hamilton 的加盟使 Ferrari 2025 阵容不再有他的位置。Sainz 选择 Williams，而不是短期等待顶级席位；他带来的多车队经验、设定比较和比赛流程，成为车队长期重建的一部分。", "Hamilton's arrival left no Ferrari seat for 2025. Sainz chose Williams rather than waiting for a short-term opening elsewhere, bringing multi-team experience, set-up comparison and race-process discipline into a long reconstruction."],
    ],
    [["2014", "FR3.5 冠军", "Formula Renault 3.5 champion", "以冠军身份获得 F1 席位。", "Converted the title into an F1 opportunity."], ["2019–2020", "McLaren 复兴", "McLaren revival", "连续领奖台并帮助车队回升。", "Scored podiums as the team moved forward."], ["2022", "F1 首胜", "First F1 win", "在银石从杆位获胜。", "Won from pole at Silverstone."], ["2025", "加盟 Williams", "Joined Williams", "把经验投入长期重建。", "Committed his experience to a long-term rebuild."]],
    ["Sainz 擅长通过长距离数据逐步改进设定，对策略窗口和轮胎退化判断清楚。他不总是最快适应单圈的人，却常能在周末推进中把赛车变成更可预测、可比赛的平台。", "Sainz improves set-up methodically through long-run data and reads strategy windows and degradation clearly. He is not always the quickest on the first lap of a weekend, but often turns the car into a more predictable racing platform as sessions progress."],
    "https://www.formula1.com/en/drivers/carlos-sainz",
  ),

  albon: story(
    ["Albon 的故事包含一次罕见的第二次机会：离开 F1、在 DTM 重整，再以更完整的车手身份成为 Williams 的技术基准。", "Albon's story contains a rare second chance: leaving F1, regrouping in DTM and returning as a more complete technical reference for Williams."],
    [
      ["从青训失去席位到 F2 复起", "Losing and rebuilding a junior career", "Albon 代表泰国参赛，早年曾进入 Red Bull 青训，但在成绩和资金压力下离开体系。他继续在 GP3 获得亚军，并在 2018 年 F2 与 Russell、Norris 争冠、最终第三；原计划转往 Formula E 前，Toro Rosso 提供了 2019 年 F1 机会。", "Racing for Thailand, Albon was once part of the Red Bull junior programme before results and funding pressure pushed him out. He rebuilt with runner-up in GP3 and third in the 2018 F2 fight against Russell and Norris. A planned Formula E move was replaced by a 2019 Toro Rosso F1 offer."],
      ["半年内升红牛，两年后离开", "Red Bull in six months, out after two years", "2019 年夏季他升入 Red Bull，与 Verstappen 搭档，并在 2020 年取得两个领奖台。但赛车特性、对比压力和事故让稳定表现困难，2021 年失去正式席位，只能担任储备并参加 DTM。", "He was promoted to Red Bull midway through 2019 and took two podiums in 2020. Yet the car's characteristics, comparison pressure and incidents made consistency difficult, and he lost the race seat for 2021, serving as reserve while competing in DTM."],
      ["在 Williams 重建身份", "Rebuilding his identity at Williams", "2022 年回归 F1 后，Albon 以轮胎管理、防守和在低下压力赛车中的稳定性持续取得超出预期的结果。他不再被定义为 Verstappen 的前队友，而成为 Williams 评估赛车和培养组织连续性的核心人物。", "Returning with Williams in 2022, Albon repeatedly exceeded expectations through tyre management, defence and stability in low-downforce cars. He was no longer defined as Verstappen's former team mate, but as a central reference for evaluating the car and building organisational continuity."],
    ],
    [["2018", "F2 年度第三", "Third in F2", "与 Russell、Norris 争夺冠军。", "Fought Russell and Norris for the title."], ["2019", "F1 首秀并晋升红牛", "F1 debut and Red Bull promotion", "半季内从 Toro Rosso 升入一队。", "Moved from Toro Rosso to Red Bull within half a season."], ["2020", "两个领奖台", "Two podiums", "在 Mugello 与巴林登台。", "Reached the podium at Mugello and Bahrain."], ["2022", "回归 Williams", "Williams comeback", "开始建立第二段 F1 生涯。", "Began a second F1 career."]],
    ["Albon 对低下压力和尾部活动的赛车有较强容忍度，防守时能精确管理电量、轮胎与线路。他的反馈强调建立可预测后轴，这也解释了为何他常能在困难赛车中保持信心。", "Albon tolerates low-downforce, mobile-rear cars and manages energy, tyres and lines precisely while defending. His feedback prioritises a predictable rear axle, helping explain why he often retains confidence in difficult machinery."],
    "https://www.formula1.com/en/drivers/alexander-albon",
  ),

  ocon: story(
    ["Ocon 从资源有限的家庭进入 F1，职业生涯多次面对席位中断；坚韧、防守和把握混乱比赛的能力贯穿始终。", "Ocon reached F1 from a family with limited resources and has repeatedly faced interruptions to his seat; resilience, defence and opportunism in chaotic races run through his career."],
    [
      ["家庭押注与青年冠军", "A family commitment and junior titles", "Ocon 的家庭为支持卡丁车生涯出售房屋并长期以房车为家。他在 2014 年击败 Verstappen 赢得欧洲 F3，2015 年再夺 GP3 冠军，进入 Mercedes 培养体系并于 2016 年中途代表 Manor 完成 F1 首秀。", "Ocon's family sold their home and lived from a motorhome to sustain his karting career. He beat Verstappen to the 2014 European F3 title, won GP3 in 2015, entered the Mercedes development structure and made a mid-season F1 debut with Manor in 2016."],
      ["强硬队友关系与失去席位", "Hard racing and losing a seat", "在 Force India，他以稳定拿分和强硬对抗建立声誉，但与 Pérez 的多次接触促使车队实施队内限制。2018 年车队所有权变化后，他失去 2019 正式席位，转任 Mercedes 储备；2020 年随 Renault 回归并在萨基尔取得首个领奖台。", "At Force India he scored consistently and raced firmly, though repeated contact with Pérez led to team restrictions. Ownership changes cost him a 2019 seat and he became Mercedes reserve, returning with Renault in 2020 and earning a first podium at Sakhir."],
      ["匈牙利胜利与 Haas 新章", "Hungary victory and Haas chapter", "2021 年匈牙利站首圈混乱后，Ocon 顶住 Vettel 压力获得首胜。此后在 Alpine 的内部关系与赛车波动中继续拿到关键领奖台，2025 年转投 Haas，尝试以经验帮助一支资源更紧凑的车队提高执行。", "After first-lap chaos in Hungary in 2021, Ocon resisted Vettel to take his first win. Further key podiums came amid Alpine's internal and technical swings before a 2025 move to Haas, where his experience was intended to improve execution in a leaner organisation."],
    ],
    [["2014", "欧洲 F3 冠军", "European F3 champion", "在同代强手中夺冠。", "Won against a strong generation of rivals."], ["2016", "Manor F1 首秀", "Manor F1 debut", "赛季中途进入 F1。", "Joined the grid mid-season."], ["2020", "首个领奖台", "First podium", "在萨基尔获得第二。", "Finished second at Sakhir."], ["2021", "匈牙利首胜", "Hungary victory", "抵挡压力赢得大奖赛。", "Withstood pressure to win his first Grand Prix."]],
    ["Ocon 以稳定刹车、强硬防守和高压力下减少错误见长。他愿意长期占据有限空间，这在争分时很有价值，也使队友对抗更容易升级；团队协作边界是其职业叙事的重要部分。", "Ocon is strongest under stable braking, firm defence and high-pressure error control. He is willing to occupy limited space for long periods—valuable in points fights, but capable of escalating team-mate battles. Managing that boundary is central to his career narrative."],
    "https://www.formula1.com/en/drivers/esteban-ocon",
  ),

  alonso: story(
    ["Alonso 的生涯跨越四分之一个世纪：两届冠军只是起点，他对比赛结构的理解、跨项目能力与持续竞争欲共同定义了其长寿。", "Alonso's career spans a quarter-century: two titles are only the beginning of a story defined by race intelligence, cross-discipline ability and persistent competitive drive."],
    [
      ["终结舒马赫时代", "Ending the Schumacher era", "Alonso 在西班牙卡丁车成长，1999 年赢得 Nissan 欧洲公开赛，2001 年代表 Minardi 首秀。担任 Renault 测试车手一年后回归，2003 年在匈牙利成为当时最年轻分站冠军，并于 2005、2006 年连续夺冠，终结 Ferrari 与 Schumacher 的统治周期。", "Alonso rose through Spanish karting, won the Euro Open by Nissan in 1999 and debuted with Minardi in 2001. After a Renault test year he returned, became the youngest race winner of the time in Hungary in 2003 and won the 2005 and 2006 titles, ending Ferrari and Schumacher's dominant run."],
      ["多次接近第三冠", "Repeatedly close to a third title", "2007 年加盟 McLaren 的争议赛季后，他回到 Renault，再于 2010 年转投 Ferrari。2010、2012 和 2013 年获得年度亚军，其中 2012 年以并非最快的赛车把争冠拖到收官。2015 年回到 McLaren，却受限于不成熟的 Honda 动力单元，2018 年后暂别 F1。", "After a contentious 2007 McLaren season he returned to Renault and joined Ferrari in 2010. He finished runner-up in 2010, 2012 and 2013, taking a car that was not consistently fastest to the 2012 finale. A 2015 McLaren return was constrained by an immature Honda power unit, and he stepped away after 2018."],
      ["跨项目与回归", "Cross-discipline success and return", "离开 F1 前后，他两次赢得勒芒 24 小时、获得世界耐力锦标赛冠军，也参加印第安纳波利斯 500 与达喀尔拉力赛。2021 年随 Alpine 回归，2023 年转投 Aston Martin 后单季八次登台。进入四十岁后，他仍以比赛阅读和准备深度保持竞争力。", "Around his F1 absence he won Le Mans twice and the World Endurance Championship, and contested the Indianapolis 500 and Dakar Rally. He returned with Alpine in 2021 and took eight podiums in his first Aston Martin season in 2023. Into his forties, race reading and preparation depth continue to sustain his level."],
    ],
    [["2001", "Minardi 首秀", "Minardi debut", "在后排赛车中开始 F1 生涯。", "Began F1 in back-of-grid machinery."], ["2005–2006", "两届世界冠军", "Two World Championships", "连续击败 Ferrari 时代的竞争。", "Won consecutive titles at the end of Ferrari's dominant cycle."], ["2018–2019", "勒芒与 WEC", "Le Mans and WEC", "两胜勒芒并赢得耐力世界冠军。", "Won Le Mans twice and the endurance world title."], ["2023", "Aston Martin 八次登台", "Eight Aston Martin podiums", "回到前排竞争。", "Returned to regular front-running contention."]],
    ["Alonso 的核心是比赛全局感：他能同时管理轮胎、能量、交通、对手策略与无线电信息。驾驶上擅长以快速方向输入建立前轴，并根据赛车特性大幅改变线路；真正稀有的是把这些判断持续执行数十圈。", "Alonso's core is whole-race awareness, simultaneously managing tyres, energy, traffic, rival strategy and radio information. He creates front-axle response with quick inputs and changes lines dramatically to suit the car; the rare quality is sustaining those decisions for an entire race."],
    "https://www.formula1.com/en/drivers/fernando-alonso",
  ),

  hulkenberg: story(
    ["Hülkenberg 曾长期背负“参赛最多却无领奖台”的标签；2025 年银石的第三名，终于让完整生涯不再被一个缺口概括。", "Hülkenberg long carried the label of most starts without a podium; third at Silverstone in 2025 finally prevented one missing result from summarising an entire career."],
    [
      ["几乎赢遍青年组", "Winning across the junior ladder", "Hülkenberg 赢得 A1 Grand Prix、欧洲 F3 与 2009 年 GP2 冠军，以极完整的青年履历在 2010 年加盟 Williams。新秀赛季巴西湿地排位拿到杆位，但赛季后仍失去席位；此后他在 Force India、Sauber 与 Renault 之间成为可靠的中坚车手。", "Hülkenberg won A1 Grand Prix, European F3 and the 2009 GP2 title before joining Williams in 2010. He took a surprise wet-weather pole in Brazil as a rookie yet still lost the seat, then became a reliable midfield reference across Force India, Sauber and Renault."],
      ["错过的机会与替补回归", "Missed chances and substitute returns", "他多次接近领奖台，却因事故、策略或赛车条件错失，包括 2012 年巴西争胜和 2019 年德国湿地。2020 与 2022 年作为临时替补立即上场的表现，证明速度仍在；2023 年 Haas 给了他完整回归机会。", "He came close to podiums several times but lost them through incidents, strategy or circumstance, notably while fighting for the lead in Brazil in 2012 and in wet Germany in 2019. Immediate substitute performances in 2020 and 2022 showed his pace remained, earning a full-time Haas return in 2023."],
      ["第 239 场终于登台", "A podium on start 239", "2025 年转投 Sauber，为 Audi 计划做准备。英国大奖赛从第 19 位发车，在多变天气中持续作出正确判断并抵挡 Hamilton，于第 239 次参赛获得第三。这不是突然变快，而是经验终于遇到可兑现的比赛。", "He joined Sauber in 2025 ahead of the Audi transition. Starting 19th at Silverstone, he made the right calls through changing weather and resisted Hamilton to finish third on his 239th start. It was not a sudden gain in speed, but experience finally meeting a race that allowed it to be converted."],
    ],
    [["2009", "GP2 冠军", "GP2 champion", "以新秀身份赢得冠军。", "Won the championship as a rookie."], ["2010", "巴西杆位", "Brazil pole", "新秀赛季湿地排位爆冷。", "Produced a surprise wet-weather pole as a rookie."], ["2023", "Haas 全职回归", "Full-time Haas return", "结束多年替补阶段。", "Ended several years of substitute appearances."], ["2025", "首个 F1 领奖台", "First F1 podium", "第 239 场从第 19 位冲上银石第三。", "Climbed from 19th to third at Silverstone on start 239."]],
    ["Hülkenberg 的长项是排位刹车精度、复杂条件下的程序判断和清晰技术反馈。他能迅速找到赛车限制，过去的问题更多是关键机会未能兑现；银石终于展示了其经验在正确条件下的完整价值。", "Hülkenberg's strengths are qualifying braking precision, procedural judgement in complex conditions and clear technical feedback. He locates a car's limitation quickly; historically the gap was converting rare opportunities, which Silverstone finally resolved."],
    "https://www.formula1.com/en/drivers/nico-hulkenberg",
  ),

  bottas: story(
    ["Bottas 既是十场大奖赛冠军，也是冠军车队周期中的关键二号得分手；离开主力席位后，他以经验成为 Cadillac 建队的第一代车手。", "Bottas is both a ten-time Grand Prix winner and a key scorer in a championship team cycle; after losing a race seat, his experience made him a founding Cadillac driver."],
    [
      ["从芬兰到 Williams", "From Finland to Williams", "Bottas 在欧洲卡丁车与雷诺方程式成长，2011 年赢得 GP3 冠军，并通过 Williams 测试车手工作进入 F1。他于 2013 年正式首秀，在 2014 至 2016 年多次登台，以稳定单圈和低失误率获得 Mercedes 青睐。", "Bottas progressed through European karting and Formula Renault, won GP3 in 2011 and entered F1 through Williams testing. He debuted in 2013 and scored repeated podiums from 2014 to 2016, with clean one-lap speed and a low error rate attracting Mercedes."],
      ["梅赛德斯五年与十胜", "Five Mercedes years and ten wins", "Rosberg 退役后，Bottas 于 2017 年加盟 Mercedes。他在五个赛季取得十胜、两次年度亚军，并为车队连续赢得制造商冠军提供大量积分。与 Hamilton 同队让他的不足持续被放大，但他在排位和特定赛道上具备真正的争胜速度。", "After Rosberg retired, Bottas joined Mercedes in 2017. Across five seasons he won ten races, finished championship runner-up twice and supplied major points for consecutive Constructors' titles. Comparison with Hamilton magnified every shortfall, yet his qualifying and circuit-specific pace was genuinely race-winning."],
      ["离开、储备与 Cadillac", "Exit, reserve role and Cadillac", "2022 至 2024 年他代表 Alfa Romeo／Sauber，转为带领中游项目的经验车手；2025 年失去正式席位后回归 Mercedes 担任储备。Cadillac 随后选择他与 Pérez 组成 2026 首发阵容，希望利用两人的 500 多场参赛经验建立新车队流程。", "He led the Alfa Romeo/Sauber midfield project from 2022 to 2024, then returned to Mercedes as reserve after losing his race seat for 2025. Cadillac selected him with Pérez for its 2026 debut, using their combined 500-plus starts to establish a new team's operating standards."],
    ],
    [["2011", "GP3 冠军", "GP3 champion", "赢得通往 Williams 的关键锦标。", "Won the title that led toward Williams."], ["2017", "Mercedes 首胜", "First Mercedes win", "在俄罗斯取得 F1 首胜。", "Took his first F1 victory in Russia."], ["2019–2020", "两届年度亚军", "Two championship runner-up finishes", "达到个人积分排名峰值。", "Reached his best championship positions."], ["2026", "Cadillac 创队车手", "Founding Cadillac driver", "回归正赛并参与第 11 支车队首季。", "Returned to race for the new 11th team."]],
    ["Bottas 的强项是整洁制动、稳定排位圈与在干净空气中的节奏。他的驾驶很少需要大幅修正，适合建立基准；过去在密集车流中的进攻效率较不突出，但对新车队而言，可重复性本身就是重要资产。", "Bottas is strongest through tidy braking, repeatable qualifying laps and pace in clean air. His driving rarely needs large corrections, making him a useful benchmark. Traffic aggression has been less distinctive, but repeatability itself is an asset to a new team."],
    "https://www.formula1.com/en/drivers/valtteri-bottas",
  ),

  perez: story(
    ["Pérez 从付费车手标签走到多站冠军，再在离开一年后成为 Cadillac 创队车手；轮胎管理和逆境反扑是其生涯最稳定的线索。", "Pérez moved beyond the pay-driver label to become a multiple winner and, after a year away, a founding Cadillac driver; tyre management and recovery drives are the most consistent threads."],
    [
      ["墨西哥支持与 Sauber 突破", "Mexican backing and Sauber breakthrough", "Pérez 年少前往欧洲，在德国与英国初级方程式成长，之后通过 GP2 进入 Sauber。2011 年首秀后，他在 2012 年三次登台，尤其马来西亚雨战几乎取胜；这使他 2013 年获得 McLaren 席位，但合作仅持续一季。", "Pérez moved to Europe young, developed through German and British junior racing and reached Sauber via GP2. After his 2011 debut he scored three podiums in 2012, nearly winning a wet Malaysian Grand Prix. That earned a 2013 McLaren seat, though the partnership lasted one season."],
      ["在 Force India 成为专家", "Becoming a specialist at Force India", "2014 至 2020 年，他在 Force India／Racing Point 长期效力，以保护轮胎、街道赛和后程反扑持续拿到超出预算水平的成绩。2020 年萨基尔站首圈跌至最后，却完成逆转赢得 F1 首胜；赛季结束仍因车队签下 Vettel 而失去席位。", "From 2014 to 2020 at Force India/Racing Point, tyre preservation, street-circuit performance and recovery drives produced results beyond the team's budget. At Sakhir in 2020 he fell to last on lap one and recovered to a first F1 win, yet still lost the seat when the team signed Vettel."],
      ["红牛冠军贡献与回归", "Red Bull contribution and return", "Red Bull 在 2021 年提供机会。Pérez 取得五场更多胜利，2023 年获年度亚军，也多次在策略上帮助 Verstappen；但 2024 年状态大幅下滑后离队。休赛一年后，他与 Bottas 被 Cadillac 选为 2026 创队组合。", "Red Bull offered a route back in 2021. Pérez added five wins, finished championship runner-up in 2023 and often supported Verstappen strategically, but a severe 2024 decline ended the partnership. After a year away he returned with Bottas as Cadillac's 2026 founding line-up."],
    ],
    [["2012", "Sauber 三次登台", "Three Sauber podiums", "以轮胎管理震动围场。", "Made his reputation through tyre management."], ["2020", "萨基尔首胜", "Sakhir victory", "从首圈最后位置逆转获胜。", "Recovered from last on lap one to win."], ["2021–2024", "Red Bull 六胜阶段", "Six-win Red Bull total", "参与车队与车手冠军周期。", "Contributed to a championship era."], ["2026", "Cadillac 回归", "Cadillac return", "以创队车手身份重返 F1。", "Returned as a founding driver."]],
    ["Pérez 最突出的能力是平顺后轴输入和轮胎保护，低抓地力街道赛尤其有效。他能在策略偏离主流时延长赛段；弱点通常出现在对前轴响应要求很高的排位圈，以及落后节奏后难以快速重置。", "Pérez excels through smooth rear-axle inputs and tyre preservation, especially on low-grip street circuits. He can extend stints on alternative strategies; weakness tends to appear when qualifying demands a very sharp front end or when a weekend's rhythm needs rapid resetting."],
    "https://www.formula1.com/en/drivers/sergio-perez",
  ),

  stroll: story(
    ["Stroll 的资源背景始终受到讨论，但他的 F1 履历也包含真正的湿地速度、领奖台与杆位；评价他需要同时看见两面。", "Stroll's financial background has always drawn discussion, but his F1 record also contains genuine wet-weather speed, podiums and a pole; both sides belong in an honest assessment."],
    [
      ["快速而资源充足的晋级", "A rapid, well-supported rise", "Stroll 在加拿大开始卡丁车并加入 Ferrari Driver Academy，2014 年赢得意大利 F4，2016 年以显著优势夺得欧洲 F3 冠军。家庭资源为测试和准备提供了少见条件，但他仍必须在赛道上完成冠军赛季，随后于 2017 年直接加盟 Williams。", "Stroll began karting in Canada, joined the Ferrari Driver Academy, won Italian F4 in 2014 and dominated European F3 in 2016. Family resources provided unusually extensive testing and preparation, but he still had to deliver the title before moving directly to Williams in 2017."],
      ["最年轻领奖台之一与湿地杆位", "A young podium and a wet pole", "新秀赛季巴库站获得第三，成为当时最年轻的 F1 领奖台车手之一。转投 Racing Point 后，2020 年成为高点：在土耳其湿地排位拿到杆位，并在该赛季两次登台。类似表现证明他在抓地力快速变化时有较强直觉。", "Third in Baku as a rookie made him one of F1's youngest podium finishers. After moving to Racing Point, 2020 became a high point: pole in wet Turkish qualifying and two podiums during the season. Such performances demonstrated strong instinct as grip changed rapidly."],
      ["Aston Martin 的长期位置", "A long-term Aston Martin role", "车队自 2021 年更名为 Aston Martin 后，他持续留队，并先后与 Vettel、Alonso 搭档。手腕与脚部伤病后迅速参加 2023 年揭幕战体现韧性；另一方面，跨赛季表现差距和与队友的积分差也持续带来外界质疑。", "He remained as the team became Aston Martin in 2021, partnering Vettel and later Alonso. Racing in the 2023 opener soon after wrist and foot injuries demonstrated resilience; at the same time, season-to-season inconsistency and points deficits to team mates continue to generate scrutiny."],
    ],
    [["2016", "欧洲 F3 冠军", "European F3 champion", "以统治性赛季晋级 F1。", "Earned promotion through a dominant season."], ["2017", "巴库领奖台", "Baku podium", "新秀赛季取得第三。", "Finished third as a rookie."], ["2020", "土耳其杆位", "Turkey pole", "在湿地排位击败全场。", "Beat the field in wet qualifying."], ["2021", "Aston Martin 新时代", "Aston Martin era", "成为车队长期阵容成员。", "Became part of the team's long-term line-up."]],
    ["Stroll 在低抓地力和湿地中常能快速建立信心，起步与首圈位置感也有亮点。主要问题是排位表现和跨周末稳定性，尤其当赛车需要非常精确的前轴控制时，他较难持续进入最佳窗口。", "Stroll often finds confidence quickly in low grip and wet conditions, with strong starts and first-lap positioning. The main limitation is qualifying and weekend-to-weekend consistency, particularly when the car demands exceptionally precise front-axle control."],
    "https://www.formula1.com/en/drivers/lance-stroll",
  ),
};
