// app/api/uranai/tesou/route.ts
import { NextRequest, NextResponse } from 'next/server'

/* 手相詳細診断（有料・本来の自分を知る商品）：PAY.JP課金照会（¥980）後に8項目を生成 */

const EXPECTED_AMOUNT = 980

async function verifyCharge(chargeId: string): Promise<{ ok: boolean; reason?: string }> {
  const secret = process.env.PAYJP_SECRET_KEY
  if (!secret) return { ok: false, reason: 'PAYJP_SECRET_KEY 未設定' }
  if (!chargeId || typeof chargeId !== 'string') return { ok: false, reason: 'chargeId なし' }
  try {
    const res = await fetch(`https://api.pay.jp/v1/charges/${encodeURIComponent(chargeId)}`, {
      method: 'GET',
      headers: { Authorization: 'Basic ' + Buffer.from(secret + ':').toString('base64') },
    })
    const data = await res.json()
    if (!res.ok) return { ok: false, reason: '課金が見つかりません' }
    if (data.paid !== true) return { ok: false, reason: '未払いの課金です' }
    if (data.refunded === true) return { ok: false, reason: '返金済みの課金です' }
    if (data.currency !== 'jpy' || Number(data.amount) !== EXPECTED_AMOUNT) {
      return { ok: false, reason: '金額が一致しません' }
    }
    return { ok: true }
  } catch {
    return { ok: false, reason: '課金照会に失敗しました' }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { imageL, imageR, mimeTypeL, mimeTypeR, memo, chargeId } = body

    // 有料エンドポイント：必ず支払い確認
    const v = await verifyCharge(chargeId)
    if (!v.ok) {
      return NextResponse.json(
        { success: false, error: `決済の確認ができませんでした（${v.reason}）。お手数ですがサポートへご連絡ください。` },
        { status: 402 }
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY || ''
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'APIキーが設定されていません。' }, { status: 500 })
    }
    const model = process.env.ANTHROPIC_MODEL_PAID || process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001'

    const handNote = imageL && imageR
      ? '左手・右手の両方の画像があります。'
      : imageL ? '左手のみの画像です。左手から読み解ける範囲で。'
      : imageR ? '右手のみの画像です。右手から読み解ける範囲で。'
      : '画像はありません。一般的な手相の知見と補足情報から、可能な範囲で読み解いてください。'

    const schema =
      `{"gapAnalysis":"左手=本来の資質／右手=現在の生き方 のズレ分析・200字以上。『本来のあなたはもっと○○な人です』という核心の一言を含める","hiddenTalent":"隠れた才能・150字以上（人を支える/伝える/創造/経営感覚/共感力など）","work":"仕事運（向いている働き方・活かせる強み・適職傾向・副業適性）・180字以上","money":"金運（お金との付き合い方・収入の伸ばし方・金運の活かし方）・150字以上","love":"恋愛運（恋愛傾向・パートナーとの向き合い方・愛情表現の特徴）・150字以上","turningPoint":"人生の転機（最重要・変化期のサインと近い将来の方向性の選択）・150字以上","luckActions":["今月やるべきこと","意識すべきこと","伸ばすべき強み"],"roadmap":[{"period":"30日後","action":"具体的な指針"},{"period":"90日後","action":"具体的な指針"},{"period":"半年後","action":"具体的な指針"},{"period":"1年後","action":"到達している姿"}],"specialNote":"あなただけ感・手相の特徴から自然に言える範囲のみ・嘘や誇張は禁止・60字程度","piyochanMessage":"安心と前向きさで締める一言・100字程度","disclaimer":"この鑑定はAIによる傾向分析です。最終的な判断はあなたの気持ちを大切にしてください。"}`

    const systemPrompt = `あなたは手相から「本来の自分」を読み解く鑑定士です。
これは手相を見る商品ではなく「本来の自分を知り、人生を読む」商品。
${handNote}
ルール：断定で脅さない／恐怖訴求は禁止／不安→安心→期待→未来が楽しみ／核心はしっかり伝える／「当たっている」と感じる個別性を入れる。

必ず以下のJSONのみを返す。前後に説明やバッククォートを付けない。
${schema}`

    const content: any[] = []
    if (imageL) { content.push({ type: 'text', text: '【左手の画像】' }); content.push({ type: 'image', source: { type: 'base64', media_type: mimeTypeL || 'image/jpeg', data: imageL } }) }
    if (imageR) { content.push({ type: 'text', text: '【右手の画像】' }); content.push({ type: 'image', source: { type: 'base64', media_type: mimeTypeR || 'image/jpeg', data: imageR } }) }
    content.push({ type: 'text', text: `手相を詳細に読み解いてJSONで返してください。${memo ? `\n【お客様から】${memo}` : ''}` })

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model, max_tokens: 3000, system: systemPrompt, messages: [{ role: 'user', content }] }),
    })

    if (!apiRes.ok) {
      const errBody = await apiRes.text()
      console.error('Anthropic API error:', apiRes.status, errBody)
      return NextResponse.json({ success: false, error: `AI APIエラー(${apiRes.status})。しばらく待ってから再試行してください。` }, { status: 500 })
    }

    const apiData = await apiRes.json()
    const rawText: string = apiData.content?.[0]?.type === 'text' ? apiData.content[0].text : ''
    if (!rawText) {
      return NextResponse.json({ success: false, error: 'AIからの応答が空でした。もう一度お試しください。' }, { status: 500 })
    }

    const cleaned = rawText.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim()
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ success: false, error: 'AI応答の解析に失敗しました。もう一度お試しください。' }, { status: 500 })
    }

    let result
    try { result = JSON.parse(jsonMatch[0]) }
    catch { return NextResponse.json({ success: false, error: 'AI応答の解析に失敗しました。もう一度お試しください。' }, { status: 500 }) }

    return NextResponse.json({ success: true, result })

  } catch (err: any) {
    console.error('tesou unexpected error:', err)
    return NextResponse.json({ success: false, error: '予期しないエラーが発生しました。もう一度お試しください。' }, { status: 500 })
  }
}
