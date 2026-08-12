import type { Metadata } from 'next'
import Research from '@/components/sections/Research'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo'

const description = 'Research papers published by Taaran Jain at the intersection of AI, financial markets, and healthcare.'

export const metadata: Metadata = {
  title: 'Research',
  description,
  alternates: { canonical: '/research' },
  openGraph: { title: 'Research — Taaran Jain', description, url: '/research' },
}

export default function ResearchPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={breadcrumbSchema('/research')} />
      <Research />
    </main>
  )
}
