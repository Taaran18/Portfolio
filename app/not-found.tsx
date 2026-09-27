import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Home, Mail } from 'lucide-react'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'
import StatusPage from '@/components/ui/StatusPage'
import RequestedPath from '@/components/ui/RequestedPath'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page does not exist. Browse projects, case studies and writing instead.',
}

const SUGGESTIONS = [
  { href: '/projects', label: 'Projects', blurb: 'Shipped AI products with screenshots and live demos.' },
  { href: '/case-studies', label: 'Case Studies', blurb: 'How the systems were designed, and the tradeoffs made.' },
  { href: '/blog', label: 'Blog', blurb: 'Notes on applied AI, retrieval and LLM applications.' },
  { href: '/about', label: 'About', blurb: 'Background, focus areas and the roles I am open to.' },
]

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
        <StatusPage
          code="404"
          eyebrow="Page not found"
          title="This Page Doesn't Exist"
          description={
            <p>
              Nothing lives at <RequestedPath /> — the link may be out of date, or the address may have a typo.
            </p>
          }
          actions={
            <>
              <Button as="link" href="/" variant="primary">
                <Home size={16} /> Go to Homepage
              </Button>
              <Button as="link" href="/contact" variant="secondary">
                <Mail size={16} /> Report a Broken Link
              </Button>
            </>
          }
        >
          <nav aria-labelledby="not-found-suggestions">
            <h2
              id="not-found-suggestions"
              className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-500 text-center mb-5"
            >
              Or Pick Up From Here
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {SUGGESTIONS.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group surface surface-raise flex h-full items-start justify-between gap-4 rounded-2xl p-5 text-left hover:border-brand-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
                  >
                    <span>
                      <span className="card-title block text-slate-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                        {s.label}
                      </span>
                      <span className="card-body block mt-1 text-slate-600 dark:text-slate-400">{s.blurb}</span>
                    </span>
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </StatusPage>
      </main>
      <Footer />
    </>
  )
}
