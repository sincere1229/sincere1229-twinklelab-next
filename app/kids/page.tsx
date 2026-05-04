// app/kids/page.tsx
"use client";

import React, { useState } from "react";

type StudyItem = {
  level: "初歩" | "つまずき" | "高度";
  name: string;
  reason: string;
};

const studyData: Record<string, StudyItem[]> = {
    "小1 くりさがり": [
    {
      level: "初歩",
      name: "小学1年 さんすう くり下がり入門ドリル",
      reason: "10から引くイメージをイラストで理解できるので、数字が苦手な子でも入りやすいです。"
    },
    {
      level: "つまずき",
      name: "教科書ぴったりドリル 小1さんすう くり下がり",
      reason: "学校と同じ順番でくり下がりを練習でき、テスト前の復習にも使いやすい構成です。"
    },
    {
      level: "高度",
      name: "算数パズル 1年生 くり下がり編",
      reason: "文章題やパズル形式で、くり下がりをしっかり定着させたいときに向いています。"
    }
  ],

  "小2 九九": [
    {
      level: "初歩",
      name: "はじめての九九ドリル",
      reason: "2の段・5の段など覚えやすいところから始められ、九九が苦手な子のとっかかりに最適です。"
    },
    {
      level: "つまずき",
      name: "小学2年 九九ドリル 標準",
      reason: "読み・書き・テストが一冊にまとまっており、学校のテスト対策にちょうど良いボリュームです。"
    },
    {
      level: "高度",
      name: "九九パズルドリル",
      reason: "九九を使ったパズルや迷路で、九九が得意な子の頭をさらに使わせたいときにおすすめです。"
    }
  ],

  "小2 音読": [
    {
      level: "初歩",
      name: "音読が好きになる短いお話集 低学年向け",
      reason: "1分で読めるくらいの短いお話が中心で、音読が苦手な子でも取り組みやすい構成です。"
    },
    {
      level: "つまずき",
      name: "小学2年 国語 音読・読解ドリル",
      reason: "音読と簡単な質問がセットになっていて、『読んで終わり』になりにくいのが特徴です。"
    },
    {
      level: "高度",
      name: "心にひびく名作音読集",
      reason: "少し長めのお話をじっくり読むことで、表現力や感情移入の力も育てたいときに向いています。"
    }
  ],
  "小1 くりあがり": [
    {
      level: "初歩",
      name: "小学1年 さんすう くり上がり入門ドリル",
      reason: "10のかたまりをイラストで理解できて、数字にまだ慣れていない子でも取り組みやすい。",
    },
    {
      level: "つまずき",
      name: "教科書ぴったりドリル 小1さんすう くり上がり",
      reason: "学校と同じ順番でくり上がりを練習でき、テスト前の確認にちょうど良い。",
    },
    {
      level: "高度",
      name: "算数パズル 1年生 くり上がり編",
      reason: "文章題やパズル形式で、得意な子の頭をさらに使わせたいときに向いている。",
    },
  ],
  "小1 ひらがな": [
    {
      level: "初歩",
      name: "はじめてのひらがなドリル",
      reason: "なぞり書き中心で、えんぴつに慣れていない子でも楽しく練習できる。",
    },
    {
      level: "つまずき",
      name: "小学1年 ひらがな・カタカナドリル",
      reason: "読み書き両方をバランスよく練習できる標準タイプ。宿題の補強にも。",
    },
    {
      level: "高度",
      name: "ことばあそび ひらがなパズル",
      reason: "しりとりやことばあそびで、ひらがなを使いこなせるようにしたい子向け。",
    },
  ],
  "小3 漢字": [
    {
      level: "初歩",
      name: "小学3年 漢字ドリル やさしい版",
      reason: "読み中心で、まずは漢字に慣れることを優先したい子に合っている。",
    },
    {
      level: "つまずき",
      name: "小学3年 漢字ドリル 標準",
      reason: "書き＋テスト形式で、学校のテスト対策にちょうど良い構成。",
    },
    {
      level: "高度",
      name: "漢字パズル 小学3年",
      reason: "クロスワードやクイズで、漢字好きな子をさらに伸ばしたいときにおすすめ。",
    },
  ],
};

