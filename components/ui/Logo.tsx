import Link from 'next/link'
import clsx from 'clsx'
import { SITE } from '@/lib/site'

export default function Logo({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name} — Home`}
      className={clsx(
        'group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]',
        className
      )}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-700 font-mono text-sm font-bold text-white shadow-sm shadow-brand-500/30 transition-transform duration-500 ease-out group-hover:-rotate-6">
        TJ
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={clsx(
            'font-display text-[1.05rem] font-bold tracking-tight whitespace-nowrap',
            onDark ? 'text-white' : 'text-slate-900 dark:text-white'
          )}
        >
          {SITE.name}
        </span>
        <span
          className={clsx(
            'mt-1 hidden font-mono text-[0.68rem] sm:block',
            onDark ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'
          )}
        >
          {SITE.primaryRole}
        </span>
      </span>
    </Link>
  )
}
