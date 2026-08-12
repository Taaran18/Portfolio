import type { Metadata } from 'next'
import Skills from '@/components/sections/Skills'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo'

const description = 'Technical skills of Taaran Jain across machine learning, deep learning, LLMs, and the full ML engineering stack.'

export const metadata: Metadata = {
  title: 'Skills',
  description,
  alternates: { canonical: '/skills' },
  openGraph: { title: 'Skills — Taaran Jain', description, url: '/skills' },
}

export default function SkillsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={breadcrumbSchema('/skills')} />
      <Skills />
    </main>
  )
}
