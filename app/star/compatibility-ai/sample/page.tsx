'use client'

import Link from 'next/link'

// サンプルデータ（実際の診断イメージを伝えるため）
const sampleResult = {
  score: 72,
  yourType: 'インドア派・内向的',
  partnerType: 'アクティブ派・社交的',
  positiveSummary:
    'ふたりはとても補い合える関係かもしれないよ🌸 あなたの落ち着いた空間づくりと、相手の行動力はお互いの世界を広げてくれる可能性があるんだよ。違いがあるからこそ、ふたりでいることで「できること」が増えていくんだね。',
  coreGap:
    '「誘われると断れない」「断ると険悪になる」というすれ違いが起きやすいかもしれないよ。これは悪意じゃなくて、それぞれの「楽しさの形」が違うだけなんだ。外に出ることでエネルギーが湧く相手と、家でのんびりすることで回復するあなた。どちらも正しい充電方法なんだよ✨',
  futureStoryPreview:
    '秋のある日曜日。相手は友達のバーベキューに誘ってくれた。あなたは少し疲れていて、本当は家でゆっくりしたかった。でも断ると悪いな、と思って行くことにした。楽しいけれど、どこか消耗していく自分に気づく...',
  advice: [
    {
      title: '「充電の仕方」をお互いに伝えよう',
      detail: '内向型のあなたには「一人の時間」が大切なエネルギー補給なんです。それを「寂しい」や「拒絶」と受け取らせないためにも、事前に伝えることが大切かもしれません。',
      conversationExample: '「今日はちょっと疲れてて、家でのんびりしたいな。来週は一緒に行くよ！」',
    },
    {
      title: '「一緒にいるのに別々」の時間を作る',
      detail: '同じ空間で、それぞれのことをする時間を作ってみるといいかもしれません。あなたは本を読んで、相手はゲームをする。それだけで「一緒にいる」安心感が生まれることがあります。',
      conversationExample: '「今日は各自タイムにしない？同じ部屋でのんびりしようよ」',
    },
  ],
  piyochanMessage:
    'ふたりが違うのは当たり前だよ🐥 大切なのは、違いを「問題」じゃなくて「個性」として見られるかどうかだよね。このすれ違い、少しずつ乗り越えていける可能性があるよ！応援してるよ💕',
  disclaimer: 'この診断はAIによる傾向分析です。人間関係は変化します。最終的な判断はあなたの気持ちを大切にしてください。',
}

const pink = '#f472b6'
const pinkLight = '#fce7f3'
const pinkDark = '#db2777'
const purple = '#a855f7'
const textMain = '#1e1b4b'
const textSub = '#64748b'

