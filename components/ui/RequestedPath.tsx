'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

export default function RequestedPath() {
  // The 404 page is prerendered without a path, so read it only on the client to avoid a hydration mismatch.
  const pathname = useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => null
  )
  if (!pathname || pathname === '/') return null

  return (
    <code className="font-mono text-[0.9em] px-1.5 py-0.5 rounded-md bg-[var(--bg-secondary)] border border-[var(--surface-border)] text-slate-800 dark:text-slate-200 break-all">
      {pathname}
    </code>
  )
}
