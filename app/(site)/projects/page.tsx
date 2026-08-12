import type { Metadata } from 'next'
import Projects from '@/components/sections/Projects'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo'

const description = 'Selected AI/ML projects by Taaran Jain — LLM applications, RAG pipelines, and end-to-end ML platforms with live demos.'

export const metadata: Metadata = {
  title: 'Projects',
  description,
  alternates: { canonical: '/projects' },
  openGraph: { title: 'Projects — Taaran Jain', description, url: '/projects' },
}

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={breadcrumbSchema('/projects')} />
      <Projects />
    </main>
  )
}
