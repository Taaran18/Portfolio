import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Skills from '@/components/sections/Skills'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageNav from '@/components/ui/PageNav'
import { skillsPageSchema } from '@/lib/seo'

const description =
  'Skills of Taaran Jain, AI and machine learning engineer: LangGraph, RAG, pgvector, PyTorch, scikit-learn, FastAPI and Next.js, grouped by depth.'

export const metadata: Metadata = pageMetadata({ title: 'AI & Machine Learning Skills', description, path: '/skills' })

export default function SkillsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={skillsPageSchema()} />
      <Breadcrumbs trail={[{ label: 'Skills' }]} className="px-4 pt-2" />
      <Skills />
      <PageNav path="/skills" />
    </main>
  )
}
