export default function Company() {
  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:linear-gradient(160deg,#fce8f3 0%,#fdf0f8 40%,#f8eeff 100%);min-height:100vh;font-family:'Noto Sans JP',sans-serif;color:#3d1a40;}
        .container{max-width:680px;margin:0 auto;padding:60px 24px;}
        .back{display:inline-block;font-size:12px;color:#8a6a9a;text-decoration:none;margin-bottom:24px;}
        h1{font-family:'Cinzel',serif;font-size:28px;color:#c9a84c;margin-bottom:8px;}
        .sub{font-size:13px;color:#8a6a9a;margin-bottom:32px;}
        .gold-line{width:80px;height:1px;background:linear-gradient(90deg,transparent,#c9a84c,transparent);margin-bottom:32px;}
        .section{background:rgba(255,248,252,0.9);border:1px solid rgba(201,168,76,0.2);border-radius:14px;padding:24px;margin-bottom:16px;}
        h2{font-size:14px;color:#c9a84c;font-family:'Cinzel',serif;letter-spacing:2px;margin-bottom:12px;}
        p{font-size:14px;line-height:2;color:#6a4a70;}
      `}</style>
      <div className="container">
        <a href="/" className="back">← トップに戻る</a>
        <h1>About Twinkle Lab</h1>
        <div className="sub">トゥインクル ラボについて</div>
        <div className="gold-line"></div>
        <div className="section">
          <h2>ABOUT</h2>
          <p>Twinkle Labは「AI × 占い × 親子教育」をテーマに、誰もが輝ける世界を目指すクリエイティブラボです。</p>
        </div>
        <div className="section">
          <h2>CONTACT</h2>
          <p>お問い合わせ・コラボレーションのご相談はLINEよりお気軽にどうぞ。</p>
          <a href="https://lin.ee/XHDFrA8" target="_blank" style={{display:'inline-block',marginTop:'12px',background:'rgba(201,168,76,0.12)',border:'1px solid #c9a84c',color:'#8a6010',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontFamily:'Cinzel,serif',textDecoration:'none'}}>
            💬 LINEでお問い合わせ
          </a>
        </div>
      </div>
    </>
  )
}
