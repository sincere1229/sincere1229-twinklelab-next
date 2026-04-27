'use client'

import { useState } from 'react'

export default function MiniReading() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

  const handlePay = () => {
    const name = (document.getElementById('inp-name') as HTMLInputElement)?.value
    const birth = (document.getElementById('inp-birth') as HTMLInputElement)?.value
    const email = (document.getElementById('inp-email') as HTMLInputElement)?.value
    if (!selectedTheme) { alert('テーマを選んでください'); return; }
    if (!name || !birth || !email) { alert('全ての項目を入力してください'); return; }
    alert('Stripe決済ページへ移動します（実装予定）')
  }

  return (
    <>
      <style>{`
        :root{--navy:#0a0e1a;--gold:#c9a84c;--gold2:#e8c97a;--white:#f0eadc;--pink:#e8a0c0;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background-color:var(--navy);color:var(--white);font-family:'Noto Serif JP',serif;min-height:100vh;}
        body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(ellipse at 30% 40%,rgba(232,160,192,0.07) 0%,transparent 60%);pointer-events:none;z-index:0;}
        .wrap{position:relative;z-index:1;max-width:600px;margin:0 auto;padding:40px 20px 100px;}
        .header{text-align:center;margin-bottom:32px;}
        .back{display:inline-block;font-size:12px;color:rgba(201,168,76,0.6);text-decoration:none;margin-bottom:16px;}
        .label{font-family:'Cinzel',serif;font-size:10px;letter-spacing:4px;color:var(--gold);text-transform:uppercase;margin-bottom:12px;opacity:0.7;}
        .title{font-family:'Cinzel',serif;font-size:clamp(24px,5vw,36px);color:var(--gold2);letter-spacing:3px;margin-bottom:8px;}
        .gold-line{width:80px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:14px auto;}
        .sub{font-size:13px;color:rgba(240,234,220,0.5);letter-spacing:1px;}
        .price{font-family:'Cinzel',serif;font-size:40px;color:var(--gold);text-align:center;margin-bottom:4px;}
        .price-sub{font-size:12px;color:rgba(240,234,220,0.4);margin-bottom:24px;text-align:center;}
        .theme-label{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;text-align:center;}
        .theme-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:24px;}
        .theme-btn{background:rgba(26,32,64,0.8);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:18px 10px;text-align:center;cursor:pointer;transition:all 0.3s;}
        .theme-btn.active{border-color:var(--gold);background:rgba(201,168,76,0.1);}
        .theme-icon{font-size:28px;margin-bottom:8px;display:block;}
        .theme-name{font-size:13px;color:var(--white);font-weight:500;}
        .card{background:linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95));border:1px solid rgba(201,168,76,0.2);border-radius:16px;padding:24px;margin-bottom:16px;}
        .card-title{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;text-align:center;}
        .form-group{margin-bottom:14px;}
        .form-label{display:block;font-size:11px;color:var(--gold);letter-spacing:2px;margin-bottom:8px;}
        .form-input{width:100%;background:rgba(10,14,26,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:8px;padding:12px 16px;color:var(--white);font-family:'Noto Serif JP',serif;font-size:14px;outline:none;}
        .form-input:focus{border-color:var(--gold);}
        .cta-btn{width:100%;padding:18px;background:linear-gradient(135deg,#8a6a20,var(--gold),#8a6a20);background-size:200% 100%;border:none;border-radius:10px;color:#0a0e1a;font-family:'Cinzel',serif;font-size:16px;font-weight:700;letter-spacing:2px;cursor:pointer;transition:all 0.4s;margin-top:8px;}
        .cta-note{text-align:center;font-size:11px;color:rgba(240,234,220,0.3);margin-top:8px;}
        .upsell{background:linear-gradient(135deg,rgba(60,30,80,0.5),rgba(30,10,50,0.6));border:1px solid rgba(155,127,212,0.3);border-radius:14px;padding:24px;text-align:center;margin-top:24px;}
        .upsell-title{font-family:'Cinzel',serif;font-size:13px;color:rgba(196,168,240,0.9);letter-spacing:2px;margin-bottom:8px;}
        .upsell-desc{font-size:13px;color:rgba(240,234,220,0.6);line-height:1.8;margin-bottom:16px;}
        .upsell-btn{display:inline-block;background:transparent;border:1px solid rgba(201,168,76,0.4);border-radius:8px;color:var(--gold2);font-family:'Cinzel',serif;font-size:12px;letter-spacing:2px;padding:11px 24px;text-decoration:none;}
        .fixed-cta{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:linear-gradient(135deg,#1a0a20,#0a0e1a);border-top:1px solid rgba(201,168,76,0.4);padding:12px 20px;display:flex;align-items:center;gap:12px;box-shadow:0 -4px 20px rgba(0,0,0,0.4);}
        .fixed-cta-text{flex:1;font-size:13px;color:var(--white);}
        .fixed-cta-btn{background:linear-gradient(135deg,#8a6a20,var(--gold));border:none;border-radius:8px;color:#0a0e1a;font-family:'Cinzel',serif;font-size:12px;font-weight:700;padding:11px 18px;cursor:pointer;white-space:nowrap;}
        .spacer{height:70px;}
        footer{text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid rgba(201,168,76,0.1);font-size:11px;color:rgba(240,234,220,0.2);}
      `}</style>

      <div className="wrap">
        <div className="header">
          <a href="/star" className="back">← 占いポータルに戻る</a>
          <div className="label">✦ Mini Reading ✦</div>
          <h1 className="title">簡易鑑定</h1>
          <div className="gold-line"></div>
          <p className="sub">1テーマ集中・AIが深く読み解く</p>
        </div>

        <div className="price">¥500</div>
        <div className="price-sub">即時表示・1テーマ集中リーディング</div>

        <div className="theme-label">✦ 占いたいテーマを選んでください ✦</div>
        <div className="theme-grid">
          {[
            { id: 'love', icon: '💕', name: '恋愛運' },
            { id: 'work', icon: '💼', name: '仕事運' },
            { id: 'money', icon: '💰', name: '金運' },
          ].map(t => (
            <div
              key={t.id}
              className={`theme-btn${selectedTheme === t.id ? ' active' : ''}`}
              onClick={() => setSelectedTheme(t.id)}
            >
              <span className="theme-icon">{t.icon}</span>
              <div className="theme-name">{t.name}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">✦ あなたの情報 ✦</div>
          <div className="form-group">
            <label className="form-label">お名前</label>
            <input type="text" className="form-input" placeholder="例：さくら" id="inp-name" />
          </div>
          <div className="form-group">
            <label className="form-label">生年月日</label>
            <input type="date" className="form-input" id="inp-birth" />
          </div>
          <div className="form-group">
            <label className="form-label">メールアドレス</label>
            <input type="email" className="form-input" placeholder="example@email.com" id="inp-email" />
          </div>
          <button className="cta-btn" onClick={handlePay}>✦ ¥500 で今すぐ鑑定する ✦</button>
          <p className="cta-note">🔒 安全な決済 · 即時表示</p>
        </div>

        <div className="upsell">
          <div className="upsell-title">✦ さらに深く知りたい方へ ✦</div>
          <p className="upsell-desc">
            3テーマ＋ホロスコープ＋四柱推命＋タロット3枚の<br/>
            AI総合鑑定（¥3,500）もご用意しています。
          </p>
          <a href="/star/sogo" className="upsell-btn">✦ 総合鑑定を見る</a>
        </div>

        <footer>© 2026 Twinkle Lab / Twinkle Star Oracle</footer>
      </div>

      <div className="fixed-cta">
        <div className="fixed-cta-text">🔮 1テーマ集中リーディング ¥500</div>
        <button className="fixed-cta-btn" onClick={() => { const el = document.getElementById('inp-name'); if(el) el.focus(); }}>今すぐ鑑定</button>
      </div>
      <div className="spacer"></div>
    </>
  )
}
