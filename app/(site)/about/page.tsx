import type { Metadata } from 'next'
import About from '@/components/sections/About'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo'

const description = 'Learn about Taaran Jain — an AI Engineer specialising in LLMs, RAG, and production ML systems, based in Jaipur, India.'

export const metadata: Metadata = {
  title: 'About',
  description,
  alternates: { canonical: '/about' },
  openGraph: { title: 'About — Taaran Jain', description, url: '/about' },
}

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={breadcrumbSchema('/about')} />
      <About />
    </main>
  )
}
