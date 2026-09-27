import Link from 'next/link'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import clsx from 'clsx'
import { PAGE_SEQUENCE } from '@/content/sections'

interface Target {
  href: string
  label: string
  blurb: string
  eyebrow: string
}

const HOME: Omit<Target, 'eyebrow'> = { href: '/', label: 'Home', blurb: 'Back to the overview of everything.' }

function NavCard({ target, direction }: { target: Target; direction: 'prev' | 'next' }) {
  const isHome = target.href === '/'
  const Icon = isHome ? Home : direction === 'prev' ? ArrowLeft : ArrowRight

  return (
    <Link
      href={target.href}
      className={clsx(
        'group surface surface-raise flex h-full items-center gap-4 rounded-2xl p-5 hover:border-brand-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2',
        direction === 'next' && 'sm:flex-row-reverse sm:text-right'
      )}
    >
      <span className="shrink-0 w-10 h-10 rounded-full border border-[var(--surface-border)] flex items-center justify-center text-slate-500 group-hover:text-brand-700 dark:group-hover:text-brand-400 group-hover:border-brand-500/40 transition-colors">
        <Icon size={17} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-mono uppercase tracking-widest text-slate-500">{target.eyebrow}</span>
        <span className="card-title block mt-1 text-slate-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
          {target.label}
        </span>
        <span className="card-body block mt-0.5 text-slate-600 dark:text-slate-400">{target.blurb}</span>
      </span>
    </Link>
  )
}

export default function PageNav({ path }: { path: string }) {
  const index = PAGE_SEQUENCE.findIndex((p) => p.path === path)
  if (index === -1) return null

  const prevPage = PAGE_SEQUENCE[index - 1]
  const nextPage = PAGE_SEQUENCE[index + 1]

  const prev: Target = prevPage
    ? { href: prevPage.path, label: prevPage.navLabel, blurb: prevPage.blurb, eyebrow: 'Previous' }
    : { ...HOME, eyebrow: 'Start Over' }
  const next: Target = nextPage
    ? { href: nextPage.path, label: nextPage.navLabel, blurb: nextPage.blurb, eyebrow: 'Next' }
    : { ...HOME, eyebrow: 'Finish' }

  return (
    <nav aria-label="Continue exploring" className="container-wide px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div className="max-w-4xl mx-auto border-t border-[var(--surface-border)] pt-10">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">Keep Exploring</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <NavCard target={prev} direction="prev" />
          <NavCard target={next} direction="next" />
        </div>
      </div>
    </nav>
  )
}
