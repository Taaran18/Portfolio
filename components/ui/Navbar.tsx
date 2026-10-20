'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, FileText } from 'lucide-react'
import clsx from 'clsx'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'
import { NAV_LINKS, SCROLL_SECTION_IDS } from '@/content/sections'
import { SOCIAL_LINKS } from '@/content/social'
import { SITE } from '@/lib/site'
import { EASE_OUT } from '@/lib/motion'

const navLinks = NAV_LINKS.map((s) => ({ label: s.navLabel, href: s.path, id: s.id }))
const MOBILE_SOCIALS = SOCIAL_LINKS.filter((s) => s.id === 'github' || s.id === 'linkedin' || s.id === 'email')

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]'

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('')
  const [lastPath, setLastPath] = useState(pathname)

  if (pathname !== lastPath) {
    setLastPath(pathname)
    setMobileOpen(false)
  }

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 12)
    if (y < window.innerHeight * 0.5) setActiveSection('')
  })

  const isLinkActive = (link: { href: string; id: string }) =>
    isHome && SCROLL_SECTION_IDS.has(link.id) ? activeSection === link.id : pathname === link.href

  const resolveHref = (link: { href: string; id: string }) =>
    isHome && SCROLL_SECTION_IDS.has(link.id) ? `#${link.id}` : link.href

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  useEffect(() => {
    if (!isHome) return
    const observers: IntersectionObserver[] = []
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [isHome])

  useEffect(() => {
    if (!mobileOpen) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  const activeHref = navLinks.find(isLinkActive)?.href ?? null
  const indicator = hovered ?? activeHref
  const elevated = scrolled || mobileOpen
  const contactHref = isHome ? '#contact' : '/contact'

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <div
        className={clsx(
          'relative border-b transition-[background-color,border-color] duration-300',
          elevated
            ? 'border-[var(--surface-border)] bg-white/80 backdrop-blur-xl backdrop-saturate-150 dark:bg-black/70'
            : 'border-transparent bg-transparent'
        )}
      >
        <div className="container-wide flex h-[4.5rem] items-center justify-between gap-6 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <Logo />

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-0.5" onPointerLeave={() => setHovered(null)}>
              {navLinks.map((link) => {
                const active = isLinkActive(link)
                return (
                  <li key={link.href} onPointerEnter={() => setHovered(link.href)}>
                    <Link
                      href={resolveHref(link)}
                      aria-current={active ? 'page' : undefined}
                      className={clsx(
                        'relative isolate flex h-9 items-center rounded-full px-3.5 text-[0.9rem] font-medium whitespace-nowrap transition-colors duration-200',
                        focusRing,
                        active
                          ? 'text-brand-700 dark:text-brand-400'
                          : hovered === link.href
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-600 dark:text-slate-400'
                      )}
                    >
                      {indicator === link.href && (
                        <m.span
                          layoutId="nav-indicator"
                          aria-hidden="true"
                          className={clsx(
                            'absolute inset-0 -z-10 rounded-full',
                            active && !hovered
                              ? 'bg-brand-500/10 ring-1 ring-brand-500/25'
                              : 'bg-black/[0.05] dark:bg-white/[0.07]'
                          )}
                          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                        />
                      )}
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <ThemeToggle />
            <a
              href={SITE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                'hidden h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-black/[0.05] hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.07] dark:hover:text-white md:inline-flex',
                focusRing
              )}
            >
              <FileText size={15} aria-hidden="true" />
              Resume
            </a>
            <Link
              href={contactHref}
              className={clsx(
                'hidden h-10 items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-700 to-accent-700 px-5 text-sm font-semibold text-white shadow-md shadow-brand-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/30 sm:inline-flex',
                focusRing
              )}
            >
              Let&apos;s Talk
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={clsx(
                'relative grid size-10 place-items-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-bg)] text-slate-900 transition-colors hover:border-brand-500/40 dark:text-white xl:hidden',
                focusRing
              )}
            >
              <span aria-hidden="true" className="relative block h-3 w-4">
                <span
                  className={clsx(
                    'absolute left-0 h-[1.5px] w-4 rounded bg-current transition-all duration-300',
                    mobileOpen ? 'top-[5px] rotate-45' : 'top-0'
                  )}
                />
                <span
                  className={clsx(
                    'absolute left-0 h-[1.5px] w-4 rounded bg-current transition-all duration-300',
                    mobileOpen ? 'top-[5px] -rotate-45' : 'top-[10px]'
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        <m.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-gradient-to-r from-brand-600 to-accent-500"
        />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto overscroll-contain bg-[var(--bg-primary)] xl:hidden"
          >
            <nav aria-label="Mobile" className="flex min-h-full flex-col px-4 pt-4 pb-10 sm:px-6 md:px-10">
              <ul className="flex flex-col">
                {navLinks.map((link, index) => {
                  const active = isLinkActive(link)
                  return (
                    <m.li
                      key={link.href}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.04 + index * 0.045 }}
                      className="border-b border-[var(--surface-border)]"
                    >
                      <Link
                        href={resolveHref(link)}
                        onClick={closeMobile}
                        aria-current={active ? 'page' : undefined}
                        className="group flex items-center justify-between py-4"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, '0')}</span>
                          <span
                            className={clsx(
                              'font-display text-[1.75rem] font-bold leading-none tracking-tight sm:text-[2.25rem]',
                              active ? 'text-brand-700 dark:text-brand-400' : 'text-slate-900 dark:text-white'
                            )}
                          >
                            {link.label}
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>
                    </m.li>
                  )
                })}
              </ul>

              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.36 }}
                className="mt-auto flex flex-col gap-3 pt-10"
              >
                <Link
                  href={contactHref}
                  onClick={closeMobile}
                  className="flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-brand-700 to-accent-700 font-semibold text-white"
                >
                  Let&apos;s Talk
                </Link>
                <a
                  href={SITE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-brand-500/40 font-semibold text-brand-700 dark:text-brand-400"
                >
                  <FileText size={16} aria-hidden="true" /> View Resume
                </a>
                <ul className="mt-5 flex items-center justify-center gap-2">
                  {MOBILE_SOCIALS.map(({ id, label, href, icon: Icon }) => (
                    <li key={id}>
                      <a
                        href={href}
                        target={href.startsWith('mailto:') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid size-11 place-items-center rounded-xl border border-[var(--surface-border)] text-slate-600 transition-colors hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-400"
                      >
                        <Icon size={18} />
                      </a>
                    </li>
                  ))}
                </ul>
              </m.div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
