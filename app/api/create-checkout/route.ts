import { NextRequest, NextResponse } from 'next/server'

// ★ 環境変数 STRIPE_SECRET_KEY を Vercel に設定してください
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || ''
const STRIPE_PRICE_ID   = process.env.STRIPE_PRICE_ID_3980 || ''  // ¥3,980のPrice ID

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, birth, hour, gender, email, tarot } = body

    if (!name || !birth || !email) {
      return NextResponse.json({ error: 'お名前・生年月日・メールアドレスは必須です' }, { status: 400 })
    }

    // Stripe Checkout Session を作成
    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'customer_email': email,
        // Price ID がある場合はそちらを使用、なければ price_data で動的生成
        ...(STRIPE_PRICE_ID
          ? { 'line_items[0][price]': STRIPE_PRICE_ID, 'line_items[0][quantity]': '1' }
          : {
              'line_items[0][price_data][currency]': 'jpy',
              'line_items[0][price_data][unit_amount]': '3980',
              'line_items[0][price_data][product_data][name]': 'AI総合鑑定（完全版）',
              'line_items[0][price_data][product_data][description]': 'ホロスコープ×四柱推命×タロット×数秘術 統合鑑定',
              'line_items[0][quantity]': '1',
            }),
        // 決済後に結果ページへ — ユーザー情報をクエリパラメータとして渡す
        'success_url': `${req.nextUrl.origin}/star/result?name=${encodeURIComponent(name)}&birth=${encodeURIComponent(birth)}&hour=${encodeURIComponent(hour || '-1')}&gender=${encodeURIComponent(gender || 'other')}&tarot_past=${encodeURIComponent(tarot?.past || '')}&tarot_present=${encodeURIComponent(tarot?.present || '')}&tarot_future=${encodeURIComponent(tarot?.future || '')}&paid=1`,
        'cancel_url': `${req.nextUrl.origin}/star/sogo`,
        // メタデータ（Stripe ダッシュボードで確認可能）
        'metadata[name]': name,
        'metadata[birth]': birth,
        'metadata[hour]': String(hour || '-1'),
        'metadata[gender]': gender || 'other',
        'metadata[tarot_past]': tarot?.past || '',
        'metadata[tarot_present]': tarot?.present || '',
        'metadata[tarot_future]': tarot?.future || '',
      }),
    })

    const session = await stripeRes.json()

    if (session.error) {
      console.error('Stripe error:', session.error)
      return NextResponse.json({ error: session.error.message }, { status: 400 })
    }

    return NextResponse.json({ url: session.url })

  } catch (err: any) {
    console.error('create-checkout error:', err)
    return NextResponse.json({ error: err.message || '不明なエラーが発生しました' }, { status: 500 })
  }
}
