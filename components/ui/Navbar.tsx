'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1))
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
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={clsx(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'py-3 shadow-lg dark:shadow-black/20 shadow-black/5 glass-dark dark:glass-dark backdrop-blur-xl border-b border-black/5 dark:border-white/5'
          : 'py-5'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-bold font-mono text-gradient hover:opacity-80 transition-opacity">
          &lt;TJ /&gt;
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={clsx(
                  'text-sm font-medium transition-colors relative group',
                  activeSection === link.href.slice(1)
                    ? 'text-cyan-500'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                )}
              >
                {link.label}
                <span className={clsx(
                  'absolute -bottom-0.5 left-0 h-px bg-cyan-500 transition-all duration-300',
                  activeSection === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                )} />
              </a>
            </li>
          ))}
          <li><ThemeToggle /></li>
          <li>
            <a
              href="#contact"
              className="px-4 py-2 rounded-lg border border-cyan-500/40 text-cyan-600 dark:text-cyan-400 text-sm font-medium hover:bg-cyan-500/10 transition-colors"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile row */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-black/5 dark:border-white/5 bg-white/90 dark:bg-[#0a0a1f]/90 backdrop-blur-xl"
          >
            <ul className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'block text-base font-medium transition-colors',
                      activeSection === link.href.slice(1)
                        ? 'text-cyan-500'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
