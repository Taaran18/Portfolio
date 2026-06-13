import type { Metadata } from 'next'
import Research from '@/components/sections/Research'

const description = 'Research papers published by Taaran Jain at the intersection of AI, financial markets, and healthcare.'

export const metadata: Metadata = {
  title: 'Research',
  description,
  alternates: { canonical: '/research' },
  openGraph: { title: 'Research — Taaran Jain', description, url: '/research' },
}

export default function ResearchPage() {
  return (
    <main className="min-h-screen pt-24 md:pt-28">
      <Research />
    </main>
  )
}
