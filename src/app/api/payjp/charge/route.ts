import { NextResponse } from 'next/server'

// プランと金額はサーバー側で定義（クライアントから金額を受け取らない＝改ざん防止）
const PLANS: Record<string, { amount: number; name: string }> = {
  palm: { amount: 980, name: '手相鑑定' },
  aisho: { amount: 980, name: '相性占い' },
  tarot5: { amount: 1980, name: 'タロット5枚引き' },
  sogo: { amount: 3980, name: '総合鑑定' },
  innerchild: { amount: 9800, name: 'インナーチャイルド覚醒リーディング' },
}

export async function POST(req: Request) {
  try {
    const { token, plan } = await req.json()

    if (!token || typeof token !== 'string' || !plan || !PLANS[plan]) {
      return NextResponse.json({ error: '不正なリクエストです' }, { status: 400 })
    }

    const secret = process.env.PAYJP_SECRET_KEY
    if (!secret) {
      return NextResponse.json({ error: 'サーバー設定エラー（鍵未設定）' }, { status: 500 })
    }

    const body = new URLSearchParams({
      amount: String(PLANS[plan].amount),
      currency: 'jpy',
      card: token,
      description: `Twinkle Star Oracle - ${PLANS[plan].name}`,
    })

    const res = await fetch('https://api.pay.jp/v1/charges', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(secret + ':').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      const msg =
        data.error?.code === 'card_declined' ? 'カードが承認されませんでした。別のカードをお試しください。'
        : data.error?.code === 'expired_card' ? 'カードの有効期限が切れています。'
        : data.error?.message || '決済に失敗しました。'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    return NextResponse.json({ ok: true, chargeId: data.id, plan })
  } catch {
    return NextResponse.json({ error: '決済処理でエラーが発生しました' }, { status: 500 })
  }
}
