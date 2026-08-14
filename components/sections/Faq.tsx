'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQS } from '@/content/faqs'
import { EASE_OUT } from '@/lib/motion'

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?._id ?? null)

  return (
    <section id="faq" className="section-padding container-wide">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight text-center mb-3">
          Common Questions
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-10">
          The things people usually ask before getting in touch.
        </p>

        <ul className="space-y-3">
          {FAQS.map((faq) => {
            const open = openId === faq._id
            return (
              <li key={faq._id} className="surface rounded-3xl overflow-hidden">
                <h3>
                  <button
                    onClick={() => setOpenId(open ? null : faq._id)}
                    aria-expanded={open}
                    aria-controls={`faq-${faq._id}`}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded-3xl"
                  >
                    <span className="font-medium text-slate-900 dark:text-white">{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-${faq._id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
