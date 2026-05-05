"use client";
import { useState } from "react";

// ── 型定義 ───────────────────────────────────────────
interface BookItem {
  title: string;
  author: string;
  publisher: string;
  reason: string;
  level: "入門" | "初級" | "中級" | "上級";
  category: string;
  amazonUrl: string;
  price: string;
}

interface Comment {
  name: string;
  comment: string;
  createdAt: string;
}

// ── カテゴリ定数 ────────────────────────────────────
const CATEGORIES = [
  { label: "💼 士業", tags: ["行政書士", "社会保険労務士", "司法書士", "宅建", "中小企業診断士"] },
  { label: "📊 会計・FP", tags: ["簿記3級", "簿記2級", "FP2級", "税理士", "公認会計士"] },
  { label: "💻 IT・DX", tags: ["ITパスポート", "基本情報技術者", "AWS", "Python", "AI活用"] },
  { label: "📈 ビジネス", tags: ["MBA", "マーケティング", "プロジェクト管理", "リーダーシップ", "TOEIC"] },
  { label: "🏥 医療福祉", tags: ["介護福祉士", "ケアマネ", "医療事務", "保育士", "精神保健福祉士"] },
  { label: "💰 副業・起業", tags: ["副業", "フリーランス", "Webライティング", "動画編集", "せどり"] },
];

const LEVEL_COLOR: Record<string, { bg: string; text: string }> = {
  "入門": { bg: "#e8f5e9", text: "#2e7d32" },
  "初級": { bg: "#e3f2fd", text: "#1565c0" },
  "中級": { bg: "#fff3e0", text: "#e65100" },
  "上級": { bg: "#fce4ec", text: "#880e4f" },
};

