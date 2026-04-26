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
        <div className="line-box">
          <p>LINE登録で特典PDFをプレゼント🎁<br />各巻の特典ワークシートを無料でお届けします</p>
          <a href="https://lin.ee/XHDFrA8" target="_blank" className="line-btn">💬 LINE登録して特典を受け取る</a>
        </div>
      </div>
    </>
  )
}
