import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Contact from '@/components/sections/Contact'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageNav from '@/components/ui/PageNav'
import Faq from '@/components/sections/Faq'
import { contactPageSchema } from '@/lib/seo'

const description =
  'Hire Taaran Jain, an AI Engineer in India, for AI/ML engineering roles (remote or on-site), freelance projects or research collaborations.'

export const metadata: Metadata = pageMetadata({ title: 'Hire an AI Engineer', description, path: '/contact' })

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={contactPageSchema()} />
      <Breadcrumbs trail={[{ label: 'Contact' }]} className="px-4 pt-2" />
      <Contact />
      <Faq />
      <PageNav path="/contact" />
    </main>
  )
}
