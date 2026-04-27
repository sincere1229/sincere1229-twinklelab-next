'use client'

// ============================================================
//  app/star/chukan/page.tsx
//  ¥1,980 中間鑑定ページ（直課金・LINEなし）
//
//  導線: 無料占い結果 → ¥500 → ★この画面★ → ¥3,980
//
//  Stripe Payment Link を差し込む:
//    STRIPE_URL_1980 を本番のURLに変更してください
// ============================================================

import Link from 'next/link'

// ★ここを本番 Stripe Payment Link に変更★
const STRIPE_URL_1980 = 'https://buy.stripe.com/14A8wIbTEf8C9ANfRx33W03'

export default function ChukanPage() {
  return (
    <main style={styles.bg}>
      <div style={styles.container}>

        {/* ヘッダー */}
        <div style={styles.header}>
          <Link href="/star" style={styles.backLink}>← 占いトップへ</Link>
          <div style={styles.logo}>✦ Twinkle Star Oracle ✦</div>
        </div>

        {/* タイトルエリア */}
        <div style={styles.titleArea}>
          <div style={styles.badge}>3テーマ詳細鑑定</div>
          <h1 style={styles.h1}>
            恋愛・仕事・金運<br />
            まとめて深く読み解く
          </h1>
          <p style={styles.sub}>
            気になるテーマを3つ同時に鑑定。<br />
            現在〜3ヶ月先までを詳しく分析します。
          </p>
        </div>

        {/* 価格・CTA */}
        <div style={styles.priceCard}>
          <div style={styles.priceLabel}>AI詳細鑑定</div>
          <div style={styles.price}>¥1,980</div>
          <div style={styles.priceNote}>税込 · 一回限り · 返金保証なし</div>
          <a
            href={STRIPE_URL_1980}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.btnMain}
          >
            ✦ 今すぐ3テーマを鑑定する（¥1,980）
          </a>
          <div style={styles.security}>🔒 Stripe安全決済 · 即時表示 · PDFダウンロード付き</div>
        </div>

        {/* 内容説明 */}
        <div style={styles.contentBox}>
          <div style={styles.contentTitle}>✦ 鑑定内容 ✦</div>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.listIcon}>💕</span>
              <div>
                <strong style={styles.listHead}>恋愛テーマ</strong>
                <div style={styles.listDesc}>現状・相手の気持ち・恋愛の流れ・アドバイス</div>
              </div>
            </li>
            <li style={styles.listItem}>
              <span style={styles.listIcon}>💼</span>
              <div>
                <strong style={styles.listHead}>仕事テーマ</strong>
                <div style={styles.listDesc}>適性・方向性・今後の展開・行動指針</div>
              </div>
            </li>
            <li style={styles.listItem}>
              <span style={styles.listIcon}>💰</span>
              <div>
                <strong style={styles.listHead}>金運テーマ</strong>
                <div style={styles.listDesc}>お金の流れ・チャンス時期・注意点・行動アドバイス</div>
              </div>
            </li>
            <li style={styles.listItem}>
              <span style={styles.listIcon}>📄</span>
              <div>
                <strong style={styles.listHead}>総合メッセージ</strong>
                <div style={styles.listDesc}>3テーマをまとめた今の人生フェーズ解説（2,500〜3,500文字）</div>
              </div>
            </li>
          </ul>
        </div>

        {/* サブCTA（¥500 / ¥3,980） */}
        <div style={styles.altArea}>
          <div style={styles.altTitle}>他のプランもご用意しています</div>
          <div style={styles.altRow}>
            <a href="/star/mini" style={styles.altBtn}>
              1テーマのみ → ¥500
            </a>
            <a href="/star/sogo" style={styles.altBtn}>
              人生全体 → ¥3,980
            </a>
          </div>
        </div>

        <footer style={styles.footer}>
          © 2026 Twinkle Lab / Twinkle Star Oracle
        </footer>
      </div>
    </main>
  )
}

