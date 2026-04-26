export default function Home() {
  return (
    <>
      <style>{`
        :root {
          --gold: #c9a84c;
          --gold2: #e8c97a;
          --navy: #0a0e1a;
          --pink: #fce8f3;
          --text: #3d1a40;
          --text-s: #8a6a9a;
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background: linear-gradient(160deg,#fce8f3 0%,#fdf0f8 40%,#f8eeff 100%); min-height:100vh; }

        .hero {
          position: relative;
          text-align: center;
          padding: 80px 24px 60px;
          overflow: hidden;
        }
        .hero::before {
          content:'';
          position:absolute;inset:0;
          background: linear-gradient(180deg,rgba(255,215,235,0.7) 0%,transparent 100%);
          z-index:0;
        }
        .hero-content { position:relative;z-index:1; }

        .logo {
          font-family: 'Cinzel', serif;
          font-size: clamp(32px,6vw,56px);
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .logo-sub {
          font-size: 14px;
          color: var(--text-s);
          letter-spacing: 0.3em;
          margin-bottom: 24px;
        }
        .gold-line {
          width: 120px; height: 1px;
          background: linear-gradient(90deg,transparent,var(--gold),transparent);
          margin: 0 auto 24px;
        }
        .tagline {
          font-size: clamp(14px,2vw,18px);
          color: var(--text);
          line-height: 1.8;
          max-width: 500px;
          margin: 0 auto 48px;
        }

        .nav-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 16px;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        @media(min-width:600px) {
          .nav-grid { grid-template-columns: repeat(4,1fr); }
        }

        .nav-card {
          background: rgba(255,248,252,0.9);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 16px;
          padding: 28px 16px;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 4px 16px rgba(180,120,160,0.08);
          display: block;
        }
        .nav-card:hover {
          transform: translateY(-4px);
          border-color: rgba(201,168,76,0.5);
          box-shadow: 0 12px 32px rgba(180,120,160,0.15);
        }
        .nav-icon { font-size: 36px; margin-bottom: 12px; display: block; }
        .nav-en {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          color: var(--gold);
          letter-spacing: 0.15em;
          margin-bottom: 6px;
        }
        .nav-jp {
          font-size: 14px;
          color: var(--text);
          font-weight: 500;
          margin-bottom: 6px;
        }
        .nav-desc { font-size: 11px; color: var(--text-s); line-height: 1.6; }

        .new-badge {
          display: inline-block;
          background: rgba(232,122,122,0.12);
          border: 1px solid rgba(232,122,122,0.3);
          color: #c05050;
          font-size: 9px;
          padding: 2px 8px;
          border-radius: 10px;
          margin-top: 8px;
          font-family: 'Cinzel', serif;
          letter-spacing: 0.1em;
        }

        .catch-section {
          text-align: center;
          padding: 40px 24px;
          border-top: 1px solid rgba(201,168,76,0.15);
        }
        .catch-text {
          font-size: 13px;
          color: var(--text-s);
          line-height: 2;
        }
        .line-btn {
          display: inline-block;
          margin-top: 20px;
          background: rgba(201,168,76,0.12);
          border: 1px solid var(--gold);
          color: #8a6010;
          font-family: 'Cinzel', serif;
          font-size: 13px;
          letter-spacing: 0.1em;
          padding: 13px 32px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s;
        }
        .line-btn:hover { background: rgba(201,168,76,0.25); }

        footer {
          text-align: center;
          padding: 24px;
          border-top: 1px solid rgba(201,168,76,0.15);
          font-size: 12px;
          color: rgba(120,80,100,0.4);
        }
      `}</style>

      <div className="hero">
        <div className="hero-content">
          <div className="logo">Twinkle Lab</div>
          <div className="logo-sub">トゥインクル ラボ</div>
          <div className="gold-line"></div>
          <p className="tagline">
            AI × 占い × 親子教育<br />
            星の導きと最新AIで、あなたの毎日をもっと輝かせる
          </p>
        </div>
      </div>

      <div className="nav-grid">
        <a href="/star" className="nav-card">
          <span className="nav-icon">🔮</span>
          <div className="nav-en">Twinkle Star Oracle</div>
          <div className="nav-jp">占いポータル</div>
          <div className="nav-desc">タロット・数秘術・四柱推命など11種類の占い</div>
          <span className="new-badge">NEW</span>
        </a>
        <a href="/heart" className="nav-card">
          <span className="nav-icon">🐣</span>
          <div className="nav-en">Twinkle Heart</div>
          <div className="nav-jp">親子AIあそびブック</div>
          <div className="nav-desc">親子でAIを楽しく学ぶKindleシリーズ</div>
        </a>
        <a href="/kids" className="nav-card">
          <span className="nav-icon">📚</span>
          <div className="nav-en">Twinkle Kids</div>
          <div className="nav-jp">学習シリーズ</div>
          <div className="nav-desc">AIを使った楽しい学習アプリ</div>
        </a>
        <a href="/company" className="nav-card">
          <span className="nav-icon">✨</span>
          <div className="nav-en">About</div>
          <div className="nav-jp">Twinkle Labとは</div>
          <div className="nav-desc">AI×創造性で未来を切り開くクリエイティブラボ</div>
        </a>
      </div>

      <div className="catch-section">
        <p className="catch-text">
          LINEに登録すると毎月限定の無料占いイベントをお届けします🎁<br />
          ルーン占い・ケルト十字・満月リーディングなど特別コンテンツ多数
        </p>
        <a href="https://lin.ee/XHDFrA8" target="_blank" className="line-btn">
          💬 LINE に登録する（無料）
        </a>
      </div>

      <footer>
        © 2026 Twinkle Lab. All rights reserved.
      </footer>
    </>
  )
}
