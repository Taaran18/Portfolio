import Link from 'next/link'
import { ArrowUpRight, Briefcase, FileText, Mail, MapPin } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { SOCIAL_LINKS } from '@/content/social'
import { ALL_PAGES } from '@/content/sections'
import { LEGAL_DOCS } from '@/content/legal'
import { SITE } from '@/lib/site'

const CONNECT_LINKS = SOCIAL_LINKS.filter((s) => s.id !== 'resume')

const HALF = Math.ceil(ALL_PAGES.length / 2)
const EXPLORE = ALL_PAGES.slice(0, HALF)
const MORE = ALL_PAGES.slice(HALF)

const linkCls =
  'rounded text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70'

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 font-mono text-[0.78rem] font-medium text-brand-400">{title}</h2>
      <ul className="flex flex-col gap-3 text-[0.93rem]">{children}</ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative isolate mt-24 overflow-hidden border-t border-white/10 bg-[#050908] text-slate-200">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 radial-mask [background-image:linear-gradient(rgba(45,212,191,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.06)_1px,transparent_1px)] [background-size:64px_64px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-2/3 bg-[radial-gradient(50%_60%_at_80%_0%,rgba(13,148,136,0.22),transparent)]"
      />

      <div className="container-wide px-4 pt-20 pb-10 sm:px-6 md:px-10 md:pt-28 lg:px-16 xl:px-24 2xl:px-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-2.5 font-mono text-[0.78rem] text-green-400">
              <span className="pulse-dot size-2 rounded-full bg-green-400 text-green-400" />
              {SITE.availability}
            </p>
            <p className="mt-6 max-w-[15ch] font-display text-[clamp(2.4rem,1.2rem+3.6vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white text-balance">
              Looking for an AI Engineer? <span className="text-brand-400">Let&apos;s Talk.</span>
            </p>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-4 lg:items-end lg:text-right">
            <p className="max-w-sm text-slate-400">
              Send me the role or the problem. I reply to every message, usually within a day.
            </p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 px-6 font-semibold text-white shadow-lg shadow-brand-900/40 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050908]"
              >
                Get in Touch <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <a
                href={SITE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70"
              >
                <FileText size={16} aria-hidden="true" /> Resume
              </a>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="my-16 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:my-20"
        />

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo onDark />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-slate-400">
              AI engineer and full-stack developer. I build RAG apps, LangGraph agents and ML systems, and you can try
              every one of them.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400">
              <MapPin size={14} aria-hidden="true" className="text-brand-400" />
              {SITE.location}
            </p>
            <ul className="mt-6 flex gap-2">
              {CONNECT_LINKS.map(({ id, label, href, icon: Icon }) => (
                <li key={id}>
                  <a
                    href={href}
                    {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    aria-label={label}
                    title={label}
                    className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70"
                  >
                    <Icon size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8 sm:col-span-2 lg:col-span-5">
            <Column title="Explore">
              {EXPLORE.map((s) => (
                <li key={s.id}>
                  <Link href={s.path} className={linkCls}>
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="More">
              {MORE.map((s) => (
                <li key={s.id}>
                  <Link href={s.path} className={linkCls}>
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </Column>
          </nav>

          <div className="sm:col-span-2 lg:col-span-3">
            <Column title="Reach Me">
              <li>
                <a href={`mailto:${SITE.email}`} className={`${linkCls} inline-flex items-center gap-2.5 break-all`}>
                  <Mail size={15} aria-hidden="true" className="shrink-0 text-slate-500" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkCls} inline-flex items-center gap-2.5`}
                >
                  <FileText size={15} aria-hidden="true" className="shrink-0 text-slate-500" />
                  Resume
                </a>
              </li>
              <li>
                <a
                  href={SITE.freelanceUrl}
                  target="_blank"
                  rel="noopener"
                  className={`${linkCls} inline-flex items-center gap-2.5`}
                >
                  <Briefcase size={15} aria-hidden="true" className="shrink-0 text-slate-500" />
                  Freelance Studio
                </a>
              </li>
            </Column>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="text-center text-xs text-slate-500 sm:text-left">
            {`© ${new Date().getFullYear()} ${SITE.name} · ${SITE.primaryRole} · All Rights Reserved.`}
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
              {LEGAL_DOCS.map((doc) => (
                <li key={doc.id}>
                  <Link href={doc.path} className={linkCls}>
                    {doc.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
