'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import ThemeToggle from './ThemeToggle'
import { NAV_LINKS, SCROLL_SECTION_IDS } from '@/content/sections'
import { EASE_OUT } from '@/lib/motion'

const navLinks = NAV_LINKS.map((s) => ({ label: s.navLabel, href: s.path, id: s.id }))

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const isLinkActive = (link: { href: string; id: string }) =>
    isHome && SCROLL_SECTION_IDS.has(link.id) ? activeSection === link.id : pathname === link.href

  const resolveHref = (link: { href: string; id: string }) =>
    isHome && SCROLL_SECTION_IDS.has(link.id) ? `#${link.id}` : link.href

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return
    const sections = navLinks.map((l) => l.id)
    const observers: IntersectionObserver[] = []
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [isHome])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 flex flex-col items-center"
    >
      <nav
        className={clsx(
          'surface-nav rounded-full w-full max-w-5xl lg:max-w-6xl flex items-center justify-between gap-6',
          'pl-5 pr-3 sm:pl-6 sm:pr-3',
          'transition-[padding,background-color,box-shadow] duration-300',
          scrolled ? 'py-2' : 'py-2.5'
        )}
      >
        <Link href="/" className="text-xl font-bold font-mono text-gradient hover:opacity-80 transition-opacity shrink-0 mr-auto">
          &lt;TJ /&gt;
        </Link>

        <ul className="hidden md:flex items-center gap-5 lg:gap-7 shrink-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={resolveHref(link)}
                className={clsx(
                  'text-sm font-medium transition-colors relative group whitespace-nowrap rounded',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2',
                  isLinkActive(link)
                    ? 'text-indigo-700 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                )}
              >
                {link.label}
                <span className={clsx(
                  'absolute -bottom-0.5 left-0 h-px bg-indigo-500 transition-all duration-300',
                  isLinkActive(link) ? 'w-full' : 'w-0 group-hover:w-full'
                )} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2 shrink-0 ml-auto">
          <ThemeToggle />
          <Link
            href={isHome ? '#contact' : '/contact'}
            className="px-4 py-2 rounded-full border border-indigo-500/40 text-indigo-700 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-500/10 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2"
          >
            Let's Talk
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="md:hidden w-full max-w-sm surface-nav rounded-3xl mt-2 overflow-hidden"
          >
            <ul className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={resolveHref(link)}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'block text-base font-medium transition-colors',
                      isLinkActive(link)
                        ? 'text-indigo-700 dark:text-indigo-400'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
