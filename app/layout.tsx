import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Twinkle Lab',
  description: 'AI × 占い × 親子教育',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Noto+Sans+JP:wght@300;400;500&family=Noto+Serif+JP:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <head>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Noto+Sans+JP:wght@300;400;500&family=Noto+Serif+JP:wght@300;400;500&display=swap" rel="stylesheet" />
  <meta name="google-adsense-account" content="ca-pub-7983934375222521" />
</head>
      <body>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7983934375222521"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
