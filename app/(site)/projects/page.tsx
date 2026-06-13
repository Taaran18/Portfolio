import type { Metadata } from 'next'
import Projects from '@/components/sections/Projects'

const description = 'Selected AI/ML projects by Taaran Jain — LLM applications, RAG pipelines, and end-to-end ML platforms with live demos.'

export const metadata: Metadata = {
  title: 'Projects',
  description,
  alternates: { canonical: '/projects' },
  openGraph: { title: 'Projects — Taaran Jain', description, url: '/projects' },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24 md:pt-28">
      <Projects />
    </main>
  )
}
