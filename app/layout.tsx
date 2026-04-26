import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
