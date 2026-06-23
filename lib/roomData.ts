export interface RoomData {
  id: string;
  name: string;
  nameEn: string;
  roomName: string;
  roomNameJp: string;
  catchcopy: string;
  quote: string;
  bgImage: string;
  themeColor: string;
  themeColorDark: string;
  themeColorLight: string;
  accentColor: string;
  textOnTheme: string;
  about: {
    intro: string;
    personality: string;
    likes: string[];
    favoritePlace: string;
    favoriteWord: string;
  };
  menuItems: { icon: string; title: string; desc: string; href: string }[];
  messages: string[];
  relatedLinks: {
    youtube?: string;
    note?: string;
    kindle?: string;
    articles?: { title: string; href: string }[];
  };
  otherCharacters: {
    id: string;
    name: string;
    title: string;
    color: string;
    href: string;
    emoji: string;
  }[];
}

const ALL_CHARS = [
  { id: "serena", name: "Serena", title: "心を整えるヒーリングガイド", color: "#c06090", href: "/serena", emoji: "🌸" },
  { id: "lumina", name: "Lumina", title: "未来を照らす星とタロットの案内人", color: "#c9a84c", href: "/lumina", emoji: "⭐" },
  { id: "chrono", name: "Chrono", title: "キャリアと未来設計のパートナー", color: "#4a8fd4", href: "/chrono", emoji: "🕐" },
  { id: "mana", name: "まな先生", title: "学びを支える先生", color: "#3aaecc", href: "/mana", emoji: "📖" },
  { id: "minori", name: "みのり", title: "暮らしと実家相談のナビゲーター", color: "#5aaa72", href: "/minori", emoji: "🍀" },
  { id: "akari", name: "あかり", title: "介護をやさしく案内するサポーター", color: "#e07aaa", href: "/akari", emoji: "💗" },
  { id: "shizuku", name: "しずく", title: "終活・葬儀をやさしく案内するサポーター", color: "#9a7fcc", href: "/shizuku", emoji: "💧" },
  { id: "waka", name: "和花", title: "日本文化ナビゲーター", color: "#d47a8a", href: "/waka", emoji: "🌸" },
];

export function otherChars(excludeId: string) {
  return ALL_CHARS.filter((c) => c.id !== excludeId);
}

// ─────────────────────────────────────────────
// Serena
// ─────────────────────────────────────────────
export const serenaData: RoomData = {
  id: "serena",
  name: "Serena",
  nameEn: "Serena",
  roomName: "Serena Room",
  roomNameJp: "セレナの庭園",
  catchcopy: "癒しの波動が、あなたを満たす",
  quote: "大丈夫。少しずつ進んでいきましょう。",
  bgImage: "/rooms/serenaroom.png",
  themeColor: "#b07fba",
  themeColorDark: "#7a4a8a",
  themeColorLight: "rgba(176,127,186,0.08)",
  accentColor: "#8ec8b0",
  textOnTheme: "#fff",
  about: {
    intro: "Serenaは、月の庭園に宿るヒーリングガイドです。心が疲れたとき、迷っているとき、そっと寄り添い、あなたの内なる光を思い出す手助けをします。感情を整え、魂の声に耳を傾ける時間を一緒に作りましょう。",
    personality: "優しく穏やか。いつも相手の気持ちに寄り添う。急かさず、ゆっくりと心を解きほぐしていく。",
    likes: ["ハーブティー", "月光浴", "パワーストーン", "ヒーリング音楽", "花を育てること"],
    favoritePlace: "月明かりの差し込む静かな庭園",
    favoriteWord: "あなたの光は、いつも誰かの希望になっています。",
  },
  menuItems: [
    { icon: "🌿", title: "Aura Garden", desc: "ヒーリング音楽とオーラ診断で、心を整える癒しの空間", href: "https://aura-garden.vercel.app" },
    { icon: "🔮", title: "オーラ診断", desc: "あなたのオーラカラーと今の波動を読み解きます", href: "https://aura-garden.vercel.app/aura" },
    { icon: "✨", title: "チャクラ診断", desc: "7つのチャクラのバランスを確認しましょう", href: "https://aura-garden.vercel.app/chakra" },
    { icon: "💎", title: "パワーストーン診断", desc: "今のあなたに必要なパワーストーンを見つけます", href: "https://aura-garden.vercel.app/crystal" },
    { icon: "🎵", title: "ヒーリング音楽", desc: "ソルフェジオ周波数とバイノーラルビートで深い癒しを", href: "https://aura-garden.vercel.app/music" },
  ],
  messages: [
    "今日は自分を責めるのをやめて、ただ存在することを許してあげましょう。",
    "あなたの感情は正しい。何を感じても、それは大切なメッセージです。",
    "小さな光も、暗闇の中では十分に輝けます。あなたも同じです。",
    "深呼吸を一つ。それだけで、心の扉が少し開きます。",
    "今日出会う人みんなに、静かな温かさを届けてみましょう。",
    "疲れたときは休む。これは逃げではなく、次の一歩への準備です。",
    "あなたの優しさは、想像以上に多くの人を救っています。",
  ],
  relatedLinks: {
    youtube: "https://www.youtube.com/@AuraGardenJP",
    note: "https://note.com/twinkle_lab",
    kindle: "https://www.amazon.co.jp/stores/Twinkle-Lab/author/",
    articles: [
      { title: "ヒーリング入門ガイド", href: "https://aura-garden.vercel.app/column" },
      { title: "パワーストーン図鑑", href: "https://aura-garden.vercel.app/crystal" },
    ],
  },
  otherCharacters: otherChars("serena"),
};

