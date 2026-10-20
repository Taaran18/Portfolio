import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageNav from '@/components/ui/PageNav'
import { CASE_STUDIES, readingMinutes } from '@/content/case-studies'
import { caseStudyListSchema } from '@/lib/seo'
import { shimmerBlurDataURL } from '@/lib/image-placeholder'
import type { CaseStudy } from '@/types'

const description =
  'Case studies by Taaran Jain on RAG architecture, LangGraph agents, and ML and deep learning systems: design decisions, trade-offs and what failed first.'

export const metadata: Metadata = pageMetadata({
  title: 'AI Engineering Case Studies',
  description,
  path: '/case-studies',
})

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const href = `/case-studies/${study.slug}`
  const reverse = index % 2 === 1

  return (
    <Card
      padding="none"
      hover="lift"
      className={clsx(
        'relative grid overflow-hidden',
        reverse ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]' : 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]'
      )}
    >
      {study.imageUrl && (
        <div
          className={clsx(
            'relative aspect-[16/10] overflow-hidden bg-slate-900 lg:aspect-auto lg:min-h-full',
            reverse && 'lg:order-last'
          )}
        >
          <Image
            src={study.imageUrl}
            alt={`${study.title} interface`}
            fill
            priority={index === 0}
            placeholder="blur"
            blurDataURL={shimmerBlurDataURL()}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 760px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white backdrop-blur-sm">
            Case Study
          </span>
        </div>
      )}

      <div className="flex flex-col p-6 sm:p-8 xl:p-10">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          {study.timeline && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} aria-hidden="true" /> {study.timeline}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} aria-hidden="true" /> {readingMinutes(study)} min read
          </span>
        </div>

        <h2 className="mb-2 font-display text-2xl font-bold text-slate-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400 sm:text-3xl">
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-500/60"
          >
            {study.title}
          </Link>
        </h2>
        <p className="mb-4 text-base font-medium text-brand-700 dark:text-brand-400">{study.tagline}</p>
        <p className="card-body mb-6 text-left text-slate-600 dark:text-slate-400">{study.summary}</p>

        <dl className="mb-6 grid grid-cols-3 divide-x divide-[var(--surface-border)] rounded-2xl border border-[var(--surface-border)]">
          {study.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col px-3 py-3.5 text-center">
              <dt className="mt-1 text-[11px] leading-snug text-slate-500 dark:text-slate-400 sm:text-xs">
                {metric.label}
              </dt>
              <dd className="order-first text-xl font-bold leading-tight text-gradient sm:text-2xl">{metric.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {study.stack.map((tech) => (
              <Badge key={tech} tone="cyan" className="font-mono">
                {tech}
              </Badge>
            ))}
          </div>
          <span
            aria-hidden="true"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-all group-hover:gap-3 group-hover:bg-brand-800"
          >
            Read Case Study <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Card>
  )
}

export default function CaseStudiesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={caseStudyListSchema()} />
      <Breadcrumbs trail={[{ label: 'Case Studies' }]} className="px-4 pt-2" />

      <section className="section-padding container-wide">
        <SectionHeader
          sectionId="case-studies"
          title="Case Studies"
          subtitle="How each system works, the constraints and tradeoffs behind it, and the parts that didn't work the first time."
        />

        <div className="mx-auto grid max-w-3xl gap-8 lg:max-w-[1440px]">
          {CASE_STUDIES.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </div>
      </section>
      <PageNav path="/case-studies" />
    </main>
  )
}
