"use client";

import React, { useState } from "react";

const GRADES = ["小1", "小2", "小3", "小4", "小5", "小6"];

const SUBJECTS: Record<string, string[]> = {
  算数: ["くりあがり", "くりさがり", "かけ算・九九", "わり算", "分数", "小数", "図形", "面積・体積", "比・割合", "文章題"],
  国語: ["ひらがな", "カタカナ", "漢字", "読み取り・読解", "作文", "音読", "ことわざ・慣用句", "敬語"],
  英語: ["アルファベット", "英単語", "英会話フレーズ", "英文読解", "英作文", "英文法"],
};

type DrillItem = {
  level: "やさしい" | "ふつう" | "むずかしい";
  name: string;
  reason: string;
};

type ResultState = {
  status: "idle" | "loading" | "done" | "error";
  items: DrillItem[];
  error?: string;
  grade?: string;
  subject?: string;
  unit?: string;
};

const AMAZON_TAG = "sincere1229-22";

type EssayBook = { title: string; level: "★☆☆" | "★★☆" | "★★★"; point: string };

const ESSAY_LOW: EssayBook[] = [
  { title: "ぐりとぐら", level: "★☆☆", point: "食と友情の感想が自然に出る" },
  { title: "しろくまちゃんのほっとけーき", level: "★☆☆", point: "「自分もやってみたい」と書きやすい" },
  { title: "ねずみくんのチョッキ", level: "★☆☆", point: "友達に優しくすることが1テーマで書きやすい" },
  { title: "はじめてのおつかい", level: "★☆☆", point: "自分の経験と重ねやすく「勇気を出した」と書ける" },
  { title: "11ぴきのねこ", level: "★☆☆", point: "仲間と力を合わせる場面が明確で感想が出やすい" },
  { title: "あおくんときいろちゃん", level: "★☆☆", point: "「違いを認める」テーマが低学年にも伝わりやすい" },
  { title: "100万回生きたねこ", level: "★★☆", point: "「愛すること」がテーマ。印象に残る場面が明確" },
  { title: "ふしぎなえ", level: "★☆☆", point: "「不思議だと思った」「どうしてかな」と書くだけでOK" },
  { title: "ももたろう", level: "★☆☆", point: "勇気・仲間・退治の3要素がシンプルで構成しやすい" },
  { title: "かさじぞう", level: "★☆☆", point: "優しい行いへの感謝がテーマ。道徳的感想が書きやすい" },
  { title: "だいくとおにろく", level: "★☆☆", point: "知恵で問題を解決する展開が明確で書きやすい" },
  { title: "かいけつゾロリシリーズ", level: "★☆☆", point: "「面白かった場面」が次々出てくる" },
  { title: "おしりたんていシリーズ", level: "★☆☆", point: "謎解きの過程を書くだけで感想文になる" },
  { title: "パンどろぼうシリーズ", level: "★☆☆", point: "キャラクターへの愛着が書きやすい感想を生む" },
  { title: "大ピンチずかん", level: "★☆☆", point: "「自分にもこんなピンチがあった」と体験と結びつけやすい" },
  { title: "あらしのよるに", level: "★★☆", point: "「見た目が違っても友達になれる」テーマが書きやすい" },
  { title: "エルマーのぼうけんシリーズ", level: "★☆☆", point: "冒険の場面が多く「一番ドキドキした場面」が書きやすい" },
  { title: "どろんこハリー", level: "★☆☆", point: "「自分らしくいること」が自然に書けるテーマ" },
  { title: "ラチとらいおん", level: "★☆☆", point: "「勇気を出した」体験と重ねやすい定番テーマ" },
  { title: "いやいやえん", level: "★☆☆", point: "自分の園・学校生活と比べながら書けて親しみやすい" },
  { title: "ぐるんぱのようちえん", level: "★☆☆", point: "失敗しても諦めないテーマが書きやすい" },
  { title: "となりのせきのおともだち", level: "★☆☆", point: "学校生活そのものが舞台で自分の経験と重ねやすい" },
  { title: "おおきなおおきなおいも", level: "★☆☆", point: "みんなで協力するテーマがシンプルで書きやすい" },
  { title: "きょだいなきょだいな", level: "★☆☆", point: "「もし自分だったら」という想像が膨らみ書きやすい" },
  { title: "ごきげんなすてご", level: "★★☆", point: "「捨てられる」体験から家族の愛に気づく深めのテーマ" },
  { title: "ホーキング博士からのメッセージ", level: "★★☆", point: "「夢を諦めない」テーマで将来のことと結びつけやすい" },
  { title: "せんそうでこわれた町の女の子", level: "★★★", point: "戦争テーマ。「平和とは」が書けると高評価になる" },
  { title: "空にうかんだエレベーター", level: "★★☆", point: "不思議な体験から「もし自分なら」と書ける" },
  { title: "ゆずくんとこてんちゃん", level: "★★☆", point: "「違う者同士の友情」テーマが書きやすい" },
  { title: "ぷうぷうの海", level: "★★☆", point: "環境問題テーマ。「これからどうすれば」が書きやすい" },
];

