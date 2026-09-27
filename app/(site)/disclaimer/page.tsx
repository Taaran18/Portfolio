import type { Metadata } from 'next'
import LegalPage from '@/components/ui/LegalPage'
import { getLegalDoc } from '@/content/legal'
import { pageMetadata } from '@/lib/metadata'

const doc = getLegalDoc('disclaimer')

export const metadata: Metadata = pageMetadata({ title: doc.title, description: doc.description, path: doc.path })

export default function Page() {
  return <LegalPage doc={doc} />
}
