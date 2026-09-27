import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Experience from '@/components/sections/Experience'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageNav from '@/components/ui/PageNav'
import { experiencePageSchema } from '@/lib/seo'

const description =
  'Professional experience of Taaran Jain as an AI Engineer and Data Scientist building production ML and LLM systems.'

export const metadata: Metadata = pageMetadata({ title: 'Experience', description, path: '/experience' })

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
