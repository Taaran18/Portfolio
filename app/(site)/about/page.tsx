import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import About from '@/components/sections/About'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageNav from '@/components/ui/PageNav'
import { aboutPageSchema } from '@/lib/seo'

const description =
  'Learn about Taaran Jain — an AI Engineer specialising in LLMs, RAG, and production ML systems, based in Jaipur, India.'

export const metadata: Metadata = pageMetadata({ title: 'About', description, path: '/about' })

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
