// lib/tesouStock.ts
// 手相詳細診断の確定コピー。無料チラ見せ（結論は書かない）＋CTA候補。

/* 無料結果のチラ見せ（結論まで書かず「詳細診断で確認できます」へ繋ぐ） */
export const TEASERS_RIGHT = [
  '右手が示すのは、これから開いていく力です',
  '右手には、今はまだ出し切れていない力が表れています',
  '右手が物語るのは、これから伸びていく可能性です',
]
export const TEASERS_MONEY = [
  '金運には、これから変化の兆しが見えます',
  '金運線には、これから動き出すサインがあります',
  'お金の流れには、これから広がる気配があります',
]
export const TEASERS_TURNING = [
  '人生の転機は、これから訪れる重要な選択と関係しています',
  '人生の転機のサインが、手のひらに表れはじめています',
  'これからの転機は、大切な選択と深く結びついています',
]

// CTA候補（基本は[0]＝手相の本当の意味を見る）
export const CTA_OPTIONS = [
  '手相の本当の意味を見る',
  'あなたの人生設計を読み解く',
  '隠れた才能を確認する',
  '人生の転機を読み解く',
  '手相完全鑑定を受け取る',
]

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

// 無料結果のチラ見せ3行（右手・金運・人生の転機／結論は書かない）
export function buildCliffhangers(): string[] {
  return [pick(TEASERS_RIGHT), pick(TEASERS_MONEY), pick(TEASERS_TURNING)]
}
