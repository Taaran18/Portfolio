'use client'

import { useRef } from 'react'
import { m, useInView, useScroll, useSpring } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import clsx from 'clsx'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { EXPERIENCES } from '@/content/experience'
import { formatMonthYear } from '@/lib/format'
import { EASE_OUT } from '@/lib/motion'
import type { Experience as ExperienceEntry } from '@/types'

function Role({ exp }: { exp: ExperienceEntry }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  const seen = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  return (
    <m.li
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={seen ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-10 last:pb-0 sm:grid-cols-[3.5rem_1fr] sm:gap-7 sm:pb-14"
    >
      <div className="relative flex justify-center">
        <span
          className={clsx(
            'relative z-10 grid size-10 place-items-center rounded-2xl border transition-[background-color,border-color,color,box-shadow] duration-500 sm:size-12',
            inView || exp.current
              ? 'border-brand-600 bg-brand-700 text-white shadow-[0_0_0_6px_rgba(13,148,136,0.14)]'
              : 'border-[var(--surface-border)] bg-[var(--surface-bg)] text-slate-500'
          )}
        >
          <Briefcase size={18} aria-hidden="true" />
        </span>
      </div>

      <div
        className={clsx(
          'surface rounded-3xl p-6 transition-[border-color,box-shadow] duration-500 sm:p-7',
          inView && 'border-brand-500/40 surface-raise shadow-[var(--card-shadow-hover)]'
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">{exp.role}</h3>
            <p className="mt-0.5 font-semibold text-brand-700 dark:text-brand-400">{exp.company}</p>
          </div>
          <span className="flex items-center gap-2">
            {exp.current && <Badge tone="green">Current</Badge>}
            <span className="rounded-full border border-[var(--surface-border)] px-2.5 py-1 font-mono text-[0.7rem] text-slate-600 dark:text-slate-400">
              {formatMonthYear(exp.startDate)} –{' '}
              {exp.current ? 'Present' : exp.endDate ? formatMonthYear(exp.endDate) : ''}
            </span>
          </span>
        </div>

        <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300">{exp.description}</p>

        <ul className="mt-4 space-y-2">
          {exp.responsibilities.map((r) => (
            <li key={r} className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" />
              {r}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${exp.company} stack`}>
          {exp.technologies.map((t) => (
            <li key={t}>
              <Badge tone="brand" className="font-mono">
                {t}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </m.li>
  )
}

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" className="section-padding container-wide">
      <SectionHeader
        sectionId="experience"
        title="Two Years Shipping AI in Production"
        subtitle="Data Science at Celebal Technologies, Anomaly Detection at LogiScope and AI Products at e-Marketing.io, with client work across 10+ industries."
      />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-border)]">
              <div className="flex flex-col bg-[var(--surface-bg)] p-5">
                <p className="font-display text-4xl font-bold text-gradient">2+</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Years of professional ML & DL work</p>
              </div>
              <div className="flex flex-col bg-[var(--surface-bg)] p-5">
                <p className="font-display text-4xl font-bold text-gradient">{EXPERIENCES.length}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Companies</p>
              </div>
            </div>
            <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-400">
              From data science to deep learning on production systems to LLM products, with client work across{' '}
              <span className="font-semibold text-slate-900 dark:text-white">10+ industries</span> along the way.
            </p>
          </div>
        </Reveal>

        <ol ref={ref} className="relative lg:col-span-8">
          <span
            aria-hidden="true"
            className="absolute top-6 bottom-6 left-5 w-px -translate-x-1/2 bg-[var(--surface-border)] sm:left-7"
          />
          <m.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute top-6 bottom-6 left-5 w-px origin-top -translate-x-1/2 bg-brand-500 sm:left-7"
          />
          {EXPERIENCES.map((exp) => (
            <Role key={exp._id} exp={exp} />
          ))}
        </ol>
      </div>
    </section>
  )
}
