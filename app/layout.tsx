import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Providers from '@/components/Providers'
import { SITE } from '@/lib/site'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
// Display face for headings — geometric, technical, distinctive (pairs with the mono).
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: '%s — Taaran Jain',
  },
  description: SITE.description,
  keywords: [
    'Taaran Jain', 'AI engineer', 'machine learning engineer', 'deep learning',
    'LLM developer', 'data scientist', 'RAG', 'LangChain', 'PyTorch',
    'MLOps', 'computer vision', 'portfolio', 'Jaipur',
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: SITE.name,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    creator: '@Taaran18',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  // Add your token from Google Search Console (Settings → Ownership verification).
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
}

// Structured data — a connected @graph so Google can build a knowledge panel
// linking the name "Taaran Jain" / "taaranjain" to this site and your profiles.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE.url}/#person`,
      name: SITE.name,
      alternateName: SITE.alternateNames,
      givenName: 'Taaran',
      familyName: 'Jain',
      url: SITE.url,
      image: `${SITE.url}/opengraph-image`,
      email: `mailto:${SITE.email}`,
      jobTitle: 'AI Engineer',
      description: SITE.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jaipur',
        addressRegion: 'Rajasthan',
        addressCountry: 'IN',
      },
      sameAs: [SITE.socials.github, SITE.socials.linkedin],
      knowsAbout: [
        'Artificial Intelligence', 'Machine Learning', 'Deep Learning',
        'Large Language Models', 'Retrieval-Augmented Generation', 'Data Science', 'MLOps',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: 'en',
      publisher: { '@id': `${SITE.url}/#person` },
      about: { '@id': `${SITE.url}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE.url}/#profilepage`,
      url: SITE.url,
      name: SITE.title,
      isPartOf: { '@id': `${SITE.url}/#website` },
      mainEntity: { '@id': `${SITE.url}/#person` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0a0a1f',
                color: '#f1f5f9',
                border: '1px solid rgba(6, 182, 212, 0.3)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
