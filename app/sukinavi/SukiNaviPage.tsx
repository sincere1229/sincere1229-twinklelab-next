"use client";
import { useState, useEffect } from "react";

type RecItem = { name: string; type: string; reason: string };
type Comment = { name: string; comment: string; date: string };

const DECADES = [
  {
    year: "1970年代",
    title: "フォークと内省の時代",
    desc: "高度経済成長が一段落し、オイルショックをきっかけに暮らしを見つめ直した時代。フォークソングや歌謡曲が日常を支えるBGMになりました。",
    songs: ["黒ネコのタンゴ（皆川おさむ）", "わたしの城下町（小柳ルミ子）", "また逢う日まで（尾崎紀世彦）"],
    books: ["無明長夜／吉田知子", "杳子／古井由吉", "岬／中上健次", "限りなく透明に近いブルー／村上龍"],
  },
  {
    year: "1980年代",
    title: "バブル前夜とアイドル黄金期",
    desc: "円高と低金利を背景にしたバブル景気へ向かう「ジャパン・アズ・ナンバーワン」の時代。コンビニやファミコン、ウォークマンが普及しました。",
    songs: ["ルビーの指環（寺尾聰）", "ダンシング・オールナイト（もんた&ブラザーズ）", "赤いスイートピー（松田聖子）"],
    books: ["父が消えた／尾辻克彦", "小さな貴婦人／吉行理恵", "燃える家／高樹のぶ子"],
  },
  {
    year: "1990年代",
    title: "バブル崩壊とJ-POP黄金期",
    desc: "バブル崩壊とともに「失われた10年」へ。一方でJ-POPやドラマ、アニメなどの大衆文化は最高潮に達しました。",
    songs: ["おどるポンポコリン（B.B.クィーンズ）", "ラブ・ストーリーは突然に（小田和正）", "innocent world（Mr.Children）", "CAN YOU CELEBRATE？（安室奈美恵）"],
    books: ["妊娠カレンダー／小川洋子", "蛇を踏む／川上弘美", "日蝕／平野啓一郎"],
  },
  {
    year: "2000年代",
    title: "デジタル化と「世界に一つだけの花」",
    desc: "インターネットと携帯電話が一気に普及し、日常生活がデジタル化していった時代。ITバブルや小泉政権の構造改革など改革と揺り戻しが続きました。",
    songs: ["TSUNAMI（サザンオールスターズ）", "traveling（宇多田ヒカル）", "世界に一つだけの花（SMAP）"],
    books: ["きれぎれ／町田康", "蹴りたい背中／綿矢りさ", "乳と卵／川上未映子"],
  },
  {
    year: "2010年代",
    title: "震災とSNS、多様性の時代",
    desc: "東日本大震災を経験し「生き方」や「つながり」を問い直した10年。スマートフォンとSNSが一気に広まりました。",
    songs: ["ヘビーローテーション（AKB48）", "恋（星野源）", "Lemon（米津玄師）", "前前前世（RADWIMPS）"],
    books: ["コンビニ人間／村田沙耶香", "火花／又吉直樹", "むらさきのスカートの女／今村夏子"],
  },
  {
    year: "2020年代",
    title: "コロナ禍とリモート時代のカルチャー",
    desc: "新型コロナウイルスの流行からスタート。SNSや配信サービスで話題になった曲がそのまま大ヒット曲になる時代に。",
    songs: ["夜に駆ける（YOASOBI）", "I LOVE...（Official髭男dism）", "ドライフラワー（優里）", "水平線（back number）"],
    books: ["推し、燃ゆ／宇佐見りん", "破局／遠野遥", "ゲーテはすべてを言った／鈴木結生"],
  },
];

