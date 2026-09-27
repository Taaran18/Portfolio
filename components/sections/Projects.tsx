'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, CircleAlert, ExternalLink, Github, Pause, Play, TrendingUp, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import ImageCarousel from '@/components/ui/ImageCarousel'
import { PROJECTS } from '@/content/projects'
import { EASE_OUT, fadeInScale } from '@/lib/motion'
import type { Project } from '@/types'

const PANEL_ID = 'project-showcase-panel'

const linkFocus =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 rounded'

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo`}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2"
        >
          Live Demo <ExternalLink size={13} />
        </a>
      )}
      {project.caseStudySlug && (
        <Link
          href={`/case-studies/${project.caseStudySlug}`}
          aria-label={`${project.title} case study`}
          className={`inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-brand-400 transition-colors ${linkFocus}`}
        >
          Read Case Study <ArrowRight size={14} />
        </Link>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code on GitHub`}
          className={`inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors ${linkFocus}`}
        >
          <Github size={15} /> Code
        </a>
      )}
    </div>
  )
}

function SubHeading({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <p className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
      <Icon size={14} className="text-brand-700 dark:text-brand-400" aria-hidden="true" />
      {children}
    </p>
  )
}

function ProjectPanel({
  project,
  priority,
  onSlideChange,
  onCycleComplete,
}: {
  project: Project
  priority: boolean
  onSlideChange: (index: number) => void
  onCycleComplete?: () => void
}) {
  return (
    <motion.article
      id={PANEL_ID}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className="surface min-w-0 overflow-hidden rounded-3xl p-3 pb-6 sm:p-4 sm:pb-7 xl:p-6"
    >
      <div className="grid gap-6 xl:grid-cols-2 xl:items-center xl:gap-10">
        <div className="flex min-w-0 flex-col gap-4">
          <ImageCarousel
            images={project.images}
            label={`${project.title} screenshots`}
            priority={priority}
            className="rounded-2xl"
            sizes="(max-width: 1280px) 100vw, 640px"
            onIndexChange={onSlideChange}
            onCycleComplete={onCycleComplete}
          />
          <dl className="grid grid-cols-3 divide-x divide-[var(--surface-border)] rounded-2xl border border-[var(--surface-border)]">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col px-2 py-3.5 text-center sm:px-4">
                <dt className="mt-1 text-[11px] leading-snug text-slate-500 dark:text-slate-400 sm:text-xs">
                  {metric.label}
                </dt>
                <dd className="order-first font-display text-xl font-bold leading-tight text-gradient sm:text-2xl">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0 px-3 sm:px-4 xl:px-0 xl:pr-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-400">
            {project.tagline}
          </p>
          <h3 className="mb-6 font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl 2xl:text-4xl">
            {project.title}
          </h3>
          <SubHeading icon={CircleAlert}>The Problem</SubHeading>
          <p className="mb-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300 2xl:text-base">
            {project.problem}
          </p>
          <SubHeading icon={Wrench}>What I Built</SubHeading>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 2xl:text-base">{project.solution}</p>
        </div>
      </div>

      <div className="mt-8 px-3 sm:px-4 xl:px-1">
        <SubHeading icon={TrendingUp}>Impact</SubHeading>
        <ul className="grid gap-x-10 gap-y-3 md:grid-cols-2">
          {project.impact.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <Check size={16} className="mt-0.5 shrink-0 text-brand-700 dark:text-brand-400" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-3 mt-8 flex flex-col gap-5 border-t border-[var(--surface-border)] pt-6 sm:mx-4 lg:flex-row lg:items-center lg:justify-between xl:mx-1">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <Badge key={t} tone="cyan" className="font-mono">
              {t}
            </Badge>
          ))}
        </div>
        <div className="shrink-0">
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  )
}

