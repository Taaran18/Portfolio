import type { Metadata } from 'next'
import About from '@/components/sections/About'

const description = 'Learn about Taaran Jain — an AI Engineer specialising in LLMs, RAG, and production ML systems, based in Jaipur, India.'

export const metadata: Metadata = {
  title: 'About',
  description,
  alternates: { canonical: '/about' },
  openGraph: { title: 'About — Taaran Jain', description, url: '/about' },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 md:pt-28">
      <About />
    </main>
  )
}
