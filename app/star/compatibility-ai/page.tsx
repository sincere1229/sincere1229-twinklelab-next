import dynamic from 'next/dynamic'

const CompatibilityAIClient = dynamic(
  () => import('./client').then(mod => mod.CompatibilityAIClient),
  { ssr: false }
)

export default function CompatibilityAIPage() {
  return <CompatibilityAIClient />
}