function ProjectListItem({
  project,
  active,
  slide,
  onSelect,
}: {
  project: Project
  active: boolean
  slide: number
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active}
      aria-controls={PANEL_ID}
      className={clsx(
        'group/item flex w-72 shrink-0 snap-start items-center gap-3 rounded-2xl border p-3 text-left lg:p-2.5 transition-all duration-300 lg:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60',
        active
          ? 'border-brand-500/50 bg-brand-500/[0.07] shadow-sm'
          : 'surface border-[var(--surface-border)] hover:border-brand-500/30'
      )}
    >
      <span className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-lg bg-slate-900 lg:w-20">
        <Image
          src={project.images[0].src}
          alt=""
          fill
          sizes="96px"
          className={clsx(
            'object-cover object-top transition-opacity duration-300',
            active ? 'opacity-100' : 'opacity-75 group-hover/item:opacity-100'
          )}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={clsx(
            'block truncate font-display text-sm font-semibold transition-colors',
            active ? 'text-brand-700 dark:text-brand-400' : 'text-slate-900 dark:text-white'
          )}
        >
          {project.title}
        </span>
        <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-slate-600 dark:text-slate-400">
          {project.tagline}
        </span>
        <span className="mt-2 flex gap-1" aria-hidden="true">
          {project.images.map((image, i) => (
            <span
              key={image.src}
              className={clsx(
                'h-1 flex-1 rounded-full transition-colors duration-500',
                active && i <= slide ? 'bg-brand-600 dark:bg-brand-400' : 'bg-slate-300/70 dark:bg-slate-700'
              )}
            />
          ))}
        </span>
      </span>
    </button>
  )
}

export default function Projects() {
  const [active, setActive] = useState(0)
  const [slide, setSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const listRef = useRef<HTMLDivElement>(null)
  const project = PROJECTS[active]
  const multiple = PROJECTS.length > 1

  const advance = useCallback(() => {
    setSlide(0)
    setActive((current) => (current + 1) % PROJECTS.length)
  }, [])

  function select(index: number) {
    setAutoPlay(false)
    if (index === active) return
    setSlide(0)
    setActive(index)
  }

  useEffect(() => {
    const list = listRef.current
    const item = list?.children[active] as HTMLElement | undefined
    if (!list || !item) return
    if (list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: item.offsetLeft - list.offsetLeft - 4, behavior: 'smooth' })
    } else if (list.scrollHeight > list.clientHeight) {
      const top = item.offsetTop - list.offsetTop
      if (top < list.scrollTop || top + item.offsetHeight > list.scrollTop + list.clientHeight) {
        list.scrollTo({ top: top - 4, behavior: 'smooth' })
      }
    }
  }, [active])

  if (!project) return null

  return (
    <section id="projects" className="section-padding container-wide">
      <SectionHeader
        sectionId="projects"
        title="Selected Work"
        subtitle="Products I've designed, built and shipped end to end, from the model pipeline to the interface."
      />

      <motion.div
        {...fadeInScale({ duration: 0.6, y: 40 })}
        className={clsx(
          'mx-auto max-w-[1440px]',
          multiple && 'grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] 2xl:grid-cols-[minmax(0,1fr)_320px] lg:items-start'
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <ProjectPanel
            key={project.slug}
            project={project}
            priority={active === 0}
            onSlideChange={setSlide}
            onCycleComplete={multiple && autoPlay ? advance : undefined}
          />
        </AnimatePresence>

        {multiple && (
          <aside aria-label="All projects" className="order-first min-w-0 lg:order-none lg:sticky lg:top-28">
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                All Projects <span className="text-slate-400 dark:text-slate-500">({PROJECTS.length})</span>
              </p>
              <button
                type="button"
                onClick={() => setAutoPlay((on) => !on)}
                aria-pressed={autoPlay}
                className={`inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-400 transition-colors ${linkFocus}`}
              >
                {autoPlay ? <Pause size={12} aria-hidden="true" /> : <Play size={12} aria-hidden="true" />}
                {autoPlay ? 'Auto-Play On' : 'Auto-Play Off'}
              </button>
            </div>
            <div
              ref={listRef}
              className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2 lg:mx-0 lg:max-h-[calc(100vh-10rem)] lg:snap-y lg:flex-col lg:gap-2.5 lg:overflow-y-auto lg:overflow-x-hidden lg:p-1 lg:[scrollbar-width:thin]"
            >
              {PROJECTS.map((p, i) => (
                <ProjectListItem
                  key={p.slug}
                  project={p}
                  active={i === active}
                  slide={slide}
                  onSelect={() => select(i)}
                />
              ))}
            </div>
          </aside>
        )}
      </motion.div>
    </section>
  )
}