const ESSAY_HIGH: EssayBook[] = [
  { title: "魔女の宅急便", level: "★☆☆", point: "主人公の成長・スランプ・克服の流れが明確で書きやすい" },
  { title: "夏の庭 The Friends", level: "★★☆", point: "死と友情テーマ。印象的な場面が多く感想が出やすい" },
  { title: "モモ", level: "★★☆", point: "時間と豊かさテーマ。「自分の時間の使い方」と絡めやすい" },
  { title: "星の王子さま", level: "★★★", point: "「大切なものは目に見えない」が書けると高評価" },
  { title: "はてしない物語", level: "★★★", point: "想像力と責任がテーマ。読み応えあり高評価になりやすい" },
  { title: "赤毛のアン", level: "★★☆", point: "個性を大切にするテーマ。「自分らしさ」が書きやすい" },
  { title: "床下の小人たち", level: "★★☆", point: "小さな存在の視点から「当たり前」を見直せる" },
  { title: "ピーター・パン", level: "★★☆", point: "「大人になること」テーマで自分の成長と結びつけやすい" },
  { title: "宝島", level: "★☆☆", point: "冒険の山場が多く「一番ドキドキした場面」が書きやすい" },
  { title: "ルドルフとイッパイアッテナ", level: "★☆☆", point: "友情と自立テーマ。場面が豊富で書く材料が多い" },
  { title: "マジック・ツリーハウスシリーズ", level: "★☆☆", point: "歴史の学びと冒険。「知って驚いたこと」が書きやすい" },
  { title: "アンネの日記", level: "★★★", point: "戦争と希望テーマ。深く書けると非常に高評価になる" },
  { title: "窓ぎわのトットちゃん", level: "★☆☆", point: "個性・学校生活テーマ。自分の学校生活と比べやすい" },
  { title: "ふしぎ駄菓子屋 銭天堂", level: "★☆☆", point: "欲と結果テーマ。「もし自分が客なら」と書きやすい" },
  { title: "走れメロス", level: "★☆☆", point: "友情と信頼テーマ。短くて読みやすく感想が出やすい" },
  { title: "時をかける少女", level: "★★☆", point: "時間と選択テーマ。「やり直したいこと」と絡めやすい" },
  { title: "オオカミ王ロボ", level: "★★☆", point: "動物と人間の関係テーマ。「命の重さ」が書きやすい" },
  { title: "エーミールと探偵たち", level: "★☆☆", point: "子どもが主役の謎解き。「勇気と行動」が書きやすい" },
  { title: "5分後に意外な結末シリーズ", level: "★☆☆", point: "短編で読みやすく「驚いた結末」が書きやすい" },
  { title: "鬼滅の刃（小説版）", level: "★☆☆", point: "知っているキャラが登場し感情移入しやすく書きやすい" },
  { title: "かがみの孤城", level: "★★★", point: "居場所と自己肯定テーマ。深く書けると非常に高評価" },
  { title: "夜のピクニック", level: "★★☆", point: "青春と自分探しテーマ。「自分の気持ち」が書きやすい" },
  { title: "おじいちゃんがおばけになったわけ", level: "★☆☆", point: "死と家族テーマ。「大切な人への気持ち」が書きやすい" },
  { title: "最後の一葉", level: "★★★", point: "希望と犠牲テーマ。短いが深く「生きる力」が書ける" },
  { title: "蜜蜂と遠雷", level: "★★★", point: "才能と努力テーマ。深く書けると非常に高評価になる" },
  { title: "ぼくらシリーズ", level: "★★☆", point: "友情と社会への反抗テーマ。「正しいこととは」が書ける" },
  { title: "精霊の守り人", level: "★★☆", point: "強い女性主人公。「守ることの意味」が書きやすい" },
  { title: "だれも知らない小さな国", level: "★★☆", point: "発見と共存テーマ。「自然を大切に」と絡めて書きやすい" },
  { title: "やかまし村の子どもたち", level: "★☆☆", point: "自然の中の日常テーマ。「自分の日常」と比べやすい" },
  { title: "ガンバと15ひきの仲間", level: "★☆☆", point: "仲間と困難を乗り越えるテーマが一本筋で書きやすい" },
];

