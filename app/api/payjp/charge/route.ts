import { NextResponse } from 'next/server'

// plan（新決済ページ）と product（既存ページ）の両方に対応
const PLANS: Record<string, { amount: number; name: string }> = {
  // /star/pay/[plan] からの呼び出し
  palm:             { amount: 980,  name: '手相鑑定' },
  aisho:            { amount: 980,  name: '相性占い' },
  tarot5:           { amount: 1980, name: 'タロット5枚引き' },
  sogo:             { amount: 3980, name: '総合鑑定' },
  innerchild:       { amount: 9800, name: 'インナーチャイルド覚醒リーディング' },
  // PayjpCheckoutButton（既存ページ）からの呼び出し
  tesou:            { amount: 980,  name: '手相鑑定' },
  'compatibility-ai': { amount: 980,  name: '相性占い' },
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // plan（新） or product（既存）どちらでも受け付ける
    const key: string = body.plan || body.product || ''
    const token: string = body.token || ''

    if (!token || !key || !PLANS[key]) {
      return NextResponse.json({ error: '不正なリクエストです' }, { status: 400 })
    }

    const secret = process.env.PAYJP_SECRET_KEY
    if (!secret) {
      return NextResponse.json({ error: 'サーバー設定エラー（鍵未設定）' }, { status: 500 })
    }

    const params = new URLSearchParams({
      amount: String(PLANS[key].amount),
      currency: 'jpy',
      card: token,
      description: `Twinkle Star Oracle - ${PLANS[key].name}`,
    })

    const res = await fetch('https://api.pay.jp/v1/charges', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(secret + ':').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      const msg =
        data.error?.code === 'card_declined' ? 'カードが承認されませんでした。別のカードをお試しください。'
        : data.error?.code === 'expired_card'  ? 'カードの有効期限が切れています。'
        : data.error?.message || '決済に失敗しました。'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    // ok/success 両方返す（新旧どちらの呼び出し元でも動く）
    return NextResponse.json({ ok: true, success: true, chargeId: data.id, plan: key })
  } catch {
    return NextResponse.json({ error: '決済処理でエラーが発生しました' }, { status: 500 })
  }
}
