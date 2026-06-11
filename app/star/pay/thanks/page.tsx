import type { Metadata } from 'next'
import Link from 'next/link'

// 決済完了後に誘導する鑑定ページのURL
// ★ 実際の各鑑定アプリのパスに合わせて書き換えてください ★
const READING_URLS: Record<string, { name: string; url: string }> = {
  palm: { name: '手相鑑定', url: '/star/palm' },
  aisho: { name: '相性占い', url: '/star/aisho' },
  tarot5: { name: 'タロット5枚引き', url: '/star/tarot' },
  sogo: { name: '総合鑑定', url: '/star/sogo' },
  innerchild: { name: 'インナーチャイルド覚醒リーディング', url: '/star/innerchild' },
}

export const metadata: Metadata = {
  title: 'お支払い完了 | Twinkle Star Oracle',
}

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams
  const r = (plan && READING_URLS[plan]) || null

  return (
    <main style={{ maxWidth: 480, margin: '0 auto', padding: '48px 16px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🌟</div>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#6d2e4e', marginBottom: 10 }}>お支払いが完了しました</h1>
      <p style={{ fontSize: 14, color: '#9b6b80', lineHeight: 1.9, marginBottom: 28 }}>
        ありがとうございます。<br />
        星の扉が開きました。さっそく鑑定をお楽しみください。
      </p>

      {r ? (
        <Link
          href={r.url}
          style={{
            display: 'inline-block', padding: '15px 40px', borderRadius: 50,
            background: 'linear-gradient(135deg,#e91e8c,#c2185b)', color: '#fff',
            fontSize: 16, fontWeight: 700, textDecoration: 'none',
          }}
        >
          {r.name}をはじめる →
        </Link>
      ) : (
        <Link href="/star" style={{ color: '#c2185b', fontWeight: 700 }}>占いトップへ戻る →</Link>
      )}

      <p style={{ fontSize: 11, color: '#b08ba0', marginTop: 32, lineHeight: 1.8 }}>
        領収書が必要な場合は、お問い合わせフォームよりご連絡ください。
      </p>
    </main>
  )
}
