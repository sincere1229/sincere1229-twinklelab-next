/** @type {import('next').NextConfig} */

// 無料占いアプリ（外部Vercel）を twinkle-lab.jp/star/<path> 配下に寄せる。
// 各子アプリ側で basePath: '/star/<path>' を設定し再デプロイすることが前提。
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
      rules.push({ source: `/star/${z.path}`,        destination: `${z.url}/star/${z.path}` })
      rules.push({ source: `/star/${z.path}/:path*`, destination: `${z.url}/star/${z.path}/:path*` })
    }
    return rules
  },
}

module.exports = nextConfig
