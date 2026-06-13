import type { Metadata } from 'next'
import Experience from '@/components/sections/Experience'

const description = 'Professional experience of Taaran Jain as an AI Engineer and Data Scientist building production ML and LLM systems.'

export const metadata: Metadata = {
  title: 'Experience',
  description,
  alternates: { canonical: '/experience' },
  openGraph: { title: 'Experience — Taaran Jain', description, url: '/experience' },
}

export default function ExperiencePage() {
  return (
    <main className="min-h-screen pt-24 md:pt-28">
      <Experience />
    </main>
  )
}
