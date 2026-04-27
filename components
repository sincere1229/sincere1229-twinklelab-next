'use client'

// ============================================================
//  UpsellBlock.tsx
//  収益導線コンポーネント（全占いアプリ共通）
//
//  導線構造:
//    無料結果 → ① ¥500直課金 or ② LINE（無料）→ ¥1,980直課金 → ¥3,980
//
//  使い方:
//    import UpsellBlock from '@/components/UpsellBlock'
//    <UpsellBlock appName="タロット" theme="恋愛" />
// ============================================================

interface UpsellBlockProps {
  appName?: string   // 占いアプリ名（例: "タロット"）
  theme?: string     // 鑑定テーマ（例: "恋愛"）
  stripeUrl500?: string  // ¥500 Stripe決済URL（未指定時はデフォルト）
  stripeUrl1980?: string // ¥1,980 Stripe決済URL（未指定時はデフォルト）
}

// ============================================================
//  Stripe Payment Links（本番）
//  ※ テスト時は下記を test_xxx に差し替えること
// ============================================================
const DEFAULT_STRIPE_500  = 'https://buy.stripe.com/00w14g2j46C66oBcFl33W04'  // ← ¥500 Payment Link
const DEFAULT_STRIPE_1980 = 'https://buy.stripe.com/14A8wIbTEf8C9ANfRx33W03' // ← ¥1,980 Payment Link
const LINE_URL = 'https://lin.ee/XHDFrA8'

export default function UpsellBlock({
  appName = '占い',
  theme = '',
  stripeUrl500 = DEFAULT_STRIPE_500,
  stripeUrl1980 = DEFAULT_STRIPE_1980,
}: UpsellBlockProps) {
  const themeText = theme ? `「${theme}」` : ''

  return (
    <div style={styles.wrapper}>

      {/* ===== セクションタイトル ===== */}
      <div style={styles.sectionTitle}>
        ✦ もっと詳しく知りたい方へ ✦
      </div>

      {/* ===== 2択ブロック ===== */}
      <div style={styles.twoCol}>

        {/* ─── ① ¥500 直課金（即決） ─── */}
        <div style={styles.card}>
          <div style={styles.cardBadge}>即・結果表示</div>
          <div style={styles.cardTitle}>今すぐ詳しく見る</div>
          <div style={styles.cardDesc}>
            {themeText || appName}の悩みを<br />
            1テーマで深く読み解きます
          </div>
          <div style={styles.price500}>¥500</div>
          <a
            href={stripeUrl500}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.btn500}
          >
            ✦ 今すぐ詳しく見る（¥500）
          </a>
          <div style={styles.note}>すぐに結果が表示されます · 🔒 安全な決済</div>
        </div>

        {/* ─── ② LINE（無料・慎重派） ─── */}
        <div style={{ ...styles.card, ...styles.cardLine }}>
          <div style={{ ...styles.cardBadge, ...styles.badgeFree }}>無料</div>
          <div style={styles.cardTitle}>じっくり知りたい方へ</div>
          <div style={styles.cardDesc}>
            恋愛・仕事・金運の完全鑑定を<br />
            LINEで無料受け取り
          </div>
          <div style={styles.priceFree}>¥0</div>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.btnLine}
          >
            ✦ 無料で未来を受け取る（LINE）
          </a>
          <div style={styles.note}>友だち追加するだけ · 完全無料</div>
        </div>
      </div>

      {/* ===== ¥1,980 直課金（中間） ===== */}
      <div style={styles.midBlock}>
        <div style={styles.midTitle}>✦ 3テーマをまとめて鑑定 ✦</div>
        <div style={styles.midDesc}>
          恋愛・仕事・金運を深く読み解く<br />
          詳細リーディング（2,500〜3,500文字）
        </div>
        <div style={styles.price1980}>¥1,980</div>
        <a
          href={stripeUrl1980}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.btn1980}
        >
          ✦ 今すぐ3テーマを鑑定する（¥1,980）
        </a>
        <div style={styles.note}>即時表示 · PDFダウンロード付き · 🔒 安全な決済</div>
      </div>

      {/* ===== ¥3,980 総合鑑定（本命・アップセル） ===== */}
      <div style={styles.sogoBlock}>
        <div style={styles.sogoTitle}>✦ 人生全体を完全解析 ✦</div>
        <div style={styles.sogoDesc}>
          過去・現在・未来＋ホロスコープ＋四柱推命＋タロット3枚<br />
          AI総合鑑定（5,000文字以上）
        </div>
        <div style={styles.price3980}>¥3,980</div>
        <a
          href="/star/sogo"
          style={styles.btn3980}
        >
          ✦ AI総合鑑定を受ける（¥3,980）
        </a>
        <div style={styles.note}>即時表示 · PDFダウンロード付き · 🔒 安全な決済</div>
      </div>

    </div>
  )
}