// ─────────────────────────────────────────────
// Lumina
// ─────────────────────────────────────────────
export const luminaData: RoomData = {
  id: "lumina",
  name: "Lumina",
  nameEn: "Lumina",
  roomName: "Lumina Room",
  roomNameJp: "ルミナの部屋",
  catchcopy: "星があなたに伝える、運命のメッセージ",
  quote: "未来はまだ白紙の物語です。",
  bgImage: "/rooms/ruminaroom.png",
  themeColor: "#6d4cb5",
  themeColorDark: "#3d2580",
  themeColorLight: "rgba(109,76,181,0.08)",
  accentColor: "#c9a84c",
  textOnTheme: "#fff",
  about: {
    intro: "Luminaは、星の図書館に宿る星詠みの案内人です。タロットカードと星の導きを通じて、あなたの魂が持つ可能性と使命を照らし出します。答えを押し付けるのではなく、あなた自身が気づくための光を灯します。",
    personality: "神秘的で落ち着いている。直感と知性を兼ね備え、物事の本質を見抜く力がある。",
    likes: ["タロットカード", "星を眺めること", "天球儀", "古い本", "紫水晶"],
    favoritePlace: "深夜の天文台",
    favoriteWord: "星は嘘をつかない。あなたの魂が知っていることを、星が教えてくれる。",
  },
  menuItems: [
    { icon: "🔮", title: "Twinkle Star Oracle", desc: "タロット・数秘術・AI総合鑑定など多彩な占いが揃う総合占いポータル", href: "/star" },
    { icon: "🃏", title: "タロット鑑定", desc: "ワンオラクルから5枚スプレッドまで。AIが丁寧に読み解きます", href: "/star/tarot" },
    { icon: "✨", title: "才能・使命診断", desc: "生年月日から数秘術で魂の使命を読み解きます", href: "/star/soul" },
    { icon: "💫", title: "AI総合鑑定", desc: "タロット・手相・数秘を組み合わせた深い鑑定レポート", href: "/star/sogo" },
    { icon: "💑", title: "相性診断", desc: "2人の相性を星とタロットで分析します", href: "/star/aishо" },
  ],
  messages: [
    "今日の星は「受け取り」のサイン。誰かからの親切を素直に受け取ってみてください。",
    "月が満ちるように、あなたの夢も少しずつ形になっています。焦らないで。",
    "直感が囁いていることに、今日は耳を傾けてみましょう。",
    "過去のカードはもう開けなくていい。今日引くカードが全てです。",
    "星座は生まれを決めるが、運命は選択が決める。あなたは今日も選べます。",
    "何かが終わるとき、必ず新しい扉が開いています。探してみてください。",
    "あなたの未来はまだ白紙の物語。今日、最初の一行を書きましょう。",
  ],
  relatedLinks: {
    note: "https://note.com/twinkle_lab",
    kindle: "https://www.amazon.co.jp/stores/Twinkle-Lab/author/",
    articles: [
      { title: "タロット入門ガイド", href: "/star" },
      { title: "数秘術で使命を知る", href: "/star/soul" },
    ],
  },
  otherCharacters: otherChars("lumina"),
};

