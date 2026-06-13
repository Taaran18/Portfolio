import type { Metadata } from 'next'
import Skills from '@/components/sections/Skills'

const description = 'Technical skills of Taaran Jain across machine learning, deep learning, LLMs, and the full ML engineering stack.'

export const metadata: Metadata = {
  title: 'Skills',
  description,
  alternates: { canonical: '/skills' },
  openGraph: { title: 'Skills — Taaran Jain', description, url: '/skills' },
}

export default function SkillsPage() {
  return (
    <main className="min-h-screen pt-24 md:pt-28">
      <Skills />
    </main>
  )
}
