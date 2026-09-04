import type { Metadata } from 'next'
import Contact from '@/components/sections/Contact'
import JsonLd from '@/components/JsonLd'
import Faq from '@/components/sections/Faq'
import { contactPageSchema } from '@/lib/seo'

const description =
  'Get in touch with Taaran Jain — open to AI/ML engineering roles, freelance projects, and research collaborations.'

export const metadata: Metadata = {
  title: 'Contact',
  description,
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact — Taaran Jain', description, url: '/contact' },
}

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={contactPageSchema()} />
      <Contact />
      <Faq />
    </main>
  )
}
