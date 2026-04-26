export const metadata = {
  title: 'AI総合鑑定 ¥3,980 | Twinkle Star Oracle',
  description: 'ホロスコープ・四柱推命・タロット・数秘術を組み合わせた本格AI総合鑑定',
}

export default function SogoPage() {
  return (
    <>
      <style>{`
        :root { --gold:#c9a84c; --gold2:#e8c97a; --navy:#0a0e1a; --white:#f0eadc; --pink:#e8a0c0; }
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background-color:var(--navy);color:var(--white);font-family:'Noto Serif JP',serif;min-height:100vh;}
        body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(ellipse at 20% 30%,rgba(232,160,192,0.07) 0%,transparent 60%),radial-gradient(ellipse at 80% 70%,rgba(180,140,60,0.06) 0%,transparent 50%);pointer-events:none;z-index:0;}
        .container{position:relative;z-index:1;max-width:680px;margin:0 auto;padding:40px 20px 80px;}
        .header{text-align:center;margin-bottom:40px;}
        .back-link{display:inline-block;font-size:12px;color:rgba(201,168,76,0.6);text-decoration:none;margin-bottom:20px;letter-spacing:0.1em;}
        .site-name{font-family:'Cinzel',serif;font-size:11px;letter-spacing:4px;color:var(--gold);text-transform:uppercase;margin-bottom:16px;opacity:0.8;}
        .title{font-family:'Cinzel',serif;font-size:clamp(22px,5vw,32px);color:var(--gold2);letter-spacing:3px;margin-bottom:10px;}
        .subtitle{font-size:13px;color:rgba(240,234,220,0.5);letter-spacing:2px;}
        .divider{width:120px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:16px auto;}
        .price-badge{display:inline-block;background:linear-gradient(135deg,rgba(201,168,76,0.2),rgba(201,168,76,0.05));border:1px solid rgba(201,168,76,0.4);border-radius:20px;padding:8px 24px;font-family:'Cinzel',serif;font-size:18px;color:var(--gold2);margin-top:12px;}

        .features{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:32px;}
        @media(max-width:480px){.features{grid-template-columns:repeat(2,1fr);}}
        .feature{background:rgba(26,32,64,0.6);border:1px solid rgba(201,168,76,0.15);border-radius:12px;padding:14px 10px;text-align:center;}
        .feat-icon{font-size:22px;margin-bottom:6px;display:block;}
        .feat-name{font-size:11px;color:var(--gold2);letter-spacing:1px;}

        .card{background:linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95));border:1px solid rgba(201,168,76,0.2);border-radius:16px;padding:32px;margin-bottom:20px;}
        .card-title{font-family:'Cinzel',serif;font-size:12px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;text-align:center;}
        .form-group{margin-bottom:18px;}
        .form-label{display:block;font-size:11px;color:var(--gold);letter-spacing:2px;margin-bottom:8px;}
        .form-input{width:100%;background:rgba(10,14,26,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:8px;padding:13px 16px;color:var(--white);font-family:'Noto Serif JP',serif;font-size:14px;outline:none;}
        .form-input:focus{border-color:var(--gold);}
        select.form-input{appearance:none;cursor:pointer;}
        select.form-input option{background:#0f1628;}

        .tarot-section{margin-bottom:18px;}
        .tarot-note{font-size:12px;color:rgba(240,234,220,0.5);margin-bottom:12px;line-height:1.7;}
        .tarot-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
        .tarot-slot{background:rgba(10,14,26,0.6);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px 10px;text-align:center;cursor:pointer;transition:all 0.3s;}
        .tarot-slot:hover{border-color:rgba(201,168,76,0.5);}
        .tarot-slot.selected{border-color:var(--gold);background:rgba(201,168,76,0.1);}
        .slot-pos{font-size:10px;color:var(--gold);letter-spacing:1px;margin-bottom:6px;}
        .slot-card{font-size:12px;color:var(--white);}
        .slot-empty{font-size:11px;color:rgba(240,234,220,0.3);}

        .stripe-btn{width:100%;padding:18px;background:linear-gradient(135deg,#8a6a20,var(--gold),#8a6a20);background-size:200% 100%;border:none;border-radius:8px;color:var(--navy);font-family:'Cinzel',serif;font-size:15px;font-weight:700;letter-spacing:3px;cursor:pointer;transition:all 0.4s;margin-top:8px;}
        .stripe-btn:hover{background-position:100% 0;box-shadow:0 8px 30px rgba(201,168,76,0.4);transform:translateY(-1px);}
        .stripe-note{text-align:center;font-size:11px;color:rgba(240,234,220,0.3);margin-top:10px;letter-spacing:1px;}

        footer{text-align:center;margin-top:40px;padding-top:24px;border-top:1px solid rgba(201,168,76,0.1);font-size:11px;color:rgba(240,234,220,0.2);}
      `}</style>

      <div className="container">
        <div className="header">
          <a href="/star" className="back-link">← 占いポータルに戻る</a>
          <div className="site-name">✦ Twinkle Star Oracle ✦</div>
          <h1 className="title">AI 総合鑑定</h1>
          <div className="divider"></div>
          <p className="subtitle">Comprehensive Oracle Reading</p>
          <div className="price-badge">¥3,980</div>
        </div>

        {/* 鑑定内容 */}
        <div className="features">
          {[
            {icon:'🌐', name:'ホロスコープ図面'},
            {icon:'☯️', name:'四柱推命'},
            {icon:'🃏', name:'タロット3枚'},
            {icon:'🔢', name:'数秘術'},
            {icon:'⏳', name:'過去・現在・未来'},
            {icon:'📊', name:'仕事・恋愛・金運'},
          ].map(f => (
            <div key={f.name} className="feature">
              <span className="feat-icon">{f.icon}</span>
              <div className="feat-name">{f.name}</div>
            </div>
          ))}
        </div>

        {/* 入力フォーム */}
        <div className="card">
          <div className="card-title">✦ あなたの情報を入力 ✦</div>
          <div className="form-group">
            <label className="form-label">お名前</label>
            <input type="text" className="form-input" placeholder="例：さくら" id="inp-name" />
          </div>
          <div className="form-group">
            <label className="form-label">生年月日</label>
            <input type="date" className="form-input" id="inp-birth" />
          </div>
          <div className="form-group">
            <label className="form-label">生まれた時間（わからない場合は「不明」）</label>
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
            <label className="form-label">メールアドレス（鑑定結果をPDFで送付）</label>
            <input type="email" className="form-input" placeholder="example@email.com" id="inp-email" />
          </div>
        </div>

        {/* タロット選択 */}
        <div className="card">
          <div className="card-title">✦ タロットカードを3枚引いてください ✦</div>
          <p className="tarot-note">
            心を落ち着けて、問いを心に持ちながらカードを選んでください。<br />
            過去・現在・未来の順に1枚ずつ選びます。
          </p>
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

        {/* 決済ボタン */}
        <div className="card">
          <div className="card-title">✦ 決済して鑑定を受ける ✦</div>
          <button className="stripe-btn" id="pay-btn">
            ✦ ¥3,980 で鑑定を始める ✦
          </button>
          <p className="stripe-note">🔒 Stripe による安全な決済 · 決済完了後すぐに表示</p>
        </div>

        <footer>© 2026 Twinkle Lab / Twinkle Star Oracle</footer>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        var CARDS = ['愚者','魔術師','女教皇','女帝','皇帝','法王','恋人','戦車','力','隠者','運命の輪','正義','吊るされた男','死神','節制','悪魔','塔','星','月','太陽','審判','世界'];
        var drawn = {past:null, present:null, future:null};
        var used = [];

        function drawCard(slot) {
          var available = CARDS.filter(function(c,i){ return used.indexOf(i) === -1; });
          if(available.length === 0) return;
          var idx = Math.floor(Math.random() * CARDS.length);
          while(used.indexOf(idx) !== -1) idx = Math.floor(Math.random() * CARDS.length);
          used.push(idx);
          drawn[slot] = CARDS[idx];
          var el = document.getElementById('slot-' + slot);
          el.classList.add('selected');
          el.innerHTML = '<div class="slot-pos">' + (slot==='past'?'PAST / 過去':slot==='present'?'PRESENT / 現在':'FUTURE / 未来') + '</div><div class="slot-card">✦ ' + CARDS[idx] + ' ✦</div>';
        }

        document.getElementById('slot-past').addEventListener('click', function(){ if(!drawn.past) drawCard('past'); });
        document.getElementById('slot-present').addEventListener('click', function(){ if(!drawn.present) drawCard('present'); });
        document.getElementById('slot-future').addEventListener('click', function(){ if(!drawn.future) drawCard('future'); });

        document.getElementById('pay-btn').addEventListener('click', function(){
          var name = document.getElementById('inp-name').value;
          var birth = document.getElementById('inp-birth').value;
          var email = document.getElementById('inp-email').value;
          if(!name || !birth || !email){ alert('お名前・生年月日・メールアドレスを入力してください'); return; }
          if(!drawn.past || !drawn.present || !drawn.future){ alert('タロットカードを3枚引いてください'); return; }
          alert('Stripe決済ページに移動します（実装予定）');
        });
      `}} />
    </>
  )
}
