import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Experience from '@/components/sections/Experience'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageNav from '@/components/ui/PageNav'
import { experiencePageSchema } from '@/lib/seo'

const description =
  'Experience of Taaran Jain, AI Engineer: 2+ years across 3 companies and 10+ industries, from data science and deep learning to production LLM products.'

export const metadata: Metadata = pageMetadata({ title: 'AI Engineer Experience', description, path: '/experience' })

export default function ExperiencePage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={experiencePageSchema()} />
      <Breadcrumbs trail={[{ label: 'Experience' }]} className="px-4 pt-2" />
      <Experience />
      <PageNav path="/experience" />
    </main>
  )
}
