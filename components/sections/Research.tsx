'use client'

import { ArrowUpRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import { PUBLISHED_PAPERS } from '@/content/research'

export default function Research() {
  return (
    <section id="research" className="section-padding container-wide">
      <SectionHeader
        sectionId="research"
        title="Published Research"
        subtitle="Papers on applied deep learning: reinforcement learning for trading, and multi-modal AI for medical diagnosis."
      />

      <Stagger as="ul" className="border-t border-[var(--surface-border)]">
        {PUBLISHED_PAPERS.map((paper, i) => (
          <StaggerItem as="li" key={paper._id} className="border-b border-[var(--surface-border)]">
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read the paper: ${paper.title} (opens in a new tab)`}
              className="group relative isolate grid gap-5 rounded-lg py-8 md:grid-cols-12 md:gap-8 md:py-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-left scale-x-0 rounded-lg bg-brand-500/[0.05] transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <div className="flex flex-wrap items-center gap-3 md:col-span-3 md:flex-col md:items-start md:gap-3 md:pl-2">
                <span className="font-mono text-xs text-slate-500">
                  {String(i + 1).padStart(2, '0')} · {paper.year}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-800 dark:text-brand-300">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-500" />
                  {paper.category}
                </span>
                {paper.venue && <span className="text-sm text-slate-600 dark:text-slate-400">{paper.venue}</span>}
              </div>

              <div className="md:col-span-8">
                <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400 sm:text-2xl">
                  {paper.title}
                </h3>
                <p className="mt-3 max-w-3xl leading-relaxed text-slate-600 dark:text-slate-400">{paper.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 dark:text-brand-400 md:hidden">
                  Read the paper <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </div>

              <div className="hidden justify-end md:col-span-1 md:flex md:pr-2">
                <span className="grid size-11 place-items-center rounded-full border border-[var(--surface-border)] text-slate-700 transition-[background-color,border-color,color,transform] duration-300 group-hover:rotate-45 group-hover:border-brand-600 group-hover:bg-brand-700 group-hover:text-white dark:text-slate-300">
                  <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
