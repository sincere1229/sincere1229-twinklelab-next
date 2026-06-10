// lib/tarot5Stock.ts
// タロット5枚の確定コピー（クリフハンガー／CTA）。読み解き本文はAI、ティーザーはここから。

/* ロックカードのクリフハンガー（ポジション別の「途中まで」文・…で切る） */
export const CLIFF_FUTURE = [
  '近いうちに、あなたの流れを変える出来事が…',
  'これから訪れる、思いがけない展開が…',
  'あなたの選択次第で、未来は大きく…',
  'もうすぐ、状況が動き出すサインが…',
  '数か月先に、はっきりとした変化が…',
  'あなたを待っている、新しい流れが…',
  '近い未来、心が軽くなる出来事が…',
  '静かに近づいている、大切な転機が…',
  'あなたの努力が形になる時が…',
  'この先で開けていく道が…',
]
export const CLIFF_CHALLENGE = [
  '今いちばん避けたいのは、実は…',
  'あなたが手放すといいのは…',
  '見落としがちな落とし穴が…',
  'つい繰り返してしまう癖が…',
  '今のあなたに必要な「手放し」は…',
  '立ち止まって見直すといいのは…',
  '焦らなくていいのは、実は…',
  '抱えすぎているものが…',
  '本当の課題は、思っているのと少し違って…',
  '力を入れる場所を、ほんの少し…',
]
export const CLIFF_ADVICE = [
  'まず最初に整えるべきなのは…',
  '今日からできる小さな一歩は…',
  'あなたの運を開く鍵は…',
  '意識を向けるといいのは…',
  '流れを良くするきっかけは…',
  'まず手をつけるといいのは…',
  '開運の第一歩は、意外にも…',
  'あなたを後押しする習慣は…',
  '大切にするといいのは…',
  'いちばん効く心がけは…',
]

/* CTA候補（基本は[0]＝5枚の本当の意味を読み解く） */
export const CTA_OPTIONS = [
  '5枚の本当の意味を読み解く',
  '未来の流れを詳しく見る',
  '今すべき行動を確認する',
  'タロット完全鑑定を受け取る',
  '3か月後の流れを読み解く',
  '5枚が示す答えを受け取る',
  'カードの深い意味を読み解く',
  '運命の流れを確かめる',
  '今後の道筋を見てみる',
  '完全版で全貌を知る',
]

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

type Card = { name: string; position: string }

// 引いたカードから、未来・課題・アドバイスのクリフハンガー3行を組み立てる
export function buildCliffhangers(cards: Card[]): { head: string; card: string; tail: string }[] {
  const find = (pos: string) => cards.find(c => c.position === pos)
  const lines: { head: string; card: string; tail: string }[] = []
  const f = find('未来')
  const c = find('課題')
  const a = find('アドバイス')
  if (f) lines.push({ head: '未来のカードが示しているのは', card: f.name, tail: pick(CLIFF_FUTURE) })
  if (c) lines.push({ head: '課題のカードが伝えているのは', card: c.name, tail: pick(CLIFF_CHALLENGE) })
  if (a) lines.push({ head: 'アドバイスのカードが示す開運行動は', card: a.name, tail: pick(CLIFF_ADVICE) })
  return lines
}
