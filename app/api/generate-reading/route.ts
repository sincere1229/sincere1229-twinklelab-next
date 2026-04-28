import { NextRequest, NextResponse } from 'next/server'

// ============================================================
//  /api/generate-reading/route.ts
//
//  Claude API を使って鑑定文を生成する
//  環境変数: ANTHROPIC_API_KEY（Vercelに設定済みのはず）
// ============================================================

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || ''

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    if (!prompt) {
      return NextResponse.json({ error: 'プロンプトが必要です' }, { status: 400 })
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 4096,
        messages: [
          { role: 'user', content: prompt }
        ],
      }),
    })

    const data = await res.json()
    if (data.error) {
      console.error('Anthropic API error:', data.error)
      return NextResponse.json({ error: data.error.message }, { status: 500 })
    }

    const text = data.content?.[0]?.text || ''
    return NextResponse.json({ text })
  } catch (err: any) {
    console.error('generate-reading error:', err)
    return NextResponse.json({ error: err.message || '生成に失敗しました' }, { status: 500 })
  }
}
