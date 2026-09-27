import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import clsx from 'clsx'

export interface Crumb {
  label: string
  href?: string
}

interface Props {
  trail: Crumb[]
  align?: 'center' | 'start'
  className?: string
}

const linkCls =
  'inline-flex items-center gap-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2'

export default function Breadcrumbs({ trail, align = 'center', className }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx('flex', align === 'center' ? 'justify-center' : 'justify-start', className)}
    >
      <ol className="surface inline-flex max-w-full items-center gap-2 rounded-full px-4 py-1.5 text-sm">
        <li className="shrink-0">
          <Link href="/" className={linkCls}>
            <Home size={14} aria-hidden="true" />
            Home
          </Link>
        </li>
        {trail.map((crumb) => (
          <li key={crumb.label} className={clsx('inline-flex items-center gap-2', crumb.href ? 'shrink-0' : 'min-w-0')}>
            <ChevronRight size={14} aria-hidden="true" className="shrink-0 text-slate-400 dark:text-slate-600" />
            {crumb.href ? (
              <Link href={crumb.href} className={linkCls}>
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className="truncate sm:max-w-md font-medium text-slate-900 dark:text-white">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
