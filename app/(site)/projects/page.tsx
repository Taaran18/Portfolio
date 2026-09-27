import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Projects from '@/components/sections/Projects'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageNav from '@/components/ui/PageNav'
import { projectsPageSchema } from '@/lib/seo'

const description =
  'Selected AI/ML projects by Taaran Jain — LLM applications, RAG pipelines, and end-to-end ML platforms with live demos.'

export const metadata: Metadata = pageMetadata({ title: 'Projects', description, path: '/projects' })

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
