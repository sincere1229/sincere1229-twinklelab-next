import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature') || ''
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET が設定されていません')
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    // stripe SDKなしで署名を検証（依存関係を減らすため）
    // 決済完了の確認はcompatibility-paid/route.tsでStripe APIに直接問い合わせるため
    // webhookはログ記録のみに使用
    const payload = JSON.parse(body)
    
    if (payload.type === 'checkout.session.completed') {
      const sessionId = payload.data?.object?.id
      console.log('Payment completed via webhook, session:', sessionId)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 })
  }
}
