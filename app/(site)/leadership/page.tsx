import type { Metadata } from 'next'
import Leadership from '@/components/sections/Leadership'

const description = 'Leadership and community roles of Taaran Jain across AI/ML mentoring and student innovation initiatives.'

export const metadata: Metadata = {
  title: 'Leadership',
  description,
  alternates: { canonical: '/leadership' },
  openGraph: { title: 'Leadership — Taaran Jain', description, url: '/leadership' },
}

export default function LeadershipPage() {
  return (
    <main className="min-h-screen pt-24 md:pt-28">
      <Leadership />
    </main>
  )
}
