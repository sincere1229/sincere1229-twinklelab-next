export const metadata = {
  title: 'Twinkle Heart｜親子でつくるAIあそびブック｜子供でもつくれるAIあそびブック',
  description: '親子でAIを楽しく学べるKindleシリーズ「親子でつくる！AIあそびブック」。スマホ1台でどうぶつキャラ診断・LINEスタンプ・AI絵本が作れます。プログラミング不要・子供でも簡単。LINE登録で各巻の特典ワークシートを無料プレゼント。',
  openGraph: {
    title: 'Twinkle Heart｜親子でつくるAIあそびブック｜子供でもつくれるAIあそびブック',
    description: '親子でAIを楽しく学べるKindleシリーズ。スマホ1台でどうぶつキャラ診断・LINEスタンプ・AI絵本が作れます。プログラミング不要・子供でも簡単。',
    url: 'https://twinkle-lab.jp/heart',
    siteName: 'Twinkle Lab',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twinkle Heart｜親子でつくるAIあそびブック',
    description: '親子でAIを楽しく学べるKindleシリーズ。スマホ1台でどうぶつキャラ診断・LINEスタンプ・AI絵本が作れます。',
  },
}

export default function Heart() {
  const books = [
    { vol:'Vol.1', title:'どうぶつキャラ診断', asin:'', emoji:'🐨' },
    { vol:'Vol.2', title:'LINEスタンプを作ろう', asin:'', emoji:'🐾' },
    { vol:'Vol.3', title:'AI絵本を作ろう', asin:'', emoji:'📖' },
  ]
  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:linear-gradient(160deg,#fce8f3 0%,#fdf0f8 40%,#f8eeff 100%);min-height:100vh;font-family:'Noto Sans JP',sans-serif;color:#3d1a40;}
        .container{max-width:680px;margin:0 auto;padding:60px 24px;}
        .back{display:inline-block;font-size:12px;color:#8a6a9a;text-decoration:none;margin-bottom:24px;}
        .header{text-align:center;margin-bottom:40px;}
        h1{font-family:'Cinzel',serif;font-size:28px;color:#c9a84c;margin-bottom:8px;}
        .sub{font-size:13px;color:#8a6a9a;margin-bottom:16px;}
        .gold-line{width:80px;height:1px;background:linear-gradient(90deg,transparent,#c9a84c,transparent);margin:0 auto 32px;}
        .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
        @media(min-width:500px){.grid{grid-template-columns:repeat(3,1fr);}}
        .book{background:rgba(255,248,252,0.9);border:1px solid rgba(201,168,76,0.22);border-radius:14px;padding:20px 14px;text-align:center;}
        .b-emoji{font-size:32px;margin-bottom:10px;display:block;}
        .b-vol{font-size:10px;color:#c9a84c;font-family:'Cinzel',serif;letter-spacing:2px;margin-bottom:4px;}
        .b-title{font-size:13px;color:#3d1a40;font-weight:500;}
        .line-box{background:rgba(255,248,252,0.9);border:1px solid rgba(201,168,76,0.22);border-radius:14px;padding:24px;margin-top:24px;text-align:center;}
        .line-box p{font-size:13px;color:#6a4a70;line-height:1.8;margin-bottom:14px;}
        .line-btn{display:inline-block;background:rgba(201,168,76,0.12);border:1px solid #c9a84c;color:#8a6010;font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.1em;padding:11px 24px;border-radius:8px;text-decoration:none;}
      `}</style>
      <div className="container">
        <a href="/" className="back">← トップに戻る</a>
        <div className="header">
          <h1>Twinkle Heart 🐣</h1>
          <div className="sub">親子でつくる！AIあそびブック</div>
          <div className="gold-line"></div>
        </div>
        <div className="grid">
          {books.map(b => (
            <div key={b.vol} className="book">
              <span className="b-emoji">{b.emoji}</span>
              <div className="b-vol">{b.vol}</div>
              <div className="b-title">{b.title}</div>
            </div>
          ))}
        </div>
        <div style={{background:'rgba(255,248,252,0.7)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:'14px',padding:'20px',marginTop:'16px',marginBottom:'0'}}>
          <h1 style={{fontFamily:'Noto Sans JP,sans-serif',fontSize:'14px',color:'#6a3a20',marginBottom:'10px',fontWeight:'600'}}>親子でつくる！AIあそびブックとは</h1>
          <p style={{fontSize:'13px',color:'#8a6a9a',lineHeight:'2'}}>
            「親子でつくる！AIあそびブック」は、スマホ1台でAIを使った創作体験ができるKindleシリーズです。プログラミングの知識は一切不要。小学生のお子様から大人まで、一緒に楽しみながらAIリテラシーを身につけられます。Vol.1では生成AIを使ったどうぶつキャラ診断、Vol.2ではLINEスタンプ制作、Vol.3ではオリジナルAI絵本づくりを体験できます。各巻にはLINE登録で受け取れる特典ワークシート付き。親子のコミュニケーションを深めながら、楽しくAIと友達になれる一冊です。
          </p>
        </div>

        <div className="line-box">
          <p>LINE登録で特典PDFをプレゼント🎁<br />各巻の特典ワークシートを無料でお届けします</p>
          <a href="https://lin.ee/XHDFrA8" target="_blank" className="line-btn">💬 LINE登録して特典を受け取る</a>
        </div>
      </div>
    </>
  )
}
