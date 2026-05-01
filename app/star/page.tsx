export const metadata = {
  title: 'Twinkle Star Oracle｜AI占いポータル',
  description: 'タロット・数秘術・九星気学・四柱推命・易占い・バードオラクルなど11種類のAI占いが楽しめる無料占いポータル。手相診断（LINE）も無料。AI総合鑑定（¥3,980）では手相＋複数占術で本格リーディングを提供します。',
  openGraph: {
    title: 'Twinkle Star Oracle｜AI占いポータル',
    description: 'タロット・数秘術・九星気学・四柱推命など11種類のAI占いが無料。手相診断もLINEで無料受付中。AI総合鑑定（手相＋複数占術）¥3,980。',
    url: 'https://twinkle-lab.jp/star',
    siteName: 'Twinkle Star Oracle',
    locale: 'ja_JP',
    type: 'website',
  },
}

const DAILY_TOP = [
  { icon:'⭐', name:'今日の星座占い', sub:'12星座・毎日更新', href:'https://horoscope-today-omega.vercel.app' },
  { icon:'📅', name:'開運カレンダー', sub:'吉日・ラッキー情報', href:'https://lucky-calendar-seven.vercel.app' },
  { icon:'✨', name:'エンジェルナンバー', sub:'今日の数字のメッセージ', href:'https://angel-number-fawn.vercel.app' },
]

const DAILY_REST = [
  { icon:'💫', name:'アファメーション', sub:'今日の言葉・朝の習慣', href:'https://affirmation-app-rho.vercel.app' },
  { icon:'🌙', name:'夢占い', sub:'夢の意味を読み解く', href:'https://dream-app-omega.vercel.app' },
]

const CARDS = [
  { icon:'🃏', name:'タロットカード', sub:'大アルカナ22枚・1枚/3枚引き', href:'https://tarot-app-rouge.vercel.app' },
  { icon:'🦅', name:'バードオラクル', sub:'36枚の守護鳥カード', href:'https://bird-oracle-ten.vercel.app' },
  { icon:'☯', name:'易占い', sub:'64卦・問いを立てて占う', href:'https://iching-app-sigma.vercel.app' },
  { icon:'🌸', name:'前世リーディング', sub:'魂の記憶を読み解く', href:'https://pastlife-app.vercel.app' },
]

const DEEP = [
  { icon:'🔢', name:'数秘術', sub:'運命数から使命を知る', href:'https://numerology-app-lovat.vercel.app' },
  { icon:'🌟', name:'九星気学', sub:'本命星・吉方位を診断', href:'https://kiju-app.vercel.app' },
  { icon:'💕', name:'相性占い', sub:'2人の運命スコアを算出', href:'https://aicompat-app.vercel.app' },
  { icon:'☯️', name:'四柱推命', sub:'命式・五行バランスを解読', href:'https://shichu-app.vercel.app' },
]

