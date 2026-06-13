import type { Metadata } from 'next'
import Certifications from '@/components/sections/Certifications'

const description = 'Professional certifications earned by Taaran Jain in AI, machine learning, and data science.'

export const metadata: Metadata = {
  title: 'Certifications',
  description,
  alternates: { canonical: '/certifications' },
  openGraph: { title: 'Certifications — Taaran Jain', description, url: '/certifications' },
}

export default function CertificationsPage() {
  return (
    <main className="min-h-screen pt-24 md:pt-28">
      <Certifications />
    </main>
  )
}
