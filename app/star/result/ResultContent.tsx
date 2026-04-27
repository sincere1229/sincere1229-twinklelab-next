'use client'

// ============================================================
//  ResultContent.tsx（修正版）
//  
//  変更点:
//    ✅ ¥980 → 完全削除
//    ✅ ¥1,980 → LINE廃止 → 直課金ページ(/star/chukan)へ
//    ✅ CTA2択: ① ¥500直課金 ② LINE（無料）
//    ✅ ¥3,980 現状維持
//    ✅ UpsellBlock を使って全ページ統一
//
//  このファイルを app/star/result/ResultContent.tsx に上書き
// ============================================================

import { useState } from 'react'
import UpsellBlock from '@/components/UpsellBlock'

// ★ Stripe ¥500 Payment Link（本番に差し替えてください）
const STRIPE_URL_500 = 'https://buy.stripe.com/00w14g2j46C66oBcFl33W04'

interface ResultContentProps {
  result: string
  userName?: string
  appName?: string
}

export default function ResultContent({
  result,
  userName = 'あなた',
  appName = '占い',
}: ResultContentProps) {
  const [showFull, setShowFull] = useState(false)

  // 無料表示 = 最初の200文字まで
  const PREVIEW_LEN = 200
  const isLong = result.length > PREVIEW_LEN
  const previewText = isLong ? result.slice(0, PREVIEW_LEN) : result

  return (
    <div style={styles.wrapper}>

      {/* ===== 鑑定結果エリア ===== */}
      <div style={styles.resultCard}>
        <div style={styles.resultTitle}>✦ 鑑定結果 ✦</div>

        {/* 無料プレビュー */}
        <div style={styles.resultText}>
          {showFull ? result : previewText}
          {isLong && !showFull && (
            <span style={styles.dots}>……</span>
          )}
        </div>

        {/* 続きをぼかして見せる（直課金誘導） */}
        {isLong && !showFull && (
          <div style={styles.blurOverlay}>
            <div style={styles.blurText}>
              {result.slice(PREVIEW_LEN, PREVIEW_LEN + 150)}
            </div>
            <div style={styles.blurLabel}>
              続きを読む → ¥500で全文表示
            </div>
          </div>
        )}
      </div>

      {/* ===== 収益導線（UpsellBlock） ===== */}
      <UpsellBlock
        appName={appName}
        stripeUrl500={STRIPE_URL_500}
        stripeUrl1980="/star/chukan"
      />

    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    maxWidth: 640,
    margin: '0 auto',
    padding: '0 1rem',
    fontFamily: "'Noto Serif JP', serif",
  },

  // 結果カード
  resultCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: 18,
    padding: '1.8rem 1.5rem',
    marginBottom: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
  },
  resultTitle: {
    color: '#d4af37',
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textAlign: 'center',
    marginBottom: '1.2rem',
  },
  resultText: {
    color: '#e8d5b7',
    fontSize: '0.92rem',
    lineHeight: 1.9,
    whiteSpace: 'pre-wrap',
  },
  dots: {
    color: 'rgba(232,213,183,0.4)',
  },

  // ぼかしオーバーレイ
  blurOverlay: {
    position: 'relative',
    marginTop: '0.5rem',
  },
  blurText: {
    color: '#e8d5b7',
    fontSize: '0.92rem',
    lineHeight: 1.9,
    filter: 'blur(5px)',
    userSelect: 'none',
    pointerEvents: 'none',
    opacity: 0.6,
  },
  blurLabel: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(10,10,26,0.85)',
    border: '1px solid rgba(212,175,55,0.5)',
    color: '#d4af37',
    fontSize: '0.85rem',
    fontWeight: 700,
    borderRadius: 10,
    padding: '0.5rem 1.2rem',
    whiteSpace: 'nowrap',
    letterSpacing: '0.05em',
  },
}