function levelClass(level: StudyItem["level"]) {
  if (level === "初歩") return "level-basic";
  if (level === "つまずき") return "level-middle";
  return "level-advanced";
}

export default function KidsPage() {
  const [keyword, setKeyword] = useState("");
  const [quizResult, setQuizResult] = useState<string>("");

  const handleSearch = () => {
    const area = document.getElementById("study-result");
   if (!area) return;

  // 入力取得
  let key = keyword;

  // ★ ここで全角スペースを半角に統一し、前後の空白を削除
  key = key.replace(/\u3000/g, " ").trim();

  if (!key) {
    area.innerHTML =
      '「小1 くりあがり」「小1 ひらがな」「小3 漢字」などと入力してください。';
    return;
  }
    const list = studyData[key];
    if (!list) {
      area.innerHTML = `<div class="result-card"><p>「${key}」に対応するデータはまだ準備中です。</p></div>`;
      return;
    }
    let html = `<div class="result-card"><h2>${key} のおすすめドリル</h2>`;
    list.forEach((item) => {
      const tagClass = levelClass(item.level);
      html += `
        <div class="book-item">
          <span class="level-tag ${tagClass}">${item.level}</span>
          <div class="book-title">${item.name}</div>
          <p>${item.reason}</p>
          <a class="amazon-link"
             href="https://www.amazon.co.jp/s?k=${encodeURIComponent(
               item.name
             )}&tag=sincere1229-22"
             target="_blank">Amazonで見る</a>
        </div>`;
    });
    html += `</div>`;
    area.innerHTML = html;
  };

  const handleQuiz = () => {
    const q1 = (
      document.querySelector('input[name="q1"]:checked') as HTMLInputElement | null
    )?.value;
    const q2 = (
      document.querySelector('input[name="q2"]:checked') as HTMLInputElement | null
    )?.value;
    const q3 = (
      document.querySelector('input[name="q3"]:checked') as HTMLInputElement | null
    )?.value;

    if (!q1 || !q2 || !q3) {
      setQuizResult("すべての質問にチェックを入れてください。");
      return;
    }

    let repeatScore = 0;
    let thinkScore = 0;
    let paceScore = 0;

    [q1, q2, q3].forEach((v) => {
      if (v === "repeat") repeatScore++;
      if (v === "think") thinkScore++;
      if (v === "pace") paceScore++;
    });

    let type = "";
    let message = "";

    if (repeatScore >= 2) {
      type = "コツコツ反復タイプ";
      message =
        "同じドリルを毎日少しずつ続けると、力がぐんぐん伸びるタイプです。百マス計算や、基礎問題が多いドリルと相性が良いです。";
    } else if (thinkScore >= 2) {
      type = "ひらめき思考タイプ";
      message =
        "パズルやなぞなぞなど、少し考える問題でやる気が出るタイプです。文章題や思考力ドリルを混ぜると、楽しく学べます。";
    } else {
      type = "マイペース集中タイプ";
      message =
        "短い時間にギュッと集中できるタイプです。10分で終わるドリルを用意して、「できた！」を積み重ねると続きやすくなります。";
    }

    setQuizResult(`診断結果：${type}\n${message}`);
  };

  return (
    <>
      <style>{`
        body{font-family:'Noto Sans JP',sans-serif;background:#f8f9fa;margin:0;padding:0;}
        .container{max-width:1000px;margin:0 auto;padding:20px;}
        a{color:#3498db;text-decoration:none;}
        h1{font-size:2em;margin:10px 0;}
        h2{font-size:1.5em;margin-top:30px;border-left:5px solid #3498db;padding-left:10px;}
        h3{font-size:1.2em;margin-top:20px;}
        .back-link{padding:10px 20px;background:#fff;border-bottom:1px solid #e0e0e0;}
        .back-link a{font-weight:bold;}
        .search-box{margin:20px 0;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.05);}
        .search-box input{width:70%;padding:10px;font-size:16px;border-radius:20px;border:1px solid #ccc;}
        .search-box button{padding:10px 20px;margin-left:10px;border:none;border-radius:20px;
                           background:#ff6b6b;color:#fff;font-size:16px;cursor:pointer;}
        .result-card{background:#fff;border-radius:10px;padding:20px;margin-top:20px;
                     box-shadow:0 2px 8px rgba(0,0,0,0.05);}
        .level-tag{display:inline-block;padding:3px 8px;border-radius:12px;font-size:0.8em;color:#fff;margin-right:8px;}
        .level-basic{background:#6c757d;}
        .level-middle{background:#17a2b8;}
        .level-advanced{background:#28a745;}
        .book-item{margin:10px 0;padding:10px 0;border-bottom:1px solid #eee;}
        .book-title{font-weight:bold;}
        .amazon-link{display:inline-block;margin-top:5px;padding:5px 10px;border-radius:15px;
                     background:#ffc107;color:#333;font-size:0.9em;}
        .fixed-block{background:#fff;border-radius:10px;padding:20px;margin-top:20px;
                     box-shadow:0 2px 8px rgba(0,0,0,0.05);}
        .quiz-block{background:#e8f4fd;border-radius:10px;padding:20px;margin-top:20px;}
        .quiz-question{margin-bottom:10px;}
        .quiz-select{margin:5px 0;display:block;}
        .quiz-result{margin-top:10px;padding:10px;background:#fff;border-radius:8px;white-space:pre-line;}
        .columns{margin-top:20px;}
        .column-article{background:#fff;border-radius:10px;padding:20px;margin-top:15px;
                        box-shadow:0 2px 8px rgba(0,0,0,0.05);}
        .small-note{font-size:0.9em;color:#666;}
      `}</style>

      <div className="back-link">
        <a href="https://www.twinkle-lab.jp">← Twinkle Lab トップに戻る</a>
      </div>

      <div className="container">
        <h1>Twinkle Kids 学習ナビ</h1>
        <p>
          小学生の「つまずき」から、ぴったりのドリルと参考書をナビします。
          <br />
          例：「小1 くりあがり」「小1 ひらがな」「小3 漢字」などと入力してください。
        </p>

        <div className="search-box">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="例：小1 くりあがり / 小1 ひらがな / 小3 漢字"
          />
          <button onClick={handleSearch}>ナビする</button>
        </div>

        <div id="study-result" />

        <div className="fixed-block">
          <h2>どの学年にもおすすめの計算ドリル</h2>
          <div className="book-item">
            <div className="book-title">百マス計算ドリル</div>
            <p className="small-note">
              毎日5〜10分で計算力の土台を作りたいときに。
            </p>
            <a
              className="amazon-link"
              href="https://www.amazon.co.jp/s?k=百マス計算+ドリル&tag=sincere1229-22"
              target="_blank"
            >
              Amazonで見る
            </a>
          </div>
          <div className="book-item">
            <div className="book-title">九九ドリル</div>
            <p className="small-note">
              2年生以降、どの学年でも「暗記のやり直し」に使えます。
            </p>
            <a
              className="amazon-link"
              href="https://www.amazon.co.jp/s?k=九九+ドリル&tag=sincere1229-22"
              target="_blank"
            >
              Amazonで見る
            </a>
          </div>
        </div>

        <div className="quiz-block">
          <h2>3分でわかる！お子さんの勉強タイプ診断</h2>
          <p className="small-note">
            なんとなくで大丈夫です。普段の様子から一番近いものを選んでください。
          </p>

          <div className="quiz-question">
            <strong>Q1. どんな問題が得意そうですか？</strong>
            <label className="quiz-select">
              <input type="radio" name="q1" value="repeat" /> 計算など、同じパターンをくり返す問題
            </label>
            <label className="quiz-select">
              <input type="radio" name="q1" value="think" /> パズルやなぞなぞ、考える問題
            </label>
            <label className="quiz-select">
              <input type="radio" name="q1" value="pace" /> どちらもそこそこ、マイペース
            </label>
          </div>

          <div className="quiz-question">
            <strong>Q2. 一度に集中できる時間はどのくらいですか？</strong>
            <label className="quiz-select">
              <input type="radio" name="q2" value="short" /> 10分くらいが限界
            </label>
            <label className="quiz-select">
              <input type="radio" name="q2" value="middle" /> 20分くらいならいける
            </label>
            <label className="quiz-select">
              <input type="radio" name="q2" value="long" /> 30分以上でもわりと平気
            </label>
          </div>

          <div className="quiz-question">
            <strong>Q3. 宿題の取り組み方は？</strong>
            <label className="quiz-select">
              <input type="radio" name="q3" value="repeat" /> コツコツ毎日、同じ時間にやる
            </label>
            <label className="quiz-select">
              <input type="radio" name="q3" value="think" /> ためてから、一気に集中してやる
            </label>
            <label className="quiz-select">
              <input type="radio" name="q3" value="pace" /> 気分が乗ったときにマイペースでやる
            </label>
          </div>

          <button onClick={handleQuiz} style={{ marginTop: 10 }}>
            タイプを診断する
          </button>
          <div className="quiz-result">{quizResult}</div>
        </div>

        <div className="columns">
          <h2>学習コラム</h2>

          <div className="column-article">
            <h3>くりあがり・くりさがりでつまずく子の共通パターン</h3>
            <p>
              小1でいちばん多いつまずきが「くりあがり・くりさがり」です。
              10というまとまりのイメージがまだ弱いと、「9のつぎは10」「10を1と0に分ける」といった感覚がピンと来ません。
              また、ノートのマスから数字がはみ出してしまう子は、そもそも「位」を意識するのが難しいことも多いです。
            </p>
            <p>
              まずは、10個のブロックを「まとめて1つのかたまり」にする遊びから始めたり、
              「9＋1＝10」のパターンだけをくり返し練習するのがおすすめです。
            </p>
            <p className="small-note">
              おすすめ：くりあがりに特化した算数ドリルや、10のまとまりを絵で説明してくれる教材。
              「小1 くりあがり」と検索して、ぴったりのドリルを探してみてください。
            </p>
          </div>

          <div className="column-article">
            <h3>ひらがな・カタカナが苦手な子へのやさしい付き合い方</h3>
            <p>
              ひらがな・カタカナは、「書けない＝遅れている」ではありません。
              読む力のほうが先に育つことも多く、まずは「読める」ことをたくさんほめてあげることが大切です。
            </p>
            <p>
              書くときは、最初からきれいさを求めすぎないこと。
              大きく・ゆっくり・なぞり書きから始めて、「自分で書けた！」という成功体験を積み重ねていきましょう。
            </p>
            <p className="small-note">
              おすすめ：なぞり書き中心のひらがなドリルや、音読しやすい短い絵本。
              「小1 ひらがな」「小2 音読」などで検索してみてください。
            </p>
          </div>

          <div className="column-article">
            <h3>コツコツ型？ひらめき型？お子さんの勉強タイプの見つけ方</h3>
            <p>
              子どもの勉強には、「コツコツ反復型」「ひらめき思考型」「マイペース集中型」など、いろいろなタイプがあります。
              タイプに合わないやり方を無理に続けると、やる気そのものが落ちてしまいます。
            </p>
            <p>
              例えば、反復型の子には「同じドリルを毎日少しずつ」がおすすめ。
              ひらめき型の子には、パズルや文章題など、少し考える問題を混ぜると楽しめます。
              マイペース型の子には、「短い時間で終わる」「できたらすぐほめる」仕組みが向いています。
            </p>
            <p className="small-note">
              上の「勉強タイプ診断」でお子さんのタイプをチェックしてから、
              タイプに合ったドリルを選んであげると、学習がぐっとスムーズになります。
            </p>
          </div>
        </div>
      </div>

    </>
  );
}