export default function SukiNaviPage() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<RecItem[]>([]);
  const [searched, setSearched] = useState("");
  const [error, setError] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [myName, setMyName] = useState("");
  const [myComment, setMyComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [openDecade, setOpenDecade] = useState<number | null>(null);

  const fetchComments = async (kw: string) => {
    const res = await fetch(`/api/sukinavi-comments?keyword=${encodeURIComponent(kw)}`);
    const data = await res.json();
    setComments(data);
  };

  const handleSearch = async () => {
    const kw = keyword.trim();
    if (!kw) return;
    setLoading(true);
    setError("");
    setResults([]);
    setComments([]);
    try {
      const res = await fetch("/api/sukinavi-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: kw }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(data.items);
      setSearched(kw);
      await fetchComments(kw);
    } catch {
      setError("取得に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    if (!myComment.trim()) return;
    setPosting(true);
    await fetch("/api/sukinavi-comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword: searched, name: myName, comment: myComment }),
    });
    setMyComment("");
    await fetchComments(searched);
    setPosting(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');
        *{box-sizing:border-box;}
        body{font-family:'Noto Sans JP',sans-serif;background:#fafafa;margin:0;color:#333;}
        .hero{background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);padding:48px 20px 40px;text-align:center;}
        .hero h1{font-size:2.2em;color:#fff;margin:0 0 8px;letter-spacing:.05em;}
        .hero p{color:#a0b4cc;font-size:0.95em;margin:0 0 28px;}
        .search-wrap{display:flex;gap:8px;max-width:560px;margin:0 auto;}
        .search-wrap input{flex:1;padding:12px 18px;border-radius:30px;border:none;font-size:1em;outline:none;}
        .search-wrap button{padding:12px 24px;border-radius:30px;border:none;background:#e94560;color:#fff;font-size:1em;font-weight:bold;cursor:pointer;white-space:nowrap;}
        .search-wrap button:hover{background:#c73652;}
        .container{max-width:800px;margin:0 auto;padding:24px 20px;}
        .section-title{font-size:1.15em;font-weight:bold;color:#1a1a2e;margin:32px 0 12px;padding-left:10px;border-left:4px solid #e94560;}

        .result-panel{background:#fff;border-radius:14px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.07);margin-bottom:24px;}
        .result-heading{font-size:1em;font-weight:bold;color:#1a1a2e;margin:0 0 16px;padding-bottom:12px;border-bottom:2px solid #f0f0f0;}
        .rec-item{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid #f5f5f5;}
        .rec-item:last-child{border-bottom:none;}
        .rec-badge{flex-shrink:0;padding:3px 10px;border-radius:20px;font-size:0.75em;font-weight:bold;}
        .badge-artist{background:#fff0f3;color:#e94560;}
        .badge-author{background:#f0f4ff;color:#3a6fd8;}
        .rec-body{flex:1;}
        .rec-name{font-weight:bold;color:#1a1a2e;font-size:0.95em;}
        .rec-reason{font-size:0.85em;color:#666;margin:3px 0 6px;}
        .amazon-btn{display:inline-block;padding:4px 12px;background:#ffc107;color:#333;border-radius:20px;font-size:0.8em;font-weight:bold;text-decoration:none;cursor:pointer;border:none;}
        .amazon-btn:hover{background:#e6ac00;}

        .comment-panel{background:#fff;border-radius:14px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.07);margin-bottom:24px;}
        .comment-form{display:flex;flex-direction:column;gap:8px;margin-bottom:20px;}
        .comment-form input,.comment-form textarea{padding:10px 14px;border:1.5px solid #dce0e6;border-radius:10px;font-size:0.9em;font-family:inherit;resize:vertical;}
        .comment-form textarea{min-height:80px;}
        .post-btn{align-self:flex-end;padding:8px 20px;background:#e94560;color:#fff;border:none;border-radius:20px;font-size:0.9em;font-weight:bold;cursor:pointer;}
        .post-btn:hover{background:#c73652;}
        .post-btn:disabled{background:#ccc;cursor:not-allowed;}
        .comment-item{padding:12px 0;border-bottom:1px solid #f5f5f5;}
        .comment-item:last-child{border-bottom:none;}
        .comment-meta{font-size:0.8em;color:#999;margin-bottom:4px;}
        .comment-meta span{font-weight:bold;color:#555;margin-right:8px;}
        .comment-text{font-size:0.9em;color:#444;line-height:1.6;}
        .no-comment{font-size:0.88em;color:#aaa;text-align:center;padding:16px 0;}

        .decade-wrap{margin-bottom:12px;}
        .decade-header{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:#fff;border-radius:10px;cursor:pointer;box-shadow:0 1px 6px rgba(0,0,0,0.06);user-select:none;}
        .decade-header:hover{background:#fafafa;}
        .decade-year{font-weight:bold;color:#1a1a2e;font-size:0.95em;}
        .decade-sub{font-size:0.82em;color:#888;margin-top:2px;}
        .decade-arrow{color:#e94560;font-size:1.1em;transition:transform .2s;}
        .decade-arrow.open{transform:rotate(180deg);}
        .decade-body{background:#fff;border-radius:0 0 10px 10px;padding:16px 18px 18px;border-top:1px solid #f0f0f0;box-shadow:0 2px 6px rgba(0,0,0,0.04);}
        .decade-desc{font-size:0.88em;color:#666;line-height:1.75;margin:0 0 14px;}
        .decade-subtitle{font-size:0.85em;font-weight:bold;color:#e94560;margin:10px 0 6px;}
        .decade-list{margin:0;padding-left:18px;}
        .decade-list li{font-size:0.87em;color:#555;margin:4px 0;line-height:1.5;}

        .spinner{text-align:center;padding:30px;color:#aaa;}
        .spin{display:inline-block;width:28px;height:28px;border:3px solid #eee;border-top-color:#e94560;border-radius:50%;animation:spin .8s linear infinite;margin-bottom:10px;}
        @keyframes spin{to{transform:rotate(360deg);}}
        .error{text-align:center;color:#e94560;padding:20px;}
        .hint{font-size:0.82em;color:#aaa;text-align:center;margin-top:10px;}
      `}</style>

      <div className="hero">
        <h1>🔍 好きナビ</h1>
        <p>この小説家 / アーティストが好きなら、次のおすすめは？<br />AIが好みをナビします</p>
        <div className="search-wrap">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="村上春樹 / 東野圭吾 / YOASOBI / 米津玄師 など"
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "検索中…" : "ナビする！"}
          </button>
        </div>
        <p className="hint">小説家・作家・アーティスト・バンド、なんでもOK</p>
      </div>

      <div className="container">
        {/* ローディング */}
        {loading && (
          <div className="spinner">
            <div className="spin" />
            <div>AIが似ているアーティスト・作家を探しています…</div>
          </div>
        )}

        {/* エラー */}
        {error && <div className="error">{error}</div>}

        {/* 推薦結果 */}
        {results.length > 0 && (
          <div className="result-panel">
            <p className="result-heading">「{searched}」が好きなあなたへのおすすめ</p>
            {results.map((item, i) => (
              <div className="rec-item" key={i}>
                <span className={`rec-badge ${item.type?.includes("アーティスト") ? "badge-artist" : "badge-author"}`}>
                  {item.type}
                </span>
                <div className="rec-body">
                  <div className="rec-name">{item.name}</div>
                  <div className="rec-reason">{item.reason}</div>
                  <button
                    className="amazon-btn"
                    onClick={() => window.open(`https://www.amazon.co.jp/s?k=${encodeURIComponent(item.name)}&tag=sincere1229-22`, "_blank")}
                  >
                    Amazonで見る
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* コメント欄 */}
        {searched && (
          <div className="comment-panel">
            <p className="section-title" style={{marginTop:0}}>「{searched}」へのコメント</p>
            <div className="comment-form">
              <input
                type="text"
                placeholder="ニックネーム（省略可）"
                value={myName}
                onChange={(e) => setMyName(e.target.value)}
              />
              <textarea
                placeholder={`「${searched}」についてのコメントや推薦理由を書いてください（200字以内）`}
                value={myComment}
                onChange={(e) => setMyComment(e.target.value.slice(0, 200))}
              />
              <button className="post-btn" onClick={handlePost} disabled={posting || !myComment.trim()}>
                {posting ? "投稿中…" : "投稿する"}
              </button>
            </div>
            {comments.length === 0 ? (
              <div className="no-comment">まだコメントはありません。最初のコメントを書いてみましょう！</div>
            ) : (
              comments.map((c, i) => (
                <div className="comment-item" key={i}>
                  <div className="comment-meta">
                    <span>{c.name}</span>{c.date}
                  </div>
                  <div className="comment-text">{c.comment}</div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 年代別コラム */}
        <p className="section-title">年代別カルチャーコラム</p>
        {DECADES.map((d, i) => (
          <div className="decade-wrap" key={i}>
            <div className="decade-header" onClick={() => setOpenDecade(openDecade === i ? null : i)}>
              <div>
                <div className="decade-year">{d.year}：{d.title}</div>
                <div className="decade-sub">代表曲・芥川賞作品を見る</div>
              </div>
              <span className={`decade-arrow${openDecade === i ? " open" : ""}`}>▼</span>
            </div>
            {openDecade === i && (
              <div className="decade-body">
                <p className="decade-desc">{d.desc}</p>
                <p className="decade-subtitle">🎵 この時代の代表曲</p>
                <ul className="decade-list">
                  {d.songs.map((s, j) => <li key={j}>{s}</li>)}
                </ul>
                <p className="decade-subtitle">📚 この時代の芥川賞作品</p>
                <ul className="decade-list">
                  {d.books.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
