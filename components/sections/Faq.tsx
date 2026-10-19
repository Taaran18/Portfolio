'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Plus } from 'lucide-react'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { FAQS } from '@/content/faqs'
import { SITE } from '@/lib/site'
import { EASE_OUT } from '@/lib/motion'

const buttonFocus =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2'

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?._id ?? null)
  const baseId = useId()
  const contactHref = usePathname() === '/' ? '#contact' : '/contact'

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-padding container-wide">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-20">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="heading-lg mt-4 text-slate-900 dark:text-white text-balance">
              Questions Recruiters Ask
            </h2>
            <p className="lead mt-6">
              The things recruiters usually ask me first: roles, location, stack and experience.
            </p>

            <div className="surface mt-10 rounded-3xl p-6">
              <p className="font-display text-lg font-bold text-slate-900 dark:text-white">Still have a question?</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Ask directly. I usually reply within a day.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href={contactHref}
                  className={clsx(
                    'inline-flex h-10 items-center rounded-full bg-gradient-to-r from-brand-700 to-accent-700 px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5',
                    buttonFocus
                  )}
                >
                  Ask a Question
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className={clsx(
                    'inline-flex h-10 items-center gap-1.5 rounded-full border border-brand-500/40 px-5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-500/10 dark:text-brand-400',
                    buttonFocus
                  )}
                >
                  <Mail size={14} aria-hidden="true" /> Email
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Stagger className="border-t border-[var(--surface-border)] lg:col-span-8">
          {FAQS.map((faq, index) => {
            const open = openId === faq._id
            const buttonId = `${baseId}-q-${faq._id}`
            const panelId = `${baseId}-a-${faq._id}`
            return (
              <StaggerItem key={faq._id} className="relative border-b border-[var(--surface-border)]">
                <span
                  aria-hidden="true"
                  className={clsx(
                    'absolute top-0 left-0 h-full w-0.5 origin-top bg-brand-500 transition-transform duration-500',
                    open ? 'scale-y-100' : 'scale-y-0'
                  )}
                />
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : faq._id)}
                    className={clsx(
                      'group flex w-full items-start gap-4 rounded-lg py-6 pr-1 pl-4 text-left sm:gap-6 sm:py-7 sm:pl-6',
                      buttonFocus
                    )}
                  >
                    <span className="mt-1.5 font-mono text-xs tabular-nums text-slate-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={clsx(
                        'flex-1 font-display text-lg font-bold leading-snug tracking-tight transition-colors sm:text-xl',
                        open
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white'
                      )}
                    >
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={clsx(
                        'grid size-8 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,transform] duration-300',
                        open
                          ? 'rotate-45 border-brand-600 bg-brand-700 text-white'
                          : 'border-[var(--surface-border)] text-slate-500 group-hover:border-brand-500/50 group-hover:text-brand-700 dark:group-hover:text-brand-400'
                      )}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pr-12 pb-7 pl-12 text-[0.98rem] leading-relaxed text-slate-600 dark:text-slate-400 sm:pl-[4.25rem]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
