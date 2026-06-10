// app/components/PayjpCheckoutButton.tsx
'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

type Props = {
  product: 'tesou' | 'compatibility-ai' | 'tarot5' | 'sogo'
  label?: string                      // 「カードで支払う」ボタンに表示する文言
  onPaid: (chargeId: string) => void  // 決済成功時に chargeId を渡して呼ばれる
}

export default function PayjpCheckoutButton({ product, label = '購入する', onPaid }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  const onPaidRef = useRef(onPaid)
  onPaidRef.current = onPaid

  const handleToken = useCallback(async (response: any) => {
    if (!response || !response.id) {
      setError('カード情報の処理に失敗しました')
      return
    }
    setProcessing(true)
    setError('')
    try {
      const res = await fetch('/api/payjp/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.id, product }),
      })
      const data = await res.json()
      if (data.success && data.chargeId) {
        onPaidRef.current(data.chargeId)   // ← chargeId を渡す
      } else {
        setError(data.error || '決済に失敗しました。もう一度お試しください。')
      }
    } catch {
      setError('通信エラーが発生しました。もう一度お試しください。')
    } finally {
      setProcessing(false)
    }
  }, [product])

  useEffect(() => {
    const cbName = `__payjpOnCreated_${product.replace(/-/g, '_')}`
    ;(window as any)[cbName] = handleToken

    const container = containerRef.current
    if (container && !container.querySelector('script.payjp-button')) {
      const script = document.createElement('script')
      script.src = 'https://checkout.pay.jp/'
      script.className = 'payjp-button'
      script.setAttribute('data-payjp-key', process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY || '')
      script.setAttribute('data-payjp-on-created', cbName)
      script.setAttribute('data-payjp-text', label)
      script.setAttribute('data-payjp-submit-text', '支払いを確定する')
      script.setAttribute('data-payjp-partial', 'true')
      script.setAttribute('data-payjp-lang', 'ja')
      container.appendChild(script)
    }

    return () => {
      try { delete (window as any)[cbName] } catch {}
    }
  }, [product, label, handleToken])

  return (
    <div style={{ textAlign: 'center' }}>
      <div ref={containerRef} />
      {processing && (
        <p style={{ fontSize: 13, color: '#888', marginTop: 10 }}>
          決済処理中です…そのままお待ちください
        </p>
      )}
      {error && (
        <p style={{ fontSize: 13, color: '#e0407a', marginTop: 10 }}>{error}</p>
      )}
    </div>
  )
}
