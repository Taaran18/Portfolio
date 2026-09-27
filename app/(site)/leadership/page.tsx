import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Leadership from '@/components/sections/Leadership'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageNav from '@/components/ui/PageNav'
import { leadershipPageSchema } from '@/lib/seo'

const description =
  'Leadership and community roles of Taaran Jain across AI/ML mentoring and student innovation initiatives.'

export const metadata: Metadata = pageMetadata({ title: 'Leadership', description, path: '/leadership' })

export default function LeadershipPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={leadershipPageSchema()} />
      <Breadcrumbs trail={[{ label: 'Leadership' }]} className="px-4 pt-2" />
      <Leadership />
      <PageNav path="/leadership" />
    </main>
  )
}