export default function CompatibilityAISamplePage() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* ヘッダー */}
        <div style={styles.header}>
          <Link href="/star/compatibility-ai" style={styles.backLink}>← 診断ページへ</Link>
        </div>

        {/* サンプルバナー */}
        <div style={styles.sampleBanner}>
          <p style={styles.sampleBannerText}>📋 これはサンプル診断結果です</p>
          <p style={styles.sampleBannerSub}>実際の診断はあなたの入力に合わせてAIが個別に生成します</p>
        </div>

        {/* 入力内容 */}
        <div style={styles.inputSummary}>
          <p style={styles.inputSummaryTitle}>📝 入力例</p>
          <div style={styles.inputRow}>
            <span style={styles.inputLabel}>あなた</span>
            <span style={styles.inputValue}>{sampleResult.yourType}</span>
          </div>
          <div style={styles.inputRow}>
            <span style={styles.inputLabel}>相手</span>
            <span style={styles.inputValue}>{sampleResult.partnerType}</span>
          </div>
        </div>

        {/* スコア */}
        <div style={styles.scoreCard}>
          <p style={styles.scoreLabel}>💘 ふたりの相性スコア</p>
          <div style={styles.scoreCircle}>
            <span style={styles.scoreNum}>{sampleResult.score}</span>
            <span style={styles.scorePct}>点</span>
          </div>
          <div style={styles.scoreBar}>
            <div style={{ ...styles.scoreBarFill, width: `${sampleResult.score}%` }} />
          </div>
          <p style={styles.scoreNote}>❤️ バランス型の相性です</p>
        </div>

        {/* 無料: 良いところ */}
        <div style={styles.resultSection}>
          <p style={styles.resultTitle}>💖 ふたりの良いところ</p>
          <p style={styles.resultText}>{sampleResult.positiveSummary}</p>
        </div>

        {/* 無料: ズレの本質 */}
        <div style={styles.resultSection}>
          <p style={styles.resultTitle}>💬 すれ違いの正体</p>
          <p style={styles.resultText}>{sampleResult.coreGap}</p>
        </div>

        {/* ストーリー（冒頭無料） */}
        <div style={styles.storyCard}>
          <p style={styles.storyTitle}>📖 1年後のふたりのストーリー...</p>
          <p style={styles.storyText}>{sampleResult.futureStoryPreview}</p>
          <div style={styles.storyBlur}>
            <p style={styles.storyBlurText}>続きは有料版で...</p>
          </div>
        </div>

        {/* 有料ロック（サンプル表示） */}
        <div style={styles.lockCard}>
          <p style={styles.lockTitle}>🔒 詳細診断（有料版）に含まれる内容</p>

          {/* アドバイスのサンプル（タイトルのみ） */}
          <div style={styles.advicePreview}>
            {sampleResult.advice.map((a, i) => (
              <div key={i} style={styles.adviceItem}>
                <p style={styles.adviceTitle}>💡 {a.title}</p>
                <div style={styles.adviceBlurred}>
                  <p style={styles.adviceBlurredText}>詳細と会話テンプレートは有料版で...</p>
                </div>
              </div>
            ))}
          </div>

          <ul style={styles.lockList}>
            <li>✨ 具体的なすれ違いシーン</li>
            <li>✨ 家族・友人関係の影響分析</li>
            <li>✨ 喧嘩になる理由と対処法</li>
            <li>✨ 改善策＆会話テンプレート（全3パターン）</li>
            <li>✨ 1年後のストーリー完全版</li>
          </ul>

          <p style={styles.lockPrice}>
            <span style={styles.lockOriginal}>通常 ¥1,980</span>
            {' → '}
            <span style={styles.lockSale}>初回限定 ¥980</span>
          </p>
        </div>

        {/* ぴよちゃんメッセージ */}
        <div style={styles.piyoCard}>
          <div style={styles.piyoBig}>🐥</div>
          <p style={styles.piyoText}>{sampleResult.piyochanMessage}</p>
        </div>

        {/* CTA */}
        <div style={styles.ctaBlock}>
          <Link href="/star/compatibility-ai" style={styles.primaryBtn}>
            ✨ 自分の診断をしてみる（無料）
          </Link>
          <a
            href="https://lin.ee/XHDFrA8"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.lineBtn}
          >
            🟢 LINEで改善ワークを受け取る
          </a>
        </div>

        {/* 注意文 */}
        <p style={styles.disclaimer}>{sampleResult.disclaimer}</p>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fdf2f8 0%, #f0f9ff 50%, #fdf4ff 100%)',
    fontFamily: "'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif",
    paddingBottom: '40px',
  },
  container: {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '0 16px',
  },
  header: {
    padding: '16px 0',
  },
  backLink: {
    color: textSub,
    textDecoration: 'none',
    fontSize: '14px',
  },
  sampleBanner: {
    background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    borderRadius: '16px',
    padding: '14px 16px',
    marginBottom: '16px',
    textAlign: 'center',
    border: '2px solid #fbbf24',
  },
  sampleBannerText: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#92400e',
    margin: '0 0 4px',
  },
  sampleBannerSub: {
    fontSize: '12px',
    color: '#92400e',
    margin: 0,
  },
  inputSummary: {
    background: 'white',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  inputSummaryTitle: {
    fontSize: '13px',
    color: textSub,
    margin: '0 0 8px',
    fontWeight: 700,
  },
  inputRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '4px',
  },
  inputLabel: {
    fontSize: '12px',
    background: pinkLight,
    color: pinkDark,
    padding: '2px 8px',
    borderRadius: '999px',
    fontWeight: 700,
    whiteSpace: 'nowrap' as const,
  },
  inputValue: {
    fontSize: '13px',
    color: textMain,
  },
  scoreCard: {
    textAlign: 'center',
    background: 'white',
    borderRadius: '24px',
    padding: '28px 20px',
    marginBottom: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  scoreLabel: {
    fontSize: '14px',
    color: textSub,
    margin: '0 0 16px',
    fontWeight: 700,
  },
  scoreCircle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #fce7f3, #fdf4ff)',
    border: `4px solid ${pink}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  scoreNum: {
    fontSize: '48px',
    fontWeight: 900,
    color: pinkDark,
    lineHeight: 1,
  },
  scorePct: {
    fontSize: '18px',
    color: pinkDark,
    fontWeight: 700,
    marginTop: '12px',
  },
  scoreBar: {
    height: '8px',
    background: '#e2e8f0',
    borderRadius: '999px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  scoreBarFill: {
    height: '100%',
    background: 'linear-gradient(135deg, #f472b6, #a855f7)',
    borderRadius: '999px',
  },
  scoreNote: {
    fontSize: '13px',
    color: purple,
    fontWeight: 700,
    margin: 0,
  },
  resultSection: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  resultTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: textMain,
    margin: '0 0 10px',
  },
  resultText: {
    fontSize: '14px',
    color: textSub,
    lineHeight: 1.7,
    margin: 0,
  },
  storyCard: {
    background: 'linear-gradient(135deg, #fdf4ff, #fce7f3)',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '16px',
    overflow: 'hidden',
  },
  storyTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: purple,
    margin: '0 0 10px',
  },
  storyText: {
    fontSize: '14px',
    color: textSub,
    lineHeight: 1.7,
    margin: '0 0 8px',
  },
  storyBlur: {
    background: 'linear-gradient(to bottom, transparent, rgba(253, 244, 255, 0.98))',
    paddingTop: '20px',
    textAlign: 'center',
  },
  storyBlurText: {
    fontSize: '13px',
    color: purple,
    fontWeight: 700,
    margin: 0,
  },
  lockCard: {
    background: 'white',
    border: `2px solid ${pink}`,
    borderRadius: '20px',
    padding: '24px',
    marginBottom: '16px',
    boxShadow: '0 4px 20px rgba(244, 114, 182, 0.15)',
  },
  lockTitle: {
    fontSize: '16px',
    fontWeight: 900,
    color: textMain,
    margin: '0 0 16px',
  },
  advicePreview: {
    marginBottom: '16px',
  },
  adviceItem: {
    background: '#fafafa',
    borderRadius: '12px',
    padding: '12px',
    marginBottom: '8px',
  },
  adviceTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: textMain,
    margin: '0 0 8px',
  },
  adviceBlurred: {
    background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
  },
  adviceBlurredText: {
    fontSize: '12px',
    color: textSub,
    margin: 0,
  },
  lockList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 16px',
    fontSize: '14px',
    color: textMain,
    lineHeight: 2,
  },
  lockPrice: {
    textAlign: 'center',
    margin: 0,
  },
  lockOriginal: {
    color: textSub,
    textDecoration: 'line-through',
    fontSize: '14px',
  },
  lockSale: {
    color: pinkDark,
    fontWeight: 900,
    fontSize: '20px',
  },
  piyoCard: {
    background: pinkLight,
    borderRadius: '20px',
    padding: '20px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  piyoBig: {
    fontSize: '40px',
    marginBottom: '8px',
  },
  piyoText: {
    fontSize: '14px',
    color: pinkDark,
    lineHeight: 1.7,
    margin: 0,
  },
  ctaBlock: {
    marginBottom: '16px',
  },
  primaryBtn: {
    display: 'block',
    padding: '16px',
    background: 'linear-gradient(135deg, #f472b6, #a855f7)',
    color: 'white',
    borderRadius: '16px',
    fontSize: '17px',
    fontWeight: 700,
    textDecoration: 'none',
    textAlign: 'center',
    marginBottom: '12px',
    boxShadow: '0 4px 20px rgba(244, 114, 182, 0.4)',
  },
  lineBtn: {
    display: 'block',
    background: '#22c55e',
    color: 'white',
    padding: '14px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '15px',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: '11px',
    color: textSub,
    lineHeight: 1.6,
    textAlign: 'center',
    margin: '16px 0',
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
  },
}
