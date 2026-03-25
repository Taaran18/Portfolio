'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all
        border border-transparent
        hover:border-cyan-400/30 hover:bg-cyan-400/10
        dark:hover:border-cyan-400/30 dark:hover:bg-cyan-400/10"
    >
      <Sun
        size={17}
        className={`absolute transition-all duration-300 text-amber-400
          ${isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
      />
      <Moon
        size={17}
        className={`absolute transition-all duration-300 text-cyan-400
          ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
      />
    </button>
  )
}
