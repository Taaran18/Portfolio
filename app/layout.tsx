import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Providers from './providers'
import JsonLd from '@/components/JsonLd'
import { SITE } from '@/lib/site'
import { rootGraph } from '@/lib/seo'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: '%s — Taaran Jain',
  },
  description: SITE.description,
  keywords: [
    'Taaran Jain',
    'Taaran Jain AI engineer',
    'AI engineer',
    'AI engineer portfolio',
    'machine learning engineer',
    'machine learning engineer portfolio',
    'LLM application developer',
    'RAG pipeline developer',
    'retrieval augmented generation',
    'vector database',
    'pgvector',
    'LangGraph',
    'LangChain',
    'agentic AI',
    'multi-agent systems',
    'generative AI engineer',
    'prompt engineering',
    'LLM fine-tuning',
    'MLOps',
    'production ML systems',
    'deep learning',
    'computer vision',
    'PyTorch',
    'data scientist',
    'AI engineer India',
    'remote AI engineer',
    'AI engineer Jaipur',
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

  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <JsonLd schema={rootGraph()} />
      </head>
      <body>
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--surface-bg)',
                color: 'var(--text-primary)',
                border: '1px solid var(--surface-border)',
                boxShadow: 'var(--card-shadow)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
