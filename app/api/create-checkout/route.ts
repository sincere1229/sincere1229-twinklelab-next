import { NextRequest, NextResponse } from 'next/server'

// ============================================================
//  /api/create-checkout/route.ts
//
//  Stripe Payment Link 方式
//  （Checkout Session APIは使わない → STRIPE_SECRET_KEY 不要）
//
//  Payment Link URL:
//    ¥500  : https://buy.stripe.com/00w14g2j46C66oBcFl33W04
//    ¥1,980: https://buy.stripe.com/14A8wIbTEf8C9ANfRx33W03
//    ¥3,980: https://buy.stripe.com/aFa5kw8Hs6C6dR3fRx33W02
//
//  決済後の遷移:
//    StripeダッシュボードのPayment Link設定で
//    「確認ページ」→「カスタムURL」に以下を設定してください:
//      ¥1,980: https://twinkle-lab.jp/star/result?paid=1&plan=mini
//      ¥3,980: https://twinkle-lab.jp/star/result?paid=1&plan=sogo
//      ¥500  : https://twinkle-lab.jp/star/result?paid=1&plan=quick
//
//  ※ ユーザー情報（name/birth/theme）は client_reference_id と
//    prefilled_email でStripeに渡し、result側は sessionStorage から取得
// ============================================================

const PAYMENT_LINKS: Record<string, string> = {
  quick: 'https://buy.stripe.com/00w14g2j46C66oBcFl33W04',
  mini:  'https://buy.stripe.com/14A8wIbTEf8C9ANfRx33W03',
  sogo:  'https://buy.stripe.com/aFa5kw8Hs6C6dR3fRx33W02',
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      plan = 'sogo',
      name, birth, hour, gender, email,
      tarot, theme,
    } = body

    if (!name || !birth || !email) {
      return NextResponse.json(
        { error: 'お名前・生年月日・メールアドレスは必須です' },
        { status: 400 }
      )
    }

    const baseLink = PAYMENT_LINKS[plan] ?? PAYMENT_LINKS.sogo

    // client_reference_id にユーザー情報をJSON埋め込み
    // （Stripeダッシュボードで確認可能・最大200文字）
    const refData = JSON.stringify({
      n: name,
      b: birth,
      h: hour || '-1',
      g: gender || 'other',
      t: theme || '',
      tp: tarot?.past || '',
      tpr: tarot?.present || '',
      tf: tarot?.future || '',
    })
    // URLが長くなりすぎる場合を考慮してencodeして渡す
    const clientRef = encodeURIComponent(refData).slice(0, 200)

    // Payment Link にパラメータを付与
    const params = new URLSearchParams({
      prefilled_email: email,
      client_reference_id: clientRef,
    })

    const url = `${baseLink}?${params.toString()}`
    return NextResponse.json({ url })

  } catch (err: any) {
    console.error('create-checkout error:', err)
    return NextResponse.json(
      { error: err.message || '不明なエラー' },
      { status: 500 }
    )
  }
}
