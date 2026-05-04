import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { plan, inputs, name, birth, hour, gender, email, tarot } = body

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''
    if (!stripeSecretKey) {
      return NextResponse.json({ success: false, error: 'Stripe設定エラー' }, { status: 500 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.twinkle-lab.jp'

    // プランごとの設定
    const planConfig: Record<string, { amount: number; name: string; successPath: string }> = {
      compatibility: {
        amount: 980,
        name: 'AI相性診断（詳細版）',
        successPath: '/star/compatibility-ai',
      },
      teso: {
        amount: 980,
        name: '手相詳細診断',
        successPath: '/star/teso/result',
      },
      sogo: {
        amount: 3980,
        name: 'AI総合鑑定（手相＋複数占術）',
        successPath: '/star/sogo/result',
      },
    }

    const config = planConfig[plan] || planConfig['compatibility']

    const params = new URLSearchParams()
    params.append('mode', 'payment')
    params.append('success_url', `${baseUrl}${config.successPath}?session_id={CHECKOUT_SESSION_ID}`)
    params.append('cancel_url', `${baseUrl}/star`)
    params.append('line_items[0][price_data][currency]', 'jpy')
    params.append('line_items[0][price_data][product_data][name]', config.name)
    params.append('line_items[0][price_data][unit_amount]', config.amount.toString())
    params.append('line_items[0][quantity]', '1')

    // メタデータに情報を保存
    if (plan === 'compatibility' && inputs) {
      const inputsStr = JSON.stringify(inputs)
      if (inputsStr.length <= 500) {
        params.append('metadata[inputs]', inputsStr)
      }
    }
    if (plan === 'teso' || plan === 'sogo') {
      if (name) params.append('metadata[name]', name)
      if (birth) params.append('metadata[birth]', birth)
      if (hour) params.append('metadata[hour]', hour)
      if (gender) params.append('metadata[gender]', gender)
      if (email) params.append('metadata[email]', email)
      if (plan === 'sogo' && tarot) {
        params.append('metadata[tarot_past]', tarot.past || '')
        params.append('metadata[tarot_present]', tarot.present || '')
        params.append('metadata[tarot_future]', tarot.future || '')
      }
    }
    params.append('metadata[plan]', plan)

    // メールアドレスがあれば事前入力
    if (email) {
      params.append('customer_email', email)
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
      return NextResponse.json({ success: false, error: 'Stripe決済セッションの作成に失敗しました', detail: session }, { status: 500 })
    }

    return NextResponse.json({ success: true, url: session.url, sessionId: session.id })

  } catch (error) {
    console.error('Create checkout error:', error)
    return NextResponse.json({ success: false, error: '予期しないエラーが発生しました' }, { status: 500 })
  }
}
