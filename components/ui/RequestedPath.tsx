'use client'

import { usePathname } from 'next/navigation'

export default function RequestedPath() {
  const pathname = usePathname()
  if (!pathname || pathname === '/') return null

  return (
    <code className="font-mono text-[0.9em] px-1.5 py-0.5 rounded-md bg-[var(--bg-secondary)] border border-[var(--surface-border)] text-slate-800 dark:text-slate-200 break-all">
      {pathname}
    </code>
  )
}
