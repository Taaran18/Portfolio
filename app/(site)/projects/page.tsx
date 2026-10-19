import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Projects from '@/components/sections/Projects'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageNav from '@/components/ui/PageNav'
import { projectsPageSchema } from '@/lib/seo'
import { PROJECTS } from '@/content/projects'

const description = `${PROJECTS.length} live AI projects by Taaran Jain: RAG and LangGraph apps, ML platforms and agentic AI tools, each with a demo, metrics and a case study.`

export const metadata: Metadata = pageMetadata({ title: 'AI Projects With Live Demos', description, path: '/projects' })

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={projectsPageSchema()} />
      <Breadcrumbs trail={[{ label: 'Projects' }]} className="px-4 pt-2" />
      <Projects />
      <PageNav path="/projects" />
    </main>
  )
}
