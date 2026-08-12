'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

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

export default function Tracker() {
  const pathname = usePathname()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    if (pathname.startsWith('/admin')) return
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    send({ type: 'page_view', path: pathname, referrer: document.referrer || undefined })
  }, [pathname])

  useEffect(() => {
    if (pathname.startsWith('/admin')) return

    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#')) return

      const isExternal = /^https?:\/\//i.test(href) && !href.includes(window.location.host)
      const isMailto = href.startsWith('mailto:')
      const isTel = href.startsWith('tel:')
      if (!isExternal && !isMailto && !isTel) return

      const label =
        anchor.getAttribute('aria-label') ||
        anchor.textContent?.trim().slice(0, 60) ||
        new URL(href, window.location.origin).hostname

      send({ type: 'link_click', path: pathname, label, href })
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [pathname])

  return null
}