export default function StarPortal() {
  return (
    <>
      <style>{`
        :root { --gold:#c9a84c; --gold2:#e8c97a; --text:#3d1a40; --text-s:#8a6a9a; --text-m:#6a4a70; }
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:linear-gradient(160deg,#fce8f3 0%,#fdf0f8 40%,#f8eeff 100%);min-height:100vh;}
        .container{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 0 60px;}

        /* ★ 手相診断 最上位CTA */
        .teso-hero{background:linear-gradient(135deg,rgba(232,160,192,0.25),rgba(180,100,160,0.15));border-bottom:2px solid rgba(232,160,192,0.4);padding:20px;text-align:center;}
        .teso-hero-badge{display:inline-block;background:rgba(232,160,192,0.2);border:1px solid rgba(232,160,192,0.4);border-radius:20px;padding:4px 14px;font-size:11px;color:#9b4a7a;letter-spacing:2px;margin-bottom:10px;}
        .teso-hero-title{font-size:17px;color:var(--text);font-weight:700;margin-bottom:6px;line-height:1.6;}
        .teso-hero-sub{font-size:12px;color:var(--text-s);margin-bottom:14px;line-height:1.7;}
        .teso-hero-btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#06c755,#04a844);color:#fff;font-weight:700;font-size:14px;border-radius:10px;padding:13px 24px;text-decoration:none;transition:all 0.2s;}
        .teso-hero-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(6,199,85,0.35);}
        .teso-hero-note{font-size:10px;color:var(--text-s);margin-top:8px;}
        .teso-detail-link{display:inline-block;font-size:12px;color:var(--text-s);text-decoration:none;margin-top:8px;border-bottom:1px dashed rgba(138,106,154,0.4);}

        header{text-align:center;padding:36px 20px 24px;border-bottom:1px solid rgba(201,168,76,0.25);background:linear-gradient(180deg,rgba(255,215,235,0.6) 0%,transparent 100%);}
        .back-link{display:inline-block;font-size:12px;color:var(--text-s);text-decoration:none;margin-bottom:16px;letter-spacing:0.1em;}
        .logo-en{font-family:'Cinzel',serif;font-size:clamp(20px,5vw,34px);font-weight:700;letter-spacing:0.1em;color:var(--gold);}
        .logo-jp{font-size:12px;letter-spacing:0.3em;color:var(--text-s);margin-top:6px;}
        .gold-line{width:100px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:14px auto;}
        .tagline{font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.18em;color:rgba(160,120,80,0.7);}

        /* ★ 導線ラダー */
        .flow-ladder{margin:12px 14px 4px;background:rgba(255,248,252,0.9);border:1px solid rgba(201,168,76,0.25);border-radius:14px;padding:16px;}
        .flow-ladder-title{font-family:'Cinzel',serif;font-size:10px;color:var(--gold);letter-spacing:3px;text-align:center;margin-bottom:12px;}
        .flow-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(201,168,76,0.1);}
        .flow-row:last-child{border-bottom:none;}
        .flow-step{font-size:11px;color:rgba(61,26,64,0.5);width:20px;flex-shrink:0;text-align:center;}
        .flow-arrow{font-size:12px;color:rgba(201,168,76,0.4);}
        .flow-desc{font-size:12px;color:var(--text-m);flex:1;line-height:1.5;}
        .flow-price{font-family:'Cinzel',serif;font-size:13px;color:var(--gold);font-weight:700;white-space:nowrap;}
        .flow-cta{font-size:10px;color:#fff;background:linear-gradient(135deg,#8a6a20,var(--gold));border-radius:6px;padding:4px 10px;text-decoration:none;white-space:nowrap;flex-shrink:0;}

        .sec{padding:20px 14px 4px;}
        .sec-en{font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.25em;color:var(--gold);text-transform:uppercase;margin-bottom:3px;text-align:center;}
        .sec-jp{font-size:15px;color:var(--text);font-weight:500;text-align:center;margin-bottom:3px;}
        .sec-desc{font-size:12px;color:var(--text-s);text-align:center;margin-bottom:12px;}

        .daily-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:0 14px 16px;}
        .daily-card{background:rgba(255,248,252,0.9);border:1px solid rgba(201,168,76,0.22);border-radius:14px;padding:16px 8px 14px;text-align:center;text-decoration:none;display:block;transition:all 0.3s;box-shadow:0 3px 12px rgba(180,120,160,0.07);}
        .daily-card:hover{transform:translateY(-3px);border-color:rgba(201,168,76,0.5);}
        .d-icon{font-size:26px;margin-bottom:6px;display:block;}
        .d-name{font-size:12px;color:var(--text);font-weight:500;margin-bottom:2px;}
        .d-sub{font-size:10px;color:var(--text-s);}
        .free-badge{display:inline-block;font-size:9px;padding:2px 7px;border-radius:8px;background:rgba(26,122,60,0.1);color:#2a8a50;border:1px solid rgba(26,122,60,0.2);margin-top:6px;font-family:'Cinzel',serif;}

        /* ★ LINE誘導（手相） */
        .line-teso{margin:4px 14px 12px;background:linear-gradient(135deg,rgba(232,160,192,0.15),rgba(180,100,160,0.08));border:1px solid rgba(232,160,192,0.3);border-radius:14px;padding:18px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;}
        .line-teso-text{font-size:12px;color:var(--text-m);line-height:1.7;flex:1;}
        .line-teso-text strong{display:block;font-size:13px;color:var(--text);margin-bottom:3px;}
        .line-teso-btn{background:linear-gradient(135deg,#06c755,#04a844);color:#fff;font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:1px;padding:10px 16px;border-radius:8px;text-decoration:none;white-space:nowrap;flex-shrink:0;}

        .div-line{display:flex;align-items:center;gap:12px;margin:8px 14px;}
        .div-line::before,.div-line::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);}
        .div-text{font-size:11px;color:var(--text-s);letter-spacing:0.1em;white-space:nowrap;}

        .main-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:0 14px 16px;}
        @media(min-width:560px){.main-grid{grid-template-columns:repeat(4,1fr);}}
        .main-card{background:rgba(255,248,252,0.88);border:1px solid rgba(201,168,76,0.2);border-radius:14px;padding:16px 12px;text-decoration:none;display:block;transition:all 0.3s;}
        .main-card:hover{transform:translateY(-3px);border-color:rgba(201,168,76,0.45);}
        .m-icon{font-size:22px;margin-bottom:6px;display:block;}
        .m-name{font-size:12px;color:var(--text);font-weight:500;margin-bottom:2px;}
        .m-sub{font-size:10px;color:var(--text-m);line-height:1.5;}

        /* ★ 手相→無料診断ナッジ（各占い下部共通） */
        .teso-nudge{margin:0 14px 16px;background:linear-gradient(135deg,rgba(232,160,192,0.12),rgba(180,100,160,0.06));border:1px solid rgba(232,160,192,0.25);border-radius:12px;padding:16px;text-align:center;}
        .teso-nudge-title{font-size:13px;color:var(--text);font-weight:600;margin-bottom:6px;}
        .teso-nudge-body{font-size:11px;color:var(--text-m);line-height:1.8;margin-bottom:12px;}
        .teso-nudge-btn{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,#06c755,#04a844);color:#fff;font-weight:700;font-size:12px;border-radius:8px;padding:10px 20px;text-decoration:none;}

        /* ★ ¥3,980 総合鑑定 */
        .sogo{margin:12px 14px 16px;background:linear-gradient(135deg,rgba(201,168,76,0.1),rgba(255,235,245,0.95));border:1px solid rgba(201,168,76,0.4);border-radius:16px;padding:28px 20px;text-align:center;}
        .sogo-label{font-family:'Cinzel',serif;font-size:10px;color:var(--gold);letter-spacing:0.25em;text-transform:uppercase;margin-bottom:8px;}
        .sogo-title{font-size:17px;color:var(--text);font-weight:600;margin-bottom:6px;}
        .sogo-desc{font-size:12px;color:var(--text-m);line-height:1.8;margin-bottom:10px;}
        .sogo-items{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:12px;}
        .sogo-item{font-size:11px;color:var(--text-s);}
        .sogo-item::before{content:'✦ ';color:var(--gold);font-size:9px;}
        .sogo-price-wrap{margin-bottom:4px;}
        .sogo-price-orig{font-size:12px;color:var(--text-s);text-decoration:line-through;margin-bottom:2px;}
        .sogo-price{font-family:'Cinzel',serif;font-size:28px;color:var(--gold);}
        .sogo-sub{font-size:11px;color:var(--text-s);margin-bottom:16px;}
        .sogo-btn{display:inline-block;background:linear-gradient(135deg,#8a6a20,var(--gold),#8a6a20);background-size:200% 100%;border:none;border-radius:8px;color:#fff8f0;font-family:'Cinzel',serif;font-size:13px;font-weight:700;letter-spacing:0.1em;padding:13px 28px;text-decoration:none;transition:all 0.4s;}
        .sogo-btn:hover{background-position:100% 0;box-shadow:0 6px 20px rgba(201,168,76,0.35);}

        /* ★ LINE強化バナー */
        .line-banner{margin:0 14px 16px;background:rgba(255,248,252,0.9);border:1px solid rgba(201,168,76,0.22);border-radius:14px;padding:20px;}
        .line-banner h3{font-size:15px;color:var(--text);font-weight:600;margin-bottom:6px;}
        .line-banner p{font-size:11px;color:var(--text-m);line-height:1.7;margin-bottom:12px;}
        .line-banner-btn{display:inline-block;background:linear-gradient(135deg,#1a7a3c,#2a8a50);color:#fff;font-family:'Cinzel',serif;font-size:12px;font-weight:700;letter-spacing:1px;padding:11px 24px;border-radius:8px;text-decoration:none;}

        footer{text-align:center;padding:20px;border-top:1px solid rgba(201,168,76,0.12);font-size:11px;color:rgba(120,80,100,0.4);}
      `}</style>

      <div className="container">

        {/* ★ 手相診断 最上位CTA */}
        <div className="teso-hero">
          <div className="teso-hero-badge">🤲 おすすめ No.1</div>
          <div className="teso-hero-title">
            手のひらを見せるだけで<br/>あなたの本質がわかります
          </div>
          <div className="teso-hero-sub">
            LINEに両手の写真を送るだけ · 無料で簡易診断をお届け
          </div>
          <div style={{fontSize:'12px',color:'rgba(155,74,122,0.8)',marginBottom:'10px',letterSpacing:'1px'}}>
            ※現在、無料診断を受付中です
          </div>
          <a href="https://lin.ee/XHDFrA8" className="teso-hero-btn" target="_blank" rel="noopener">
            <span>💬</span>
            無料で手相診断を受ける（LINE）
          </a>
          <div style={{fontSize:'13px',color:'#9b4a7a',fontWeight:600,marginTop:'8px',letterSpacing:'1px'}}>
            両手のひらの写真を送るだけで<br/>あなたの本質と今の状態を読み解きます
          </div>
          <div style={{fontSize:'12px',color:'rgba(155,74,122,0.7)',marginTop:'4px'}}>
            初めての方でも安心してご利用いただけます
          </div>
          <div className="teso-hero-note">登録無料 · 写真を送るだけ · 順次診断をお届けします</div>
          <br/>
          <a href="/star/teso" className="teso-detail-link">手相診断について詳しく見る →</a>
        </div>

        <header>
          <a href="/" className="back-link">← Twinkle Lab トップ</a>
          <div className="logo-en">Twinkle Star Oracle</div>
          <div className="logo-jp">トゥインクル スター オラクル</div>
          <div className="gold-line"></div>
          <div className="tagline">Your Guide to the Stars & Beyond</div>
          <div style={{marginTop:'12px',fontSize:'13px',color:'rgba(61,26,64,0.7)',letterSpacing:'1px'}}>
            無料占い → 手相診断（LINE）→ 本格鑑定
          </div>
        </header>

        {/* ★ 導線ラダー */}
        <div className="flow-ladder">
          <div className="flow-ladder-title">✦ READING PLAN ✦</div>
          <div className="flow-row">
            <div className="flow-step">①</div>
            <div className="flow-arrow">→</div>
            <div className="flow-desc"><strong style={{color:'var(--text)'}}>無料占い</strong>　タロット・星座・数秘術など11種類</div>
            <div className="flow-price">FREE</div>
          </div>
          <div className="flow-row">
            <div className="flow-step">②</div>
            <div className="flow-arrow">→</div>
            <div className="flow-desc"><strong style={{color:'var(--text)'}}>手相診断（LINE）</strong>　両手の写真を送るだけ · 無料</div>
            <a href="https://lin.ee/XHDFrA8" className="flow-cta" target="_blank" rel="noopener">無料登録</a>
          </div>
          <div className="flow-row">
            <div className="flow-step">③</div>
            <div className="flow-arrow">→</div>
            <div className="flow-desc"><strong style={{color:'var(--text)'}}>手相詳細診断</strong>　ズレ分析・行動アドバイス付き</div>
            <div className="flow-price">¥980</div>
          </div>
          <div className="flow-row">
            <div className="flow-step">④</div>
            <div className="flow-arrow">→</div>
            <div className="flow-desc"><strong style={{color:'var(--text)'}}>AI総合鑑定（手相＋複数占術）</strong>　人生全体を完全解析</div>
            <a href="/star/sogo" className="flow-cta">完全版</a>
          </div>
        </div>

        {/* 無料占い */}
        <div className="sec">
          <div className="sec-en">✦ Daily Fortune ✦</div>
          <div className="sec-jp">毎日チェック！無料占い</div>
          <div className="sec-desc">毎日変わる · 何度でも無料</div>
        </div>
        <div className="daily-grid">
          {DAILY_TOP.map((d) => (
            <a key={d.name} href={d.href} target="_blank" className="daily-card">
              <span className="d-icon">{d.icon}</span>
              <div className="d-name">{d.name}</div>
              <div className="d-sub">{d.sub}</div>
              <span className="free-badge">FREE</span>
            </a>
          ))}
        </div>

        {/* ★ 手相LINE誘導（無料占いの直下） */}
        <div className="line-teso">
          <div className="line-teso-text">
            <strong>🤲 無料占いのあとは手相診断へ</strong>
            LINEに両手の写真を送るだけで、あなたの本質と今の流れがわかります<br/>
            <span style={{fontSize:'11px',color:'rgba(106,74,112,0.8)'}}>LINEで「手相」と送るだけでOKです</span>
          </div>
          <a href="https://lin.ee/XHDFrA8" className="line-teso-btn" target="_blank" rel="noopener">
            💬 無料で診断
          </a>
        </div>

        <div className="div-line"><span className="div-text">✦ カード占い ✦</span></div>
        <div className="main-grid">
          {CARDS.map((c) => (
            <a key={c.name} href={c.href} target="_blank" className="main-card">
              <span className="m-icon">{c.icon}</span>
              <div className="m-name">{c.name}</div>
              <div className="m-sub">{c.sub}</div>
              <span className="free-badge">FREE</span>
            </a>
          ))}
        </div>

        {/* ★ 手相ナッジ（カード占い下） */}
        <div className="teso-nudge">
          <div className="teso-nudge-title">🤲 より詳しく知りたい方へ</div>
          <div className="teso-nudge-body">
            この占いは"今の流れ"を示しますが、<br/>
            あなたの本質や人生の流れは手相にも表れます。<br/>
            無料手相診断では、左手と右手から<br/>
            本来の自分と今の状態を読み解きます。
          </div>
          <a href="https://lin.ee/XHDFrA8" className="teso-nudge-btn" target="_blank" rel="noopener">
            💬 LINEで無料手相診断を受ける
          </a>
        </div>

        <div className="div-line"><span className="div-text">✦ 詳細鑑定 ✦</span></div>
        <div className="main-grid">
          {DEEP.map((d) => (
            <a key={d.name} href={d.href} target="_blank" className="main-card">
              <span className="m-icon">{d.icon}</span>
              <div className="m-name">{d.name}</div>
              <div className="m-sub">{d.sub}</div>
              <span className="free-badge">FREE</span>
            </a>
          ))}
        </div>

        {/* ★ 手相ナッジ（詳細鑑定下） */}
        <div className="teso-nudge">
          <div className="teso-nudge-title">🤲 より詳しく知りたい方へ</div>
          <div className="teso-nudge-body">
            この占いは"今の流れ"を示しますが、<br/>
            あなたの本質や人生の流れは手相にも表れます。<br/>
            無料手相診断では、左手と右手から<br/>
            本来の自分と今の状態を読み解きます。
          </div>
          <a href="https://lin.ee/XHDFrA8" className="teso-nudge-btn" target="_blank" rel="noopener">
            💬 LINEで無料手相診断を受ける
          </a>
        </div>

        <div className="div-line"><span className="div-text">✦ その他の無料占い ✦</span></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'10px',padding:'0 14px 16px'}}>
          {DAILY_REST.map((d) => (
            <a key={d.name} href={d.href} target="_blank" className="main-card">
              <span className="m-icon">{d.icon}</span>
              <div className="m-name">{d.name}</div>
              <div className="m-sub">{d.sub}</div>
              <span className="free-badge">FREE</span>
            </a>
          ))}
        </div>

        {/* ★ ¥980 手相詳細診断 */}
        <div style={{margin:'0 14px 12px',background:'linear-gradient(135deg,rgba(155,89,182,0.12),rgba(100,50,150,0.08))',border:'1px solid rgba(155,89,182,0.3)',borderRadius:14,padding:'18px 16px',textAlign:'center'}}>
          <div style={{fontSize:'11px',color:'rgba(195,155,211,0.8)',letterSpacing:'2px',marginBottom:'6px'}}>まずは手相を詳しく見たい方へ</div>
          <div style={{fontFamily:'Cinzel,serif',fontSize:'16px',color:'#c39bd3',fontWeight:700,marginBottom:'4px'}}>¥980 手相詳細診断</div>
          <div style={{fontSize:'12px',color:'rgba(106,74,112,0.8)',lineHeight:1.7,marginBottom:'12px'}}>
            本来の自分と今の状態のズレ、<br/>なぜうまくいかないのかが分かります
          </div>
          <a href="/star/teso" style={{display:'inline-block',background:'linear-gradient(135deg,#9b59b6,#6c3483)',color:'#fff',fontWeight:700,fontSize:'13px',borderRadius:8,padding:'10px 24px',textDecoration:'none'}}>
            ✦ 手相詳細診断を見る
          </a>
        </div>

        {/* ★ ¥3,980 AI総合鑑定（手相＋複数占術） */}
        <div className="sogo">
          <div style={{fontSize:'12px',color:'rgba(138,96,16,0.7)',marginBottom:'8px',letterSpacing:'1px'}}>
            より深く人生全体を見たい方へ
          </div>
          <div className="sogo-label">✦ Premium · AI完全解析 ✦</div>
          <div className="sogo-title">AI総合鑑定（手相＋複数占術）</div>
          <div className="sogo-desc">
            すでに拝見した手相の情報をもとに、<br/>
            タロット・数秘術・ホロスコープなどを組み合わせ、<br/>
            人生全体の流れを読み解きます
          </div>
          <div className="sogo-items">
            <span className="sogo-item">手相リーディング</span>
            <span className="sogo-item">ホロスコープ</span>
            <span className="sogo-item">タロット3枚</span>
            <span className="sogo-item">数秘術</span>
            <span className="sogo-item">四柱推命</span>
          </div>
          <div className="sogo-price-wrap">
            <div className="sogo-price-orig">通常¥4,980相当</div>
            <div className="sogo-price">¥3,980</div>
          </div>
          <div className="sogo-sub">恋愛・仕事・金運・人生の流れを総合的に読み解きます</div>
          <a href="/star/sogo" className="sogo-btn">✦ AI総合鑑定を受ける ✦</a>
        </div>

        {/* LINE強化バナー */}
        <div className="line-banner">
          <h3>🤲 手相診断 + 🎁 LINE限定の特別占い</h3>
          <p>
            LINEに登録して手のひらの写真を送ると<br/>
            無料で手相診断をお届けします。<br/>
            今後、LINE限定の特別占いも配信予定です。
          </p>
          <a href="https://lin.ee/XHDFrA8" target="_blank" className="line-banner-btn">💬 今すぐ無料で診断する</a>
        </div>

        <div style={{margin:'0 14px 20px',background:'rgba(255,248,252,0.7)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:'14px',padding:'20px'}}>
          <h2 style={{fontFamily:'Noto Sans JP,sans-serif',fontSize:'14px',color:'#6a3a20',marginBottom:'10px',fontWeight:'600'}}>Twinkle Star Oracleについて</h2>
          <p style={{fontSize:'13px',color:'#8a6a9a',lineHeight:'2'}}>
            Twinkle Star Oracleは、AIを活用した本格的な占いポータルサイトです。手相診断（LINE）をベースに、タロットカード・バードオラクル・易占い・前世リーディング・夢占いなどのカード系占いから、数秘術・九星気学・相性占い・四柱推命などの命術系まで、多彩な占いを提供しています。AI総合鑑定（手相＋複数占術）¥3,980では、手相をベースに複数の占術を組み合わせ、恋愛運・仕事運・金運・健康運を詳しく読み解き、過去・現在・未来のメッセージをお届けします。
          </p>
        </div>

        <footer>© 2026 Twinkle Lab / Twinkle Star Oracle</footer>
      </div>
    </>
  )
}
