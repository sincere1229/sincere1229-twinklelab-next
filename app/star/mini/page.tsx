'use client'

import { useState } from 'react'

const THEMES = [
  { id: 'love',  icon: '💕', name: 'あの人との未来',      sub: '気になる相手・今の恋愛の行方' },
  { id: 'work',  icon: '💼', name: '今の仕事を続けるべきか', sub: '転職・独立・方向性の答え' },
  { id: 'money', icon: '💰', name: 'お金は増えるのか',     sub: '金運の流れ・収入アップの時期' },
]

export default function MiniReading() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)

  const handlePay = async () => {
    const name  = (document.getElementById('inp-name')  as HTMLInputElement)?.value?.trim()
    const birth = (document.getElementById('inp-birth') as HTMLInputElement)?.value
    const email = (document.getElementById('inp-email') as HTMLInputElement)?.value?.trim()
    if (!selectedTheme) { alert('テーマを選んでください'); return }
    if (!name || !birth || !email) { alert('全ての項目を入力してください'); return }

    setPaying(true)
    try {
      const theme = THEMES.find(t => t.id === selectedTheme)
      // ★ Checkout API 経由（plan=mini → ¥1,980）
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: 'mini',
          name,
          birth,
          email,
          theme: theme?.name || selectedTheme,
        }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (e: any) {
      alert('エラーが発生しました：' + e.message)
      setPaying(false)
    }
  }

  const scrollToForm = () => {
    document.getElementById('inp-name')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        :root{--navy:#0a0e1a;--gold:#c9a84c;--gold2:#e8c97a;--white:#f0eadc;--pink:#e8a0c0;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background-color:var(--navy);color:var(--white);font-family:'Noto Serif JP',serif;min-height:100vh;}
        body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(ellipse at 30% 40%,rgba(232,160,192,0.07) 0%,transparent 60%);pointer-events:none;z-index:0;}
        .wrap{position:relative;z-index:1;max-width:600px;margin:0 auto;padding:32px 20px 100px;}
        .back{display:inline-block;font-size:12px;color:rgba(201,168,76,0.6);text-decoration:none;margin-bottom:16px;}
        .hero{text-align:center;margin-bottom:24px;}
        .label{font-family:'Cinzel',serif;font-size:10px;letter-spacing:4px;color:var(--gold);text-transform:uppercase;margin-bottom:12px;opacity:0.7;}
        .title{font-family:'Cinzel',serif;font-size:clamp(22px,5vw,34px);color:var(--gold2);letter-spacing:3px;margin-bottom:8px;}
        .gold-line{width:80px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:12px auto;}
        .hero-sub{font-size:14px;color:rgba(240,234,220,0.75);line-height:1.8;margin-bottom:12px;}
        .urgency{background:linear-gradient(135deg,rgba(232,122,122,0.14),rgba(200,60,60,0.07));border:1px solid rgba(232,122,122,0.3);border-radius:12px;padding:14px 16px;text-align:center;margin-bottom:16px;}
        .urgency-main{color:#f5a0a0;font-size:14px;font-weight:600;letter-spacing:1px;margin-bottom:4px;}
        .urgency-sub{color:rgba(232,213,183,0.55);font-size:12px;line-height:1.7;}
        .price-area{text-align:center;margin-bottom:20px;}
        .price{font-family:'Cinzel',serif;font-size:44px;color:var(--gold);margin-bottom:4px;}
        .price-sub{font-size:12px;color:rgba(240,234,220,0.4);margin-bottom:12px;}
        .cta-btn{width:100%;padding:18px;background:linear-gradient(135deg,#8a6a20,var(--gold),#8a6a20);background-size:200% 100%;border:none;border-radius:10px;color:#0a0e1a;font-family:'Cinzel',serif;font-size:16px;font-weight:700;letter-spacing:2px;cursor:pointer;transition:all 0.4s;display:block;text-align:center;text-decoration:none;}
        .cta-btn:hover{background-position:100% 0;box-shadow:0 8px 30px rgba(201,168,76,0.4);transform:translateY(-1px);}
        .cta-btn:disabled{opacity:0.7;cursor:not-allowed;transform:none;}
        .cta-note{text-align:center;font-size:11px;color:rgba(240,234,220,0.3);margin-top:8px;margin-bottom:4px;}
        .theme-label{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;text-align:center;}
        .theme-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;}
        .theme-btn{background:rgba(26,32,64,0.8);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:16px 8px;text-align:center;cursor:pointer;transition:all 0.3s;}
        .theme-btn:hover{border-color:rgba(201,168,76,0.4);}
        .theme-btn.active{border-color:var(--gold);background:rgba(201,168,76,0.12);box-shadow:0 0 16px rgba(201,168,76,0.15);}
        .theme-icon{font-size:26px;margin-bottom:8px;display:block;}
        .theme-name{font-size:12px;color:var(--white);font-weight:600;margin-bottom:4px;line-height:1.4;}
        .theme-sub{font-size:10px;color:rgba(240,234,220,0.45);line-height:1.4;}
        .card{background:linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95));border:1px solid rgba(201,168,76,0.2);border-radius:16px;padding:24px;margin-bottom:16px;}
        .card-title{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;text-align:center;}
        .form-group{margin-bottom:14px;}
        .form-label{display:block;font-size:11px;color:var(--gold);letter-spacing:2px;margin-bottom:8px;}
        .form-input{width:100%;background:rgba(10,14,26,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:8px;padding:12px 16px;color:var(--white);font-family:'Noto Serif JP',serif;font-size:14px;outline:none;transition:border-color 0.3s;}
        .form-input:focus{border-color:var(--gold);}
        .upsell{background:linear-gradient(135deg,rgba(60,40,10,0.4),rgba(40,20,5,0.5));border:1px solid rgba(201,168,76,0.35);border-radius:14px;padding:20px;text-align:center;margin-bottom:16px;}
        .upsell-title{font-family:'Cinzel',serif;font-size:13px;color:var(--gold2);letter-spacing:2px;margin-bottom:8px;}
        .upsell-desc{font-size:12px;color:rgba(240,234,220,0.6);line-height:1.8;margin-bottom:12px;}
        .upsell-price{font-family:'Cinzel',serif;font-size:22px;color:var(--gold);margin-bottom:10px;}
        .upsell-btn{display:inline-block;background:linear-gradient(135deg,#8a6a20,var(--gold));color:#0a0e1a;font-family:'Cinzel',serif;font-size:12px;font-weight:700;letter-spacing:1px;padding:11px 22px;border-radius:8px;text-decoration:none;}
        .fixed-cta{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:linear-gradient(135deg,#1a0a20,#0a0e1a);border-top:1px solid rgba(201,168,76,0.4);padding:12px 20px;display:flex;align-items:center;gap:12px;box-shadow:0 -4px 20px rgba(0,0,0,0.4);}
        .fixed-cta-text{flex:1;}
        .fixed-cta-label{font-size:10px;color:rgba(232,122,122,0.8);font-weight:600;margin-bottom:2px;}
        .fixed-cta-main{font-size:13px;color:var(--white);font-weight:500;}
        .fixed-cta-btn{background:linear-gradient(135deg,#8a6a20,var(--gold));border:none;border-radius:8px;color:#0a0e1a;font-family:'Cinzel',serif;font-size:12px;font-weight:700;padding:11px 18px;cursor:pointer;white-space:nowrap;flex-shrink:0;}
        .spacer{height:70px;}
        footer{text-align:center;margin-top:32px;padding-top:20px;border-top:1px solid rgba(201,168,76,0.1);font-size:11px;color:rgba(240,234,220,0.2);}
        @media(max-width:480px){.theme-grid{grid-template-columns:1fr;}.theme-btn{display:flex;align-items:center;gap:12px;padding:14px 16px;}.theme-icon{margin-bottom:0;font-size:22px;flex-shrink:0;}.theme-name{text-align:left;}.theme-sub{text-align:left;}}
      `}</style>

      <div className="wrap">
        <a href="/star" className="back">← 占いポータルに戻る</a>

        <div className="hero">
          <div className="label">✦ Mini Reading ✦</div>
          <h1 className="title">今の悩みの答えを<br/>今すぐ知る</h1>
          <div className="gold-line"></div>
          <p className="hero-sub">
            3テーマ深掘り・AIが丁寧に読み解く<br/>
            恋愛・仕事・金運を一度に鑑定
          </p>
        </div>

        <div className="urgency">
          <div className="urgency-main">⚡ このままでは変わらない可能性があります</div>
          <div className="urgency-sub">
            迷っている時間だけ、チャンスのタイミングが過ぎていきます。<br/>
            今日の鑑定が、3ヶ月後のあなたを変えるかもしれません。
          </div>
        </div>

        <div className="price-area">
          <div className="price">¥1,980</div>
          <div className="price-sub">即時表示 · 3テーマ深掘り · PDFダウンロード付き · 🔒 Stripe安全決済</div>
        </div>

        <div className="theme-label">✦ 気になるテーマを選んでください ✦</div>
        <div className="theme-grid">
          {THEMES.map(t => (
            <div
              key={t.id}
              className={`theme-btn${selectedTheme === t.id ? ' active' : ''}`}
              onClick={() => setSelectedTheme(t.id)}
            >
              <span className="theme-icon">{t.icon}</span>
              <div className="theme-name">{t.name}</div>
              <div className="theme-sub">{t.sub}</div>
            </div>
          ))}
        </div>

        {selectedTheme && (
          <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.25)',borderRadius:10,padding:'12px 16px',textAlign:'center',marginBottom:'16px'}}>
            <div style={{fontSize:'13px',color:'#e8c97a',fontWeight:600,marginBottom:'4px'}}>
              「{THEMES.find(t=>t.id===selectedTheme)?.name}」を選択しました
            </div>
            <div style={{fontSize:'11px',color:'rgba(240,234,220,0.5)'}}>
              情報を入力して、今すぐ答えを出しましょう
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-title">✦ あなたの情報を入力 ✦</div>
          <div className="form-group">
            <label className="form-label">お名前<span style={{fontSize:'10px',color:'rgba(240,234,220,0.4)',marginLeft:'8px'}}>※ニックネームでもOK</span></label>
            <input type="text" className="form-input" placeholder="例：さくら" id="inp-name" />
          </div>
          <div className="form-group">
            <label className="form-label">生年月日</label>
            <input type="date" className="form-input" id="inp-birth" />
          </div>
          <div className="form-group">
            <label className="form-label">メールアドレス<span style={{fontSize:'10px',color:'rgba(240,234,220,0.4)',marginLeft:'8px'}}>結果をお送りします</span></label>
            <input type="email" className="form-input" placeholder="example@email.com" id="inp-email" />
          </div>
          <div style={{background:'rgba(232,122,122,0.08)',border:'1px solid rgba(232,122,122,0.2)',borderRadius:8,padding:'10px 14px',textAlign:'center',marginBottom:'14px'}}>
            <div style={{color:'#f5a0a0',fontSize:'12px',fontWeight:600}}>⚡ 入力後すぐに決済→即時表示されます</div>
          </div>
          <button className="cta-btn" onClick={handlePay} disabled={paying}>
            {paying ? '決済ページへ移動中...' : '✦ ¥1,980 で今すぐ鑑定する ✦'}
          </button>
          <p className="cta-note">🔒 Stripe安全決済 · 即時表示 · PDFダウンロード付き</p>
        </div>

        <div className="upsell">
          <div className="upsell-title">✦ 人生全体を知りたい方へ ✦</div>
          <p className="upsell-desc">
            ホロスコープ＋四柱推命＋タロット3枚＋数秘術<br/>
            過去・現在・未来を完全解析するAI総合鑑定
          </p>
          <div className="upsell-price">¥3,980</div>
          <a href="/star/sogo" className="upsell-btn">✦ AI総合鑑定を見る</a>
        </div>

        <button className="cta-btn" onClick={handlePay} disabled={paying} style={{marginBottom:'8px'}}>
          {paying ? '移動中...' : '✦ ¥1,980 で今すぐ鑑定する ✦'}
        </button>
        <p className="cta-note" style={{marginBottom:'24px'}}>🔒 Stripe安全決済 · 即時表示</p>

        <footer>© 2026 Twinkle Lab / Twinkle Star Oracle</footer>
      </div>

      <div className="fixed-cta">
        <div className="fixed-cta-text">
          <div className="fixed-cta-label">⚡ 今の悩みに今すぐ答えを出す</div>
          <div className="fixed-cta-main">3テーマ深掘り · ¥1,980</div>
        </div>
        <button className="fixed-cta-btn" onClick={scrollToForm}>今すぐ鑑定</button>
      </div>
      <div className="spacer"></div>
    </>
  )
}
