export default function SogoResultPage() {
  return (
    <>
      <style>{`
        :root{--navy:#0a0e1a;--gold:#c9a84c;--gold2:#e8c97a;--white:#f0eadc;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:var(--navy);color:var(--white);font-family:'Noto Serif JP',serif;min-height:100vh;}
        .wrap{max-width:600px;margin:0 auto;padding:40px 20px 80px;text-align:center;}
      `}</style>
      <div className="wrap">
        <div style={{fontSize:'48px',marginBottom:'16px'}}>✦</div>
        <div style={{fontFamily:'Cinzel,serif',fontSize:'12px',color:'#c9a84c',letterSpacing:'4px',marginBottom:'16px'}}>
          AI PREMIUM READING
        </div>
        <h1 style={{fontFamily:'Cinzel,serif',fontSize:'24px',color:'#e8c97a',marginBottom:'12px',lineHeight:1.4}}>
          お申し込みありがとうございます
        </h1>
        <div style={{width:'80px',height:'1px',background:'linear-gradient(90deg,transparent,#c9a84c,transparent)',margin:'16px auto'}} />
        <p style={{fontSize:'14px',color:'rgba(240,234,220,0.8)',lineHeight:2,marginBottom:'24px'}}>
          AI総合鑑定のお申し込みを受け付けました。<br/>
          鑑定結果はLINEにてお届けします🌙
        </p>

        <div style={{background:'linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95))',border:'1px solid rgba(201,168,76,0.3)',borderRadius:'16px',padding:'24px',marginBottom:'20px',textAlign:'left'}}>
          <p style={{fontFamily:'Cinzel,serif',fontSize:'10px',color:'#c9a84c',letterSpacing:'3px',marginBottom:'16px',textAlign:'center'}}>✦ 次のステップ ✦</p>
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            {[
              {num:'1', title:'手相写真をLINEへ送る', desc:'まだ送っていない方は、両手のひらの写真をLINEにお送りください'},
              {num:'2', title:'「鑑定申し込みしました」と一言送る', desc:'決済が確認できましたら鑑定を開始します'},
              {num:'3', title:'鑑定結果をLINEで受け取る', desc:'PDF版も別途お送りします。通常1〜2営業日以内にお届けします'},
            ].map(s => (
              <div key={s.num} style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
                <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'linear-gradient(135deg,#8a6a20,#c9a84c)',color:'#0a0e1a',fontWeight:700,fontSize:'13px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  {s.num}
                </div>
                <div>
                  <p style={{fontSize:'14px',color:'#e8c97a',fontWeight:600,marginBottom:'4px'}}>{s.title}</p>
                  <p style={{fontSize:'12px',color:'rgba(240,234,220,0.6)',lineHeight:1.8}}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <a
          href="https://lin.ee/XHDFrA8"
          target="_blank"
          rel="noopener noreferrer"
          style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'linear-gradient(135deg,#06c755,#04a844)',color:'#fff',fontWeight:700,fontSize:'15px',borderRadius:'12px',padding:'16px 32px',textDecoration:'none',marginBottom:'16px'}}
        >
          💬 LINEを開く
        </a>

        <p style={{fontSize:'11px',color:'rgba(240,234,220,0.3)',lineHeight:1.8,marginTop:'16px'}}>
          ご不明な点はLINEよりお問い合わせください<br/>
          © 2026 Twinkle Lab / Twinkle Star Oracle
        </p>
      </div>
    </>
  )
}