export default function StudyNaviPage() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BookItem[]>([]);
  const [searched, setSearched] = useState("");
  const [error, setError] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [myName, setMyName] = useState("");
  const [myComment, setMyComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [openCat, setOpenCat] = useState<number | null>(null);

  const fetchComments = async (kw: string) => {
    const res = await fetch(`/api/study-comments?keyword=${encodeURIComponent(kw)}`);
    const data = await res.json();
    setComments(data);
  };

  const handleSearch = async (kw?: string) => {
    const q = (kw ?? keyword).trim();
    if (!q) return;
    setKeyword(q);
    setLoading(true);
    setError("");
    setResults([]);
    setComments([]);
    try {
      const res = await fetch("/api/study-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: q }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(data.items);
      setSearched(q);
      await fetchComments(q);
    } catch {
      setError("取得に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    if (!myComment.trim()) return;
    setPosting(true);
    await fetch("/api/study-comments", {
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
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=DM+Serif+Display&display=swap');

        :root {
          --navy: #0f1f3d;
          --navy2: #1a3160;
          --gold: #c9973a;
          --gold-light: #f0c96e;
          --cream: #faf7f2;
          --white: #ffffff;
          --text: #1a1a2e;
          --muted: #6b7280;
          --card-bg: #ffffff;
          --border: #e5e7eb;
          --success: #059669;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Noto Sans JP', sans-serif;
          background: var(--cream);
          color: var(--text);
          min-height: 100vh;
        }

        /* ── HEADER ── */
        .sn-header {
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy2) 100%);
          color: var(--white);
          padding: 3rem 1.5rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .sn-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(201,151,58,0.15) 0%, transparent 60%),
                      radial-gradient(ellipse at 70% 20%, rgba(201,151,58,0.08) 0%, transparent 50%);
        }
        .sn-header-inner { position: relative; z-index: 1; }
        .sn-badge {
          display: inline-block;
          background: rgba(201,151,58,0.2);
          border: 1px solid var(--gold);
          color: var(--gold-light);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          padding: 0.3rem 0.9rem;
          border-radius: 2rem;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        .sn-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--white);
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }
        .sn-title span { color: var(--gold-light); }
        .sn-subtitle {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        /* ── SEARCH ── */
        .sn-search-wrap {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
        }
        .sn-input {
          flex: 1;
          padding: 0.85rem 1.2rem;
          border-radius: 0.6rem;
          border: 2px solid transparent;
          font-size: 1rem;
          font-family: 'Noto Sans JP', sans-serif;
          outline: none;
          background: rgba(255,255,255,0.95);
          color: var(--text);
          transition: border-color 0.2s;
        }
        .sn-input:focus { border-color: var(--gold); }
        .sn-input::placeholder { color: #9ca3af; }
        .sn-btn {
          padding: 0.85rem 1.5rem;
          background: linear-gradient(135deg, var(--gold), #b8832e);
          color: var(--white);
          border: none;
          border-radius: 0.6rem;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.2s, transform 0.1s;
          font-family: 'Noto Sans JP', sans-serif;
        }
        .sn-btn:hover { opacity: 0.9; }
        .sn-btn:active { transform: scale(0.97); }
        .sn-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── MAIN ── */
        .sn-main {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 1.25rem 4rem;
        }

        /* ── CATEGORIES ── */
        .sn-cat-section { margin-bottom: 2.5rem; }
        .sn-section-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .sn-section-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .sn-cat-list { display: flex; flex-direction: column; gap: 0.6rem; }
        .sn-cat-row {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 0.6rem;
          overflow: hidden;
        }
        .sn-cat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--navy);
          transition: background 0.15s;
        }
        .sn-cat-header:hover { background: #f9fafb; }
        .sn-cat-chevron {
          color: var(--muted);
          font-size: 0.75rem;
          transition: transform 0.2s;
        }
        .sn-cat-chevron.open { transform: rotate(180deg); }
        .sn-cat-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0 1rem 0.75rem;
        }
        .sn-tag {
          padding: 0.35rem 0.85rem;
          background: var(--cream);
          border: 1px solid var(--border);
          border-radius: 2rem;
          font-size: 0.8rem;
          color: var(--navy2);
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'Noto Sans JP', sans-serif;
        }
        .sn-tag:hover {
          background: var(--navy);
          color: var(--white);
          border-color: var(--navy);
        }

        /* ── AD PLACEHOLDER ── */
        .sn-ad {
          background: #f9fafb;
          border: 1px dashed #d1d5db;
          border-radius: 0.6rem;
          padding: 1rem;
          text-align: center;
          color: #9ca3af;
          font-size: 0.75rem;
          margin-bottom: 2rem;
        }

        /* ── LOADING ── */
        .sn-loading {
          text-align: center;
          padding: 3rem;
          color: var(--muted);
        }
        .sn-spinner {
          width: 2.5rem;
          height: 2.5rem;
          border: 3px solid var(--border);
          border-top-color: var(--gold);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── RESULTS ── */
        .sn-result-head {
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .sn-result-label {
          font-size: 1rem;
          font-weight: 700;
          color: var(--navy);
        }
        .sn-result-label span { color: var(--gold); }
        .sn-result-count {
          font-size: 0.78rem;
          color: var(--muted);
        }

        .sn-books { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .sn-book-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 0.8rem;
          padding: 1.25rem;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          align-items: start;
          transition: box-shadow 0.2s, transform 0.15s;
        }
        .sn-book-card:hover {
          box-shadow: 0 4px 20px rgba(15,31,61,0.08);
          transform: translateY(-1px);
        }
        .sn-book-meta { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.4rem; }
        .sn-level {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 0.3rem;
        }
        .sn-cat-tag {
          display: inline-block;
          font-size: 0.68rem;
          padding: 0.2rem 0.6rem;
          border-radius: 0.3rem;
          background: #e8eaf6;
          color: #283593;
        }
        .sn-book-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 0.2rem;
          line-height: 1.4;
        }
        .sn-book-author {
          font-size: 0.78rem;
          color: var(--muted);
          margin-bottom: 0.5rem;
        }
        .sn-book-reason {
          font-size: 0.85rem;
          color: #374151;
          line-height: 1.65;
        }
        .sn-amazon-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #FF9900;
          color: var(--white);
          text-decoration: none;
          padding: 0.6rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          white-space: nowrap;
          transition: opacity 0.15s;
          font-family: 'Noto Sans JP', sans-serif;
        }
        .sn-amazon-btn:hover { opacity: 0.85; }
        .sn-price {
          font-size: 0.72rem;
          color: var(--muted);
          margin-top: 0.4rem;
          text-align: center;
        }

        /* ── PORTAL CTA ── */
        .sn-portal-cta {
          background: linear-gradient(135deg, var(--navy), var(--navy2));
          border-radius: 0.8rem;
          padding: 1.75rem;
          text-align: center;
          color: var(--white);
          margin-bottom: 2rem;
        }
        .sn-portal-cta h3 {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .sn-portal-cta p {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.75);
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .sn-portal-btn {
          display: inline-block;
          background: var(--gold);
          color: var(--white);
          text-decoration: none;
          padding: 0.7rem 1.75rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 700;
          transition: opacity 0.15s;
        }
        .sn-portal-btn:hover { opacity: 0.9; }

        /* ── COMMENTS ── */
        .sn-comment-section {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 0.8rem;
          padding: 1.5rem;
        }
        .sn-comment-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }
        .sn-comment-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem; }
        .sn-comment-item {
          background: var(--cream);
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
        }
        .sn-comment-name {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--navy2);
          margin-bottom: 0.25rem;
        }
        .sn-comment-text { font-size: 0.85rem; color: #374151; line-height: 1.6; }
        .sn-comment-date { font-size: 0.7rem; color: var(--muted); margin-top: 0.25rem; }
        .sn-comment-form { display: flex; flex-direction: column; gap: 0.5rem; }
        .sn-comment-input, .sn-comment-textarea {
          width: 100%;
          padding: 0.65rem 0.9rem;
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          font-size: 0.85rem;
          font-family: 'Noto Sans JP', sans-serif;
          outline: none;
          transition: border-color 0.2s;
          background: var(--white);
          color: var(--text);
        }
        .sn-comment-input:focus, .sn-comment-textarea:focus { border-color: var(--gold); }
        .sn-comment-textarea { resize: vertical; min-height: 80px; }
        .sn-comment-submit {
          align-self: flex-end;
          padding: 0.6rem 1.5rem;
          background: var(--navy);
          color: var(--white);
          border: none;
          border-radius: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.15s;
          font-family: 'Noto Sans JP', sans-serif;
        }
        .sn-comment-submit:hover { opacity: 0.85; }
        .sn-comment-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .sn-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 0.8rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 600px) {
          .sn-book-card { grid-template-columns: 1fr; }
          .sn-amazon-wrap { display: flex; justify-content: flex-start; }
        }
      `}</style>

      {/* HEADER */}
      <div className="sn-header">
        <div className="sn-header-inner">
          <span className="sn-badge">📚 AI BOOK NAVIGATOR</span>
          <h1 className="sn-title">
            勉強<span>ナビ</span>
          </h1>
          <p className="sn-subtitle">
            学びたい資格・分野を入力するだけ<br />
            AIがあなたにぴったりの本をAmazonリンク付きで紹介します
          </p>
          <div className="sn-search-wrap">
            <input
              className="sn-input"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="例）簿記2級、AWS、中小企業診断士、副業..."
            />
            <button className="sn-btn" onClick={() => handleSearch()} disabled={loading}>
              {loading ? "検索中..." : "検索"}
            </button>
          </div>
        </div>
      </div>

      <div className="sn-main">
        {/* AD TOP */}
        <div className="sn-ad">広告スペース（Google AdSense）</div>

        {/* CATEGORIES */}
        {!results.length && !loading && (
          <div className="sn-cat-section">
            <p className="sn-section-title">カテゴリから選ぶ</p>
            <div className="sn-cat-list">
              {CATEGORIES.map((cat, i) => (
                <div key={i} className="sn-cat-row">
                  <div
                    className="sn-cat-header"
                    onClick={() => setOpenCat(openCat === i ? null : i)}
                  >
                    <span>{cat.label}</span>
                    <span className={`sn-cat-chevron ${openCat === i ? "open" : ""}`}>▼</span>
                  </div>
                  {openCat === i && (
                    <div className="sn-cat-tags">
                      {cat.tags.map(tag => (
                        <button
                          key={tag}
                          className="sn-tag"
                          onClick={() => handleSearch(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ERROR */}
        {error && <div className="sn-error">⚠️ {error}</div>}

        {/* LOADING */}
        {loading && (
          <div className="sn-loading">
            <div className="sn-spinner" />
            <p>「{keyword}」のおすすめ本を検索中...</p>
          </div>
        )}

        {/* RESULTS */}
        {results.length > 0 && (
          <>
            <div className="sn-result-head">
              <p className="sn-result-label">
                「<span>{searched}</span>」のおすすめ本
              </p>
              <span className="sn-result-count">{results.length}冊</span>
            </div>

            <div className="sn-books">
              {results.map((book, i) => {
                const lvColor = LEVEL_COLOR[book.level] ?? { bg: "#f5f5f5", text: "#666" };
                return (
                  <div key={i} className="sn-book-card">
                    <div>
                      <div className="sn-book-meta">
                        <span
                          className="sn-level"
                          style={{ background: lvColor.bg, color: lvColor.text }}
                        >
                          {book.level}
                        </span>
                        <span className="sn-cat-tag">{book.category}</span>
                      </div>
                      <p className="sn-book-title">{book.title}</p>
                      <p className="sn-book-author">{book.author}｜{book.publisher}</p>
                      <p className="sn-book-reason">{book.reason}</p>
                    </div>
                    <div className="sn-amazon-wrap">
                      <div>
                        <a
                          href={book.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sn-amazon-btn"
                        >
                          🛒 Amazon
                        </a>
                        <p className="sn-price">{book.price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AD MIDDLE */}
            <div className="sn-ad" style={{ marginBottom: "2rem" }}>広告スペース（Google AdSense）</div>

            {/* PORTAL CTA */}
            <div className="sn-portal-cta">
              <h3>🌟 あなたに合った診断もやってみよう</h3>
              <p>
                強み・向いてる仕事・副業タイプなど<br />
                AI診断で自分のキャリアをもっと深く知れます
              </p>
              <a href="/shindan" className="sn-portal-btn">
                AI診断ポータルへ →
              </a>
            </div>

            {/* COMMENTS */}
            <div className="sn-comment-section">
              <p className="sn-comment-title">
                💬 「{searched}」の勉強法・おすすめ本を教えて
              </p>
              {comments.length > 0 && (
                <div className="sn-comment-list">
                  {comments.map((c, i) => (
                    <div key={i} className="sn-comment-item">
                      <p className="sn-comment-name">{c.name || "匿名"}</p>
                      <p className="sn-comment-text">{c.comment}</p>
                      <p className="sn-comment-date">
                        {new Date(c.createdAt).toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="sn-comment-form">
                <input
                  className="sn-comment-input"
                  placeholder="ニックネーム（任意）"
                  value={myName}
                  onChange={e => setMyName(e.target.value)}
                />
                <textarea
                  className="sn-comment-textarea"
                  placeholder="おすすめの本や勉強法、合格体験談など..."
                  value={myComment}
                  onChange={e => setMyComment(e.target.value)}
                />
                <button
                  className="sn-comment-submit"
                  onClick={handlePost}
                  disabled={posting}
                >
                  {posting ? "投稿中..." : "投稿する"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
