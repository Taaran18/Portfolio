import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import About from '@/components/sections/About'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageNav from '@/components/ui/PageNav'
import { aboutPageSchema } from '@/lib/seo'

const description =
  'About Taaran Jain, an AI Engineer and Full-Stack Developer in India who builds RAG pipelines, LangGraph agents, and machine learning and deep learning systems.'

export const metadata: Metadata = pageMetadata({ title: 'About · AI Engineer in India', description, path: '/about' })

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={aboutPageSchema()} />
      <Breadcrumbs trail={[{ label: 'About' }]} className="px-4 pt-2" />
      <About />
      <PageNav path="/about" />
    </main>
  )
}
