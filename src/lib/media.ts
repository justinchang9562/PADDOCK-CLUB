import type { LocalizedText } from "./types";

export type MediaCredit = {
  file: string;
  subject: LocalizedText;
  creator: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  note?: LocalizedText;
};

const documentaryMediaCredits: MediaCredit[] = [
  {
    file: "mclaren-mcl40.jpg",
    subject: { zh: "2026 McLaren MCL40（Oscar Piastri）", en: "2026 McLaren MCL40 (Oscar Piastri)" },
    creator: "Yu Chu Chin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:McLaren_MCL40_of_Oscar_Piastri_(028A8508).jpg",
  },
  {
    file: "mercedes-w17.jpg",
    subject: { zh: "2026 Mercedes W17（George Russell）", en: "2026 Mercedes W17 (George Russell)" },
    creator: "Yu Chu Chin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mercedes-AMG_F1_W17_E_Performance_of_George_Russell_(028A8051).jpg",
  },
  {
    file: "ferrari-sf26.jpg",
    subject: { zh: "2026 Ferrari SF-26（Lewis Hamilton）", en: "2026 Ferrari SF-26 (Lewis Hamilton)" },
    creator: "Yu Chu Chin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ferrari_SF-26_of_Lewis_Hamilton_(028A8067).jpg",
  },
  {
    file: "red-bull-rb22.jpg",
    subject: { zh: "2026 Red Bull RB22（Max Verstappen）", en: "2026 Red Bull RB22 (Max Verstappen)" },
    creator: "Yu Chu Chin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Red_Bull_Racing_RB22_of_Max_Verstappen_(028A8078).jpg",
  },
  {
    file: "alpine-a526.jpg",
    subject: { zh: "2026 Alpine A526（Franco Colapinto）", en: "2026 Alpine A526 (Franco Colapinto)" },
    creator: "Yu Chu Chin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Alpine_A526_of_Franco_Colapinto_(028A8049).jpg",
  },
  {
    file: "racing-bulls-vcarb03.jpg",
    subject: { zh: "2026 Racing Bulls VCARB 03（Liam Lawson）", en: "2026 Racing Bulls VCARB 03 (Liam Lawson)" },
    creator: "Yu Chu Chin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:RB_VCARB_03_of_Liam_Lawson_(028A8054).jpg",
  },
  {
    file: "haas-vf26.jpg",
    subject: { zh: "2026 Haas VF-26（Oliver Bearman）", en: "2026 Haas VF-26 (Oliver Bearman)" },
    creator: "Yu Chu Chin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Haas_VF-26_of_Oliver_Bearman_(028A8069).jpg",
  },
  {
    file: "williams-fw48.jpg",
    subject: { zh: "2026 Williams FW48（Alexander Albon）", en: "2026 Williams FW48 (Alexander Albon)" },
    creator: "Yu Chu Chin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Williams_FW48_of_Alexander_Albon_(028A8065).jpg",
  },
  {
    file: "audi-r26.jpg",
    subject: { zh: "2026 Audi R26（Gabriel Bortoleto）", en: "2026 Audi R26 (Gabriel Bortoleto)" },
    creator: "Yu Chu Chin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Audi_R26_of_Gabriel_Bortoleto_(028A8492).jpg",
  },
  {
    file: "aston-martin-amr26.jpg",
    subject: { zh: "2026 Aston Martin AMR26", en: "2026 Aston Martin AMR26" },
    creator: "Liauzh",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2026_Chinese_GP_-_Aston_Martin_-_AMR26.jpg",
  },
  {
    file: "cadillac-mac26.jpg",
    subject: { zh: "2026 Cadillac MAC-26（Sergio Pérez）", en: "2026 Cadillac MAC-26 (Sergio Pérez)" },
    creator: "Yu Chu Chin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cadillac_MAC-26_of_Sergio_P%C3%A9rez_(028A8062).jpg",
  },
  {
    file: "kimi-antonelli.jpg",
    subject: { zh: "Kimi Antonelli，2026 澳大利亚大奖赛", en: "Kimi Antonelli at the 2026 Australian Grand Prix" },
    creator: "Yu Chu Chin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kimi_Antonelli_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_(028A7923)_cropped.jpg",
    note: { zh: "使用 Wikimedia Commons 上的裁切版本。", en: "Uses the cropped version hosted on Wikimedia Commons." },
  },
  {
    file: "george-russell.jpg",
    subject: { zh: "George Russell，2026 澳大利亚大奖赛领奖台", en: "George Russell, 2026 Australian Grand Prix podium" },
    creator: "Yu Chu Chin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Podium_celebration_at_the_2026_Australian_Grand_Prix_(028A8767)_cropped.jpg",
    note: { zh: "使用 Wikimedia Commons 上的裁切版本。", en: "Uses the cropped version hosted on Wikimedia Commons." },
  },
  {
    file: "lando-norris.jpg",
    subject: { zh: "Lando Norris，2026 中国大奖赛车手巡游", en: "Lando Norris at the 2026 Chinese Grand Prix drivers' parade" },
    creator: "Liauzh; crop by XxAlanEZExX",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2026_Chinese_GP_-_Lando_Norris_(cropped).jpg",
    note: { zh: "从原图裁切；未进一步修改。", en: "Cropped from the original; no further editorial modification." },
  },
  {
    file: "lewis-hamilton.jpg",
    subject: { zh: "Lewis Hamilton 前往银石测试", en: "Lewis Hamilton heading to a Silverstone test" },
    creator: "John Ferguson",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:LewisHamilton.jpg",
  },
  {
    file: "silverstone.jpg",
    subject: { zh: "银石赛道航拍", en: "Aerial view of Silverstone Circuit" },
    creator: "Steve Knight",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Silverstone_Circuit_(14624952224).jpg",
  },
];

