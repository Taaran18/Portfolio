'use client'

import { useEffect, useState } from 'react'
import { slugify } from '@/lib/format'
import type { ArticleSection } from '@/types'

export default function ArticleToc({ sections }: { sections: ArticleSection[] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const ids = sections.map((s) => slugify(s.heading))
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-25% 0px -65% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-4">
        On this page
      </p>
      <ul className="space-y-1 border-l border-[var(--surface-border)]">
        {sections.map((section) => {
          const id = slugify(section.heading)
          const active = activeId === id
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active ? 'true' : undefined}
                className={`block -ml-px border-l-2 pl-4 py-1.5 text-[13px] leading-snug transition-colors rounded-r
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 ${
                    active
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'border-transparent text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
              >
                {section.heading}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
