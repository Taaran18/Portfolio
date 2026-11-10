'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { currentVisit, utmParams } from '@/lib/analytics/client'

interface View {
  payload: Record<string, unknown>
  path: string
  activeMs: number
  visibleSince: number | null
  maxScroll: number
}

function send(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload)
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/track', new Blob([body], { type: 'application/json' }))
    return
  }
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {})
}

function scrollPercent(): number {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  if (scrollable <= 0) return 100
  return Math.min(100, Math.round((window.scrollY / scrollable) * 100))
}

function startView(path: string, firstOfPageLoad: boolean): View {
  const visit = currentVisit()
  return {
    path,
    payload: {
      id: crypto.randomUUID(),
      visitorId: visit.visitorId,
      sessionId: visit.sessionId,
      path,
      pageTitle: document.title,
      // After a client-side navigation document.referrer is stale, so only the first view reports it.
      referrer: firstOfPageLoad ? document.referrer || undefined : undefined,
      ...utmParams(),
      screenWidth: window.screen.width,
      language: navigator.language,
    },
    activeMs: 0,
    visibleSince: document.visibilityState === 'visible' ? performance.now() : null,
    maxScroll: 0,
  }
}

function pause(view: View) {
  if (view.visibleSince === null) return
  view.activeMs += performance.now() - view.visibleSince
  view.visibleSince = null
}

// Re-sending the same id is safe: the server only ever raises time and scroll depth.
function report(view: View) {
  const running = view.visibleSince === null ? 0 : performance.now() - view.visibleSince
  send({
    ...view.payload,
    durationSeconds: Math.round((view.activeMs + running) / 1000),
    maxScrollPercent: view.maxScroll,
  })
}

export default function Tracker() {
  const pathname = usePathname()
  const view = useRef<View | null>(null)

  useEffect(() => {
    if (pathname.startsWith('/admin')) return
    if (view.current?.path === pathname) return

    const previous = view.current
    if (previous) {
      pause(previous)
      report(previous)
    }
    view.current = startView(pathname, previous === null)
    report(view.current)
  }, [pathname])

  useEffect(() => {
    function measureScroll() {
      if (view.current) view.current.maxScroll = Math.max(view.current.maxScroll, scrollPercent())
    }

    function onVisibilityChange() {
      const current = view.current
      if (!current) return
      if (document.visibilityState === 'visible') {
        current.visibleSince ??= performance.now()
        return
      }
      measureScroll()
      pause(current)
      report(current)
    }

    function onPageHide() {
      if (!view.current) return
      measureScroll()
      pause(view.current)
      report(view.current)
    }

    window.addEventListener('scroll', measureScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pagehide', onPageHide)
    return () => {
      window.removeEventListener('scroll', measureScroll)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pagehide', onPageHide)
      if (view.current) report(view.current)
    }
  }, [])

  return null
}