const studioDerivatives = [
  ["studio/mercedes-w17-studio.png", "mercedes-w17.jpg"],
  ["studio/ferrari-sf26-studio.png", "ferrari-sf26.jpg"],
  ["studio/mclaren-mcl40-studio.png", "mclaren-mcl40.jpg"],
  ["studio/red-bull-rb22-studio.png", "red-bull-rb22.jpg"],
  ["studio/alpine-a526-studio.png", "alpine-a526.jpg"],
  ["studio/racing-bulls-vcarb03-studio.png", "racing-bulls-vcarb03.jpg"],
  ["studio/haas-vf26-studio.png", "haas-vf26.jpg"],
  ["studio/williams-fw48-studio.png", "williams-fw48.jpg"],
  ["studio/audi-r26-studio.png", "audi-r26.jpg"],
  ["studio/aston-martin-amr26-studio.png", "aston-martin-amr26.jpg"],
  ["studio/cadillac-mac26-studio.png", "cadillac-mac26.jpg"],
] as const;

const studioMediaCredits: MediaCredit[] = studioDerivatives.map(([file, sourceFile]) => {
  const source = documentaryMediaCredits.find((credit) => credit.file === sourceFile)!;
  return {
    file,
    subject: {
      zh: `${source.subject.zh} · 白色影棚展示`,
      en: `${source.subject.en} · White studio presentation`,
    },
    creator: source.creator,
    license: source.license,
    licenseUrl: source.licenseUrl,
    sourceUrl: source.sourceUrl,
    note: {
      zh: `以 ${sourceFile} 为来源，由 OpenAI imagegen 制作 AI 辅助影棚视觉；细小标识与工程细节可能不准确。`,
      en: `AI-assisted studio visual created with OpenAI imagegen from ${sourceFile}; small markings and engineering details may be inaccurate.`,
    },
  };
});

const supersededDocumentaryFiles = new Set(["kimi-antonelli.jpg", "george-russell.jpg", "lando-norris.jpg", "lewis-hamilton.jpg", "silverstone.jpg"]);

const officialDriverPortraits = [
  ["antonelli", "Kimi Antonelli", "kimi-antonelli"],
  ["russell", "George Russell", "george-russell"],
  ["hamilton", "Lewis Hamilton", "lewis-hamilton"],
  ["leclerc", "Charles Leclerc", "charles-leclerc"],
  ["norris", "Lando Norris", "lando-norris"],
  ["piastri", "Oscar Piastri", "oscar-piastri"],
  ["verstappen", "Max Verstappen", "max-verstappen"],
  ["hadjar", "Isack Hadjar", "isack-hadjar"],
  ["gasly", "Pierre Gasly", "pierre-gasly"],
  ["lawson", "Liam Lawson", "liam-lawson"],
  ["lindblad", "Arvid Lindblad", "arvid-lindblad"],
  ["bearman", "Oliver Bearman", "oliver-bearman"],
  ["colapinto", "Franco Colapinto", "franco-colapinto"],
  ["bortoleto", "Gabriel Bortoleto", "gabriel-bortoleto"],
  ["sainz", "Carlos Sainz", "carlos-sainz"],
  ["albon", "Alexander Albon", "alexander-albon"],
  ["ocon", "Esteban Ocon", "esteban-ocon"],
  ["alonso", "Fernando Alonso", "fernando-alonso"],
  ["hulkenberg", "Nico Hülkenberg", "nico-hulkenberg"],
  ["bottas", "Valtteri Bottas", "valtteri-bottas"],
  ["perez", "Sergio Pérez", "sergio-perez"],
  ["stroll", "Lance Stroll", "lance-stroll"],
] as const;

