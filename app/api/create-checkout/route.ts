import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { inputs } = body

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''
    if (!stripeSecretKey) {
      return NextResponse.json({ success: false, error: 'Stripe設定エラー' }, { status: 500 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.twinkle-lab.jp'

    // Stripeチェックアウトセッションを作成
    const params = new URLSearchParams()
    params.append('mode', 'payment')
    params.append('success_url', `${baseUrl}/star/compatibility-ai?session_id={CHECKOUT_SESSION_ID}`)
    params.append('cancel_url', `${baseUrl}/star/compatibility-ai`)
    params.append('line_items[0][price_data][currency]', 'jpy')
    params.append('line_items[0][price_data][product_data][name]', 'AI相性診断（詳細版）')
    params.append('line_items[0][price_data][unit_amount]', '980')
    params.append('line_items[0][quantity]', '1')
    // 入力データをメタデータとして保存
    const inputsStr = JSON.stringify(inputs)
    if (inputsStr.length <= 500) {
      params.append('metadata[inputs]', inputsStr)
    }

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const session = await stripeRes.json()

    if (!stripeRes.ok) {
      console.error('Stripe session creation error:', session)
      return NextResponse.json({ success: false, error: 'Stripe決済セッションの作成に失敗しました' }, { status: 500 })
    }

    return NextResponse.json({ success: true, url: session.url, sessionId: session.id })

  } catch (error) {
    console.error('Create checkout error:', error)
    return NextResponse.json({ success: false, error: '予期しないエラーが発生しました' }, { status: 500 })
  }
}