function amazonUrl(bookName: string) {
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(bookName)}&tag=${AMAZON_TAG}`;
}

const levelColor: Record<DrillItem["level"], string> = {
  やさしい: "#6c8ebf",
  ふつう: "#27ae60",
  むずかしい: "#e67e22",
};

export default function KidsPage() {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");
  const [result, setResult] = useState<ResultState>({ status: "idle", items: [] });
  const [quizResult, setQuizResult] = useState("");
  const [essayTab, setEssayTab] = useState<"low" | "high">("low");
  const [essayFilter, setEssayFilter] = useState<"all" | "★☆☆" | "★★☆" | "★★★">("all");

  const handleQuiz = () => {
    const q1 = (document.querySelector('input[name="q1"]:checked') as HTMLInputElement | null)?.value;
    const q2 = (document.querySelector('input[name="q2"]:checked') as HTMLInputElement | null)?.value;
    const q3 = (document.querySelector('input[name="q3"]:checked') as HTMLInputElement | null)?.value;
    if (!q1 || !q2 || !q3) { setQuizResult("すべての質問にチェックを入れてください。"); return; }
    let r = 0, t = 0;
    [q1, q2, q3].forEach((v) => { if (v === "repeat") r++; if (v === "think") t++; });
    if (r >= 2) setQuizResult("診断結果：コツコツ反復タイプ\n同じドリルを毎日少しずつ続けると力が伸びるタイプです。百マス計算や基礎問題が多いドリルと相性が良いです。");
    else if (t >= 2) setQuizResult("診断結果：ひらめき思考タイプ\nパズルや文章題など考える問題でやる気が出るタイプです。思考力ドリルを混ぜると楽しく学べます。");
    else setQuizResult("診断結果：マイペース集中タイプ\n短い時間にギュッと集中できるタイプです。10分で終わるドリルで「できた！」を積み重ねると続きやすくなります。");
  };

  const unitList = subject ? SUBJECTS[subject] ?? [] : [];

  const canSearch = grade && subject && unit;

  const handleSearch = async () => {
    if (!canSearch) return;
    setResult({ status: "loading", items: [] });

    const prompt = `あなたは小学生の学習支援の専門家です。
以下の条件に最適な市販ドリル・参考書を3冊推薦してください。

学年: ${grade}
教科: ${subject}
単元: ${unit}

