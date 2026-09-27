'use client'

import { useEffect, useState } from 'react'
import { markIntroDone } from '@/lib/intro'

const SEEN_KEY = 'splash-seen'
const MIN_VISIBLE_MS = 1100
const EXIT_MS = 550

type Phase = 'visible' | 'leaving' | 'gone'

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>('visible')

  useEffect(() => {
    if (document.documentElement.dataset.splash === 'off' || window.location.pathname.startsWith('/admin')) {
      setPhase('gone')
      markIntroDone()
      return
    }

    let cancelled = false
    const elapsed = performance.now()
    const minDelay = new Promise((resolve) => setTimeout(resolve, Math.max(0, MIN_VISIBLE_MS - elapsed)))
    const fontsReady = document.fonts?.ready ?? Promise.resolve()

    Promise.all([minDelay, fontsReady]).then(() => {
      if (cancelled) return
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {}
      setPhase('leaving')
      markIntroDone()
      setTimeout(() => !cancelled && setPhase('gone'), EXIT_MS)
    })

    return () => {
      cancelled = true
    }
  }, [])

  if (phase === 'gone') return null

  return (
    <div className="splash" data-state={phase} aria-hidden="true">
      <div className="splash-logo font-mono font-bold text-gradient">
        <span className="splash-bracket splash-bracket-left">&lt;</span>
        <span className="splash-mark">TJ</span>
        <span className="splash-bracket splash-bracket-right">/&gt;</span>
      </div>
      <div className="splash-bar" />
    </div>
  )
}
