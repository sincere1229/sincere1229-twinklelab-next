export const metadata = {
  title: '総合鑑定｜3つの占いを組み合わせたTwinkle Star Oracle',
  description: 'ホロスコープ図面・四柱推命・タロット3枚・数秘術を組み合わせたAI総合鑑定（¥3,980）。生年月日・生まれた時刻・タロット3枚を入力するだけで、仕事運・恋愛運・金運・健康運を年代別に分析。過去・現在・未来のメッセージを即座に表示し、PDFでダウンロードも可能です。',
  openGraph: {
    title: '総合鑑定｜3つの占いを組み合わせたTwinkle Star Oracle',
    description: 'ホロスコープ図面・四柱推命・タロット3枚・数秘術を組み合わせたAI総合鑑定（¥3,980）。',
    url: 'https://twinkle-lab.jp/star/sogo',
    siteName: 'Twinkle Star Oracle',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function SogoPage() {
  return (
    <>
      <style>{`
        :root { --navy:#0a0e1a; --gold:#c9a84c; --gold2:#e8c97a; --white:#f0eadc; --pink:#e8a0c0; --purple:#9b7fd4; }
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background-color:var(--navy);color:var(--white);font-family:'Noto Serif JP',serif;min-height:100vh;}
        body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(ellipse at 20% 30%,rgba(232,160,192,0.07) 0%,transparent 60%),radial-gradient(ellipse at 80% 70%,rgba(180,140,60,0.06) 0%,transparent 50%);pointer-events:none;z-index:0;}
        .wrap{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 120px;}

        /* ヒーロー */
        .hero{text-align:center;padding:50px 0 40px;border-bottom:1px solid rgba(201,168,76,0.15);}
        .back{display:inline-block;font-size:12px;color:rgba(201,168,76,0.6);text-decoration:none;margin-bottom:20px;letter-spacing:0.1em;}
        .hero-label{font-family:'Cinzel',serif;font-size:10px;letter-spacing:4px;color:var(--gold);text-transform:uppercase;margin-bottom:14px;opacity:0.7;}
        .hero-title{font-family:'Cinzel',serif;font-size:clamp(28px,6vw,44px);color:var(--gold2);letter-spacing:3px;margin-bottom:10px;line-height:1.3;}
        .hero-sub{font-size:14px;color:rgba(240,234,220,0.55);letter-spacing:2px;margin-bottom:28px;}
        .gold-line{width:100px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:0 auto 28px;}

        /* ベネフィット */
        .benefits{background:linear-gradient(135deg,rgba(40,20,60,0.6),rgba(20,10,40,0.8));border:1px solid rgba(201,168,76,0.25);border-radius:16px;padding:28px;margin:32px 0 24px;text-align:center;}
        .benefits-title{font-family:'Cinzel',serif;font-size:13px;color:var(--gold);letter-spacing:3px;margin-bottom:20px;text-transform:uppercase;}
        .benefit-list{list-style:none;text-align:left;}
        .benefit-list li{padding:10px 0;border-bottom:1px solid rgba(201,168,76,0.08);font-size:14px;color:rgba(240,234,220,0.88);display:flex;align-items:center;gap:12px;line-height:1.6;}
        .benefit-list li::before{content:'✦';color:var(--gold);font-size:10px;flex-shrink:0;}

        /* CTA上 */
        .cta-box{background:linear-gradient(135deg,rgba(100,60,20,0.4),rgba(60,30,10,0.5));border:1px solid rgba(201,168,76,0.45);border-radius:16px;padding:28px;text-align:center;margin:24px 0;}
        .cta-price{font-family:'Cinzel',serif;font-size:36px;color:var(--gold);margin-bottom:4px;}
        .cta-price-sub{font-size:12px;color:rgba(240,234,220,0.4);margin-bottom:20px;}
        .cta-btn{display:block;width:100%;padding:18px;background:linear-gradient(135deg,#8a6a20,var(--gold),#8a6a20);background-size:200% 100%;border:none;border-radius:10px;color:#0a0e1a;font-family:'Cinzel',serif;font-size:16px;font-weight:700;letter-spacing:2px;cursor:pointer;transition:all 0.4s;text-decoration:none;margin-bottom:10px;}
        .cta-btn:hover{background-position:100% 0;box-shadow:0 8px 30px rgba(201,168,76,0.4);transform:translateY(-2px);}
        .cta-note{font-size:11px;color:rgba(240,234,220,0.3);letter-spacing:1px;}

        /* 鑑定内容 */
        .features{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:24px 0;}
        @media(max-width:480px){.features{grid-template-columns:repeat(2,1fr);}}
        .feature{background:rgba(26,32,64,0.7);border:1px solid rgba(201,168,76,0.15);border-radius:12px;padding:16px 10px;text-align:center;}
        .feat-icon{font-size:24px;margin-bottom:8px;display:block;}
        .feat-name{font-size:12px;color:var(--gold2);letter-spacing:1px;margin-bottom:4px;}
        .feat-desc{font-size:10px;color:rgba(240,234,220,0.4);line-height:1.5;}

        /* 出力内容詳細 */
        .output-section{background:linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95));border:1px solid rgba(201,168,76,0.2);border-radius:16px;padding:28px;margin:24px 0;}
        .output-title{font-family:'Cinzel',serif;font-size:12px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid rgba(201,168,76,0.15);}
        .output-list{list-style:none;}
        .output-list li{padding:8px 0;border-bottom:1px solid rgba(201,168,76,0.06);font-size:13px;color:rgba(240,234,220,0.82);display:flex;align-items:center;gap:10px;}
        .output-list li::before{content:'▸';color:var(--gold);font-size:11px;flex-shrink:0;}

        /* 安心材料 */
        .trust-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:24px 0;}
        @media(max-width:480px){.trust-grid{grid-template-columns:1fr;}}
        .trust-item{background:rgba(26,32,64,0.6);border:1px solid rgba(155,127,212,0.2);border-radius:12px;padding:16px;}
        .trust-icon{font-size:20px;margin-bottom:8px;}
        .trust-title{font-size:13px;color:rgba(196,168,240,0.9);margin-bottom:4px;font-weight:500;}
        .trust-desc{font-size:11px;color:rgba(240,234,220,0.5);line-height:1.7;}

        /* フォーム */
        .form-card{background:linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95));border:1px solid rgba(201,168,76,0.2);border-radius:16px;padding:28px;margin:24px 0;}
        .form-title{font-family:'Cinzel',serif;font-size:12px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;text-align:center;}
        .form-group{margin-bottom:16px;}
        .form-label{display:block;font-size:11px;color:var(--gold);letter-spacing:2px;margin-bottom:8px;}
        .form-input{width:100%;background:rgba(10,14,26,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:8px;padding:13px 16px;color:var(--white);font-family:'Noto Serif JP',serif;font-size:14px;outline:none;}
        .form-input:focus{border-color:var(--gold);}
        select.form-input{appearance:none;cursor:pointer;}
        select.form-input option{background:#0f1628;}

        /* タロット */
        .tarot-note{font-size:12px;color:rgba(240,234,220,0.5);margin-bottom:14px;line-height:1.8;text-align:center;}
        .tarot-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;}
        .tarot-slot{background:rgba(10,14,26,0.6);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:16px 10px;text-align:center;cursor:pointer;transition:all 0.3s;min-height:80px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;}
        .tarot-slot:hover{border-color:rgba(201,168,76,0.5);}
        .tarot-slot.selected{border-color:var(--gold);background:rgba(201,168,76,0.1);}
        .slot-pos{font-size:10px;color:var(--gold);letter-spacing:1px;}
        .slot-card{font-size:12px;color:var(--white);}
        .slot-empty{font-size:11px;color:rgba(240,234,220,0.3);}

        /* 固定バナー */
        .fixed-cta{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:linear-gradient(135deg,#1a0a20,#0a0e1a);border-top:1px solid rgba(201,168,76,0.4);padding:12px 20px;display:flex;align-items:center;gap:12px;box-shadow:0 -4px 20px rgba(0,0,0,0.4);}
        .fixed-cta-text{flex:1;}
        .fixed-cta-label{font-size:10px;color:rgba(240,234,220,0.4);margin-bottom:2px;}
        .fixed-cta-main{font-size:13px;color:var(--white);font-weight:500;}
        .fixed-cta-btn{background:linear-gradient(135deg,#8a6a20,var(--gold),#8a6a20);border:none;border-radius:8px;color:#0a0e1a;font-family:'Cinzel',serif;font-size:12px;font-weight:700;padding:12px 20px;cursor:pointer;white-space:nowrap;flex-shrink:0;text-decoration:none;}
        .spacer{height:70px;}

        footer{text-align:center;margin-top:40px;padding-top:24px;border-top:1px solid rgba(201,168,76,0.1);font-size:11px;color:rgba(240,234,220,0.2);}
      `}</style>

      <div className="wrap">

        {/* ヒーロー */}
        <div className="hero">
          <a href="/star" className="back">← 占いポータルに戻る</a>
          <div className="hero-label">✦ Premium Reading ✦</div>
          <h1 className="hero-title">AI 総合鑑定</h1>
          <div className="gold-line"></div>
          <p className="hero-sub">あなたの人生の設計図が、今わかる</p>
        </div>

        {/* ベネフィット */}
        <div className="benefits">
          <div className="benefits-title">✦ この鑑定でわかること ✦</div>
          <ul className="benefit-list">
            <li>過去・現在・未来を完全解析（タロット×四柱推命×星座）</li>
            <li>仕事運：今の職場の流れ・転機・才能の活かし方</li>
            <li>恋愛運：あなたの愛のパターン・出会いのタイミング</li>
            <li>金運：お金の流れ・豊かさを引き寄せる開運行動</li>
            <li>健康運：今の体の声・注意すべき時期</li>
            <li>年代別メッセージ（20〜40代・40〜60代・60代〜）</li>
            <li>5,000文字以上の詳細レポート・PDF保存可能</li>
          </ul>
        </div>

        {/* CTA①（上） */}
        <div className="cta-box">
          <div className="cta-price">¥3,980</div>
          <div className="cta-price-sub">一回限りの特別価格・即時表示</div>
          <a href="#form-section" className="cta-btn">✦ 今すぐ鑑定する ✦</a>
          <p className="cta-note">🔒 Stripe による安全な決済 · 決済完了後すぐに表示</p>
        </div>

        {/* 鑑定内容 */}
        <div className="features">
          {[
            {icon:'🌐', name:'ホロスコープ図面', desc:'天体配置を可視化'},
            {icon:'☯️', name:'四柱推命', desc:'命式・五行バランス'},
            {icon:'🃏', name:'タロット3枚', desc:'過去・現在・未来'},
            {icon:'🔢', name:'数秘術', desc:'運命数の深層'},
            {icon:'⭐', name:'星座・星座運', desc:'今の天体の影響'},
            {icon:'📊', name:'年代別分析', desc:'あなたの世代に合わせた'},
          ].map(f => (
            <div key={f.name} className="feature">
              <span className="feat-icon">{f.icon}</span>
              <div className="feat-name">{f.name}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* 出力内容詳細 */}
        <div className="output-section">
          <div className="output-title">✦ 鑑定レポートの内容</div>
          <ul className="output-list">
            <li>ホロスコープ図面（カラー・天体配置を可視化）</li>
            <li>四柱推命の命式・五行バランス分析</li>
            <li>タロット3枚の解釈（過去・現在・未来）</li>
            <li>数秘術の運命数と使命解読</li>
            <li>仕事運の詳細分析と転機の時期</li>
            <li>恋愛運・パートナーシップの傾向</li>
            <li>金運・豊かさを引き寄せる行動指針</li>
            <li>健康運・注意すべき時期と開運法</li>
            <li>年代別の総合メッセージ</li>
            <li>今月・来月の運気予報</li>
            <li>開運アドバイス・ラッキーアイテム</li>
            <li>5,000文字以上の統合メッセージ</li>
          </ul>
        </div>

        {/* 安心材料 */}
        <div className="trust-grid">
          {[
            {icon:'⚡', title:'即時表示', desc:'決済完了後、数秒で鑑定結果が表示されます。'},
            {icon:'🤖', title:'AI×占術の統合分析', desc:'最新AIが複数の占術を統合し、高精度な鑑定を提供。'},
            {icon:'📄', title:'PDFダウンロード', desc:'鑑定結果をPDFで保存・何度でも見返せます。'},
            {icon:'🔒', title:'安全な決済', desc:'Stripe社の最高水準セキュリティで保護。'},
          ].map(t => (
            <div key={t.title} className="trust-item">
              <div className="trust-icon">{t.icon}</div>
              <div className="trust-title">{t.title}</div>
              <div className="trust-desc">{t.desc}</div>
            </div>
          ))}
        </div>

        {/* CTA②（中） */}
        <div className="cta-box">
          <div style={{fontSize:'14px',color:'rgba(240,234,220,0.7)',marginBottom:'16px',lineHeight:'1.8'}}>
            今この瞬間があなたの人生を変えるきっかけになるかもしれません。<br/>
            5,000文字以上の詳細レポートが今すぐ手に入ります。
          </div>
          <div className="cta-price">¥3,980</div>
          <div className="cta-price-sub">PDFダウンロード付き</div>
          <a href="#form-section" className="cta-btn">✦ あなたの運命を知る ✦</a>
        </div>

        {/* 入力フォーム */}
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
              <option value="0">子の刻（23:00〜1:00）</option>
              <option value="1">丑の刻（1:00〜3:00）</option>
              <option value="2">寅の刻（3:00〜5:00）</option>
              <option value="3">卯の刻（5:00〜7:00）</option>
              <option value="4">辰の刻（7:00〜9:00）</option>
              <option value="5">巳の刻（9:00〜11:00）</option>
              <option value="6">午の刻（11:00〜13:00）</option>
              <option value="7">未の刻（13:00〜15:00）</option>
              <option value="8">申の刻（15:00〜17:00）</option>
              <option value="9">酉の刻（17:00〜19:00）</option>
              <option value="10">戌の刻（19:00〜21:00）</option>
              <option value="11">亥の刻（21:00〜23:00）</option>
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

          {/* タロット */}
          <div className="form-group">
            <label className="form-label">タロットカードを3枚引いてください</label>
            <p className="tarot-note">心を落ち着けて、問いを心に持ちながら1枚ずつタップしてください</p>
            <div className="tarot-grid">
              <div className="tarot-slot" id="slot-past">
                <div className="slot-pos">PAST / 過去</div>
                <div className="slot-empty">タップして引く</div>
              </div>
              <div className="tarot-slot" id="slot-present">
                <div className="slot-pos">PRESENT / 現在</div>
                <div className="slot-empty">タップして引く</div>
              </div>
              <div className="tarot-slot" id="slot-future">
                <div className="slot-pos">FUTURE / 未来</div>
                <div className="slot-empty">タップして引く</div>
              </div>
            </div>
          </div>

          {/* CTA③（フォーム内） */}
          <button className="cta-btn" id="pay-btn" style={{marginTop:'8px'}}>
            ✦ ¥3,980 で今すぐ鑑定する ✦
          </button>
          <p className="cta-note" style={{marginTop:'10px'}}>🔒 Stripe による安全な決済 · 決済完了後すぐに表示 · PDFダウンロード付き</p>
        </div>

        <footer>© 2026 Twinkle Lab / Twinkle Star Oracle</footer>
      </div>

      {/* 固定CTAバナー */}
      <div className="fixed-cta">
        <div className="fixed-cta-text">
          <div className="fixed-cta-label">🔮 AI総合鑑定</div>
          <div className="fixed-cta-main">あなたの運命を今すぐ知る</div>
        </div>
        <a href="#form-section" className="fixed-cta-btn">¥3,980で鑑定する</a>
      </div>
      <div className="spacer"></div>

      <script dangerouslySetInnerHTML={{__html: `
        var CARDS = ['愚者','魔術師','女教皇','女帝','皇帝','法王','恋人','戦車','力','隠者','運命の輪','正義','吊るされた男','死神','節制','悪魔','塔','星','月','太陽','審判','世界'];
        var drawn = {past:null,present:null,future:null};
        var used = [];

        function drawCard(slot) {
          var idx = Math.floor(Math.random() * CARDS.length);
          while(used.indexOf(idx) !== -1) idx = Math.floor(Math.random() * CARDS.length);
          used.push(idx);
          drawn[slot] = CARDS[idx];
          var labels = {past:'PAST / 過去',present:'PRESENT / 現在',future:'FUTURE / 未来'};
          var el = document.getElementById('slot-' + slot);
          el.classList.add('selected');
          el.innerHTML = '<div class="slot-pos">' + labels[slot] + '</div><div class="slot-card">✦ ' + CARDS[idx] + ' ✦</div>';
        }

        ['past','present','future'].forEach(function(slot){
          document.getElementById('slot-' + slot).addEventListener('click', function(){
            if(!drawn[slot]) drawCard(slot);
          });
        });

        document.getElementById('pay-btn').addEventListener('click', function(){
          var name = document.getElementById('inp-name').value;
          var birth = document.getElementById('inp-birth').value;
          var email = document.getElementById('inp-email').value;
          if(!name||!birth||!email){alert('お名前・生年月日・メールアドレスを入力してください');return;}
          if(!drawn.past||!drawn.present||!drawn.future){alert('タロットカードを3枚引いてください');return;}
          alert('Stripe決済ページへ移動します（実装予定）');
        });
      `}} />
    </>
  )
}