const officialDriverMediaCredits: MediaCredit[] = officialDriverPortraits.map(([id, name, slug]) => ({
  file: `drivers/2026/${id}.webp`,
  subject: { zh: `${name} · 2026 官方车手定妆素材`, en: `${name} · 2026 official driver portrait asset` },
  creator: "Formula One Digital Media Limited",
  license: "仅限个人、非商业原型使用",
  licenseUrl: "https://www.formula1.com/en/information/legal-notices.7egvZU48hzrypubGBNcQKt",
  sourceUrl: `https://www.formula1.com/en/drivers/${slug}`,
  note: {
    zh: "来自 Formula1.com 官方车手资料页；公开发布、分发或商业使用前必须另行取得许可或替换素材。",
    en: "Sourced from the official Formula1.com driver profile; obtain permission or replace the asset before public distribution or commercial use.",
  },
}));

const officialCircuitHeaders = [
  ["albert-park", "Albert Park Grand Prix Circuit", "australia"],
  ["shanghai", "Shanghai International Circuit", "china"],
  ["suzuka", "Suzuka International Racing Course", "japan"],
  ["miami", "Miami International Autodrome", "miami"],
  ["gilles-villeneuve", "Circuit Gilles-Villeneuve", "canada"],
  ["monaco", "Circuit de Monaco", "monaco"],
  ["barcelona", "Circuit de Barcelona-Catalunya", "barcelona-catalunya"],
  ["red-bull-ring", "Red Bull Ring", "austria"],
  ["silverstone", "Silverstone Circuit", "great-britain"],
  ["spa", "Circuit de Spa-Francorchamps", "belgium"],
  ["hungaroring", "Hungaroring", "hungary"],
  ["zandvoort", "Circuit Zandvoort", "netherlands"],
  ["monza", "Autodromo Nazionale Monza", "italy"],
  ["madrid", "Madring", "spain"],
  ["baku", "Baku City Circuit", "azerbaijan"],
  ["marina-bay", "Marina Bay Street Circuit", "singapore"],
  ["cota", "Circuit of the Americas", "united-states"],
  ["mexico-city", "Autódromo Hermanos Rodríguez", "mexico"],
  ["interlagos", "Autódromo José Carlos Pace", "brazil"],
  ["las-vegas", "Las Vegas Strip Circuit", "las-vegas"],
  ["lusail", "Lusail International Circuit", "qatar"],
  ["yas-marina", "Yas Marina Circuit", "united-arab-emirates"],
] as const;

const officialCircuitMediaCredits: MediaCredit[] = officialCircuitHeaders.flatMap(([id, name, slug]) => {
  const shared = {
    creator: "Formula One Digital Media Limited",
    license: "仅限个人、非商业原型使用",
    licenseUrl: "https://www.formula1.com/en/information/legal-notices.7egvZU48hzrypubGBNcQKt",
    sourceUrl: `https://www.formula1.com/en/racing/2026/${slug}`,
    note: {
      zh: "来自 Formula1.com 2026 官方赛事页面；公开发布、分发或商业使用前必须另行取得许可或替换素材。",
      en: "Sourced from the official Formula1.com 2026 race page; obtain permission or replace the asset before public distribution or commercial use.",
    },
  };
  return [
    { ...shared, file: `circuits/${id}.webp`, subject: { zh: `${name} · 官方赛道页面头图`, en: `${name} · official race-page header` } },
    { ...shared, file: `circuits/layouts/${id}.png`, subject: { zh: `${name} · 2026 官方赛道布局图`, en: `${name} · official 2026 circuit layout` } },
  ];
});

export const mediaCredits: MediaCredit[] = [
  ...documentaryMediaCredits.filter((credit) => !supersededDocumentaryFiles.has(credit.file)),
  ...studioMediaCredits,
  ...officialDriverMediaCredits,
  ...officialCircuitMediaCredits,
];
