import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Certifications from '@/components/sections/Certifications'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageNav from '@/components/ui/PageNav'
import { certificationsPageSchema } from '@/lib/seo'

const description = 'Professional certifications earned by Taaran Jain in AI, machine learning, and data science.'

export const metadata: Metadata = pageMetadata({ title: 'Certifications', description, path: '/certifications' })

export default function CertificationsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={certificationsPageSchema()} />
      <Breadcrumbs trail={[{ label: 'Certifications' }]} className="px-4 pt-2" />
      <Certifications />
      <PageNav path="/certifications" />
    </main>
  )
}
