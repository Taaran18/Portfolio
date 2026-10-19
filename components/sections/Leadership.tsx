'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import SectionHeader from '@/components/ui/SectionHeader'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import { LEADERSHIP_ROLES, LEADERSHIP_ICON_MAP } from '@/content/leadership'
import { EASE_OUT } from '@/lib/motion'

const PREVIEW_COUNT = 4

export default function Leadership() {
  const [showAll, setShowAll] = useState(false)
  const [openId, setOpenId] = useState<string | null>(LEADERSHIP_ROLES[0]?._id ?? null)
  const baseId = useId()
  const visible = showAll ? LEADERSHIP_ROLES : LEADERSHIP_ROLES.slice(0, PREVIEW_COUNT)

  return (
    <section id="leadership" className="section-padding container-wide">
      <SectionHeader
        sectionId="leadership"
        title="Leadership & Community"
        subtitle={`${LEADERSHIP_ROLES.length} college roles leading teams, mentoring students and running hackathons and technical events.`}
      />

      <Stagger key={showAll ? 'all' : 'preview'} as="ul" className="border-t border-[var(--surface-border)]" gap={0.05}>
        {visible.map((role) => {
          const Icon = LEADERSHIP_ICON_MAP[role.icon]
          const open = openId === role._id
          const panelId = `${baseId}-${role._id}`
          return (
            <StaggerItem as="li" key={role._id} className="relative border-b border-[var(--surface-border)]">
              <span
                aria-hidden="true"
                className={clsx(
                  'absolute top-0 left-0 h-full w-0.5 origin-top bg-brand-500 transition-transform duration-500',
                  open ? 'scale-y-100' : 'scale-y-0'
                )}
              />
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : role._id)}
                className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg py-5 pr-1 pl-4 text-left sm:gap-6 sm:pl-6 md:grid-cols-[auto_1fr_14rem_auto] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
              >
                <span
                  className={clsx(
                    'grid size-10 place-items-center rounded-xl border transition-colors duration-300',
                    open
                      ? 'border-brand-600 bg-brand-700 text-white'
                      : 'border-[var(--surface-border)] text-brand-700 dark:text-brand-400'
                  )}
                >
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-bold leading-snug tracking-tight text-slate-900 dark:text-white">
                    {role.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-brand-700 dark:text-brand-400">{role.organisation}</span>
                  <span className="mt-0.5 block font-mono text-xs text-slate-500 md:hidden">{role.period}</span>
                </span>
                <span className="hidden font-mono text-xs text-slate-500 md:block">{role.period}</span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={clsx('text-slate-500 transition-transform duration-300', open && 'rotate-180')}
                />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-3xl pr-4 pb-6 pl-4 sm:pl-[5.5rem]">
                      <p className="leading-relaxed text-slate-700 dark:text-slate-300">{role.description}</p>
                      <ul className="mt-3 space-y-1.5">
                        {role.impact.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                          >
                            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </StaggerItem>
          )
        })}
      </Stagger>

      {LEADERSHIP_ROLES.length > PREVIEW_COUNT && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-brand-500/40 px-6 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-500/10 dark:text-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
          >
            {showAll ? 'Show Fewer Roles' : `Show All ${LEADERSHIP_ROLES.length} Roles`}
            <ChevronDown
              size={16}
              aria-hidden="true"
              className={clsx('transition-transform', showAll && 'rotate-180')}
            />
          </button>
        </div>
      )}
    </section>
  )
}