// ============================================================
//  スタイル（既存デザイントークンに完全準拠）
//  宇宙 × ゴールド × ピンク 世界観
// ============================================================
const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    maxWidth: 640,
    margin: '2rem auto 0',
    padding: '0 1rem',
    fontFamily: "'Noto Serif JP', serif",
  },
  sectionTitle: {
    textAlign: 'center',
    color: '#d4af37',
    fontSize: '1rem',
    letterSpacing: '0.15em',
    marginBottom: '1.2rem',
    opacity: 0.9,
  },

  // ─── 2択カード ───
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
    marginBottom: '1.2rem',
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(212,175,55,0.35)',
    borderRadius: 16,
    padding: '1.2rem 1rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    position: 'relative',
  },
  cardLine: {
    border: '1px solid rgba(0,197,105,0.4)',
    background: 'rgba(0,197,105,0.04)',
  },
  cardBadge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg,#d4af37,#b8860b)',
    color: '#0a0a1a',
    fontSize: '0.65rem',
    fontWeight: 700,
    borderRadius: 20,
    padding: '2px 10px',
    letterSpacing: '0.08em',
    alignSelf: 'center',
  },
  badgeFree: {
    background: 'linear-gradient(135deg,#00c569,#00a050)',
    color: '#fff',
  },
  cardTitle: {
    color: '#e8d5b7',
    fontSize: '0.95rem',
    fontWeight: 700,
    lineHeight: 1.4,
  },
  cardDesc: {
    color: 'rgba(232,213,183,0.75)',
    fontSize: '0.78rem',
    lineHeight: 1.6,
  },

  // ─── 価格表示 ───
  price500: {
    color: '#d4af37',
    fontSize: '1.6rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: 1,
  },
  priceFree: {
    color: '#00c569',
    fontSize: '1.6rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: 1,
  },
  price1980: {
    color: '#d4af37',
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: 1,
  },
  price3980: {
    color: '#d4af37',
    fontSize: '2.2rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: 1,
  },

  // ─── ボタン ───
  btn500: {
    display: 'block',
    background: 'linear-gradient(135deg,#d4af37,#b8860b)',
    color: '#0a0a1a',
    fontWeight: 700,
    fontSize: '0.8rem',
    borderRadius: 12,
    padding: '0.75rem 0.5rem',
    textDecoration: 'none',
    letterSpacing: '0.05em',
    lineHeight: 1.4,
    cursor: 'pointer',
  },
  btnLine: {
    display: 'block',
    background: 'linear-gradient(135deg,#00c569,#00a050)',
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.8rem',
    borderRadius: 12,
    padding: '0.75rem 0.5rem',
    textDecoration: 'none',
    letterSpacing: '0.05em',
    lineHeight: 1.4,
    cursor: 'pointer',
  },
  btn1980: {
    display: 'inline-block',
    background: 'linear-gradient(135deg,#9b59b6,#6c3483)',
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.9rem',
    borderRadius: 14,
    padding: '0.9rem 1.5rem',
    textDecoration: 'none',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    marginTop: '0.3rem',
  },
  btn3980: {
    display: 'inline-block',
    background: 'linear-gradient(135deg,#d4af37,#b8860b)',
    color: '#0a0a1a',
    fontWeight: 700,
    fontSize: '1rem',
    borderRadius: 14,
    padding: '1rem 2rem',
    textDecoration: 'none',
    letterSpacing: '0.08em',
    boxShadow: '0 4px 20px rgba(212,175,55,0.35)',
    cursor: 'pointer',
    marginTop: '0.3rem',
  },

  // ─── ¥1,980 ブロック ───
  midBlock: {
    background: 'rgba(155,89,182,0.08)',
    border: '1px solid rgba(155,89,182,0.35)',
    borderRadius: 16,
    padding: '1.5rem 1.2rem',
    textAlign: 'center',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  midTitle: {
    color: '#c39bd3',
    fontSize: '0.95rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
  },
  midDesc: {
    color: 'rgba(232,213,183,0.75)',
    fontSize: '0.83rem',
    lineHeight: 1.6,
  },

  // ─── ¥3,980 ブロック ───
  sogoBlock: {
    background: 'rgba(212,175,55,0.06)',
    border: '1px solid rgba(212,175,55,0.5)',
    borderRadius: 18,
    padding: '1.8rem 1.2rem',
    textAlign: 'center',
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  sogoTitle: {
    color: '#d4af37',
    fontSize: '1.05rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
  },
  sogoDesc: {
    color: 'rgba(232,213,183,0.8)',
    fontSize: '0.83rem',
    lineHeight: 1.6,
  },

  // ─── 注記 ───
  note: {
    color: 'rgba(232,213,183,0.45)',
    fontSize: '0.68rem',
    letterSpacing: '0.03em',
    lineHeight: 1.5,
  },
}
