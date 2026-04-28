export const metadata = {
  title: 'Twinkle Star Oracle｜AI占いポータル',
  description: 'タロット・数秘術・九星気学・四柱推命・易占い・バードオラクルなど11種類のAI占いが楽しめる無料占いポータル。毎日更新の星座占い・開運カレンダー・エンジェルナンバーも完全無料。AI総合鑑定（¥3,980）では、ホロスコープ図面＋四柱推命＋タロット3枚を組み合わせた本格リーディングを即座に提供します。',
  openGraph: {
    title: 'Twinkle Star Oracle｜AI占いポータル',
    description: 'タロット・数秘術・九星気学・四柱推命など11種類のAI占いが無料で楽しめる占いポータル。毎日更新の星座占い・開運カレンダーも完全無料。',
    url: 'https://twinkle-lab.jp/star',
    siteName: 'Twinkle Star Oracle',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twinkle Star Oracle｜AI占いポータル',
    description: 'タロット・数秘術・九星気学・四柱推命など11種類のAI占いが無料で楽しめる占いポータル。',
  },
}

const DAILY = [
  { icon:'⭐', name:'今日の星座占い', sub:'12星座・毎日更新', href:'https://horoscope-today-omega.vercel.app' },
  { icon:'📅', name:'開運カレンダー', sub:'吉日・ラッキー情報', href:'https://lucky-calendar-seven.vercel.app' },
  { icon:'✨', name:'エンジェルナンバー', sub:'今日の数字のメッセージ', href:'https://angel-number-fawn.vercel.app' },
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
        .stars{position:fixed;inset:0;z-index:0;pointer-events:none;}
        .container{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 0 60px;}

        header{text-align:center;padding:44px 20px 28px;border-bottom:1px solid rgba(201,168,76,0.25);background:linear-gradient(180deg,rgba(255,215,235,0.6) 0%,transparent 100%);}
        .back-link{display:inline-block;font-size:12px;color:var(--text-s);text-decoration:none;margin-bottom:16px;letter-spacing:0.1em;}
        .back-link:hover{color:var(--gold);}
        .logo-en{font-family:'Cinzel',serif;font-size:clamp(20px,5vw,34px);font-weight:700;letter-spacing:0.1em;color:var(--gold);}
        .logo-jp{font-size:12px;letter-spacing:0.3em;color:var(--text-s);margin-top:6px;}
        .gold-line{width:100px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:14px auto;}
        .tagline{font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.18em;color:rgba(160,120,80,0.7);}

        .sec{padding:20px 14px 4px;}
        .sec-en{font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.25em;color:var(--gold);text-transform:uppercase;margin-bottom:3px;text-align:center;}
        .sec-jp{font-size:15px;color:var(--text);font-weight:500;text-align:center;margin-bottom:3px;}
        .sec-desc{font-size:12px;color:var(--text-s);text-align:center;margin-bottom:12px;}

        .daily-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:0 14px 16px;}
        @media(min-width:560px){.daily-grid{grid-template-columns:repeat(5,1fr);}}

        .daily-card{background:rgba(255,248,252,0.9);border:1px solid rgba(201,168,76,0.22);border-radius:14px;padding:16px 8px 14px;text-align:center;text-decoration:none;display:block;transition:all 0.3s;box-shadow:0 3px 12px rgba(180,120,160,0.07);}
        .daily-card:hover{transform:translateY(-3px);border-color:rgba(201,168,76,0.5);box-shadow:0 8px 24px rgba(180,120,160,0.14);}
        .d-icon{font-size:26px;margin-bottom:6px;display:block;}
        .d-name{font-size:12px;color:var(--text);font-weight:500;margin-bottom:2px;}
        .d-sub{font-size:10px;color:var(--text-s);}
        .free-badge{display:inline-block;font-size:9px;padding:2px 7px;border-radius:8px;background:rgba(26,122,60,0.1);color:#2a8a50;border:1px solid rgba(26,122,60,0.2);margin-top:6px;font-family:'Cinzel',serif;}

        .div-line{display:flex;align-items:center;gap:12px;margin:8px 14px;}
        .div-line::before,.div-line::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);}
        .div-text{font-size:11px;color:var(--text-s);letter-spacing:0.1em;white-space:nowrap;}

        .main-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:0 14px 16px;}
        @media(min-width:560px){.main-grid{grid-template-columns:repeat(4,1fr);}}

        .main-card{background:rgba(255,248,252,0.88);border:1px solid rgba(201,168,76,0.2);border-radius:14px;padding:16px 12px;text-decoration:none;display:block;transition:all 0.3s;box-shadow:0 2px 10px rgba(180,120,160,0.06);}
        .main-card:hover{transform:translateY(-3px);border-color:rgba(201,168,76,0.45);}
        .m-icon{font-size:22px;margin-bottom:6px;display:block;}
        .m-name{font-size:12px;color:var(--text);font-weight:500;margin-bottom:2px;}
        .m-sub{font-size:10px;color:var(--text-m);line-height:1.5;}

        /* ① 無料+続きは有料バッジ（¥980削除・paid-badgeを修正） */
        .paid-badge{display:inline-block;font-size:9px;padding:2px 7px;border-radius:8px;background:rgba(201,168,76,0.1);color:#8a6010;border:1px solid rgba(201,168,76,0.28);margin-top:6px;font-family:'Cinzel',serif;}

        .sogo{margin:12px 14px 16px;background:linear-gradient(135deg,rgba(201,168,76,0.1),rgba(255,235,245,0.95));border:1px solid rgba(201,168,76,0.4);border-radius:16px;padding:28px 20px;text-align:center;}
        .sogo-label{font-family:'Cinzel',serif;font-size:10px;color:var(--gold);letter-spacing:0.25em;text-transform:uppercase;margin-bottom:8px;}
        .sogo-title{font-size:17px;color:var(--text);font-weight:600;margin-bottom:8px;}
        .sogo-items{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:12px;}
        .sogo-item{font-size:11px;color:var(--text-s);}
        .sogo-item::before{content:'✦ ';color:var(--gold);font-size:9px;}
        .sogo-price{font-family:'Cinzel',serif;font-size:24px;color:var(--gold);margin-bottom:4px;}
        .sogo-sub{font-size:11px;color:var(--text-s);margin-bottom:16px;}
        .sogo-btn{display:inline-block;background:linear-gradient(135deg,#8a6a20,var(--gold),#8a6a20);background-size:200% 100%;border:none;border-radius:8px;color:#fff8f0;font-family:'Cinzel',serif;font-size:13px;font-weight:700;letter-spacing:0.1em;padding:13px 28px;text-decoration:none;transition:all 0.4s;}
        .sogo-btn:hover{background-position:100% 0;box-shadow:0 6px 20px rgba(201,168,76,0.35);}

        /* ④ 2択CTAブロック */
        .two-cta{margin:0 14px 16px;display:grid;grid-template-columns:1fr 1fr;gap:10px;}
        .cta-pay{background:linear-gradient(135deg,rgba(201,168,76,0.2),rgba(201,168,76,0.08));border:1px solid rgba(201,168,76,0.5);border-radius:14px;padding:16px 12px;text-align:center;text-decoration:none;display:block;transition:all 0.3s;}
        .cta-pay:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(201,168,76,0.2);}
        .cta-pay-label{font-size:9px;color:var(--gold);font-family:'Cinzel',serif;letter-spacing:2px;margin-bottom:4px;}
        .cta-pay-title{font-size:13px;color:var(--text);font-weight:600;margin-bottom:4px;}
        .cta-pay-price{font-family:'Cinzel',serif;font-size:20px;color:var(--gold);margin-bottom:8px;}
        .cta-pay-btn{display:inline-block;background:linear-gradient(135deg,#8a6a20,var(--gold));color:#fff;font-size:11px;font-weight:700;border-radius:8px;padding:8px 14px;text-decoration:none;letter-spacing:1px;}
        .cta-line{background:rgba(255,248,252,0.9);border:1px solid rgba(201,168,76,0.22);border-radius:14px;padding:16px 12px;text-align:center;text-decoration:none;display:block;transition:all 0.3s;}
        .cta-line:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(180,120,160,0.15);}
        .cta-line-label{font-size:9px;color:#2a8a50;font-family:'Cinzel',serif;letter-spacing:2px;margin-bottom:4px;}
        .cta-line-title{font-size:13px;color:var(--text);font-weight:600;margin-bottom:4px;}
        .cta-line-free{font-family:'Cinzel',serif;font-size:20px;color:#2a8a50;margin-bottom:8px;}
        .cta-line-btn{display:inline-block;background:linear-gradient(135deg,#1a7a3c,#2a8a50);color:#fff;font-size:11px;font-weight:700;border-radius:8px;padding:8px 14px;text-decoration:none;letter-spacing:1px;}

        /* ⑤ ¥1,980ブロック */
        .mid-block{margin:0 14px 16px;background:linear-gradient(135deg,rgba(155,89,182,0.1),rgba(100,60,160,0.07));border:1px solid rgba(155,89,182,0.3);border-radius:14px;padding:20px;text-align:center;}
        .mid-label{font-family:'Cinzel',serif;font-size:10px;color:#9b59b6;letter-spacing:3px;text-transform:uppercase;margin-bottom:6px;}
        .mid-title{font-size:15px;color:var(--text);font-weight:600;margin-bottom:4px;}
        .mid-desc{font-size:11px;color:var(--text-s);margin-bottom:10px;line-height:1.6;}
        .mid-price{font-family:'Cinzel',serif;font-size:22px;color:#9b59b6;margin-bottom:10px;}
        .mid-btn{display:inline-block;background:linear-gradient(135deg,#9b59b6,#6c3483);color:#fff;font-family:'Cinzel',serif;font-size:12px;font-weight:700;letter-spacing:1px;padding:11px 24px;border-radius:8px;text-decoration:none;transition:all 0.3s;}
        .mid-btn:hover{box-shadow:0 4px 16px rgba(155,89,182,0.35);}
        .mid-note{font-size:10px;color:var(--text-s);margin-top:6px;}

        .line-banner{margin:0 14px 16px;background:rgba(255,248,252,0.9);border:1px solid rgba(201,168,76,0.22);border-radius:14px;padding:20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
        .line-text h3{font-size:14px;color:var(--text);font-weight:600;margin-bottom:4px;}
        .line-text p{font-size:11px;color:var(--text-m);line-height:1.6;}
        .line-btn{margin-left:auto;background:rgba(201,168,76,0.1);border:1px solid var(--gold);color:#8a6010;font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.1em;padding:10px 18px;border-radius:8px;text-decoration:none;white-space:nowrap;transition:all 0.3s;}
        .line-btn:hover{background:rgba(201,168,76,0.22);}

        footer{text-align:center;padding:20px;border-top:1px solid rgba(201,168,76,0.12);font-size:11px;color:rgba(120,80,100,0.4);}
      `}</style>

      <div className="container">
        <header>
          <a href="/" className="back-link">← Twinkle Lab トップ</a>
          <div className="logo-en">Twinkle Star Oracle</div>
          <div className="logo-jp">トゥインクル スター オラクル</div>
          <div className="gold-line"></div>
          <div className="tagline">Your Guide to the Stars & Beyond</div>
          <div style={{marginTop:'12px',fontSize:'13px',color:'rgba(61,26,64,0.7)',letterSpacing:'1px'}}>たった30秒で、あなたの未来の流れがわかります</div>
          <div style={{fontSize:'12px',color:'rgba(61,26,64,0.5)',marginTop:'4px',letterSpacing:'1px'}}>恋愛・仕事・金運・未来をすぐに確認</div>
        </header>

        {/* 毎日使う */}
        <div className="sec">
          <div className="sec-en">✦ Daily Fortune ✦</div>
          <div className="sec-jp">毎日チェック！無料占い</div>
          <div className="sec-desc">毎日変わる・何度でも無料</div>
        </div>
        <div className="daily-grid">
          {DAILY.map((d) => (
            <a key={d.name} href={d.href} target="_blank" className="daily-card">
              <span className="d-icon">{d.icon}</span>
              <div className="d-name">{d.name}</div>
              <div className="d-sub">{d.sub}</div>
              <span className="free-badge">FREE</span>
              <div style={{fontSize:'10px',color:'rgba(61,26,64,0.45)',marginTop:'4px'}}>→ この先の未来を見る</div>
            </a>
          ))}
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

        {/* ④ 2択CTA（¥500直課金 or LINE無料）← ¥980ブロックをここに置換 */}
        <div style={{margin:'4px 14px 4px',textAlign:'center'}}>
          <p style={{fontSize:'13px',color:'rgba(61,26,64,0.6)',lineHeight:'1.8',marginBottom:'10px'}}>
            迷っているなら、まずはここから
          </p>
        </div>
        <div className="two-cta">
          <a href="/star/mini" className="cta-pay">
            <div className="cta-pay-label">即・結果表示</div>
            <div className="cta-pay-title">今すぐ詳しく見る</div>
            <div className="cta-pay-price">¥500</div>
            <span className="cta-pay-btn">✦ 今すぐ鑑定する</span>
            <div style={{fontSize:'10px',color:'rgba(61,26,64,0.4)',marginTop:'6px'}}>すぐに結果が表示されます</div>
          </a>
          <a href="https://lin.ee/XHDFrA8" target="_blank" className="cta-line">
            <div className="cta-line-label">完全無料</div>
            <div className="cta-line-title">じっくり知りたい方へ</div>
            <div className="cta-line-free">¥0</div>
            <span className="cta-line-btn">💬 無料で受け取る</span>
            <div style={{fontSize:'10px',color:'rgba(61,26,64,0.4)',marginTop:'6px'}}>LINE登録するだけ</div>
          </a>
        </div>

        <p style={{textAlign:'center',fontSize:'13px',color:'rgba(61,26,64,0.6)',margin:'4px 14px 8px',lineHeight:'1.8'}}>迷っている今こそ、あなたの人生が変わるタイミングです</p>
        <div className="div-line"><span className="div-text">✦ 詳細鑑定 ✦</span></div>

        {/* ③ 詳細鑑定カード：「無料+続きは有料」に変更 */}
        <div className="main-grid">
          {DEEP.map((d) => (
            <a key={d.name} href={d.href} target="_blank" className="main-card">
              <span className="m-icon">{d.icon}</span>
              <div className="m-name">{d.name}</div>
              <div className="m-sub">{d.sub}</div>
              <span className="paid-badge">無料+続きは¥500</span>
            </a>
          ))}
        </div>

        {/* ⑤ ¥1,980 直課金ブロック（新規追加） */}
        <div className="mid-block">
          <div className="mid-label">✦ Standard Reading ✦</div>
          <div className="mid-title">しっかり知りたい方へ</div>
          <div className="mid-desc">
            恋愛・仕事・金運を3テーマまとめて深く鑑定<br />
            2,500〜3,500文字の詳細リーディング
          </div>
          <div className="mid-price">¥1,980</div>
          <a href="/star/chukan" className="mid-btn">✦ 3テーマをまとめて鑑定する</a>
          <div className="mid-note">即時表示 · PDFダウンロード付き · 🔒 安全な決済</div>
        </div>

        {/* 総合鑑定 */}
        <div className="sogo">
          <div className="sogo-label">✦ Premium Reading ✦</div>
          <div style={{fontSize:'13px',color:'rgba(61,26,64,0.6)',marginBottom:'8px',letterSpacing:'1px'}}>あなたの人生の流れを完全解析</div>
          <div className="sogo-title">AI総合鑑定</div>
          <div className="sogo-items">
            <span className="sogo-item">ホロスコープ図面</span>
            <span className="sogo-item">四柱推命</span>
            <span className="sogo-item">タロット3枚</span>
            <span className="sogo-item">数秘術</span>
            <span className="sogo-item">過去・現在・未来</span>
            <span className="sogo-item">年代別メッセージ</span>
          </div>
          <div style={{fontSize:'13px',color:'rgba(61,26,64,0.6)',marginBottom:'10px',letterSpacing:'1px'}}>あなたの人生は、すでに流れが決まっています</div>
          <div className="sogo-price">¥3,980</div>
          <div className="sogo-sub">即座に表示・PDFダウンロード付き</div>
          <a href="/star/sogo" className="sogo-btn">✦ AI総合鑑定を受ける ✦</a>
        </div>

        {/* ⑥ LINEは無料特典・リピート用に限定 */}
        <div className="line-banner">
          <div className="line-text">
            <h3 style={{fontSize:'15px'}}>🎁 LINE限定｜毎月無料占いイベント配信中</h3>
            <p>ルーン占い・ケルト十字・満月リーディングなど<br />登録者だけの特別コンテンツをお届けします</p>
          </div>
          <a href="https://lin.ee/XHDFrA8" target="_blank" className="line-btn">無料で登録する</a>
        </div>

        {/* SEO説明文 */}
        <div style={{margin:'0 14px 20px',background:'rgba(255,248,252,0.7)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:'14px',padding:'20px'}}>
          <h2 style={{fontFamily:'Noto Sans JP,sans-serif',fontSize:'14px',color:'#6a3a20',marginBottom:'10px',fontWeight:'600'}}>Twinkle Star Oracleについて</h2>
          <p style={{fontSize:'13px',color:'#8a6a9a',lineHeight:'2'}}>
            Twinkle Star Oracleは、AIを活用した本格的な占いポータルサイトです。タロットカード・バードオラクル・易占い・前世リーディング・夢占いなどのカード系占いから、数秘術・九星気学・相性占い・四柱推命などの命術系まで、11種類の多彩な占いを提供しています。毎日更新される星座占い・開運カレンダー・エンジェルナンバー・アファメーションは完全無料でご利用いただけます。また、ホロスコープ図面・四柱推命・タロット3枚・数秘術を組み合わせたAI総合鑑定（¥3,980）では、仕事運・恋愛運・金運・健康運を年代別に詳しく読み解き、過去・現在・未来のメッセージをお届けします。
          </p>
        </div>
        <p style={{textAlign:'center',fontSize:'14px',color:'rgba(61,26,64,0.5)',margin:'16px 14px 0',lineHeight:'1.9'}}>ここまで見たあなたは、すでに答えに近づいています<br/>次は、その答えを知るだけです</p>
        <footer>© 2026 Twinkle Lab / Twinkle Star Oracle</footer>
      </div>
    </>
  )
}
