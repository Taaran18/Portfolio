import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { SOCIAL_LINKS } from '@/content/social'
import { ALL_PAGES } from '@/content/sections'
import { SITE } from '@/lib/site'

const CONNECT_LINKS = SOCIAL_LINKS.filter((s) => s.id !== 'resume')
const RESUME = SOCIAL_LINKS.find((s) => s.id === 'resume')

const HALF = Math.ceil(ALL_PAGES.length / 2)
const EXPLORE = ALL_PAGES.slice(0, HALF)
const MORE = ALL_PAGES.slice(HALF)

const linkCls =
  'text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60'

const headingCls = 'text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-4'

function NavColumn({ heading, items }: { heading: string; items: typeof ALL_PAGES }) {
  return (
    <div>
      <p className={headingCls}>{heading}</p>
      <ul className="space-y-2.5">
        {items.map((s) => (
          <li key={s.id}>
            <Link href={s.path} className={linkCls}>
              {s.navLabel}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--surface-border)]">
      <div className="container-wide px-6 md:px-10 lg:px-16 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <Link href="/" className="text-2xl font-bold font-mono text-gradient hover:opacity-80 transition-opacity">
              &lt;TJ /&gt;
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              AI Engineer building LLM applications, RAG pipelines, and production ML systems.
            </p>
            <p className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
              <MapPin size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
              {SITE.location}
            </p>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-xs font-medium text-green-700 dark:text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {SITE.availability}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-500">{SITE.openToRoles.join(' · ')}</p>
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-4 grid grid-cols-2 gap-8">
            <NavColumn heading="Explore" items={EXPLORE} />
            <NavColumn heading="More" items={MORE} />
          </nav>

          <div className="lg:col-span-3">
            <p className={headingCls}>Connect</p>
            <ul className="space-y-2.5">
              {CONNECT_LINKS.map(({ id, label, href, icon: Icon }) => (
                <li key={id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2.5 group ${linkCls}`}
                  >
                    <Icon size={15} className="shrink-0 group-hover:text-indigo-500 transition-colors" />
                    {label}
                  </a>
                </li>
              ))}

              {RESUME && (
                <li>
                  <a
                    href={RESUME.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2.5 group ${linkCls}`}
                  >
                    <RESUME.icon size={15} className="shrink-0 group-hover:text-indigo-500 transition-colors" />
                    {RESUME.label}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[var(--surface-border)]">
          <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
            {`© ${new Date().getFullYear()} ${SITE.name} · ${SITE.primaryRole} · All Rights Reserved.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