// ─────────────────────────────────────────────
// Chrono
// ─────────────────────────────────────────────
export const chronoData: RoomData = {
  id: "chrono",
  name: "Chrono",
  nameEn: "Chrono",
  roomName: "Chrono Room",
  roomNameJp: "クロノの研究室",
  catchcopy: "未来の自分に、会いに行こう。",
  quote: "未来は行動によって変えられます。",
  bgImage: "/rooms/chronoroom.png",
  themeColor: "#2a5fa8",
  themeColorDark: "#1a3d70",
  themeColorLight: "rgba(42,95,168,0.08)",
  accentColor: "#c9a84c",
  textOnTheme: "#fff",
  about: {
    intro: "Chronoは、時計塔研究室に宿るキャリアナビゲーターです。論理的な分析と未来設計のサポートを通じて、転職・副業・AI活用など、あなたの仕事と人生の可能性を最大化するパートナーです。",
    personality: "論理的で冷静。目標達成に向けたロードマップを明確に示す。データと直感のバランスを大切にする。",
    likes: ["読書", "AI研究", "時計", "戦略ゲーム", "統計データ"],
    favoritePlace: "夜景が見える高層の研究室",
    favoriteWord: "未来は選べる。今日の選択が、明日のあなたをつくる。",
  },
  menuItems: [
    { icon: "🚀", title: "Career TimeTravel", desc: "転職・副業・AI活用の総合キャリア診断ポータル", href: "https://career-timetravel.com" },
    { icon: "💰", title: "年収診断", desc: "現在の市場価値と給与アップの戦略を診断します", href: "https://career-timetravel.com/diagnosis/salary" },
    { icon: "🔄", title: "転職市場価値診断", desc: "あなたのスキルと転職タイミングを分析", href: "https://career-timetravel.com/diagnosis/tenshoku" },
    { icon: "💼", title: "副業適性診断", desc: "あなたに向いている副業タイプを5パターンで診断", href: "https://career-timetravel.com/diagnosis/fukugyo" },
    { icon: "🤖", title: "AI活用診断", desc: "業務でAIをどう活かすか、適性とロードマップを提示", href: "https://career-timetravel.com/diagnosis/ai" },
  ],
  messages: [
    "今日の小さな行動が、3年後のあなたを大きく変えます。",
    "キャリアに正解はない。でも後悔しない選択はできます。",
    "AIを恐れるより、AIと協働する人間になることを選びましょう。",
    "転職は逃げではなく、戦略です。タイミングを見極めてください。",
    "スキルは資産。今日一つ、新しいことを学んでみましょう。",
    "副業は収入のためだけでなく、本業への刺激にもなります。",
    "5年後の自分は、今日何を選ぶかで決まります。",
  ],
  relatedLinks: {
    note: "https://note.com/twinkle_lab",
    kindle: "https://www.amazon.co.jp/stores/Twinkle-Lab/author/",
    articles: [
      { title: "転職コラム一覧", href: "https://career-timetravel.com/column" },
      { title: "AI副業入門ガイド", href: "https://career-timetravel.com/column/ai" },
    ],
  },
  otherCharacters: otherChars("chrono"),
};

