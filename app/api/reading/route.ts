import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// 四柱推命計算
const JIKKAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']
const JUNISHI = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']
const JIKKAN_GOGYOU = ['木','木','火','火','土','土','金','金','水','水']
const JUNISHI_GOGYOU = ['水','土','木','木','土','火','火','土','金','金','土','水']

function getKanshi(year: number, month: number, day: number) {
  const yearBase = year - 1924
  const yearTen = ((yearBase % 10) + 10) % 10
  const yearChi = ((yearBase % 12) + 12) % 12
  const monthOffset = [2,3,4,5,6,7,8,9,10,11,0,1]
  const mIdx = monthOffset[month - 1]
  const monthTen = ((yearTen % 5) * 2 + mIdx) % 10
  const monthChi = (mIdx + 2) % 12
  const a = Math.floor((14 - month) / 12)
  const y = year - a
  const m2 = month + 12 * a - 2
  const jd = day + Math.floor((153 * m2 + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
  const dayBase = jd - 2405750
  const dayTen = ((dayBase % 10) + 10) % 10
  const dayChi = ((dayBase % 12) + 12) % 12
  return { yearTen, yearChi, monthTen, monthChi, dayTen, dayChi }
}

function calcGogyou(kanshi: ReturnType<typeof getKanshi>) {
  const counts = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 }
  const map: Record<string, keyof typeof counts> = { '木':'wood','火':'fire','土':'earth','金':'metal','水':'water' }
  const add = (ten: number, chi: number) => {
    const g1 = map[JIKKAN_GOGYOU[ten]]; if(g1) counts[g1]++
    const g2 = map[JUNISHI_GOGYOU[chi]]; if(g2) counts[g2]++
  }
  add(kanshi.yearTen, kanshi.yearChi)
  add(kanshi.monthTen, kanshi.monthChi)
  add(kanshi.dayTen, kanshi.dayChi)
  const total = Object.values(counts).reduce((a,b) => a+b, 0) || 1
  return {
    wood: Math.round(counts.wood/total*100),
    fire: Math.round(counts.fire/total*100),
    earth: Math.round(counts.earth/total*100),
    metal: Math.round(counts.metal/total*100),
    water: Math.round(counts.water/total*100),
  }
}

function calcDestiny(dateStr: string) {
  const digits = dateStr.replace(/-/g,'').split('').map(Number)
  let sum = digits.reduce((a,b) => a+b, 0)
  while(sum > 9) sum = String(sum).split('').map(Number).reduce((a,b) => a+b, 0)
  return sum || 9
}

function getZodiac(birth: string) {
  const m = parseInt(birth.split('-')[1])
  const d = parseInt(birth.split('-')[2])
  const signs = [
    {name:'山羊座',en:'Capricorn'},{name:'水瓶座',en:'Aquarius'},{name:'魚座',en:'Pisces'},
    {name:'牡羊座',en:'Aries'},{name:'牡牛座',en:'Taurus'},{name:'双子座',en:'Gemini'},
    {name:'蟹座',en:'Cancer'},{name:'獅子座',en:'Leo'},{name:'乙女座',en:'Virgo'},
    {name:'天秤座',en:'Libra'},{name:'蠍座',en:'Scorpio'},{name:'射手座',en:'Sagittarius'},
  ]
  const boundaries = [20,19,21,20,21,22,23,23,23,24,23,22]
  const idx = d < boundaries[m-1] ? (m-2+12)%12 : (m-1)%12
  return signs[idx]
}

function getAgeGroup(birth: string) {
  const year = parseInt(birth.split('-')[0])
  const age = new Date().getFullYear() - year
  if (age < 40) return '20〜40代'
  if (age < 60) return '40〜60代'
  return '60代以降'
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'セッションIDが必要です' }, { status: 400 })
    }

    // Stripeセッションを確認
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: '決済が完了していません' }, { status: 400 })
    }

    const { name, birth, hour, gender, tarot_past, tarot_present, tarot_future } = session.metadata!

    // 占術計算
    const parts = birth.split('-')
    const kanshi = getKanshi(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]))
    const gogyou = calcGogyou(kanshi)
    const destinyNum = calcDestiny(birth)
    const zodiac = getZodiac(birth)
    const nisshu = JIKKAN[kanshi.dayTen]
    const ageGroup = getAgeGroup(birth)

    // Claude APIで鑑定文生成
    const prompt = `あなたは東洋と西洋の占術に精通した本格的な占い師です。以下の情報をもとに、5000文字以上の詳細な総合鑑定レポートを作成してください。

【鑑定対象者の情報】
・お名前：${name}様
・生年月日：${birth}
・星座：${zodiac.name}（${zodiac.en}）
・年代：${ageGroup}

【四柱推命の命式】
・年柱：${JIKKAN[kanshi.yearTen]}${JUNISHI[kanshi.yearChi]}
・月柱：${JIKKAN[kanshi.monthTen]}${JUNISHI[kanshi.monthChi]}
・日柱（日主）：${JIKKAN[kanshi.dayTen]}${JUNISHI[kanshi.dayChi]}
・日干：${nisshu}

【五行バランス】
・木：${gogyou.wood}% / 火：${gogyou.fire}% / 土：${gogyou.earth}% / 金：${gogyou.metal}% / 水：${gogyou.water}%

【数秘術】
・運命数：${destinyNum}

【タロットカード（3枚引き）】
・過去：${tarot_past}
・現在：${tarot_present}
・未来：${tarot_future}

【鑑定レポートの構成】
以下の順番で、それぞれ充実した内容で書いてください。

1. はじめに（${name}様への個人的なメッセージ・200字以上）

2. ホロスコープ解読（${zodiac.name}としての本質・生まれ持った才能・人生テーマ・300字以上）

3. 四柱推命の解読（日干${nisshu}の性格・命式から読む人生の流れ・五行バランスの意味・400字以上）

4. タロットが示す流れ（過去「${tarot_past}」・現在「${tarot_present}」・未来「${tarot_future}」それぞれの詳細な解釈・500字以上）

5. 数秘術の解読（運命数${destinyNum}の意味・使命・才能・300字以上）

6. 統合メッセージ（4つの占術を統合した総合的な見解・400字以上）

7. ${ageGroup}のあなたへ（年代に合わせた具体的なメッセージ・300字以上）

8. 恋愛運（現在の状況・近未来の展開・アドバイス・300字以上）

9. 仕事運（才能の活かし方・転機・注意点・300字以上）

10. 金運（お金の流れ・豊かさを引き寄せる行動・注意点・300字以上）

11. 健康運（体のサイン・注意すべき時期・養生法・200字以上）

12. 今月・来月の運気予報（具体的な時期のアドバイス・300字以上）

13. 開運アドバイス（ラッキーカラー・ラッキーアイテム・開運行動・具体的に5つ以上）

14. ${name}様へのエンディングメッセージ（前向きで温かいメッセージ・200字以上）

神秘的で温かみのある文体で、${name}様に寄り添いながら書いてください。
「たとえば」「具体的に」「特に」などを使い、抽象的にならないよう心がけてください。`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    const reading = data.content[0].text

    return NextResponse.json({
      name,
      birth,
      zodiac,
      kanshi: {
        year: `${JIKKAN[kanshi.yearTen]}${JUNISHI[kanshi.yearChi]}`,
        month: `${JIKKAN[kanshi.monthTen]}${JUNISHI[kanshi.monthChi]}`,
        day: `${JIKKAN[kanshi.dayTen]}${JUNISHI[kanshi.dayChi]}`,
      },
      gogyou,
      destinyNum,
      nisshu,
      ageGroup,
      tarot: { past: tarot_past, present: tarot_present, future: tarot_future },
      reading,
    })
  } catch (error: any) {
    console.error('Reading error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
