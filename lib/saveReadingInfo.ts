// ============================================================
//  lib/saveReadingInfo.ts
//
//  決済前にユーザー情報を sessionStorage に保存する。
//  決済後に /star/result で読み取って鑑定文を生成する。
//
//  使い方（mini/sogo の handlePay 内で呼ぶ）:
//    import { saveReadingInfo } from '@/lib/saveReadingInfo'
//    saveReadingInfo({ plan:'mini', name, birth, email, theme, ... })
// ============================================================

export interface ReadingInfo {
  plan: string
  name: string
  birth: string
  hour?: string
  gender?: string
  theme?: string
  tarotPast?: string
  tarotPresent?: string
  tarotFuture?: string
}

export function saveReadingInfo(info: ReadingInfo) {
  try {
    sessionStorage.setItem('tso_reading_info', JSON.stringify(info))
  } catch {
    // sessionStorage が使えない場合はスキップ
  }
}
