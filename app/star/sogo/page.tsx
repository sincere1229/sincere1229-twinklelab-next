'use client'

import { useState } from 'react'

export default function SogoPage() {
  const [drawn, setDrawn] = useState<{past:string|null,present:string|null,future:string|null}>({past:null,present:null,future:null})
  const [used, setUsed] = useState<number[]>([])

  const CARDS = ['愚者','魔術師','女教皇','女帝','皇帝','法王','恋人','戦車','力','隠者','運命の輪','正義','吊るされた男','死神','節制','悪魔','塔','星','月','太陽','審判','世界']

  const drawCard = (slot: 'past'|'present'|'future') => {
    if (drawn[slot]) return
    let idx = Math.floor(Math.random() * CARDS.length)
    while (used.includes(idx)) idx = Math.floor(Math.random() * CARDS.length)
    setUsed([...used, idx])
    setDrawn({...drawn, [slot]: CARDS[idx]})
  }

  const handlePay = () => {
    const name = (document.getElementById('inp-name') as HTMLInputElement)?.value
    const birth = (document.getElementById('inp-birth') as HTMLInputElement)?.value
    const email = (document.getElementById('inp-email') as HTMLInputElement)?.value
    if (!name || !birth || !email) { alert('お名前・生年月日・メールアドレスを入力してください'); return }
    if (!drawn.past || !drawn.present || !drawn.future) { alert('タロットカードを3枚引いてください'); return }
    alert('Stripe決済ページへ移動します（実装予定）')
  }

  return (
    <>
      <style>{`
        :root{--navy:#0a0e1a;--gold:#c9a84c;--gold2:#e8c97a;--white:#f0eadc;--pink:#e8a0c0;--purple:#9b7fd4;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background-color:var(--navy);color:var(--white);font-family:'Noto Serif JP',serif;min-height:100vh;}
        body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;
          background:radial-gradient(ellipse at 20% 30%,rgba(232,160,192,0.07) 0%,transparent 60%),
          radial-gradient(ellipse at 80% 70%,rgba(180,140,60,0.06) 0%,transparent 50%);
          pointer-events:none;z-index:0;}
        .wrap{position:relative;z-index:1;max-width:680px;margin:0 auto;padding:0 20px 120px;}

        /* ヒーロー */
        .hero{text-align:center;padding:50px 0 40px;border-bottom:1px solid rgba(201,168,76,0.15);}
        .back{display:inline-block;font-size:12px;color:rgba(201,168,76,0.6);text-decoration:none;margin-bottom:20px;letter-spacing:0.1em;}
        .hero-label{font-family:'Cinzel',serif;font-size:10px;letter-spacing:4px;color:var(--gold);text-transform:uppercase;margin-bottom:14px;opacity:0.7;}
        .hero-title{font-family:'Cinzel',serif;font-size:clamp(28px,6vw,48px);color:var(--gold2);letter-spacing:3px;margin-bottom:12px;line-height:1.3;}
        .hero-catch{font-size:clamp(15px,3vw,20px);color:rgba(240,234,220,0.9);margin-bottom:20px;line-height:1.8;font-weight:500;}
        .hero-tags{display:flex;flex-direction:column;gap:6px;margin-bottom:28px;}
        .hero-tag{font-size:14px;color:rgba(240,234,220,0.7);letter-spacing:1px;}
        .hero-tag::before{content:'▶ ';color:var(--gold);}
        .gold-line{width:100px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:0 auto 24px;}
        .price-hero{font-family:'Cinzel',serif;font-size:44px;color:var(--gold);margin-bottom:20px;}

        /* CTAボタン */
        .cta-btn{display:block;width:100%;padding:20px;background:linear-gradient(135deg,#8a6a20,var(--gold),#8a6a20);background-size:200% 100%;border:none;border-radius:12px;color:#0a0e1a;font-family:'Cinzel',serif;font-size:18px;font-weight:700;letter-spacing:2px;cursor:pointer;transition:all 0.4s;text-align:center;text-decoration:none;margin-bottom:10px;}
        .cta-btn:hover{background-position:100% 0;box-shadow:0 8px 30px rgba(201,168,76,0.4);transform:translateY(-2px);}
        .cta-note{text-align:center;font-size:11px;color:rgba(240,234,220,0.3);letter-spacing:1px;margin-bottom:8px;}

        /* セクション共通 */
        .section{background:linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95));border:1px solid rgba(201,168,76,0.18);border-radius:16px;padding:28px;margin:20px 0;}
        .sec-label{font-family:'Cinzel',serif;font-size:10px;letter-spacing:4px;color:var(--gold);text-transform:uppercase;margin-bottom:10px;opacity:0.7;}
        .sec-title{font-size:clamp(18px,4vw,24px);color:var(--gold2);font-weight:600;margin-bottom:16px;line-height:1.5;}
        .sec-text{font-size:14px;color:rgba(240,234,220,0.8);line-height:2.1;}

        /* 共感リスト */
        .worry-list{list-style:none;margin:16px 0;}
        .worry-list li{padding:10px 0;border-bottom:1px solid rgba(201,168,76,0.08);font-size:14px;color:rgba(240,234,220,0.8);display:flex;align-items:center;gap:10px;line-height:1.6;}
        .worry-list li::before{content:'・';color:var(--pink);font-size:18px;flex-shrink:0;}

        /* 解決グリッド */
        .solution-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0;}
        @media(max-width:480px){.solution-grid{grid-template-columns:1fr;}}
        .solution-item{background:rgba(10,14,26,0.5);border:1px solid rgba(201,168,76,0.15);border-radius:10px;padding:16px;}
        .sol-icon{font-size:24px;margin-bottom:8px;}
        .sol-title{font-size:13px;color:var(--gold2);font-weight:600;margin-bottom:4px;}
        .sol-desc{font-size:12px;color:rgba(240,234,220,0.55);line-height:1.6;}

        /* わかることリスト */
        .check-list{list-style:none;margin:12px 0;}
        .check-list li{padding:10px 0;border-bottom:1px solid rgba(201,168,76,0.06);font-size:14px;color:rgba(240,234,220,0.85);display:flex;align-items:flex-start;gap:10px;line-height:1.7;}
        .check-list li::before{content:'✔';color:var(--gold);font-size:14px;flex-shrink:0;margin-top:2px;}

        /* 出力内容 */
        .output-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0;}
        @media(max-width:480px){.output-grid{grid-template-columns:1fr;}}
        .output-item{background:rgba(10,14,26,0.4);border:1px solid rgba(201,168,76,0.12);border-radius:8px;padding:12px 14px;font-size:13px;color:rgba(240,234,220,0.8);display:flex;align-items:center;gap:8px;}
        .output-item::before{content:'▸';color:var(--gold);flex-shrink:0;}

        /* 比較 */
        .compare{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:16px 0;}
        .compare-box{border-radius:12px;padding:20px;}
        .compare-box.normal{background:rgba(60,60,80,0.3);border:1px solid rgba(255,255,255,0.1);}
        .compare-box.tso{background:linear-gradient(135deg,rgba(60,40,10,0.5),rgba(40,20,5,0.6));border:1px solid rgba(201,168,76,0.35);}
        .compare-title{font-family:'Cinzel',serif;font-size:11px;letter-spacing:2px;margin-bottom:10px;opacity:0.7;}
        .compare-box.tso .compare-title{color:var(--gold);}
        .compare-content{font-size:13px;color:rgba(240,234,220,0.7);line-height:1.8;}
        .compare-box.tso .compare-content{color:rgba(240,234,220,0.9);}

        /* 安心グリッド */
        .trust-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0;}
        .trust-item{background:rgba(10,14,26,0.4);border:1px solid rgba(155,127,212,0.2);border-radius:10px;padding:16px;}
        .trust-icon{font-size:22px;margin-bottom:8px;}
        .trust-title{font-size:13px;color:rgba(196,168,240,0.9);margin-bottom:4px;font-weight:500;}
        .trust-desc{font-size:11px;color:rgba(240,234,220,0.5);line-height:1.7;}

        /* 価格比較 */
        .price-compare{text-align:center;margin:16px 0;}
        .price-old{font-size:14px;color:rgba(240,234,220,0.4);text-decoration:line-through;margin-bottom:6px;}
        .price-arrow{font-size:24px;color:var(--gold);margin:8px 0;}
        .price-main{font-family:'Cinzel',serif;font-size:52px;color:var(--gold);line-height:1;}
        .price-sub{font-size:12px;color:rgba(240,234,220,0.4);margin-top:6px;}

        /* 感情訴求 */
        .emotion-box{background:linear-gradient(135deg,rgba(100,60,140,0.3),rgba(60,30,80,0.4));border:1px solid rgba(155,127,212,0.3);border-radius:14px;padding:24px;text-align:center;margin:20px 0;}
        .emotion-text{font-size:clamp(15px,3vw,20px);color:rgba(240,234,220,0.9);line-height:1.9;font-weight:500;}
        .emotion-sub{font-size:13px;color:rgba(240,234,220,0.5);margin-top:10px;}

        /* フォーム */
        .form-card{background:linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95));border:1px solid rgba(201,168,76,0.2);border-radius:16px;padding:28px;margin:20px 0;}
        .form-title{font-family:'Cinzel',serif;font-size:12px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;text-align:center;}
        .form-group{margin-bottom:14px;}
        .form-label{display:block;font-size:11px;color:var(--gold);letter-spacing:2px;margin-bottom:8px;}
        .form-input{width:100%;background:rgba(10,14,26,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:8px;padding:13px 16px;color:var(--white);font-family:'Noto Serif JP',serif;font-size:14px;outline:none;}
        .form-input:focus{border-color:var(--gold);}
        select.form-input{appearance:none;cursor:pointer;}
        select.form-input option{background:#0f1628;}

        /* タロット */
        .tarot-note{font-size:12px;color:rgba(240,234,220,0.5);margin-bottom:14px;line-height:1.8;text-align:center;}
        .tarot-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;}
        .tarot-slot{background:rgba(10,14,26,0.6);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:16px 10px;text-align:center;cursor:pointer;transition:all 0.3s;min-height:80px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;}
        .tarot-slot.selected{border-color:var(--gold);background:rgba(201,168,76,0.1);}
        .slot-pos{font-size:10px;color:var(--gold);letter-spacing:1px;}
        .slot-card{font-size:12px;color:var(--white);}
        .slot-empty{font-size:11px;color:rgba(240,234,220,0.3);}

        /* 注意書き */
        .disclaimer{font-size:11px;color:rgba(240,234,220,0.25);line-height:1.8;text-align:center;margin:16px 0;}

        /* 固定CTA */
        .fixed-cta{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:linear-gradient(135deg,#1a0a20,#0a0e1a);border-top:1px solid rgba(201,168,76,0.4);padding:12px 20px;display:flex;align-items:center;gap:12px;box-shadow:0 -4px 20px rgba(0,0,0,0.4);}
        .fixed-cta-text{flex:1;}
        .fixed-cta-label{font-size:10px;color:rgba(240,234,220,0.4);margin-bottom:2px;}
        .fixed-cta-main{font-size:13px;color:var(--white);font-weight:500;}
        .fixed-cta-btn{background:linear-gradient(135deg,#8a6a20,var(--gold),#8a6a20);border:none;border-radius:8px;color:#0a0e1a;font-family:'Cinzel',serif;font-size:12px;font-weight:700;padding:12px 20px;cursor:pointer;white-space:nowrap;flex-shrink:0;text-decoration:none;}
        .spacer{height:70px;}
        footer{text-align:center;margin-top:20px;padding-top:20px;border-top:1px solid rgba(201,168,76,0.1);font-size:11px;color:rgba(240,234,220,0.2);}

        @media(max-width:480px){
          .hero{padding:36px 0 28px;}
          .section,.form-card{padding:20px;}
          .compare{grid-template-columns:1fr;}
          .trust-grid{grid-template-columns:1fr;}
        }
      `}</style>

      <div className="wrap">

        {/* ① ファーストビュー */}
        <div className="hero">
          <a href="/star" className="back">← 占いポータルに戻る</a>
          <div className="hero-label">✦ AI Premium Reading ✦</div>
          <h1 className="hero-title">あなたの人生の流れを、<br/>すべて読み解きます</h1>
          <div className="gold-line"></div>
          <p className="hero-catch">AI総合鑑定（完全版）<br/>ホロスコープ × 四柱推命 × タロット × 数秘術</p>
          <div className="hero-tags">
            <span className="hero-tag">過去・現在・未来を統合解析</span>
            <span className="hero-tag">恋愛・仕事・金運・健康すべて対応</span>
            <span className="hero-tag">あなた専用の鑑定結果を即時表示</span>
          </div>
          <div className="price-hero">¥3,980</div>
          <a href="#form-section" className="cta-btn">✦ 今すぐ鑑定する ✦</a>
          <p className="cta-note">🔒 Stripe安全決済 · 決済後すぐに表示 · PDFダウンロード付き</p>
          <p style={{fontSize:'12px',color:'rgba(232,122,122,0.9)',textAlign:'center',marginTop:'8px',letterSpacing:'1px'}}>⚠️ 本日の鑑定受付は残りわずかです</p>
        </div>

        {/* ② 悩み共感 */}
        <div className="section">
          <div className="sec-label">✦ あなたへ</div>
          <h2 className="sec-title">こんな悩みはありませんか？</h2>
          <ul className="worry-list">
            <li>このままの人生でいいのか不安</li>
            <li>恋愛がうまくいかない理由が知りたい</li>
            <li>仕事の方向性に迷っている</li>
            <li>これからお金はどうなるのか知りたい</li>
          </ul>
          <p className="sec-text" style={{marginTop:'16px',padding:'16px',background:'rgba(10,14,26,0.4)',borderRadius:'10px',borderLeft:'3px solid rgba(201,168,76,0.5)'}}>
            その答えは「一つの占い」では見えません。<br/>
            複数の視点を組み合わせることで、初めて全体像が見えてきます。
          </p>
        </div>

        {/* ③ 解決提示 */}
        <div className="section">
          <div className="sec-label">✦ 解決策</div>
          <h2 className="sec-title">このAI総合鑑定では<br/>4つの占術を組み合わせて分析します</h2>
          <div className="solution-grid">
            {[
              {icon:'🌐', title:'ホロスコープ', desc:'生まれ持った性質・才能・今の天体の影響'},
              {icon:'☯️', title:'四柱推命', desc:'人生全体の流れ・転機の時期・大運の読み解き'},
              {icon:'🃏', title:'タロット', desc:'今の状況と近未来・意識下のメッセージ'},
              {icon:'🔢', title:'数秘術', desc:'運命のテーマ・魂の使命・生まれ持った特質'},
            ].map(s => (
              <div key={s.title} className="solution-item">
                <div className="sol-icon">{s.icon}</div>
                <div className="sol-title">{s.title}</div>
                <div className="sol-desc">{s.desc}</div>
              </div>
            ))}
          </div>
          <p className="sec-text" style={{marginTop:'16px',textAlign:'center'}}>
            バラバラの情報を「統合」することで<br/>
            <strong style={{color:'var(--gold2)'}}>あなたの人生の全体像が見えます</strong>
          </p>
        </div>

        {/* CTA（中間） */}
        <a href="#form-section" className="cta-btn">✦ 今すぐ鑑定する ✦</a>

        {/* 社会的証明 */}
        <div style={{background:'linear-gradient(135deg,rgba(26,32,64,0.7),rgba(15,22,40,0.8))',border:'1px solid rgba(201,168,76,0.15)',borderRadius:'14px',padding:'20px',margin:'20px 0',textAlign:'center'}}>
          <p style={{fontSize:'13px',color:'rgba(240,234,220,0.6)',marginBottom:'12px',letterSpacing:'1px'}}>これまでに多くの方が体験しています</p>
          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {['自分の方向性が分かった','迷いがなくなった','行動できるようになった'].map(v => (
              <div key={v} style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:'8px',padding:'10px 16px',fontSize:'13px',color:'rgba(240,234,220,0.8)'}}>✦ {v}</div>
            ))}
          </div>
        </div>

        {/* ④ 鑑定内容 */}
        <div className="section">
          <div className="sec-label">✦ この鑑定でわかること</div>
          <h2 className="sec-title">人生の全体像を<br/>完全解析します</h2>
          <ul className="check-list">
            <li>人生の転機（いつ、何が変わるか）</li>
            <li>恋愛の未来（出会い・結婚・相性・今の関係性）</li>
            <li>仕事の方向性（向いている働き方・転職タイミング）</li>
            <li>金運の流れ（増える時期・注意すべき時期）</li>
            <li>健康運（体のサイン・注意すべき時期）</li>
            <li>今やるべき具体的な行動</li>
            <li>年代別メッセージ（あなたの世代に合わせた内容）</li>
          </ul>
        </div>

        {/* ⑤ 出力内容 */}
        <div className="section">
          <div className="sec-label">✦ 出力内容</div>
          <h2 className="sec-title">約5,000文字以上の<br/>詳細鑑定レポート</h2>
          <div className="output-grid">
            {[
              'ホロスコープ図面（カラー）',
              '四柱推命の命式・五行分析',
              'タロット3枚の統合解釈',
              '数秘術の運命数解読',
              '過去 / 現在 / 未来の流れ',
              '仕事運の詳細分析',
              '恋愛運・パートナーシップ',
              '金運・豊かさの流れ',
              '健康運・注意時期',
              '年代別メッセージ',
              '今月・来月の運気予報',
              '開運アドバイス・行動指針',
            ].map(o => (
              <div key={o} className="output-item">{o}</div>
            ))}
          </div>
          <p className="sec-text" style={{textAlign:'center',marginTop:'14px'}}>
            👉 一度だけでなく、<strong style={{color:'var(--gold2)'}}>何度も見返せます</strong>（PDFダウンロード可能）
          </p>
        </div>

        {/* ⑥ 他との違い */}
        <div className="section">
          <div className="sec-label">✦ 他との違い</div>
          <h2 className="sec-title">精度と納得感が<br/>圧倒的に違います</h2>
          <div className="compare">
            <div className="compare-box normal">
              <div className="compare-title">一般的な占い</div>
              <div className="compare-content">
                1つの占術だけ<br/>
                断片的な情報<br/>
                「なんとなく」の鑑定
              </div>
            </div>
            <div className="compare-box tso">
              <div className="compare-title">✦ Twinkle Star Oracle</div>
              <div className="compare-content">
                4つの占術を統合<br/>
                人生の全体像が見える<br/>
                AI による客観的分析
              </div>
            </div>
          </div>
        </div>

        {/* ⑦ 安心材料 */}
        <div className="section">
          <div className="sec-label">✦ 安心してください</div>
          <h2 className="sec-title">選ばれる4つの理由</h2>
          <div className="trust-grid">
            {[
              {icon:'⚡', title:'即時表示', desc:'決済完了後、数秒で鑑定結果が表示されます。待ち時間ゼロ。'},
              {icon:'🤖', title:'AI×占術の統合分析', desc:'感情に左右されない客観的な分析で、高精度な鑑定を提供。'},
              {icon:'📱', title:'スマホで完結', desc:'入力から結果表示・PDFダウンロードまでスマホのみで完結。'},
              {icon:'🔒', title:'安全な決済', desc:'Stripe社の最高水準セキュリティで個人情報を保護。'},
            ].map(t => (
              <div key={t.title} className="trust-item">
                <div className="trust-icon">{t.icon}</div>
                <div className="trust-title">{t.title}</div>
                <div className="trust-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ⑧ 価格 */}
        <div className="section" style={{textAlign:'center'}}>
          <div className="sec-label">✦ 価格</div>
          <div className="price-compare">
            <p style={{fontSize:'16px',color:'rgba(232,201,122,0.9)',marginBottom:'12px',fontWeight:'500',letterSpacing:'1px'}}>あなたの人生の設計図を知る価格です</p>
            <div className="price-old">通常の対面鑑定レベル：10,000円〜30,000円</div>
            <div className="price-arrow">↓</div>
            <div className="price-main">¥3,980</div>
            <div className="price-sub">PDFダウンロード付き · 即時表示 · 5,000文字以上</div>
          </div>
        </div>

        {/* 感情トリガー */}
        <p style={{textAlign:'center',fontSize:'15px',color:'rgba(240,234,220,0.85)',margin:'8px 0 16px',lineHeight:'1.9',fontWeight:'500'}}>
          迷っている今こそ、<br/>あなたの人生が変わるタイミングかもしれません
        </p>

        {/* 感情訴求 */}
        <div className="emotion-box">
          <p className="emotion-text">
            未来は、知った瞬間から変わります。<br/>
            今日のあなたの選択が、<br/>明日の運命を変えます。
          </p>
          <p className="emotion-sub">あなただけの鑑定が、今すぐ手に入ります</p>
        </div>

        {/* ⑨ CTA + フォーム */}
        <a href="#inp-name" className="cta-btn">✦ あなたの運命を今すぐ知る ✦</a>
        <p className="cta-note">🔒 Stripe安全決済 · 即時表示 · PDFダウンロード付き</p>

        <div className="form-card" id="form-section">
          <div className="form-title">✦ あなたの情報を入力 ✦</div>
          <div className="form-group">
            <label className="form-label">お名前</label>
            <input type="text" className="form-input" placeholder="例：さくら" id="inp-name" />
          </div>
          <div className="form-group">
            <label className="form-label">生年月日</label>
            <input type="date" className="form-input" id="inp-birth" />
          </div>
          <div className="form-group">
            <label className="form-label">生まれた時間</label>
            <select className="form-input" id="inp-hour">
              <option value="-1">不明</option>
              {['子（23:00〜1:00）','丑（1:00〜3:00）','寅（3:00〜5:00）','卯（5:00〜7:00）','辰（7:00〜9:00）','巳（9:00〜11:00）','午（11:00〜13:00）','未（13:00〜15:00）','申（15:00〜17:00）','酉（17:00〜19:00）','戌（19:00〜21:00）','亥（21:00〜23:00）'].map((h,i) => (
                <option key={i} value={i}>{h}の刻</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">性別</label>
            <select className="form-input" id="inp-gender">
              <option value="female">女性</option>
              <option value="male">男性</option>
              <option value="other">その他・回答しない</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">メールアドレス（PDFをお送りします）</label>
            <input type="email" className="form-input" placeholder="example@email.com" id="inp-email" />
          </div>

          <div className="form-group" style={{marginTop:'20px'}}>
            <label className="form-label">✦ タロットカードを3枚引いてください</label>
            <p className="tarot-note">心を落ち着けて、問いを心に持ちながら1枚ずつタップしてください</p>
            <div className="tarot-grid">
              {(['past','present','future'] as const).map((slot) => {
                const labels = {past:'PAST / 過去', present:'PRESENT / 現在', future:'FUTURE / 未来'}
                return (
                  <div key={slot} className={`tarot-slot${drawn[slot] ? ' selected' : ''}`} onClick={() => drawCard(slot)}>
                    <div className="slot-pos">{labels[slot]}</div>
                    {drawn[slot]
                      ? <div className="slot-card">✦ {drawn[slot]} ✦</div>
                      : <div className="slot-empty">タップして引く</div>
                    }
                  </div>
                )
              })}
            </div>
          </div>

          <button className="cta-btn" onClick={handlePay}>✦ ¥3,980 で今すぐ鑑定する ✦</button>
          <p className="cta-note">🔒 Stripe による安全な決済 · 決済完了後すぐに表示 · PDFダウンロード付き</p>
        </div>

        {/* ⑩ 追撃CTA */}
        <div className="emotion-box">
          <p className="emotion-text" style={{fontSize:'clamp(14px,3vw,18px)'}}>
            未来は、知った瞬間から変わります
          </p>
        </div>
        <p style={{textAlign:'center',fontSize:'15px',color:'rgba(240,234,220,0.8)',margin:'0 0 16px',lineHeight:'1.9',fontWeight:'500'}}>
          ここまで読んだあなたは、<br/>すでに答えに近づいています
        </p>
        <button className="cta-btn" onClick={handlePay}>✦ 今すぐ鑑定する ✦</button>

        <p className="disclaimer">
          ※鑑定はAIにより自動生成されます<br/>
          ※結果は個人差があります<br/>
          ※医療・法律・投資判断には使用できません
        </p>

        <footer>© 2026 Twinkle Lab / Twinkle Star Oracle</footer>
      </div>

      {/* 固定CTAバナー */}
      <div className="fixed-cta">
        <div className="fixed-cta-text">
          <div className="fixed-cta-label">今この選択が未来を変えます</div>
          <div className="fixed-cta-main">あなたの運命を今すぐ知る</div>
        </div>
        <a href="#form-section" className="fixed-cta-btn">¥3,980で鑑定する</a>
      </div>
      <div className="spacer"></div>
    </>
  )
}