// ─────────────────────────────────────────────
// Mana
// ─────────────────────────────────────────────
export const manaData: RoomData = {
  id: "mana",
  name: "まな先生",
  nameEn: "Mana Sensei",
  roomName: "Mana Sensei Room",
  roomNameJp: "まな先生の図書室",
  catchcopy: "学びは、人生をやさしく導いてくれる魔法です。",
  quote: "わからないを、できた！に変えよう。",
  bgImage: "/rooms/manaroom.png",
  themeColor: "#4a6fa8",
  themeColorDark: "#2a4a80",
  themeColorLight: "rgba(74,111,168,0.08)",
  accentColor: "#3aaecc",
  textOnTheme: "#fff",
  about: {
    intro: "まな先生は、未来の図書室に宿る学びのサポーターです。「わからない」を「できた！」に変えることが得意で、子どもから大人まで、それぞれのペースに合わせて丁寧に寄り添います。",
    personality: "明るく面倒見が良い。わからないことを責めず、できたことを一緒に喜ぶ。",
    likes: ["本", "勉強すること", "子どもたち", "文房具", "チョコレート"],
    favoritePlace: "大きな窓のある図書館",
    favoriteWord: "小さな一歩が、大きな未来につながります。",
  },
  menuItems: [
    { icon: "📚", title: "勉強ナビ", desc: "資格・スキルアップのおすすめ本をAIが紹介", href: "/study" },
    { icon: "🔢", title: "100マス計算", desc: "タイムアタック形式で計算力を鍛えよう", href: "/kids/100masu" },
    { icon: "✖️", title: "九九練習", desc: "楽しく九九をマスターするドリルアプリ", href: "/kids/kuku" },
    { icon: "🇯🇵", title: "日本語学習", desc: "外国人向け日本語学習サポートコンテンツ", href: "/kids/nihongo" },
    { icon: "🧠", title: "脳トレ", desc: "毎日5分の脳活性化トレーニング", href: "/kids/brain" },
  ],
  messages: [
    "今日覚えたことは、明日のあなたの武器になります。",
    "わからなくて当然。わかろうとすることが大切です。",
    "10分だけ集中してみましょう。それだけで十分です。",
    "できなかったことができるようになる瞬間が、学びの醍醐味です。",
    "休憩も勉強の一部。上手に休みながら続けましょう。",
    "好奇心を持つことが、最強の学習法です。",
    "今日の努力は、必ず未来のあなたに届きます。",
  ],
  relatedLinks: {
    note: "https://note.com/twinkle_lab",
    kindle: "https://www.amazon.co.jp/stores/Twinkle-Lab/author/",
    articles: [
      { title: "学習コンテンツ一覧", href: "/kids" },
      { title: "親子でAI学習のすすめ", href: "/heart" },
    ],
  },
  otherCharacters: otherChars("mana"),
};

// ─────────────────────────────────────────────
// Minori
// ─────────────────────────────────────────────
export const minoriData: RoomData = {
  id: "minori",
  name: "みのり",
  nameEn: "Minori",
  roomName: "Minori Room",
  roomNameJp: "みのりの相談室",
  catchcopy: "あなたの毎日に、そっと寄り添い心が軽くなるお手伝いをします。",
  quote: "ひとつずつ整理していきましょう。",
  bgImage: "/rooms/minoriroom.png",
  themeColor: "#5a8a5a",
  themeColorDark: "#3a6040",
  themeColorLight: "rgba(90,138,90,0.08)",
  accentColor: "#c8a87a",
  textOnTheme: "#fff",
  about: {
    intro: "みのりは、暮らしの相談室に宿るナビゲーターです。実家の問題、引越し、相続など、人生の大切な節目で「どうしたらいいの？」と迷ったとき、一緒に整理して前に進む手助けをします。",
    personality: "しっかり者で親しみやすい。複雑な問題も、一つひとつ丁寧に整理してくれる。",
    likes: ["家庭菜園", "カフェ巡り", "読書", "手作り料理", "観葉植物"],
    favoritePlace: "日差しの差し込む温かな窓辺",
    favoriteWord: "小さな一歩が未来を変えます。",
  },
  menuItems: [
    { icon: "🏠", title: "実家どうするナビ", desc: "実家の整理・売却・活用など総合的にサポート", href: "https://jikka-anshin.com" },
    { icon: "📦", title: "引越し手続きガイド", href: "https://jikka-anshin.com/column", desc: "引越しに必要な手続きをわかりやすく解説" },
    { icon: "⚖️", title: "相続ガイド", href: "https://jikka-anshin.com/column/sozoku", desc: "相続の基本から手続きまで丁寧に案内します" },
    { icon: "🗂️", title: "実家整理のすすめ", href: "https://jikka-anshin.com/column/seiri", desc: "実家の片付けを無理なく進めるコツ" },
  ],
  messages: [
    "今日は一つだけ、気になっていたことを調べてみましょう。",
    "家族のことで悩むのは、それだけ大切にしているから。",
    "完璧じゃなくていい。少しずつ前に進むだけで大丈夫です。",
    "情報を整理するだけで、不安は半分になります。",
    "一人で抱え込まないで。相談するだけで気持ちが楽になりますよ。",
    "実家のこと、先延ばしにしていませんか？今日が始め時です。",
    "家族との対話が、最良の解決策への第一歩です。",
  ],
  relatedLinks: {
    note: "https://note.com/twinkle_lab",
    articles: [
      { title: "実家問題コラム", href: "https://jikka-anshin.com/column" },
      { title: "相続診断ツール", href: "https://jikka-anshin.com/diagnosis" },
    ],
  },
  otherCharacters: otherChars("minori"),
};

