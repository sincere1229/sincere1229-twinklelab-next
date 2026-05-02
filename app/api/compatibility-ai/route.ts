import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sessionId } = body

    console.log('=== DEBUG: session_id received:', sessionId)

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''
    console.log('=== DEBUG: STRIPE_SECRET_KEY prefix:', stripeSecretKey.slice(0, 15))

    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'STRIPE_SECRET_KEY未設定', step: 'api_key_check' })
    }

    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
        },
      }
    )

    const stripeData = await stripeRes.json()
    console.log('=== DEBUG: Stripe response status:', stripeRes.status)
    console.log('=== DEBUG: payment_status:', stripeData.payment_status)

    return NextResponse.json({
      stripeStatus: stripeRes.status,
      paymentStatus: stripeData.payment_status,
      sessionId,
      error: stripeData.error || null,
    })

  } catch (error) {
    console.error('=== DEBUG ERROR:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