// ============================================================
//  スタイル
// ============================================================
const styles: Record<string, React.CSSProperties> = {
  bg: {
    minHeight: '100vh',
    background: 'radial-gradient(ellipse at 20% 50%, rgba(60,20,80,0.6) 0%, #050510 60%)',
    color: '#e8d5b7',
    fontFamily: "'Noto Serif JP', serif",
  },
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '0 1rem 3rem',
  },

  // ヘッダー
  header: {
    padding: '1.2rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  backLink: {
    color: 'rgba(212,175,55,0.6)',
    textDecoration: 'none',
    fontSize: '0.8rem',
    alignSelf: 'flex-start',
  },
  logo: {
    color: '#d4af37',
    fontSize: '0.85rem',
    letterSpacing: '0.2em',
    opacity: 0.8,
  },

  // タイトル
  titleArea: {
    textAlign: 'center',
    padding: '1.5rem 0',
  },
  badge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg,#9b59b6,#6c3483)',
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: 700,
    borderRadius: 20,
    padding: '4px 16px',
    letterSpacing: '0.1em',
    marginBottom: '1rem',
  },
  h1: {
    color: '#e8d5b7',
    fontSize: '1.7rem',
    fontWeight: 700,
    lineHeight: 1.5,
    margin: '0 0 0.75rem',
    letterSpacing: '0.05em',
  },
  sub: {
    color: 'rgba(232,213,183,0.7)',
    fontSize: '0.9rem',
    lineHeight: 1.7,
    margin: 0,
  },

  // 価格カード
  priceCard: {
    background: 'rgba(155,89,182,0.1)',
    border: '1px solid rgba(155,89,182,0.5)',
    borderRadius: 20,
    padding: '2rem 1.5rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.6rem',
  },
  priceLabel: {
    color: '#c39bd3',
    fontSize: '0.85rem',
    letterSpacing: '0.15em',
    fontWeight: 600,
  },
  price: {
    color: '#d4af37',
    fontSize: '3rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: 1,
  },
  priceNote: {
    color: 'rgba(232,213,183,0.45)',
    fontSize: '0.72rem',
  },
  btnMain: {
    display: 'inline-block',
    marginTop: '0.5rem',
    background: 'linear-gradient(135deg,#9b59b6,#6c3483)',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1.05rem',
    borderRadius: 14,
    padding: '1rem 2rem',
    textDecoration: 'none',
    letterSpacing: '0.08em',
    boxShadow: '0 4px 20px rgba(155,89,182,0.4)',
    cursor: 'pointer',
  },
  security: {
    color: 'rgba(232,213,183,0.45)',
    fontSize: '0.72rem',
    letterSpacing: '0.03em',
  },

  // 内容リスト
  contentBox: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: 16,
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  contentTitle: {
    color: '#d4af37',
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.9rem',
  },
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.8rem',
  },
  listIcon: {
    fontSize: '1.2rem',
    flexShrink: 0,
    paddingTop: '0.1rem',
  },
  listHead: {
    color: '#e8d5b7',
    fontSize: '0.9rem',
    display: 'block',
    marginBottom: '0.2rem',
  },
  listDesc: {
    color: 'rgba(232,213,183,0.65)',
    fontSize: '0.8rem',
    lineHeight: 1.5,
  },

  // サブCTA
  altArea: {
    textAlign: 'center',
    padding: '0 0 1rem',
  },
  altTitle: {
    color: 'rgba(232,213,183,0.5)',
    fontSize: '0.78rem',
    marginBottom: '0.75rem',
    letterSpacing: '0.05em',
  },
  altRow: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
  },
  altBtn: {
    display: 'inline-block',
    border: '1px solid rgba(212,175,55,0.35)',
    color: 'rgba(212,175,55,0.8)',
    fontSize: '0.82rem',
    borderRadius: 10,
    padding: '0.6rem 1rem',
    textDecoration: 'none',
    letterSpacing: '0.05em',
    cursor: 'pointer',
  },

  footer: {
    textAlign: 'center',
    color: 'rgba(232,213,183,0.3)',
    fontSize: '0.72rem',
    padding: '2rem 0 0',
  },
}
