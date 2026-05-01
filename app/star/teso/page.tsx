'use client'

const STRIPE_980  = 'https://buy.stripe.com/cNieV6f5Q1hM00d48P33W05'
const STRIPE_3980 = 'https://buy.stripe.com/aFa5kw8Hs6C6dR3fRx33W02'
const LINE_URL    = 'https://lin.ee/XHDFrA8'

export default function TesoPage() {
  return (
    <>
      <style>{`
        :root{--navy:#0a0e1a;--gold:#c9a84c;--gold2:#e8c97a;--white:#f0eadc;--pink:#e8a0c0;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:var(--navy);color:var(--white);font-family:'Noto Serif JP',serif;min-height:100vh;}
        body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;
          background:radial-gradient(ellipse at 30% 40%,rgba(232,160,192,0.08) 0%,transparent 60%),
          radial-gradient(ellipse at 80% 70%,rgba(180,140,60,0.06) 0%,transparent 50%);
          pointer-events:none;z-index:0;}
        .wrap{position:relative;z-index:1;max-width:620px;margin:0 auto;padding:32px 20px 100px;}
        .back{display:inline-block;font-size:12px;color:rgba(201,168,76,0.6);text-decoration:none;margin-bottom:20px;letter-spacing:1px;}
        .hero{text-align:center;margin-bottom:28px;}
        .hero-badge{display:inline-block;background:linear-gradient(135deg,rgba(232,160,192,0.3),rgba(180,100,160,0.2));border:1px solid rgba(232,160,192,0.4);border-radius:20px;padding:6px 18px;font-size:11px;color:var(--pink);letter-spacing:2px;margin-bottom:14px;}
        .hero-title{font-family:'Cinzel',serif;font-size:clamp(26px,6vw,40px);color:var(--gold2);letter-spacing:3px;margin-bottom:10px;line-height:1.3;}
        .gold-line{width:80px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:14px auto;}
        .hero-sub{font-size:14px;color:rgba(240,234,220,0.75);line-height:1.9;margin-bottom:8px;}
        .hand-visual{text-align:center;margin:20px 0;font-size:72px;filter:drop-shadow(0 0 20px rgba(201,168,76,0.3));}

        /* ステップ */
        .steps{background:linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95));border:1px solid rgba(201,168,76,0.2);border-radius:16px;padding:28px;margin-bottom:20px;}
        .steps-title{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:3px;text-align:center;margin-bottom:20px;opacity:0.8;}
        .step{display:flex;align-items:flex-start;gap:14px;margin-bottom:16px;}
        .step:last-child{margin-bottom:0;}
        .step-num{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#8a6a20,var(--gold));color:#0a0e1a;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;}
        .step-title{font-size:14px;color:var(--gold2);font-weight:600;margin-bottom:4px;}
        .step-desc{font-size:12px;color:rgba(240,234,220,0.6);line-height:1.8;}

        /* メインCTA（LINE） */
        .main-cta{background:linear-gradient(135deg,rgba(0,185,0,0.15),rgba(0,150,0,0.08));border:2px solid rgba(6,199,85,0.4);border-radius:16px;padding:28px;text-align:center;margin-bottom:20px;}
        .main-cta-badge{display:inline-block;background:rgba(6,199,85,0.15);border:1px solid rgba(6,199,85,0.3);border-radius:20px;padding:4px 14px;font-size:11px;color:#4ede88;letter-spacing:2px;margin-bottom:12px;}
        .main-cta-title{font-size:18px;color:var(--white);font-weight:600;margin-bottom:6px;line-height:1.6;}
        .main-cta-desc{font-size:13px;color:rgba(240,234,220,0.6);line-height:1.8;margin-bottom:18px;}
        .line-btn{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#06c755,#04a844);border:none;border-radius:12px;color:#fff;font-size:15px;font-weight:700;padding:16px 32px;text-decoration:none;transition:all 0.2s;}
        .line-btn:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(6,199,85,0.4);}
        .main-cta-note{font-size:11px;color:rgba(240,234,220,0.35);margin-top:10px;}

        /* 無料 vs 980 比較 */
        .compare{background:linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95));border:1px solid rgba(201,168,76,0.2);border-radius:16px;padding:24px;margin-bottom:20px;}
        .compare-title{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:3px;text-align:center;margin-bottom:18px;opacity:0.8;}
        .compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .compare-col{border-radius:10px;padding:16px;}
        .compare-col.free{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);}
        .compare-col.paid{background:rgba(155,89,182,0.12);border:1px solid rgba(155,89,182,0.35);}
        .compare-label{font-size:11px;font-weight:700;letter-spacing:1px;margin-bottom:10px;text-align:center;padding:4px 0;border-radius:6px;}
        .compare-label.free{color:rgba(240,234,220,0.5);background:rgba(255,255,255,0.05);}
        .compare-label.paid{color:#c39bd3;background:rgba(155,89,182,0.15);}
        .compare-item{font-size:11px;color:rgba(240,234,220,0.65);line-height:2;padding:2px 0;}
        .compare-item::before{content:'• ';color:rgba(201,168,76,0.4);}
        .compare-item.paid{color:rgba(195,155,211,0.9);}
        .compare-item.paid::before{content:'✦ ';color:#c39bd3;font-size:9px;}
        .compare-key{font-size:12px;font-weight:700;text-align:center;margin-top:12px;padding:8px;border-radius:8px;background:rgba(155,89,182,0.15);border:1px solid rgba(155,89,182,0.25);color:#c39bd3;line-height:1.7;}

        /* 手相の撮り方 */
        .howto{background:linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95));border:1px solid rgba(201,168,76,0.15);border-radius:16px;padding:24px;margin-bottom:20px;}
        .howto-title{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:3px;margin-bottom:16px;text-align:center;opacity:0.8;}
        .howto-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .howto-item{background:rgba(10,14,26,0.5);border:1px solid rgba(201,168,76,0.12);border-radius:10px;padding:14px 12px;text-align:center;}
        .howto-icon{font-size:28px;margin-bottom:8px;display:block;}
        .howto-label{font-size:12px;color:var(--gold2);font-weight:600;margin-bottom:4px;}
        .howto-desc{font-size:11px;color:rgba(240,234,220,0.5);line-height:1.6;}
        .howto-tips{margin-top:14px;background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.15);border-radius:8px;padding:12px 16px;}
        .howto-tip{font-size:12px;color:rgba(240,234,220,0.6);line-height:1.9;}
        .howto-tip::before{content:'✦ ';color:var(--gold);font-size:10px;}

        /* 有料プラン */
        .plans{margin-bottom:20px;}
        .plans-title{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:3px;text-align:center;margin-bottom:16px;opacity:0.8;}
        .plan-card{border-radius:16px;padding:24px;margin-bottom:12px;}
        .plan-card.p980{background:linear-gradient(135deg,rgba(155,89,182,0.15),rgba(100,50,150,0.1));border:2px solid rgba(155,89,182,0.45);}
        .plan-card.p3980{background:linear-gradient(135deg,rgba(100,80,30,0.3),rgba(60,40,10,0.4));border:1px solid rgba(201,168,76,0.4);}
        .plan-badge{display:inline-block;font-size:10px;font-weight:700;border-radius:20px;padding:3px 12px;letter-spacing:1px;margin-bottom:10px;}
        .plan-badge.p980{background:rgba(155,89,182,0.2);color:#c39bd3;border:1px solid rgba(155,89,182,0.4);}
        .plan-badge.p3980{background:rgba(201,168,76,0.15);color:var(--gold);border:1px solid rgba(201,168,76,0.35);}
        .plan-title{font-family:'Cinzel',serif;font-size:16px;color:var(--gold2);letter-spacing:2px;margin-bottom:8px;}
        .plan-price{font-family:'Cinzel',serif;font-size:32px;color:var(--gold);margin-bottom:8px;}
        .plan-price-orig{font-size:12px;color:rgba(240,234,220,0.35);text-decoration:line-through;margin-bottom:4px;}
        .plan-items{list-style:none;margin-bottom:16px;}
        .plan-items li{font-size:13px;color:rgba(240,234,220,0.8);line-height:1.9;padding:3px 0;}
        .plan-items li::before{content:'✦ ';color:var(--gold);font-size:10px;}
        .plan-btn{display:block;width:100%;text-align:center;border-radius:10px;font-weight:700;font-size:14px;padding:14px;text-decoration:none;transition:all 0.2s;border:none;cursor:pointer;}
        .plan-btn.p980{background:linear-gradient(135deg,#9b59b6,#6c3483);color:#fff;}
        .plan-btn.p980:hover{box-shadow:0 6px 20px rgba(155,89,182,0.4);transform:translateY(-2px);}
        .plan-btn.p3980{background:linear-gradient(135deg,#8a6a20,var(--gold),#8a6a20);color:#0a0e1a;}
        .plan-btn.p3980:hover{box-shadow:0 6px 20px rgba(201,168,76,0.4);transform:translateY(-2px);}
        .plan-note{font-size:11px;color:rgba(240,234,220,0.3);text-align:center;margin-top:8px;}

        /* 感情訴求ブロック */
        .emotion-block{background:linear-gradient(135deg,rgba(155,89,182,0.1),rgba(100,50,150,0.06));border:1px solid rgba(155,89,182,0.25);border-radius:12px;padding:20px;margin-bottom:16px;text-align:center;}
        .emotion-block p{font-size:13px;color:rgba(195,155,211,0.9);line-height:2.1;}
        .emotion-block strong{color:#c39bd3;display:block;font-size:14px;margin-bottom:8px;}

        /* 980→3980 橋渡し */
        .bridge{background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:16px;margin:8px 0 16px;text-align:center;}
        .bridge p{font-size:12px;color:rgba(201,168,76,0.8);line-height:1.9;}

        /* 診断例 */
        .example{background:linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95));border:1px solid rgba(155,127,212,0.2);border-radius:16px;padding:24px;margin-bottom:20px;}
        .example-title{font-family:'Cinzel',serif;font-size:11px;color:#c4a8f0;letter-spacing:3px;margin-bottom:16px;text-align:center;}
        .example-box{background:rgba(10,14,26,0.5);border:1px solid rgba(155,127,212,0.15);border-radius:10px;padding:16px;font-size:13px;color:rgba(240,234,220,0.8);line-height:2.1;}
        .example-label{font-size:10px;color:#c4a8f0;letter-spacing:2px;margin-bottom:8px;}

        footer{text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid rgba(201,168,76,0.1);font-size:11px;color:rgba(240,234,220,0.2);}
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Noto+Serif+JP:wght@300;400;500&display=swap" rel="stylesheet" />

      <div className="wrap">
        <a href="/star" className="back">← 占いポータルに戻る</a>

        {/* ヒーロー */}
        <div className="hero">
          <div className="hero-badge">✦ Hand Reading ✦</div>
          <h1 className="hero-title">手相診断</h1>
          <div className="gold-line" />
          <p className="hero-sub">
            手のひらには、あなたの本質と<br/>
            今の流れが刻まれています
          </p>
          <p style={{fontSize:'13px',color:'rgba(232,160,192,0.8)',marginTop:'8px',letterSpacing:'1px'}}>
            最近うまくいかないと感じている方へ
          </p>
        </div>

        <div className="hand-visual">🤲</div>

        {/* ステップ説明 */}
        <div className="steps">
          <div className="steps-title">✦ 診断の流れ ✦</div>
          <div className="step">
            <div className="step-num">1</div>
            <div className="step-body">
              <div className="step-title">LINEに手のひらの写真を送る</div>
              <div className="step-desc">両手（左右）の写真を撮って、LINEに送信するだけ。撮り方は下をご確認ください。</div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div className="step-body">
              <div className="step-title">無料で簡易診断をLINEでお届け</div>
              <div className="step-desc">本質の線・現在の流れ・今のあなたへのメッセージをLINEでお送りします。</div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div className="step-body">
              <div className="step-title">本当の自分を知りたい方へ（¥980）</div>
              <div className="step-desc">なぜうまくいかないのか、その原因と解決まで読み解く詳細診断へ進めます。結果はLINEでお届けします。</div>
            </div>
          </div>
        </div>

        {/* メインCTA（LINE） */}
        <div className="main-cta">
          <div className="main-cta-badge">🎁 まずは無料で診断</div>
          <p style={{fontSize:'12px',color:'#4ede88',marginBottom:'10px',letterSpacing:'1px'}}>
            ※現在、無料診断を受付中です
          </p>
          <div className="main-cta-title">
            手のひらの写真を送るだけで<br/>あなたの本質がわかります
          </div>
          <div className="main-cta-desc">
            LINEに登録して、両手の写真を送ってください。<br/>
            簡易診断を無料でLINEにてお届けします。<br/>
            <span style={{fontSize:'12px',color:'rgba(240,234,220,0.5)',display:'block',marginTop:'6px'}}>
              ※文字診断では分からない、あなたの"個別の線"を見て診断します
            </span>
          </div>
          <a href={LINE_URL} className="line-btn" target="_blank" rel="noopener">
            <span style={{fontSize:'20px'}}>💬</span>
            無料で手相診断を受ける（LINE）
          </a>
          <div style={{fontSize:'13px',color:'#4ede88',marginTop:'10px',fontWeight:600}}>
            LINEで「手相」と送るだけでOKです
          </div>
          <div style={{fontSize:'12px',color:'rgba(240,234,220,0.45)',marginTop:'6px'}}>
            初めての方でも安心してご利用いただけます
          </div>
          <div className="main-cta-note">登録無料 · 写真を送るだけ · 順次LINEでお届けします</div>
        </div>

        {/* 無料 vs ¥980 比較 */}
        <div className="compare">
          <div className="compare-title">✦ 無料診断と詳細診断の違い ✦</div>
          <div className="compare-grid">
            <div className="compare-col free">
              <div className="compare-label free">無料診断</div>
              <div className="compare-item">今の状態の傾向</div>
              <div className="compare-item">本質の大まかな読み取り</div>
              <div className="compare-item">今のメッセージ</div>
            </div>
            <div className="compare-col paid">
              <div className="compare-label paid">¥980 詳細診断</div>
              <div className="compare-item paid">本来の自分の深い分析</div>
              <div className="compare-item paid">ズレの原因まで特定</div>
              <div className="compare-item paid">なぜうまくいかないか</div>
              <div className="compare-item paid">軽い未来の流れ</div>
              <div className="compare-item paid">すぐできる行動3つ</div>
            </div>
          </div>
          <div className="compare-key">
            無料は「傾向」、¥980は「原因と解決」まで
          </div>
        </div>

        {/* 感情訴求 */}
        <div className="emotion-block">
          <strong>「本来のあなた」は、今の状態とは違うかもしれません</strong>
          <p>
            なんとなく頑張っているのに結果が出ない。<br/>
            なぜかいつも同じところで詰まってしまう。<br/>
            それは性格の問題ではなく、<br/>
            <span style={{color:'#c39bd3',fontWeight:600}}>「本来の自分」と「今の状態」のズレ</span>が<br/>
            原因かもしれません。
          </p>
        </div>

        {/* 撮り方ガイド */}
        <div className="howto">
          <div className="howto-title">✦ 手相写真の撮り方 ✦</div>
          <div className="howto-grid">
            <div className="howto-item">
              <span className="howto-icon">🫲</span>
              <div className="howto-label">左手（本質）</div>
              <div className="howto-desc">生まれ持った本来の性質・魂の傾向</div>
            </div>
            <div className="howto-item">
              <span className="howto-icon">🫱</span>
              <div className="howto-label">右手（現在）</div>
              <div className="howto-desc">今の状態・これまでの経験の影響</div>
            </div>
          </div>
          <div className="howto-tips">
            <div className="howto-tip">明るい場所で撮影してください</div>
            <div className="howto-tip">手のひら全体が写るように</div>
            <div className="howto-tip">線がはっきり見える角度で</div>
            <div className="howto-tip">左右それぞれ1枚ずつ送ってください</div>
          </div>
        </div>

        {/* 診断例 */}
        <div className="example">
          <div className="example-title">✦ 診断文のイメージ ✦</div>
          <div className="example-label">簡易診断（無料）の例：</div>
          <div className="example-box">
            左手の感情線が深く長く伸びていることから、あなたは本来、感受性が豊かで人を深く愛することができる方です。ただ右手では少し短めに変化していることから、今は少し感情を抑えている時期かもしれません。本来の豊かな感受性を大切にすることが、今のあなたへの大切なメッセージです。
          </div>
          <p style={{fontSize:'11px',color:'rgba(240,234,220,0.35)',marginTop:'10px',lineHeight:1.8}}>
            ※実際の診断はあなたの手相に合わせて個別に作成されます
          </p>
        </div>

        {/* 有料プラン */}
        <div className="plans">
          <div className="plans-title">✦ 詳しく知りたい方へ ✦</div>

          {/* ¥980 */}
          <div className="plan-card p980">
            <div className="plan-badge p980">手相詳細診断</div>
            <div className="plan-title">本当の自分を知る</div>
            <div className="plan-price">¥980</div>
            <p style={{fontSize:'12px',color:'rgba(195,155,211,0.9)',marginBottom:'14px',lineHeight:1.9,background:'rgba(155,89,182,0.1)',border:'1px solid rgba(155,89,182,0.2)',borderRadius:8,padding:'12px 14px'}}>
              「なぜうまくいかないのか」その<strong style={{color:'#c39bd3'}}>原因と解決</strong>まで読み解きます。<br/>
              <span style={{fontSize:'11px',color:'rgba(195,155,211,0.7)'}}>本来の自分と今の状態のズレを明確にすることで、<br/>何を変えればいいのかが見えてきます。</span>
            </p>
            <ul className="plan-items">
              <li>本質（左手）の詳細分析</li>
              <li>現在（右手）の詳細分析</li>
              <li>ズレの原因まで深く読み解く（最重要）</li>
              <li>このままだとどうなるか / 整えたら？</li>
              <li>今すぐできる行動アドバイス（3つ）</li>
            </ul>
            <p style={{fontSize:'12px',color:'rgba(195,155,211,0.8)',textAlign:'center',marginBottom:'10px',letterSpacing:'1px'}}>
              結果はLINEにてお届けします🌙
            </p>
            <a href={STRIPE_980} className="plan-btn p980" target="_blank" rel="noopener">
              ✦ 本当の自分を知る（¥980）
            </a>
            <div className="plan-note">🔒 Stripe安全決済 · お支払い後「決済しました」とLINEへご連絡ください</div>
          </div>

          {/* ¥980 → ¥3,980 橋渡し */}
          <div className="bridge">
            <p>
              手相だけでなく、恋愛・仕事・金運まで<br/>
              人生全体を読み解きたい方には<br/>
              <span style={{color:' var(--gold)',fontWeight:600}}>AI総合鑑定（手相＋複数占術）</span>もご用意しています🌙
            </p>
          </div>

          {/* ¥3,980 */}
          <div className="plan-card p3980">
            <div className="plan-badge p3980">AI総合鑑定（手相＋複数占術）</div>
            <div className="plan-title">人生全体を完全解析</div>
            <div className="plan-price-orig">通常¥4,980相当</div>
            <div className="plan-price">¥3,980</div>
            <p style={{fontSize:'12px',color:'rgba(232,200,120,0.8)',marginBottom:'14px',lineHeight:1.8}}>
              手相をベースに、タロット・数秘術・ホロスコープなどを組み合わせ、<br/>
              人生全体の流れを総合的に読み解きます
            </p>
            <ul className="plan-items">
              <li>手相詳細診断（全内容）</li>
              <li>恋愛運・仕事運・金運</li>
              <li>人生の流れ（時期・転機）</li>
              <li>ホロスコープ＋四柱推命＋タロット</li>
              <li>開運アクション3〜5個</li>
              <li>PDF完全版お届け</li>
            </ul>
            <p style={{fontSize:'12px',color:'rgba(201,168,76,0.8)',textAlign:'center',marginBottom:'10px',letterSpacing:'1px'}}>
              結果はLINEにてお届け＋PDF送付🌙
            </p>
            <a href="/star/sogo" className="plan-btn p3980">
              ✦ AI総合鑑定を受ける（¥3,980）
            </a>
            <div className="plan-note">🔒 Stripe安全決済 · お支払い後「決済しました」とLINEへご連絡ください</div>
          </div>
        </div>

        {/* 下部LINE再CTA */}
        <div style={{textAlign:'center',margin:'20px 0 8px'}}>
          <a href={LINE_URL} target="_blank" rel="noopener" style={{
            display:'inline-flex',alignItems:'center',gap:'8px',
            background:'linear-gradient(135deg,rgba(0,185,0,0.15),rgba(0,150,0,0.08))',
            border:'1px solid rgba(6,199,85,0.4)',borderRadius:10,
            color:'#4ede88',fontSize:'13px',fontWeight:600,
            padding:'12px 24px',textDecoration:'none',letterSpacing:'1px',
          }}>
            💬 無料：手相診断はこちら（LINE）
          </a>
        </div>

        <footer>© 2026 Twinkle Lab / Twinkle Star Oracle</footer>
      </div>
    </>
  )
}
