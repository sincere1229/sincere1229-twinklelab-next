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
          margin: 0 auto 32px;
        }

        .hero-cta {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .hero-cta-main {
          display: inline-block;
          background: linear-gradient(135deg, var(--gold), #b8860b);
          color: #fff;
          font-family: 'Cinzel', serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 14px 28px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 4px 16px rgba(201,168,76,0.35);
        }
        .hero-cta-main:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(201,168,76,0.45);
        }
        .hero-cta-sub {
          display: inline-block;
          background: transparent;
          border: 1px solid var(--gold);
          color: #8a6010;
          font-family: 'Cinzel', serif;
          font-size: 13px;
          letter-spacing: 0.08em;
          padding: 13px 24px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.3s;
        }
        .hero-cta-sub:hover { background: rgba(201,168,76,0.1); }

        .nav-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 16px;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }
        @media(min-width:600px) {
          .nav-grid { grid-template-columns: repeat(3,1fr); }
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
          margin-bottom: 20px;
        }
        .share-btn {
          display: inline-block;
          margin: 0 6px;
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
        .share-btn:hover { background: rgba(201,168,76,0.25); }

        footer {
          text-align: center;
          padding: 24px;
          border-top: 1px solid rgba(201,168,76,0.15);
          font-size: 12px;
          color: rgba(120,80,100,0.4);
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .footer-links a {
          font-size: 0.78rem;
          color: rgba(120,80,100,0.6);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--gold); }
      `}</style>

      <div className="hero">
        <div className="hero-content">
          <div className="logo">Twinkle Lab</div>
          <div className="logo-sub">トゥインクル ラボ</div>
          <div className="gold-line"></div>
          <p className="tagline">
            AI × 占いで、あなたとお子さんの「適性」と<br />
            「好き・得意」を見つけるTwinkle Lab<br />
            Twinkle Labは、星の導きや手相などの占いと、<br />
            最新AIを組み合わせて、大人と子どもの「適性」と<br />
            「好き・得意」を見つけるための診断・学びのヒントを届けるサイトです。
          </p>
          <div className="hero-cta">
            <a href="/star" className="hero-cta-main">🔮 無料で占ってみる</a>
            <a href="/star/sogo" className="hero-cta-sub">✦ AI総合鑑定を見る</a>
          </div>
        </div>
      </div>

      <div className="nav-grid">
        <a href="/star" className="nav-card">
          <span className="nav-icon">🔮</span>
          <div className="nav-en">Twinkle Star Oracle</div>
          <div className="nav-jp">占いポータル</div>
          <div className="nav-desc">無料占いからAI総合鑑定まで。タロット・数秘術・四柱推命など多彩な占い</div>
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
          <div className="nav-jp">学習ナビ</div>
          <div className="nav-desc">つまずき別ドリル検索・読書感想文リスト・勉強タイプ診断</div>
        </a>
        <a href="/sukinavi" className="nav-card">
          <span className="nav-icon">🔍</span>
          <div className="nav-en">Suki Navi</div>
          <div className="nav-jp">好きナビ</div>
          <div className="nav-desc">好きな作家・アーティストを入力するとAIが似たおすすめをナビ</div>
          <span className="new-badge">NEW</span>
        </a>
        <a href="/study" className="nav-card">
          <span className="nav-icon">📖</span>
          <div className="nav-en">Benkyo Navi</div>
          <div className="nav-jp">勉強ナビ</div>
          <div className="nav-desc">資格・スキルアップのおすすめ本をAIが紹介。社会人向け学習ナビ。</div>
          <span className="new-badge">NEW</span>
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
          Twinkle Star Oracleで占ってみよう✨<br />
          タロット・手相・相性診断・AI総合鑑定が楽しめます
        </p>
        <div>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Twinkle Lab｜AI×占いで自分の適性と好きを見つけよう✨\nhttps://twinkle-lab.jp')}`}
            target="_blank" rel="noopener noreferrer" className="share-btn">
            𝕏 シェア
          </a>
          <a href="/star" className="share-btn">
            🔮 占いポータルへ
          </a>
        </div>
      </div>

      <footer>
        <div className="footer-links">
          <a href="/privacy">プライバシーポリシー</a>
          <a href="/tokusho">特定商取引法に基づく表記</a>
          <a href="/tos">利用規約</a>
          <a href="/contact">お問い合わせ</a>
          <a href="/sukinavi">好きナビ</a>
          <a href="/study">勉強ナビ</a>
        </div>
        © 2026 Twinkle Lab. All rights reserved.
      </footer>
    </>
  )
}
