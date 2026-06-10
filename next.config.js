// next.config.js  （TSO親 sincere1229-twinklelab-next のルート / 既存を差し替え）
//
// 無料占いアプリを twinkle-lab.jp/star/<path> 配下に寄せる。
// ▼静的HTMLアプリ（index.html だけの自己完結型）は、子側を一切変更せずにこの設定だけで寄ります。
//   転送先はルート（/）に向けます。
// ▼もし子アプリが Next.js（next.config.js や app/ がある）だった場合は、そのアプリだけ
//   basePath 方式が必要になります（その時は教えてください）。

/** @type {import('next').NextConfig} */

const ZONES = [
  { path: 'horoscope',    url: 'https://horoscope-today-omega.vercel.app' }, // 今日の星座占い
  { path: 'calendar',     url: 'https://lucky-calendar-seven.vercel.app'  }, // 開運カレンダー
  { path: 'angel-number', url: 'https://angel-number-fawn.vercel.app'     }, // エンジェルナンバー
  { path: 'affirmation',  url: 'https://affirmation-app-rho.vercel.app'   }, // アファメーション
  { path: 'dream',        url: 'https://dream-app-omega.vercel.app'       }, // 夢占い
  { path: 'tarot',        url: 'https://tarot-app-rouge.vercel.app'       }, // タロットカード（無料）
  { path: 'bird-oracle',  url: 'https://bird-oracle-ten.vercel.app'       }, // バードオラクル
  { path: 'iching',       url: 'https://iching-app-sigma.vercel.app'      }, // 易占い
  { path: 'past-life',    url: 'https://pastlife-app.vercel.app'          }, // 前世リーディング
  { path: 'numerology',   url: 'https://numerology-app-lovat.vercel.app'  }, // 数秘術
  { path: 'kyusei',       url: 'https://kiju-app.vercel.app'              }, // 九星気学
  { path: 'shichu',       url: 'https://shichu-app.vercel.app'            }, // 四柱推命
  { path: 'compat-free',  url: 'https://aicompat-app.vercel.app'          }, // 相性占い（無料）
]

const nextConfig = {
  async rewrites() {
    const rules = []
    for (const z of ZONES) {
      // 静的HTMLアプリ：ルート（/）に転送
      rules.push({ source: `/star/${z.path}`,        destination: `${z.url}` })
      rules.push({ source: `/star/${z.path}/:path*`, destination: `${z.url}/:path*` })
    }
    return rules
  },
}

module.exports = nextConfig
