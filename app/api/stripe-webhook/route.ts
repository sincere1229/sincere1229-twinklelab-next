import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
})

// 決済完了済みセッションIDを一時保存（サーバーメモリ、再起動でリセット）
// 本番運用でスケールする場合はRedis/KVに移行してください
export const paidSessions = new Set<string>()

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') || ''
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // 決済完了イベント
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    if (session.id) {
      paidSessions.add(session.id)
      console.log('Payment completed, session:', session.id)
    }
  }

  return NextResponse.json({ received: true })
}
