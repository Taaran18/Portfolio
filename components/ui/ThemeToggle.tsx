'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />

  const isDark = theme === 'dark'
  const next = isDark ? 'light' : 'dark'

  function toggle() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion && document.startViewTransition) {
      document.startViewTransition(() => setTheme(next))
    } else {
      setTheme(next)
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden
        border border-[var(--surface-border)] text-[var(--text-muted)]
        hover:text-[var(--text-primary)] hover:border-indigo-500/40
        transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ y: 12, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -12, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
