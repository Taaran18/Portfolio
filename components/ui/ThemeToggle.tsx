'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

type Theme = 'light' | 'dark'

const REVEAL_MS = 560

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.style.colorScheme = theme
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const busy = useRef(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />

  const isDark = resolvedTheme === 'dark'
  const next: Theme = isDark ? 'light' : 'dark'

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    if (busy.current) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !document.startViewTransition) {
      applyTheme(next)
      setTheme(next)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const root = document.documentElement

    busy.current = true
    root.classList.add('theme-switching')

    const transition = document.startViewTransition(() => {
      applyTheme(next)
      flushSync(() => setTheme(next))
    })

    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: REVEAL_MS,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      })
      .catch(() => {})

    transition.finished.finally(() => {
      root.classList.remove('theme-switching')
      busy.current = false
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden
        border border-[var(--surface-border)] text-[var(--text-muted)]
        hover:text-[var(--text-primary)] hover:border-brand-500/40 active:scale-90
        transition-[color,border-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, scale: 0.3, rotate: isDark ? -120 : 120 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.3, rotate: isDark ? 120 : -120 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