以下のJSON形式のみで回答してください。説明文は不要です。マークダウン記法も不要です。
[
  {"level":"やさしい","name":"書籍名（実在する市販ドリル）","reason":"50字以内でこの本を選んだ理由"},
  {"level":"ふつう","name":"書籍名（実在する市販ドリル）","reason":"50字以内でこの本を選んだ理由"},
  {"level":"むずかしい","name":"書籍名（実在する市販ドリル）","reason":"50字以内でこの本を選んだ理由"}
]

注意：
- 必ず実在する市販ドリルの正式書名を使用してください
- 学研・くもん・Z会・旺文社・受験研究社などの実在する出版社の本を選んでください
- levelは必ず「やさしい」「ふつう」「むずかしい」の3種類にしてください`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      const text = data.content?.[0]?.text ?? "";
      const clean = text.replace(/```json|```/g, "").trim();
      const items: DrillItem[] = JSON.parse(clean);

      setResult({ status: "done", items, grade, subject, unit });
    } catch {
      setResult({ status: "error", items: [], error: "データの取得に失敗しました。もう一度お試しください。" });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');
        *{box-sizing:border-box;}
        body{font-family:'Noto Sans JP',sans-serif;background:#f5f7fa;margin:0;padding:0;color:#333;}
        .back-link{padding:12px 24px;background:#fff;border-bottom:1px solid #e0e0e0;font-size:14px;}
        .back-link a{color:#3498db;text-decoration:none;font-weight:bold;}
        .container{max-width:800px;margin:0 auto;padding:24px 20px;}
        h1{font-size:1.7em;margin:0 0 6px;color:#2c3e50;}
        .subtitle{color:#666;font-size:0.95em;margin:0 0 24px;}

        .panel{background:#fff;border-radius:14px;padding:24px;box-shadow:0 2px 10px rgba(0,0,0,0.06);margin-bottom:20px;}
        .step-label{font-size:0.8em;color:#fff;background:#3498db;padding:2px 10px;border-radius:20px;display:inline-block;margin-bottom:10px;}
        .step-title{font-size:1em;font-weight:bold;margin:0 0 12px;color:#2c3e50;}

        .radio-grid{display:flex;flex-wrap:wrap;gap:8px;}
        .radio-grid label{cursor:pointer;}
        .radio-grid input[type=radio]{display:none;}
        .radio-grid input[type=radio]+span{
          display:inline-block;padding:7px 16px;border-radius:20px;
          border:1.5px solid #dce0e6;font-size:0.9em;color:#555;
          transition:all .15s;background:#fff;
        }
        .radio-grid input[type=radio]:checked+span{
          background:#3498db;color:#fff;border-color:#3498db;font-weight:bold;
        }
        .radio-grid label:hover span{border-color:#3498db;color:#3498db;}

        .unit-grid{display:flex;flex-wrap:wrap;gap:8px;}
        .unit-grid label{cursor:pointer;}
        .unit-grid input[type=radio]{display:none;}
        .unit-grid input[type=radio]+span{
          display:inline-block;padding:7px 14px;border-radius:10px;
          border:1.5px solid #dce0e6;font-size:0.88em;color:#555;
          transition:all .15s;background:#fff;
        }
        .unit-grid input[type=radio]:checked+span{
          background:#ff6b6b;color:#fff;border-color:#ff6b6b;font-weight:bold;
        }
        .unit-grid label:hover span{border-color:#ff6b6b;color:#ff6b6b;}

        .search-btn{
          display:block;width:100%;padding:14px;
          background:${canSearch ? "#ff6b6b" : "#ccc"};color:#fff;
          font-size:1em;font-weight:bold;border:none;border-radius:10px;
          cursor:${canSearch ? "pointer" : "not-allowed"};
          transition:background .2s;margin-top:4px;
        }
        .search-btn:hover{background:${canSearch ? "#e85555" : "#ccc"};}

        .result-panel{background:#fff;border-radius:14px;padding:24px;box-shadow:0 2px 10px rgba(0,0,0,0.06);margin-bottom:20px;}
        .result-title{font-size:1.05em;font-weight:bold;color:#2c3e50;margin:0 0 16px;padding-bottom:10px;border-bottom:2px solid #f0f0f0;}
        .book-item{padding:14px 0;border-bottom:1px solid #f0f0f0;}
        .book-item:last-child{border-bottom:none;}
        .level-badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:0.78em;color:#fff;font-weight:bold;margin-bottom:6px;}
        .book-name{font-weight:bold;font-size:0.95em;color:#2c3e50;margin:4px 0;}
        .book-reason{font-size:0.88em;color:#666;margin:4px 0 8px;}
        .amazon-btn{
          display:inline-block;padding:6px 14px;background:#ffc107;
          color:#333;border-radius:20px;font-size:0.85em;font-weight:bold;
          text-decoration:none;transition:background .15s;
        }
        .amazon-btn:hover{background:#e6ac00;}

        .loading{text-align:center;padding:30px;color:#666;}
        .spinner{
          width:32px;height:32px;border:3px solid #eee;
          border-top-color:#3498db;border-radius:50%;
          animation:spin .8s linear infinite;margin:0 auto 12px;
        }
        @keyframes spin{to{transform:rotate(360deg);}}
        .error-msg{text-align:center;color:#e74c3c;padding:20px;}

        .hint{font-size:0.83em;color:#999;margin-top:8px;}

        .section-title{font-size:1.2em;font-weight:bold;color:#2c3e50;margin:32px 0 12px;padding-left:10px;border-left:4px solid #3498db;}
        .fixed-panel{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 2px 10px rgba(0,0,0,0.06);margin-bottom:16px;}
        .fixed-book{padding:12px 0;border-bottom:1px solid #f0f0f0;}
        .fixed-book:last-child{border-bottom:none;}
        .fixed-book-name{font-weight:bold;font-size:0.93em;color:#2c3e50;margin:0 0 4px;}
        .fixed-note{font-size:0.85em;color:#777;margin:0 0 8px;}
        .note-btn{display:inline-block;padding:6px 14px;background:#41c9b4;color:#fff;border-radius:20px;font-size:0.85em;font-weight:bold;text-decoration:none;transition:background .15s;}
        .note-btn:hover{background:#2daf9b;}

        .tab-row{display:flex;gap:8px;margin-bottom:16px;}
        .tab-btn{padding:8px 20px;border-radius:20px;border:1.5px solid #dce0e6;background:#fff;color:#555;font-size:0.9em;cursor:pointer;transition:all .15s;}
        .tab-btn.active{background:#3498db;color:#fff;border-color:#3498db;font-weight:bold;}
        .filter-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;}
        .filter-btn{padding:5px 12px;border-radius:16px;border:1.5px solid #dce0e6;background:#fff;color:#555;font-size:0.82em;cursor:pointer;transition:all .15s;}
        .filter-btn.active{background:#ff6b6b;color:#fff;border-color:#ff6b6b;font-weight:bold;}
        .essay-table{width:100%;border-collapse:collapse;font-size:0.88em;}
        .essay-table th{text-align:left;padding:8px 10px;border-bottom:2px solid #f0f0f0;color:#888;font-weight:bold;font-size:0.85em;}
        .essay-table td{padding:10px 10px;border-bottom:1px solid #f5f5f5;vertical-align:top;}
        .essay-table tr:last-child td{border-bottom:none;}
        .essay-table tr:hover td{background:#fafafa;}
        .level-star{font-size:0.9em;white-space:nowrap;}
        .lv1{color:#6c8ebf;} .lv2{color:#e67e22;} .lv3{color:#e74c3c;}
        .essay-title{font-weight:bold;color:#2c3e50;}
        .essay-point{color:#666;font-size:0.85em;margin-top:2px;}
        .essay-amazon{display:inline-block;margin-top:4px;padding:3px 10px;background:#ffc107;color:#333;border-radius:12px;font-size:0.8em;font-weight:bold;text-decoration:none;}
        .essay-note{font-size:0.82em;color:#aaa;margin-top:10px;padding-top:10px;border-top:1px solid #f0f0f0;}

        .quiz-panel{background:#e8f6fd;border-radius:14px;padding:24px;margin-bottom:16px;}
        .quiz-q{margin-bottom:14px;}
        .quiz-q strong{font-size:0.93em;display:block;margin-bottom:6px;color:#2c3e50;}
        .quiz-label{display:block;font-size:0.88em;color:#555;margin:4px 0;cursor:pointer;}
        .quiz-label input{margin-right:6px;}
        .quiz-btn{margin-top:10px;padding:10px 24px;background:#3498db;color:#fff;border:none;border-radius:20px;font-size:0.95em;font-weight:bold;cursor:pointer;}
        .quiz-btn:hover{background:#2175ae;}
        .quiz-result{margin-top:14px;padding:14px;background:#fff;border-radius:10px;font-size:0.9em;white-space:pre-line;color:#333;line-height:1.7;}

        .column-panel{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 2px 10px rgba(0,0,0,0.06);margin-bottom:16px;}
        .column-panel h3{font-size:1em;font-weight:bold;color:#2c3e50;margin:0 0 10px;padding-left:8px;border-left:3px solid #ff6b6b;}
        .column-panel p{font-size:0.9em;color:#555;line-height:1.75;margin:0 0 8px;}
        .column-panel .small-note{font-size:0.83em;color:#999;margin:0;}
      `}</style>

      <div className="back-link">
        <a href="https://www.twinkle-lab.jp">← Twinkle Lab トップに戻る</a>
      </div>

      <div className="container">
        <h1>Twinkle Kids 学習ナビ</h1>
        <p className="subtitle">学年・教科・単元を選ぶだけで、ぴったりのドリルをAIがナビします。</p>

        {/* Step 1: 学年 */}
        <div className="panel">
          <span className="step-label">STEP 1</span>
          <p className="step-title">学年を選んでください</p>
          <div className="radio-grid">
            {GRADES.map((g) => (
              <label key={g}>
                <input type="radio" name="grade" value={g} checked={grade === g}
                  onChange={() => { setGrade(g); setUnit(""); }} />
                <span>{g}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Step 2: 教科 */}
        {grade && (
          <div className="panel">
            <span className="step-label">STEP 2</span>
            <p className="step-title">教科を選んでください</p>
            <div className="radio-grid">
              {Object.keys(SUBJECTS).map((s) => (
                <label key={s}>
                  <input type="radio" name="subject" value={s} checked={subject === s}
                    onChange={() => { setSubject(s); setUnit(""); }} />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: 単元 */}
        {grade && subject && (
          <div className="panel">
            <span className="step-label">STEP 3</span>
            <p className="step-title">単元を選んでください</p>
            <div className="unit-grid">
              {unitList.map((u) => (
                <label key={u}>
                  <input type="radio" name="unit" value={u} checked={unit === u}
                    onChange={() => setUnit(u)} />
                  <span>{u}</span>
                </label>
              ))}
            </div>
            <p className="hint">※ここにない単元はAIが対応しますのでご安心ください</p>
          </div>
        )}

        {/* 検索ボタン */}
        {grade && subject && unit && (
          <button className="search-btn" onClick={handleSearch} disabled={result.status === "loading"}>
            {result.status === "loading" ? "AIが選んでいます…" : `${grade}・${subject}「${unit}」のドリルをナビする`}
          </button>
        )}

        {/* 結果表示 */}
        {result.status === "loading" && (
          <div className="result-panel">
            <div className="loading">
              <div className="spinner" />
              AIがぴったりのドリルを選んでいます…
            </div>
          </div>
        )}

        {result.status === "error" && (
          <div className="result-panel">
            <div className="error-msg">{result.error}</div>
          </div>
        )}

        {result.status === "done" && (
          <div className="result-panel">
            <p className="result-title">
              {result.grade}・{result.subject}「{result.unit}」のおすすめドリル
            </p>
            {result.items.map((item, i) => (
              <div className="book-item" key={i}>
                <span className="level-badge" style={{ background: levelColor[item.level] }}>
                  {item.level}
                </span>
                <p className="book-name">{item.name}</p>
                <p className="book-reason">{item.reason}</p>
                <a className="amazon-btn" href={amazonUrl(item.name)} target="_blank" rel="noopener noreferrer">
                  Amazonで見る
                </a>
              </div>
            ))}
          </div>
        )}

        {/* ── どの学年にもおすすめ ── */}
        <h2 className="section-title">どの学年にもおすすめの計算ドリル</h2>
        <div className="fixed-panel">
          <div className="fixed-book">
            <p className="fixed-book-name">百マス計算ドリル</p>
            <p className="fixed-note">毎日5〜10分で計算力の土台を作りたいときに。</p>
            <a className="amazon-btn" href={`https://www.amazon.co.jp/s?k=${encodeURIComponent("百マス計算 ドリル")}&tag=${AMAZON_TAG}`} target="_blank" rel="noopener noreferrer">Amazonで見る</a>
          </div>
          <div className="fixed-book">
            <p className="fixed-book-name">九九ドリル</p>
            <p className="fixed-note">2年生以降、どの学年でも「暗記のやり直し」に使えます。</p>
            <a className="amazon-btn" href={`https://www.amazon.co.jp/s?k=${encodeURIComponent("九九 ドリル")}&tag=${AMAZON_TAG}`} target="_blank" rel="noopener noreferrer">Amazonで見る</a>
          </div>
        </div>

        {/* ── 読書感想文 ── */}
        <h2 className="section-title">読書感想文が書きやすい本リスト</h2>
        <div className="fixed-panel">
          <div className="tab-row">
            <button className={`tab-btn${essayTab === "low" ? " active" : ""}`} onClick={() => { setEssayTab("low"); setEssayFilter("all"); }}>低学年（小1〜3）</button>
            <button className={`tab-btn${essayTab === "high" ? " active" : ""}`} onClick={() => { setEssayTab("high"); setEssayFilter("all"); }}>高学年（小4〜6）</button>
          </div>
          <div className="filter-row">
            {(["all", "★☆☆", "★★☆", "★★★"] as const).map((f) => (
              <button key={f} className={`filter-btn${essayFilter === f ? " active" : ""}`} onClick={() => setEssayFilter(f)}>
                {f === "all" ? "すべて" : f === "★☆☆" ? "★☆☆ 書きやすい" : f === "★★☆" ? "★★☆ 中級" : "★★★ 上級"}
              </button>
            ))}
          </div>
          <table className="essay-table">
            <thead>
              <tr>
                <th style={{width:"35%"}}>タイトル</th>
                <th style={{width:"12%"}}>難易度</th>
                <th>書きやすいポイント</th>
              </tr>
            </thead>
            <tbody>
              {(essayTab === "low" ? ESSAY_LOW : ESSAY_HIGH)
                .filter((b) => essayFilter === "all" || b.level === essayFilter)
                .map((b, i) => (
                  <tr key={i}>
                    <td>
                      <div className="essay-title">{b.title}</div>
                      <a className="essay-amazon" href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(b.title)}&tag=${AMAZON_TAG}`} target="_blank" rel="noopener noreferrer">Amazonで見る</a>
                    </td>
                    <td>
                      <span className={`level-star ${b.level === "★☆☆" ? "lv1" : b.level === "★★☆" ? "lv2" : "lv3"}`}>{b.level}</span>
                    </td>
                    <td><div className="essay-point">{b.point}</div></td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p className="essay-note">
            {essayTab === "low"
              ? "★☆☆からスタートして。「楽しかった」「面白かった」という素直な感想でOKです。まず本を最後まで読めることが一番大事です。"
              : "★☆☆か★★☆からスタートがおすすめ。「自分の経験と重ねて書ける本」を選ぶのが一番の近道です。"}
          </p>
        </div>

        {/* ── タイプ診断クイズ ── */}
        <h2 className="section-title">3分でわかる！お子さんの勉強タイプ診断</h2>
        <div className="quiz-panel">
          <p className="fixed-note" style={{marginBottom:16}}>なんとなくで大丈夫です。普段の様子から一番近いものを選んでください。</p>
          <div className="quiz-q">
            <strong>Q1. どんな問題が得意そうですか？</strong>
            <label className="quiz-label"><input type="radio" name="q1" value="repeat" />計算など、同じパターンをくり返す問題</label>
            <label className="quiz-label"><input type="radio" name="q1" value="think" />パズルやなぞなぞ、考える問題</label>
            <label className="quiz-label"><input type="radio" name="q1" value="pace" />どちらもそこそこ、マイペース</label>
          </div>
          <div className="quiz-q">
            <strong>Q2. 一度に集中できる時間はどのくらいですか？</strong>
            <label className="quiz-label"><input type="radio" name="q2" value="repeat" />10分くらいが限界</label>
            <label className="quiz-label"><input type="radio" name="q2" value="think" />20〜30分くらいならいける</label>
            <label className="quiz-label"><input type="radio" name="q2" value="pace" />30分以上でもわりと平気</label>
          </div>
          <div className="quiz-q">
            <strong>Q3. 宿題の取り組み方は？</strong>
            <label className="quiz-label"><input type="radio" name="q3" value="repeat" />コツコツ毎日、同じ時間にやる</label>
            <label className="quiz-label"><input type="radio" name="q3" value="think" />ためてから一気に集中してやる</label>
            <label className="quiz-label"><input type="radio" name="q3" value="pace" />気分が乗ったときにマイペースでやる</label>
          </div>
          <button className="quiz-btn" onClick={handleQuiz}>タイプを診断する</button>
          {quizResult && <div className="quiz-result">{quizResult}</div>}
        </div>

        {/* ── 学習コラム ── */}
        <h2 className="section-title">学習コラム</h2>
        <div className="column-panel">
          <h3>くりあがり・くりさがりでつまずく子の共通パターン</h3>
          <p>小1でいちばん多いつまずきが「くりあがり・くりさがり」です。10というまとまりのイメージがまだ弱いと、「9のつぎは10」「10を1と0に分ける」といった感覚がピンと来ません。まずは10個のブロックを「まとめて1つのかたまり」にする遊びから始め、「9＋1＝10」のパターンだけをくり返し練習するのがおすすめです。</p>
          <p className="small-note">▶ 上のナビで「小1・算数・くりあがり」と選んで、ぴったりのドリルを探してみてください。</p>
        </div>
        <div className="column-panel">
          <h3>ひらがな・カタカナが苦手な子へのやさしい付き合い方</h3>
          <p>ひらがな・カタカナは、「書けない＝遅れている」ではありません。読む力のほうが先に育つことも多く、まずは「読める」ことをたくさんほめてあげることが大切です。書くときは最初からきれいさを求めすぎず、大きく・ゆっくり・なぞり書きから始めて「自分で書けた！」という成功体験を積み重ねていきましょう。</p>
          <p className="small-note">▶ 「小1・国語・ひらがな」「小2・国語・音読」などで検索してみてください。</p>
        </div>
        <div className="column-panel">
          <h3>コツコツ型？ひらめき型？お子さんの勉強タイプの見つけ方</h3>
          <p>子どもの勉強には「コツコツ反復型」「ひらめき思考型」「マイペース集中型」などいろいろなタイプがあります。タイプに合わないやり方を無理に続けると、やる気そのものが落ちてしまいます。上の「勉強タイプ診断」でまずお子さんのタイプをチェックしてから、タイプに合ったドリルを選んであげると学習がぐっとスムーズになります。</p>
          <p className="small-note">▶ 反復型→百マス計算、思考型→パズルドリル、マイペース型→短時間で終わる薄めのドリルがおすすめです。</p>
        </div>

      </div>
    </>
  );
}