// ─────────────────────────────────────────────
// Akari
// ─────────────────────────────────────────────
export const akariData: RoomData = {
  id: "akari",
  name: "あかり",
  nameEn: "Akari",
  roomName: "Akari Room",
  roomNameJp: "あかりの相談室",
  catchcopy: "やさしい気づきが、あなたの未来を照らします。",
  quote: "ひとりで抱え込まなくて大丈夫です。",
  bgImage: "/rooms/akariroom.png",
  themeColor: "#d06090",
  themeColorDark: "#a04070",
  themeColorLight: "rgba(208,96,144,0.08)",
  accentColor: "#f0c0a0",
  textOnTheme: "#fff",
  about: {
    intro: "あかりは、介護サポートラウンジに宿るサポーターです。介護は突然やってくることが多く、情報も制度も複雑でわかりにくいもの。あかりがわかりやすく、温かく案内します。一人で悩まないでください。",
    personality: "思いやりがあり安心感がある。複雑な介護情報もかみ砕いて、不安を取り除いてくれる。",
    likes: ["紅茶", "散歩", "ガーデニング", "手作りお菓子", "花"],
    favoritePlace: "花が咲いた穏やかな縁側",
    favoriteWord: "笑顔は未来を明るくする魔法だよ。",
  },
  menuItems: [
    { icon: "💗", title: "やさしい介護ナビ", desc: "介護の基本から施設探しまで総合的にサポート", href: "https://kaigo-anshin.net" },
    { icon: "📋", title: "介護保険ガイド", href: "https://kaigo-anshin.net/column/hoken", desc: "介護保険の申請方法・サービス内容を解説" },
    { icon: "🏥", title: "施設探しサポート", href: "https://kaigo-anshin.net/column/shisetsu", desc: "有料老人ホームから特養まで、選び方を解説" },
    { icon: "🏠", title: "在宅介護のすすめ", href: "https://kaigo-anshin.net/column/zaitaku", desc: "自宅での介護を支えるサービスと工夫" },
    { icon: "💬", title: "介護相談", href: "https://kaigo-anshin.net/diagnosis", desc: "今の状況に合った介護診断ツール" },
  ],
  messages: [
    "介護は長距離走。無理せず、休みながら走りましょう。",
    "今日は一つだけ、介護保険について調べてみませんか？",
    "家族を支えるあなたも、誰かに支えてもらっていいんです。",
    "完璧な介護より、笑顔で続けられる介護が大切です。",
    "プロに頼ることは甘えじゃない。賢い選択です。",
    "一人で悩まないで。相談するだけで解決策が見つかることがあります。",
    "あなたが元気でいることが、介護される方の一番の喜びです。",
  ],
  relatedLinks: {
    note: "https://note.com/twinkle_lab",
    articles: [
      { title: "介護コラム一覧", href: "https://kaigo-anshin.net/column" },
      { title: "介護診断ツール", href: "https://kaigo-anshin.net/diagnosis" },
    ],
  },
  otherCharacters: otherChars("akari"),
};

