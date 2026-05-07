import Link from 'next/link'

export const metadata = {
  title: 'Twinkle Star Oracle｜AI占いポータル',
  description: 'タロット・数秘術・九星気学・四柱推命・易占い・バードオラクルなど多彩なAI占いが楽しめる占いポータル。手相診断・相性診断・タロット5枚・AI総合鑑定も。',
  openGraph: {
    title: 'Twinkle Star Oracle｜AI占いポータル',
    description: 'AI占いポータル。無料占いから本格鑑定まで。手相診断¥980・相性診断¥980・タロット5枚¥1,980・AI総合鑑定¥3,980。',
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
  { icon:'💕', name:'相性占い（無料）', sub:'2人の運命スコアを算出', href:'https://aicompat-app.vercel.app' },
  { icon:'☯️', name:'四柱推命', sub:'命式・五行バランスを解読', href:'https://shichu-app.vercel.app' },
]

const SHARE_TEXT = encodeURIComponent('Twinkle Star Oracle｜AI占いポータル✨ タロット・手相・相性診断など無料占いからAI本格鑑定まで！\nhttps://twinkle-lab.jp/star')

export default function StarPortal() {
  return (
    <>
      <style>{`
        :root { --gold:#c9a84c; --gold2:#e8c97a; --text:#3d1a40; --text-s:#8a6a9a; --text-m:#6a4a70; }
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:linear-gradient(160deg,#fce8f3 0%,#fdf0f8 40%,#f8eeff 100%);min-height:100vh;}
        .container{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 0 60px;}

        header{text-align:center;padding:36px 20px 24px;border-bottom:1px solid rgba(201,168,76,0.25);background:linear-gradient(180deg,rgba(255,215,235,0.6) 0%,transparent 100%);}
        .logo-en{font-family:'Cinzel',serif;font-size:clamp(20px,5vw,34px);font-weight:700;letter-spacing:0.1em;color:var(--gold);}
        .logo-jp{font-size:12px;letter-spacing:0.3em;color:var(--text-s);margin-top:6px;}
        .gold-line{width:100px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:14px auto;}
        .tagline{font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.18em;color:rgba(160,120,80,0.7);}

        /* 有料診断ラダー */
        .flow-ladder{margin:16px 14px 8px;background:rgba(255,248,252,0.9);border:1px solid rgba(201,168,76,0.25);border-radius:14px;padding:16px;}
        .flow-ladder-title{font-family:'Cinzel',serif;font-size:10px;color:var(--gold);letter-spacing:3px;text-align:center;margin-bottom:12px;}
        .flow-row{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid rgba(201,168,76,0.1);}
        .flow-row:last-child{border-bottom:none;}
        .flow-step{font-size:11px;color:rgba(61,26,64,0.5);width:20px;flex-shrink:0;text-align:center;}
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

        /* 有料カード */
        .paid-card{display:flex;align-items:center;justify-content:space-between;padding:16px;background:rgba(255,248,252,0.9);border:1px solid rgba(201,168,76,0.3);border-radius:14px;margin:0 14px 10px;text-decoration:none;transition:all 0.3s;}
        .paid-card:hover{transform:translateY(-2px);border-color:rgba(201,168,76,0.6);}
        .paid-card-left{}
        .paid-card-name{font-size:14px;font-weight:700;color:var(--text);margin-bottom:2px;}
        .paid-card-sub{font-size:11px;color:var(--text-s);}
        .paid-card-price{font-family:'Cinzel',serif;font-size:16px;color:var(--gold);font-weight:700;white-space:nowrap;}

        /* 総合鑑定 */
        .sogo{margin:12px 14px 16px;background:linear-gradient(135deg,rgba(201,168,76,0.1),rgba(255,235,245,0.95));border:1px solid rgba(201,168,76,0.4);border-radius:16px;padding:28px 20px;text-align:center;}
        .sogo-label{font-family:'Cinzel',serif;font-size:10px;color:var(--gold);letter-spacing:0.25em;text-transform:uppercase;margin-bottom:8px;}
        .sogo-title{font-size:17px;color:var(--text);font-weight:600;margin-bottom:6px;}
        .sogo-desc{font-size:12px;color:var(--text-m);line-height:1.8;margin-bottom:10px;}
        .sogo-items{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:12px;}
        .sogo-item{font-size:11px;color:var(--text-s);}
        .sogo-item::before{content:'✦ ';color:var(--gold);font-size:9px;}
        .sogo-price{font-family:'Cinzel',serif;font-size:28px;color:var(--gold);}
        .sogo-sub{font-size:11px;color:var(--text-s);margin-bottom:16px;}
        .sogo-btn{display:inline-block;background:linear-gradient(135deg,#8a6a20,var(--gold),#8a6a20);background-size:200% 100%;border:none;border-radius:8px;color:#fff8f0;font-family:'Cinzel',serif;font-size:13px;font-weight:700;letter-spacing:0.1em;padding:13px 28px;text-decoration:none;transition:all 0.4s;}
        .sogo-btn:hover{background-position:100% 0;box-shadow:0 6px 20px rgba(201,168,76,0.35);}

        /* シェア */
        .share-wrap{display:flex;gap:8px;justify-content:center;margin:16px 14px;}
        .share-btn{padding:10px 20px;border-radius:10px;border:1px solid rgba(201,168,76,0.3);background:rgba(255,248,252,0.9);color:var(--text-s);font-size:12px;text-decoration:none;transition:all 0.3s;}
        .share-btn:hover{border-color:rgba(201,168,76,0.6);color:var(--text-m);}

        footer{text-align:center;padding:20px;border-top:1px solid rgba(201,168,76,0.12);font-size:11px;color:rgba(120,80,100,0.4);}
      `}</style>

      <div className="container">

        <header>
          <a href="/" style={{display:'inline-block',fontSize:'12px',color:'var(--text-s)',textDecoration:'none',marginBottom:'16px',letterSpacing:'0.1em'}}>← Twinkle Lab トップ</a>
          <div className="logo-en">Twinkle Star Oracle</div>
          <div className="logo-jp">トゥインクル スター オラクル</div>
          <div className="gold-line"></div>
          <div className="tagline">Your Guide to the Stars & Beyond</div>
        </header>

        {/* 導線ラダー */}
        <div className="flow-ladder">
          <div className="flow-ladder-title">✦ READING PLAN ✦</div>
          <div className="flow-row">
            <div className="flow-step">①</div>
            <div className="flow-desc"><strong style={{color:'var(--text)'}}>無料占い</strong>　タロット・星座・数秘術など</div>
            <div className="flow-price">FREE</div>
          </div>
          <div className="flow-row">
            <div className="flow-step">②</div>
            <div className="flow-desc"><strong style={{color:'var(--text)'}}>手相かんたん診断</strong>　画像アップで即診断</div>
            <Link href="/star/tesou-free" className="flow-cta">無料で見る</Link>
          </div>
          <div className="flow-row">
            <div className="flow-step">③</div>
            <div className="flow-desc"><strong style={{color:'var(--text)'}}>手相詳細診断 / 相性診断</strong></div>
            <div className="flow-price">¥980</div>
          </div>
          <div className="flow-row">
            <div className="flow-step">④</div>
            <div className="flow-desc"><strong style={{color:'var(--text)'}}>タロット5枚＋ホロスコープ</strong></div>
            <div className="flow-price">¥1,980</div>
          </div>
          <div className="flow-row">
            <div className="flow-step">⑤</div>
            <div className="flow-desc"><strong style={{color:'var(--text)'}}>AI総合鑑定（手相＋タロット＋星）</strong></div>
            <Link href="/star/sogo" className="flow-cta">完全版</Link>
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

        {/* 有料診断ラインナップ */}
        <div className="div-line"><span className="div-text">✦ AI有料鑑定 ✦</span></div>

        <Link href="/star/tesou-free" className="paid-card">
          <div className="paid-card-left">
            <div className="paid-card-name">🤚 手相かんたん診断</div>
            <div className="paid-card-sub">画像アップで即診断・登録不要</div>
          </div>
          <div className="paid-card-price">FREE</div>
        </Link>

        <Link href="/star/tesou" className="paid-card">
          <div className="paid-card-left">
            <div className="paid-card-name">🤚 手相詳細診断</div>
            <div className="paid-card-sub">左右両手・ズレ分析・行動アドバイス</div>
          </div>
          <div className="paid-card-price">¥980</div>
        </Link>

        <Link href="/star/compatibility-ai" className="paid-card">
          <div className="paid-card-left">
            <div className="paid-card-name">💘 AI相性診断</div>
            <div className="paid-card-sub">すれ違いの正体・1年後のストーリー</div>
          </div>
          <div className="paid-card-price">¥980</div>
        </Link>

        <Link href="/star/tarot5" className="paid-card">
          <div className="paid-card-left">
            <div className="paid-card-name">🃏 タロット5枚＋ホロスコープ</div>
            <div className="paid-card-sub">過去・現在・未来・課題・アドバイス</div>
          </div>
          <div className="paid-card-price">¥1,980</div>
        </Link>

        {/* AI総合鑑定 */}
        <div className="sogo">
          <div className="sogo-label">✦ Premium · AI完全解析 ✦</div>
          <div className="sogo-title">AI総合鑑定</div>
          <div className="sogo-desc">
            手相＋タロット5枚＋数秘術＋ホロスコープを統合した<br/>
            あなただけの本格リーディング
          </div>
          <div className="sogo-items">
            <span className="sogo-item">手相リーディング</span>
            <span className="sogo-item">タロット5枚</span>
            <span className="sogo-item">ホロスコープ</span>
            <span className="sogo-item">数秘術</span>
          </div>
          <div className="sogo-price">¥3,980</div>
          <div className="sogo-sub">恋愛・仕事・金運・人生の流れを総合的に読み解きます</div>
          <Link href="/star/sogo" className="sogo-btn">✦ AI総合鑑定を受ける ✦</Link>
        </div>

        {/* シェアボタン */}
        <div className="share-wrap">
          <a href={`https://twitter.com/intent/tweet?text=${SHARE_TEXT}`} target="_blank" rel="noopener noreferrer" className="share-btn">
            𝕏 シェア
          </a>
          <a href="https://twinkle-lab.jp" className="share-btn">
            🌟 Twinkle Lab
          </a>
        </div>

        <div style={{margin:'0 14px 20px',background:'rgba(255,248,252,0.7)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:'14px',padding:'20px'}}>
          <p style={{fontSize:'13px',color:'#8a6a9a',lineHeight:'2'}}>
            Twinkle Star Oracleは、AIを活用した本格的な占いポータルサイトです。タロットカード・バードオラクル・易占い・前世リーディング・夢占いなどのカード系占いから、数秘術・九星気学・四柱推命などの命術系まで多彩な占いを提供しています。手相診断・相性診断・タロット5枚＋ホロスコープ・AI総合鑑定など有料鑑定も充実しています。
          </p>
        </div>

        <footer>© 2026 Twinkle Lab / Twinkle Star Oracle</footer>
      </div>
    </>
  )
}
