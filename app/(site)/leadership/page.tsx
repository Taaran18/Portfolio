import type { Metadata } from 'next'
import Leadership from '@/components/sections/Leadership'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo'

const description =
  'Leadership and community roles of Taaran Jain across AI/ML mentoring and student innovation initiatives.'

export const metadata: Metadata = {
  title: 'Leadership',
  description,
  alternates: { canonical: '/leadership' },
  openGraph: { title: 'Leadership — Taaran Jain', description, url: '/leadership' },
}

export default function LeadershipPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={breadcrumbSchema('/leadership')} />
      <Leadership />
    </main>
  )
}
