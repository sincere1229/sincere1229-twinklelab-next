export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, birth, hour, gender, email, tarot } = body

    if (!name || !birth || !email || !tarot) {
      return NextResponse.json({ error: '必要な情報が不足しています' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: 'AI総合鑑定 完全版',
              description: 'ホロスコープ × 四柱推命 × タロット × 数秘術',
            },
            unit_amount: 3980,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://twinkle-lab.jp'}/star/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://twinkle-lab.jp'}/star/sogo`,
      customer_email: email,
      metadata: {
        name,
        birth,
        hour: String(hour),
        gender,
        tarot_past: tarot.past,
        tarot_present: tarot.present,
        tarot_future: tarot.future,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
