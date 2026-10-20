'use client'

import { m, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, FileText, GitBranch, Search, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'
import { useIntroDone } from '@/lib/intro'

const NEXUS_URL = 'https://nexus-ai.taaranjain.com'

const STEPS: { icon: LucideIcon; name: string; detail: string; ms: string }[] = [
  { icon: GitBranch, name: 'Route', detail: 'documents', ms: '38 ms' },
  { icon: Search, name: 'Retrieve', detail: 'top 4 · cosine ≥ 0.2', ms: '112 ms' },
  { icon: Sparkles, name: 'Generate', detail: 'Groq LLM', ms: '640 ms' },
  { icon: FileText, name: 'Cite', detail: 'page + line', ms: '9 ms' },
]

const METRICS = [
  { label: 'Latency', value: '0.8s' },
  { label: 'Tokens', value: '1,204' },
  { label: 'Sources', value: '4' },
]

function panel(delay: number, active: boolean) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: active ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.7, ease: EASE_OUT, delay },
  }
}

export default function HeroConsole() {
  const reduce = useReducedMotion()
  const active = useIntroDone()

  return (
    <figure className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_60%_40%,rgba(13,148,136,0.16),transparent)]"
      />
      <m.div
        initial={{ opacity: 0, rotateX: 8, y: 24 }}
        animate={active ? { opacity: 1, rotateX: 0, y: 0 } : undefined}
        transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.3 }}
        style={{ transformPerspective: 1600 }}
        className="surface shadow-pop rounded-3xl overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex items-center gap-3 border-b border-[var(--surface-border)] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-green-400/80" />
          </div>
          <span className="mx-auto truncate rounded-full bg-black/5 dark:bg-white/5 px-3 py-1 font-mono text-[0.7rem] text-slate-600 dark:text-slate-400">
            nexus-ai.taaranjain.com
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[0.7rem] text-green-700 dark:text-green-400">
            <span className="pulse-dot size-1.5 rounded-full bg-green-500 text-green-500" />
            Live
          </span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <m.div {...panel(0.55, active)} className="flex justify-end">
            <p className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-700 px-4 py-2.5 text-sm text-white">
              What notice period does our leave policy require?
            </p>
          </m.div>

          <m.div
            {...panel(0.7, active)}
            className="rounded-2xl border border-[var(--surface-border)] bg-black/[0.02] dark:bg-white/[0.02] p-3"
          >
            <p className="mb-2.5 flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-wider text-slate-500">
              <span>LangGraph pipeline</span>
              <span>streamed live</span>
            </p>
            <ol className="relative grid grid-cols-4 gap-2">
              <span className="absolute left-[12.5%] right-[12.5%] top-4 h-px bg-[var(--surface-border)]" />
              {!reduce && active && (
                <m.span
                  className="absolute top-[13px] size-2 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]"
                  initial={{ left: '12.5%' }}
                  animate={{ left: ['12.5%', '86%'] }}
                  transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6, delay: 1.4 }}
                />
              )}
              {STEPS.map((step, i) => (
                <m.li
                  key={step.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={active ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.85 + i * 0.12 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <span className="relative z-10 flex size-8 items-center justify-center rounded-full border border-brand-500/30 bg-[var(--surface-bg)] text-brand-700 dark:text-brand-400">
                    <step.icon size={14} />
                  </span>
                  <span className="mt-2 text-xs font-semibold text-slate-900 dark:text-white">{step.name}</span>
                  <span className="mt-0.5 hidden text-[0.65rem] leading-tight text-slate-500 sm:block">
                    {step.detail}
                  </span>
                  <span className="mt-1 font-mono text-[0.65rem] text-brand-700 dark:text-brand-400">{step.ms}</span>
                </m.li>
              ))}
            </ol>
          </m.div>

          <m.div {...panel(1.35, active)} className="max-w-[92%] rounded-2xl rounded-bl-md surface px-4 py-3">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Employees must give{' '}
              <span className="font-semibold text-slate-900 dark:text-white">30 days&apos; notice</span> for planned
              leave longer than two weeks.
            </p>
            <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 font-mono text-[0.68rem] text-brand-800 dark:text-brand-300">
              <FileText size={11} />
              leave-policy.pdf · p.4 · lines 12–18
            </p>
          </m.div>

          <m.div
            {...panel(1.55, active)}
            className="grid grid-cols-3 divide-x divide-[var(--surface-border)] rounded-2xl border border-[var(--surface-border)]"
          >
            {METRICS.map((m) => (
              <div key={m.label} className="flex flex-col px-3 py-2.5">
                <p className="font-display text-lg font-bold text-slate-900 dark:text-white">{m.value}</p>
                <p className="text-[0.68rem] text-slate-500">{m.label}</p>
              </div>
            ))}
          </m.div>
        </div>
      </m.div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-500 dark:text-slate-400">
        <span>Illustrative trace of how Nexus AI answers: route, retrieve, generate, cite.</span>
        <a
          href={NEXUS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-brand-700 dark:text-brand-400 hover:underline underline-offset-4 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
        >
          Try it live <ArrowUpRight size={13} />
        </a>
      </figcaption>
    </figure>
  )
}
