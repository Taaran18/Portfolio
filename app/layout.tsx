import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'Taaran Jain — AI Engineer',
  description:
    'AI Engineer & Data Scientist specialising in LLMs, deep learning, and production ML systems.',
  keywords: ['AI engineer', 'machine learning', 'deep learning', 'LLM', 'data scientist', 'portfolio'],
  authors: [{ name: 'Taaran Jain' }],
  openGraph: {
    title: 'Taaran Jain — AI Engineer',
    description: 'AI Engineer & Data Scientist — LLMs, deep learning, production ML.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
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
