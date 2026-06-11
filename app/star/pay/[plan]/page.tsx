import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PayjpForm from '@/components/PayjpForm'

// 表示用プラン定義（金額の正はサーバー側 /api/payjp/charge が持ちます）
const PLANS: Record<string, { name: string; amount: number; desc: string; icon: string }> = {
  palm: { name: '手相鑑定', amount: 980, desc: 'あなたの手のひらに刻まれた運命のサインをAIが読み解きます。', icon: '🖐️' },
  aisho: { name: '相性占い', amount: 980, desc: 'お二人の相性を多角的に鑑定し、関係を深めるヒントをお届けします。', icon: '💞' },
  tarot5: { name: 'タロット5枚引き', amount: 1980, desc: '過去・現在・未来・対策・結末。5枚のカードで深く読み解きます。', icon: '🔮' },
  sogo: { name: '総合鑑定', amount: 3980, desc: 'タロット・数秘・星座を組み合わせた、いちばん深い総合リーディング。', icon: '✨' },
  innerchild: { name: 'インナーチャイルド覚醒リーディング', amount: 9800, desc: '心の奥で待っている小さなあなたに出会う、特別なセッションです。', icon: '🌙' },
}

export const metadata: Metadata = {
  title: 'お支払い | Twinkle Star Oracle',
}

export default async function PayPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params
  const p = PLANS[plan]
  if (!p) notFound()

  return (
    <main style={{ maxWidth: 480, margin: '0 auto', padding: '24px 16px 48px' }}>
      <p style={{ fontSize: 12, color: '#b08ba0', marginBottom: 6 }}>Twinkle Star Oracle</p>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#6d2e4e', marginBottom: 18 }}>お支払い</h1>

      <div style={{ background: 'linear-gradient(135deg,#fff0f7,#fde8f1)', border: '1px solid #f3d9e5', borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#6d2e4e', marginBottom: 6 }}>
          {p.icon} {p.name}
        </div>
        <p style={{ fontSize: 13, color: '#9b6b80', lineHeight: 1.8, marginBottom: 10 }}>{p.desc}</p>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#c2185b' }}>
          ¥{p.amount.toLocaleString()} <span style={{ fontSize: 12, fontWeight: 400, color: '#b08ba0' }}>（税込）</span>
        </div>
      </div>

      <PayjpForm plan={plan} planName={p.name} amount={p.amount} />

      <p style={{ fontSize: 11, color: '#b08ba0', marginTop: 16, textAlign: 'center' }}>
        <Link href="/tokusho" style={{ color: '#b08ba0' }}>特定商取引法に基づく表記</Link>
      </p>
    </main>
  )
}
