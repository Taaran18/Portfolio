import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Research from '@/components/sections/Research'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageNav from '@/components/ui/PageNav'
import { researchPageSchema } from '@/lib/seo'

const description =
  'Research papers published by Taaran Jain at the intersection of AI, financial markets, and healthcare.'

export const metadata: Metadata = pageMetadata({ title: 'Research', description, path: '/research' })

export default function ResearchPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={researchPageSchema()} />
      <Breadcrumbs trail={[{ label: 'Research' }]} className="px-4 pt-2" />
      <Research />
      <PageNav path="/research" />
    </main>
  )
}