// ─────────────────────────────────────────────
// Shizuku
// ─────────────────────────────────────────────
export const shizukuData: RoomData = {
  id: "shizuku",
  name: "しずく",
  nameEn: "Shizuku",
  roomName: "Shizuku Room",
  roomNameJp: "しずくの書斎",
  catchcopy: "大切な想いを、未来へつなぐために。",
  quote: "大切な想いを未来へつなぎましょう。",
  bgImage: "/rooms/shizukuroom.png",
  themeColor: "#8060a8",
  themeColorDark: "#5a3a80",
  themeColorLight: "rgba(128,96,168,0.08)",
  accentColor: "#b0a0c8",
  textOnTheme: "#fff",
  about: {
    intro: "しずくは、月明かりの書斎に宿るサポーターです。「終活」「葬儀」という言葉は重く感じるかもしれませんが、しずくは静かに、丁寧に、大切なことを一緒に考えます。後悔のない選択のために、そっと寄り添います。",
    personality: "落ち着いていて丁寧。難しい話題も優しく、誠実に向き合ってくれる。",
    likes: ["手紙を書くこと", "読書", "静かな音楽", "紫陽花", "ハーブティー"],
    favoritePlace: "月明かりが差し込む静かな書斎",
    favoriteWord: "今ある時間は、未来への贈り物。",
  },
  menuItems: [
    { icon: "📖", title: "やさしい葬儀ナビ", desc: "葬儀の基本から費用まで、わかりやすく解説", href: "https://sougi-anshin.net" },
    { icon: "📝", title: "終活ガイド", href: "https://sougi-anshin.net/column/shukatu", desc: "終活の始め方から進め方まで丁寧に案内" },
    { icon: "🪦", title: "お墓・供養ガイド", href: "https://sougi-anshin.net/column/ohaka", desc: "お墓の種類・選び方・供養の方法を解説" },
    { icon: "✒️", title: "エンディングノート", href: "https://sougi-anshin.net/column/ending", desc: "自分らしく生きた証を残すためのガイド" },
    { icon: "✉️", title: "大切な人への手紙", href: "https://sougi-anshin.net/column/tegami", desc: "想いを言葉にして届けるお手伝い" },
  ],
  messages: [
    "今日は、大切な人への感謝を一言伝えてみましょう。",
    "終活は死の準備ではなく、生を大切にすることです。",
    "エンディングノートは、自分への贈り物でもあります。",
    "後悔を減らすために、今日できることをひとつ始めましょう。",
    "家族と「もしもの話」をすることは、愛情の形です。",
    "思い出は消えない。大切に残しておきましょう。",
    "今ある時間を、大切な人と丁寧に過ごしてください。",
  ],
  relatedLinks: {
    note: "https://note.com/twinkle_lab",
    articles: [
      { title: "葬儀・終活コラム", href: "https://sougi-anshin.net/column" },
      { title: "終活診断ツール", href: "https://sougi-anshin.net/diagnosis" },
    ],
  },
  otherCharacters: otherChars("shizuku"),
};

// ─────────────────────────────────────────────
// Waka
// ─────────────────────────────────────────────
export const wakaData: RoomData = {
  id: "waka",
  name: "和花",
  nameEn: "Waka",
  roomName: "Waka Room",
  roomNameJp: "和花の和室",
  catchcopy: "和の心は、静かに咲く花のようにあなたの日常をやさしく照らします。",
  quote: "日本の素敵な文化をご案内します。",
  bgImage: "/rooms/wakaroom.png",
  themeColor: "#c06080",
  themeColorDark: "#8a3050",
  themeColorLight: "rgba(192,96,128,0.08)",
  accentColor: "#c8985a",
  textOnTheme: "#fff",
  about: {
    intro: "和花は、和花の縁側に宿る日本文化ナビゲーターです。百人一首、神社仏閣、季節の行事、和の作法…日本の美しい文化を、上品に、親しみやすく紹介します。日本の奥深さを一緒に発見しましょう。",
    personality: "上品で親しみやすい。伝統を大切にしながら、現代の視点で日本文化の魅力を伝える。",
    likes: ["和菓子", "神社巡り", "百人一首", "茶道", "着物"],
    favoritePlace: "桜が咲き乱れる神社の境内",
    favoriteWord: "和敬清寂 — 和やかに、敬い、清らかに、静かに。",
  },
  menuItems: [
    { icon: "📜", title: "百人一首", desc: "百人一首の歌を解説付きで学べるコンテンツ", href: "/kids/hyakunin" },
    { icon: "⛩️", title: "神社図鑑", desc: "全国の神社と御利益を紹介するガイド", href: "/kids/jinja" },
    { icon: "🌸", title: "日本文化図鑑", desc: "伝統行事・季節の風習・和の作法を解説", href: "/kids/culture" },
    { icon: "🍡", title: "和菓子紹介", desc: "季節の和菓子と和文化の深いつながり", href: "/kids/wagashi" },
  ],
  messages: [
    "今日は一つ、日本語の美しい言葉を調べてみましょう。",
    "季節を感じることが、和の心の始まりです。",
    "神社に参拝する気持ちは、自分と向き合う時間でもあります。",
    "和菓子には、職人の四季への想いが込められています。",
    "百人一首の歌には、千年前の人の心が宿っています。",
    "「間（ま）」の文化を意識して、今日は少しゆっくり過ごしましょう。",
    "日本の美しさは、細部に宿っています。",
  ],
  relatedLinks: {
    note: "https://note.com/twinkle_lab",
    kindle: "https://www.amazon.co.jp/stores/Twinkle-Lab/author/",
    articles: [
      { title: "日本文化コラム", href: "/kids/culture" },
      { title: "百人一首を学ぶ", href: "/kids/hyakunin" },
    ],
  },
  otherCharacters: otherChars("waka"),
};
