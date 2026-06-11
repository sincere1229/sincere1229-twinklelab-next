'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

// 本番前にPAY.JPの審査条件で3Dセキュア必須の場合は true に切り替えてください
const TDS_ENABLED = false

declare global {
  interface Window {
    Payjp?: (key: string) => PayjpInstance
  }
}
type PayjpInstance = {
  elements: () => { create: (type: string, opts?: object) => PayjpElement }
  createToken: (el: PayjpElement, opts?: object) => Promise<{ id?: string; error?: { message: string }; card?: { three_d_secure_status?: string } }>
  openThreeDSecureDialog: (tokenId: string) => Promise<void>
}
type PayjpElement = { mount: (selector: string) => void }

export default function PayjpForm({ plan, planName, amount }: { plan: string; planName: string; amount: number }) {
  const router = useRouter()
  const payjpRef = useRef<PayjpInstance | null>(null)
  const cardRef = useRef<PayjpElement | null>(null)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const init = () => {
      if (!window.Payjp || payjpRef.current) return
      const pk = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY
      if (!pk) { setError('決済設定エラー（公開鍵未設定）'); return }
      payjpRef.current = window.Payjp(pk)
      const elements = payjpRef.current.elements()
      cardRef.current = elements.create('card', { style: { base: { fontSize: '16px' } } })
      cardRef.current.mount('#payjp-card')
      setReady(true)
    }
    if (window.Payjp) { init(); return }
    const script = document.createElement('script')
    script.src = 'https://js.pay.jp/v2/pay.js'
    script.onload = init
    document.head.appendChild(script)
  }, [])

  const handlePay = async () => {
    if (!payjpRef.current || !cardRef.current || loading) return
    setLoading(true)
    setError('')
    try {
      const tokenRes = await payjpRef.current.createToken(
        cardRef.current,
        TDS_ENABLED ? { three_d_secure: true } : undefined
      )
      if (tokenRes.error || !tokenRes.id) {
        setError(tokenRes.error?.message || 'カード情報を確認してください')
        setLoading(false)
        return
      }
      // 3Dセキュア認証（有効時のみ）
      if (TDS_ENABLED && tokenRes.card?.three_d_secure_status === 'unverified') {
        await payjpRef.current.openThreeDSecureDialog(tokenRes.id)
      }
      const res = await fetch('/api/payjp/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenRes.id, plan }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setError(data.error || '決済に失敗しました')
        setLoading(false)
        return
      }
      router.push(`/star/pay/thanks?plan=${plan}`)
    } catch {
      setError('通信エラーが発生しました。もう一度お試しください。')
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#fff', border: '1px solid #f3d9e5', borderRadius: 14, padding: 20 }}>
      <p style={{ fontSize: 14, color: '#9b6b80', marginBottom: 10 }}>カード情報を入力してください</p>
      <div id="payjp-card" style={{ padding: '12px 10px', border: '1px solid #e8cdd9', borderRadius: 8, background: '#fffafc', marginBottom: 14 }} />
      {error && <p style={{ fontSize: 13, color: '#c0392b', marginBottom: 12 }}>{error}</p>}
      <button
        onClick={handlePay}
        disabled={!ready || loading}
        style={{
          display: 'block', width: '100%', padding: '15px 0', border: 'none', borderRadius: 50,
          background: loading ? '#d8b4c4' : 'linear-gradient(135deg,#e91e8c,#c2185b)',
          color: '#fff', fontSize: 16, fontWeight: 700, cursor: loading ? 'default' : 'pointer',
        }}
      >
        {loading ? '処理中…' : `¥${amount.toLocaleString()} を支払う`}
      </button>
      <p style={{ fontSize: 11, color: '#b08ba0', marginTop: 12, lineHeight: 1.7 }}>
        VISA / Mastercard がご利用いただけます。カード情報は当サイトのサーバーを経由せず、PAY.JP（PAY株式会社）で安全に処理されます。
      </p>
    </div>
  )
}
