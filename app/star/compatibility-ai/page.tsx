import dynamic from 'next/dynamic'

// SSR完全無効化（ハイドレーションエラー防止）
const CompatibilityAIClient = dynamic(
  () => import('./client').then(mod => mod.CompatibilityAIClient),
  { ssr: false }
)

export default function CompatibilityAIPage() {
  return <CompatibilityAIClient />
}
