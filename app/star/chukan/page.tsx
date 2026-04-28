'use client'

import Link from 'next/link'

const STRIPE_URL_1980 = 'https://buy.stripe.com/14A8wIbTEf8C9ANfRx33W03'

export default function ChukanPage() {
  return (
    <main style={s.bg}>
      <div style={s.container}>

        {/* ヘッダー */}
        <div style={s.header}>
          <Link href="/star" style={s.backLink}>← 占いトップへ</Link>
          <div style={s.logo}>✦ Twinkle Star Oracle ✦</div>
        </div>

        {/* ① 上部CTA（新規追加） */}
        <div style={s.topCta}>
          <div style={s.topCtaNote}>🔮 即時表示 · 🔒 Stripe安全決済</div>
          <div style={s.topCtaTitle}>恋愛・仕事・金運を今すぐ3テーマまとめて鑑定</div>
          <a href={STRIPE_URL_1980} target="_blank" rel="noopener noreferrer" style={s.topCtaBtn}>
            ✦ 今すぐ3テーマを鑑定する（¥1,980）
          </a>
          <div style={s.topCtaSub}>PDFダウンロード付き · 何度でも読み返せます</div>
        </div>

        {/* ④ 感情トリガー */}
        <div style={s.emotionBox}>
          <div style={s.emotionIcon}>🔮</div>
          <div style={s.emotionTitle}>迷っていませんか？</div>
          <div style={s.emotionText}>
            「この恋、進めるべき？」<br />
            「仕事、このままでいい？」<br />
            「お金、なんでうまくいかない？」<br />
            <br />
            <span style={{color:'#e8c97a', fontWeight:600}}>
              その迷いを今日中に解消してください。<br />
              今の選択が、3ヶ月後のあなたを変えます。
            </span>
          </div>
        </div>

        {/* ② 緊急性 */}
        <div style={s.urgencyBox}>
          <div style={s.urgencyText}>⚡ 今の選択が未来を変える</div>
          <div style={s.urgencyDesc}>
            今この瞬間も、あなたの運気は動いています。<br />
            迷っている間に、チャンスのタイミングが過ぎてしまうかもしれません。
          </div>
        </div>

        {/* タイトルエリア */}
        <div style={s.titleArea}>
          <div style={s.badge}>3テーマ詳細鑑定</div>
          <h1 style={s.h1}>
            恋愛・仕事・金運<br />
            まとめて深く読み解く
          </h1>
          {/* ③ 未来訴求強化 */}
          <p style={s.sub}>
            今から3ヶ月で起きる出来事と転機を<br />
            3つのテーマからまとめて深く鑑定します。
          </p>
        </div>

        {/* ⑥ ¥500との違い明記 */}
        <div style={s.compareBox}>
          <div style={s.compareTitle}>✦ ¥500との違い ✦</div>
          <div style={s.compareGrid}>
            <div style={s.compareCol500}>
              <div style={s.compareColLabel}>¥500 · 簡易鑑定</div>
              <div style={s.compareColSub}>1テーマのみ</div>
              <ul style={s.compareList}>
                <li style={s.compareItem}>1テーマ集中</li>
                <li style={s.compareItem}>短期の答えを出す</li>
                <li style={s.compareItem}>今の悩みを即解決</li>
                <li style={{...s.compareItem, color:'rgba(232,213,183,0.35)'}}>総合メッセージなし</li>
                <li style={{...s.compareItem, color:'rgba(232,213,183,0.35)'}}>3ヶ月分析なし</li>
              </ul>
            </div>
            <div style={s.compareCol1980}>
              <div style={s.compareColLabel1980}>¥1,980 · 詳細鑑定</div>
              <div style={s.compareColSub1980}>3テーマ＋総合</div>
              <ul style={s.compareList}>
                <li style={s.compareItem1980}>✦ 恋愛・仕事・金運の3テーマ</li>
                <li style={s.compareItem1980}>✦ 3ヶ月で起きる転機を分析</li>
                <li style={s.compareItem1980}>✦ 総合メッセージ付き</li>
                <li style={s.compareItem1980}>✦ 2,500〜3,500文字</li>
                <li style={s.compareItem1980}>✦ PDFダウンロード付き</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ⑤ PREMIUM内容明示 */}
        <div style={s.premiumBox}>
          <div style={s.premiumTitle}>✦ 3ヶ月で起きる出来事と転機 ✦</div>
          <div style={s.premiumGrid}>
            <div style={s.premiumItem}>
              <div style={s.premiumIcon}>💕</div>
              <div>
                <div style={s.premiumHead}>恋愛の動き</div>
                <div style={s.premiumDesc}>今の恋愛がどう動くか・出会いのタイミング・相手の気持ち・告白・結婚への流れ</div>
              </div>
            </div>
            <div style={s.premiumItem}>
              <div style={s.premiumIcon}>💼</div>
              <div>
                <div style={s.premiumHead}>仕事の転機</div>
                <div style={s.premiumDesc}>転職・昇進・独立のタイミング・今の仕事の方向性・3ヶ月で訪れるチャンス</div>
              </div>
            </div>
            <div style={s.premiumItem}>
              <div style={s.premiumIcon}>💰</div>
              <div>
                <div style={s.premiumHead}>金運の流れ</div>
                <div style={s.premiumDesc}>お金が入りやすい時期・避けるべき出費・収入アップのタイミング・金運が変わる転機</div>
              </div>
            </div>
          </div>
          <div style={s.premiumPlus}>
            <div style={s.premiumPlusItem}>📄 総合メッセージ（3テーマをまとめた今の人生フェーズ解説）</div>
            <div style={s.premiumPlusItem}>📥 PDFダウンロード付き（何度でも読み返せる）</div>
          </div>
        </div>

        {/* メイン価格・CTA */}
        <div style={s.priceCard}>
          <div style={s.priceLabel}>AI詳細鑑定 · 3テーマ完全分析</div>
          <div style={s.price}>¥1,980</div>
          <div style={s.priceNote}>税込 · 一回限り · 即時表示</div>
          <div style={s.priceUrgency}>⚡ 今の迷いを今日中に解消する</div>
          <a href={STRIPE_URL_1980} target="_blank" rel="noopener noreferrer" style={s.btnMain}>
            ✦ 今すぐ3テーマを鑑定する（¥1,980）
          </a>
          <div style={s.security}>🔒 Stripe安全決済 · 即時表示 · PDFダウンロード付き</div>
          <div style={s.priceEmotion}>迷っている時間が、一番もったいない。</div>
        </div>

        {/* ③ タイムライン */}
        <div style={s.timelineBox}>
          <div style={s.timelineTitle}>✦ 3ヶ月で起きる転機タイムライン ✦</div>
          <div style={s.timelineDesc}>鑑定後に表示される内容のイメージです</div>
          <div style={s.timelineList}>
            {[
              { month:'1ヶ月目', icon:'🌱', text:'現在の状況と変化の予兆・今すぐ取るべき行動' },
              { month:'2ヶ月目', icon:'🌊', text:'転機が訪れるタイミング・チャンスと注意点' },
              { month:'3ヶ月目', icon:'✨', text:'大きな変化・結果が出る時期・未来へのメッセージ' },
            ].map(t => (
              <div key={t.month} style={s.timelineItem}>
                <div style={s.timelineMonth}>{t.month}</div>
                <div style={s.timelineIcon}>{t.icon}</div>
                <div style={s.timelineText}>{t.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* サブCTA */}
        <div style={s.altArea}>
          <div style={s.altTitle}>他のプランもご用意しています</div>
          <div style={s.altRow}>
            <a href="/star/mini" style={s.altBtn}>1テーマのみ → ¥500</a>
            <a href="/star/sogo" style={s.altBtn}>人生全体 → ¥3,980</a>
          </div>
          <div style={s.altNote}>
            ¥1,980は¥500の3テーマ版＋総合メッセージ付き。<br />
            より深く・広く知りたい方に最適なプランです。
          </div>
        </div>

        <footer style={s.footer}>© 2026 Twinkle Lab / Twinkle Star Oracle</footer>
      </div>
    </main>
  )
}

const G = '#d4af37'
const W = '#e8d5b7'
const P = (o: string) => `rgba(155,89,182,${o})`

const s: Record<string, React.CSSProperties> = {
  bg: { minHeight:'100vh', background:'radial-gradient(ellipse at 20% 50%, rgba(60,20,80,0.6) 0%, #050510 60%)', color:W, fontFamily:"'Noto Serif JP', serif" },
  container: { maxWidth:600, margin:'0 auto', padding:'0 1rem 3rem' },

  header: { padding:'1.2rem 0', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem' },
  backLink: { color:'rgba(212,175,55,0.6)', textDecoration:'none', fontSize:'0.8rem', alignSelf:'flex-start' },
  logo: { color:G, fontSize:'0.85rem', letterSpacing:'0.2em', opacity:0.8 },

  // ① 上部CTA
  topCta: { background:P('0.12'), border:`1px solid ${P('0.5')}`, borderRadius:16, padding:'1.2rem 1rem', textAlign:'center', marginBottom:'1rem' },
  topCtaNote: { color:'rgba(232,213,183,0.55)', fontSize:'0.78rem', marginBottom:'0.4rem' },
  topCtaTitle: { color:W, fontSize:'1rem', fontWeight:600, marginBottom:'0.8rem', lineHeight:1.6 },
  topCtaBtn: { display:'inline-block', background:'linear-gradient(135deg,#9b59b6,#6c3483)', color:'#fff', fontWeight:700, fontSize:'0.95rem', borderRadius:12, padding:'0.85rem 1.5rem', textDecoration:'none', letterSpacing:'0.06em', boxShadow:'0 4px 20px rgba(155,89,182,0.4)' },
  topCtaSub: { color:'rgba(232,213,183,0.4)', fontSize:'0.72rem', marginTop:'0.5rem' },

  // ④ 感情
  emotionBox: { background:'rgba(232,122,122,0.06)', border:'1px solid rgba(232,122,122,0.2)', borderRadius:14, padding:'1.2rem 1rem', textAlign:'center', marginBottom:'1rem' },
  emotionIcon: { fontSize:'1.8rem', marginBottom:'0.5rem' },
  emotionTitle: { color:'#f5a0a0', fontSize:'1.1rem', fontWeight:700, marginBottom:'0.6rem' },
  emotionText: { color:'rgba(232,213,183,0.8)', fontSize:'0.88rem', lineHeight:2 },

  // ② 緊急性
  urgencyBox: { background:'linear-gradient(135deg,rgba(201,168,76,0.12),rgba(201,168,76,0.04))', border:'1px solid rgba(201,168,76,0.35)', borderRadius:12, padding:'1rem', textAlign:'center', marginBottom:'1rem' },
  urgencyText: { color:G, fontSize:'1rem', fontWeight:700, marginBottom:'0.4rem' },
  urgencyDesc: { color:'rgba(232,213,183,0.65)', fontSize:'0.82rem', lineHeight:1.8 },

  titleArea: { textAlign:'center', padding:'1rem 0' },
  badge: { display:'inline-block', background:'linear-gradient(135deg,#9b59b6,#6c3483)', color:'#fff', fontSize:'0.75rem', fontWeight:700, borderRadius:20, padding:'4px 16px', letterSpacing:'0.1em', marginBottom:'1rem' },
  h1: { color:W, fontSize:'1.7rem', fontWeight:700, lineHeight:1.5, margin:'0 0 0.75rem' },
  sub: { color:'rgba(232,213,183,0.75)', fontSize:'0.9rem', lineHeight:1.8 },

  // ⑥ 比較
  compareBox: { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(212,175,55,0.2)', borderRadius:16, padding:'1.2rem', marginBottom:'1rem' },
  compareTitle: { color:G, fontSize:'0.85rem', fontWeight:700, letterSpacing:'0.15em', textAlign:'center', marginBottom:'1rem' },
  compareGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' },
  compareCol500: { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(232,213,183,0.15)', borderRadius:12, padding:'0.9rem 0.8rem' },
  compareCol1980: { background:P('0.1'), border:`1px solid ${P('0.5')}`, borderRadius:12, padding:'0.9rem 0.8rem' },
  compareColLabel: { color:'rgba(232,213,183,0.55)', fontSize:'0.78rem', fontWeight:700, marginBottom:'0.3rem' },
  compareColSub: { color:'rgba(232,213,183,0.4)', fontSize:'0.72rem', marginBottom:'0.6rem' },
  compareColLabel1980: { color:'#c39bd3', fontSize:'0.78rem', fontWeight:700, marginBottom:'0.3rem' },
  compareColSub1980: { color:'#c39bd3', fontSize:'0.72rem', marginBottom:'0.6rem', opacity:0.8 },
  compareList: { listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'0.35rem' },
  compareItem: { color:'rgba(232,213,183,0.65)', fontSize:'0.78rem', lineHeight:1.5 },
  compareItem1980: { color:W, fontSize:'0.78rem', lineHeight:1.5, fontWeight:500 },

  // ⑤ PREMIUM
  premiumBox: { background:P('0.08'), border:`1px solid ${P('0.35')}`, borderRadius:16, padding:'1.2rem', marginBottom:'1rem' },
  premiumTitle: { color:'#c39bd3', fontSize:'0.85rem', fontWeight:700, letterSpacing:'0.15em', textAlign:'center', marginBottom:'1rem' },
  premiumGrid: { display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'0.75rem' },
  premiumItem: { background:'rgba(255,255,255,0.04)', border:`1px solid ${P('0.2')}`, borderRadius:12, padding:'0.8rem', display:'flex', alignItems:'flex-start', gap:'0.75rem' },
  premiumIcon: { fontSize:'1.2rem', flexShrink:0 },
  premiumHead: { color:W, fontSize:'0.88rem', fontWeight:700, marginBottom:'0.3rem' },
  premiumDesc: { color:'rgba(232,213,183,0.65)', fontSize:'0.78rem', lineHeight:1.6 },
  premiumPlus: { background:'rgba(212,175,55,0.08)', border:'1px solid rgba(212,175,55,0.2)', borderRadius:10, padding:'0.7rem 0.9rem', display:'flex', flexDirection:'column', gap:'0.35rem' },
  premiumPlusItem: { color:'rgba(232,213,183,0.75)', fontSize:'0.8rem' },

  // 価格カード
  priceCard: { background:P('0.12'), border:`2px solid ${P('0.6')}`, borderRadius:20, padding:'2rem 1.5rem', textAlign:'center', marginBottom:'1.5rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.6rem' },
  priceLabel: { color:'#c39bd3', fontSize:'0.85rem', letterSpacing:'0.15em', fontWeight:600 },
  price: { color:G, fontSize:'3rem', fontWeight:700, lineHeight:1 },
  priceNote: { color:'rgba(232,213,183,0.45)', fontSize:'0.72rem' },
  priceUrgency: { color:'#f5a0a0', fontSize:'0.88rem', fontWeight:600, background:'rgba(232,122,122,0.1)', border:'1px solid rgba(232,122,122,0.25)', borderRadius:8, padding:'0.4rem 1rem' },
  btnMain: { display:'inline-block', marginTop:'0.5rem', background:'linear-gradient(135deg,#9b59b6,#6c3483)', color:'#fff', fontWeight:700, fontSize:'1.05rem', borderRadius:14, padding:'1rem 2rem', textDecoration:'none', letterSpacing:'0.08em', boxShadow:'0 4px 20px rgba(155,89,182,0.4)' },
  security: { color:'rgba(232,213,183,0.45)', fontSize:'0.72rem' },
  priceEmotion: { color:'rgba(232,213,183,0.5)', fontSize:'0.78rem', fontStyle:'italic' },

  // ③ タイムライン
  timelineBox: { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(212,175,55,0.2)', borderRadius:16, padding:'1.2rem', marginBottom:'1.5rem' },
  timelineTitle: { color:G, fontSize:'0.85rem', fontWeight:700, letterSpacing:'0.15em', textAlign:'center', marginBottom:'0.4rem' },
  timelineDesc: { color:'rgba(232,213,183,0.45)', fontSize:'0.72rem', textAlign:'center', marginBottom:'1rem' },
  timelineList: { display:'flex', flexDirection:'column', gap:'0.6rem' },
  timelineItem: { display:'flex', alignItems:'center', gap:'0.75rem', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(212,175,55,0.12)', borderRadius:10, padding:'0.75rem' },
  timelineMonth: { color:G, fontSize:'0.78rem', fontWeight:700, width:56, flexShrink:0 },
  timelineIcon: { fontSize:'1.1rem', flexShrink:0 },
  timelineText: { color:'rgba(232,213,183,0.75)', fontSize:'0.8rem', lineHeight:1.5, flex:1 },

  altArea: { textAlign:'center', padding:'0 0 1rem' },
  altTitle: { color:'rgba(232,213,183,0.5)', fontSize:'0.78rem', marginBottom:'0.75rem' },
  altRow: { display:'flex', gap:'0.75rem', justifyContent:'center', marginBottom:'0.75rem' },
  altBtn: { display:'inline-block', border:'1px solid rgba(212,175,55,0.35)', color:'rgba(212,175,55,0.8)', fontSize:'0.82rem', borderRadius:10, padding:'0.6rem 1rem', textDecoration:'none' },
  altNote: { color:'rgba(232,213,183,0.4)', fontSize:'0.75rem', lineHeight:1.7 },

  footer: { textAlign:'center', color:'rgba(232,213,183,0.3)', fontSize:'0.72rem', padding:'2rem 0 0' },
}
