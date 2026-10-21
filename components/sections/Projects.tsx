'use client'

import { useRef, useState, type PointerEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, m, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ExternalLink, FlaskConical, Github } from 'lucide-react'
import clsx from 'clsx'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import ImageCarousel from '@/components/ui/ImageCarousel'
import { Reveal } from '@/components/ui/Reveal'
import { PROJECTS } from '@/content/projects'
import { EASE_OUT } from '@/lib/motion'
import type { Project } from '@/types'

const FEATURED_SLUGS = ['nexus-ai', 'decidex', 'logvera']
const FEATURED = FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter((p): p is Project =>
  Boolean(p)
)
const MORE = PROJECTS.filter((p) => !FEATURED_SLUGS.includes(p.slug))

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2'

function hostOf(url?: string) {
  return url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : ''
}

function BrowserFrame({ project, priority }: { project: Project; priority: boolean }) {
  return (
    <div className="surface shadow-pop overflow-hidden rounded-2xl">
      <div className="flex items-center gap-3 border-b border-[var(--surface-border)] px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-green-400/80" />
        </span>
        <span className="mx-auto truncate rounded-full bg-black/5 px-3 py-1 font-mono text-[0.7rem] text-slate-600 dark:bg-white/5 dark:text-slate-400">
          {hostOf(project.liveUrl) || project.title}
        </span>
        {project.liveUrl && (
          <span className="flex items-center gap-1.5 font-mono text-[0.7rem] text-green-700 dark:text-green-400">
            <span className="pulse-dot size-1.5 rounded-full bg-green-500 text-green-500" />
            Live
          </span>
        )}
      </div>
      <ImageCarousel
        images={project.images}
        label={`${project.title} screenshots`}
        priority={priority}
        interval={3500}
        className="rounded-none"
        sizes="(max-width: 1024px) 100vw, 760px"
      />
    </div>
  )
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const previewY = useTransform(scrollYProgress, [0, 1], [24, -24])
  const flip = index % 2 === 1

  const rows = [
    { label: 'Problem', value: project.problem },
    { label: 'What I Built', value: project.solution },
    { label: 'Result', value: project.impact[0] },
  ]

  return (
    <article ref={ref} className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
      <Reveal className={clsx('lg:col-span-7 lg:sticky lg:top-28', flip && 'lg:order-2')}>
        <div className="group relative">
          <div
            aria-hidden="true"
            className="absolute -inset-3 -z-10 rounded-[2rem] lg:-inset-6 bg-[radial-gradient(closest-side,rgba(13,148,136,0.18),transparent)] opacity-70 blur-xl transition-opacity duration-700 group-hover:opacity-100"
          />
          <m.div style={{ y: previewY }}>
            <BrowserFrame project={project} priority={false} />
          </m.div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className={clsx('lg:col-span-5', flip && 'lg:order-1')}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden="true" className="h-px w-8 bg-[var(--surface-border)]" />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-800 dark:text-brand-300">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-500" />
            {project.category}
          </span>
        </div>
        <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl xl:text-5xl">
          {project.title}
        </h3>
        <p className="lead mt-3">{project.tagline}</p>

        <dl className="mt-7 border-t border-[var(--surface-border)]">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-1.5 border-b border-[var(--surface-border)] py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-6"
            >
              <dt
                className={clsx(
                  'font-mono text-xs',
                  row.label === 'Result' ? 'text-brand-700 dark:text-brand-400' : 'text-slate-500'
                )}
              >
                {row.label}
              </dt>
              <dd
                className={clsx(
                  'text-[0.95rem] leading-relaxed',
                  row.label === 'Result'
                    ? 'font-medium text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400'
                )}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="surface flex flex-col rounded-2xl p-3.5">
              <p className="font-display text-xl font-bold tracking-tight text-gradient sm:text-2xl">{metric.value}</p>
              <p className="mt-1 text-[0.72rem] leading-snug text-slate-500 dark:text-slate-400">{metric.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 flex gap-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          <FlaskConical size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-700 dark:text-brand-400" />
          <span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">How it was measured: </span>
            {project.evidence}
          </span>
        </p>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`${project.title} stack`}>
          {project.technologies.slice(0, 7).map((tech) => (
            <li key={tech}>
              <Badge tone="cyan" className="font-mono">
                {tech}
              </Badge>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                'inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-accent-700 px-5 text-sm font-semibold text-white shadow-md shadow-brand-500/20 transition-transform duration-300 hover:-translate-y-0.5',
                focusRing
              )}
            >
              Try the Live Demo <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
          {project.caseStudySlug && (
            <Link
              href={`/case-studies/${project.caseStudySlug}`}
              className={clsx(
                'inline-flex h-11 items-center gap-2 rounded-full border border-brand-500/40 px-5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-500/10 dark:text-brand-400',
                focusRing
              )}
            >
              Read the Case Study <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                'inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                focusRing
              )}
            >
              <Github size={15} aria-hidden="true" /> Code
            </a>
          )}
        </div>
      </Reveal>
    </article>
  )
}

function ProjectIndex({ projects, startIndex }: { projects: Project[]; startIndex: number }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 })

  function track(event: PointerEvent, jump = false) {
    if (event.pointerType !== 'mouse') return
    const nextX = event.clientX + 28
    const nextY = Math.max(84, event.clientY - 110)
    x.set(nextX)
    y.set(nextY)
    if (jump) {
      springX.jump(nextX)
      springY.jump(nextY)
    }
  }

  const preview = hovered === null ? null : projects[hovered]

  return (
    <div onPointerMove={track} onPointerLeave={() => setHovered(null)} className="relative">
      <ul className="border-t border-[var(--surface-border)]">
        {projects.map((project, index) => (
          <li key={project.slug} className="border-b border-[var(--surface-border)]">
            <Link
              href={project.caseStudySlug ? `/case-studies/${project.caseStudySlug}` : (project.liveUrl ?? '#')}
              onPointerEnter={(event) => {
                if (event.pointerType !== 'mouse') return
                track(event, hovered === null)
                setHovered(index)
              }}
              className={clsx(
                'group relative isolate grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg py-5 text-left sm:gap-6 md:grid-cols-12 md:py-7',
                focusRing
              )}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-left scale-x-0 rounded-lg bg-brand-500/[0.06] transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span className="relative aspect-[16/10] w-20 overflow-hidden rounded-xl border border-[var(--surface-border)] bg-slate-900 md:hidden">
                <Image
                  src={project.images[0].src}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                />
              </span>
              <span className="hidden font-mono text-xs text-slate-500 md:col-span-1 md:block md:pl-2">
                {String(startIndex + index + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 md:col-span-5">
                <span className="block font-display text-2xl font-bold tracking-tight text-slate-900 transition-transform duration-500 ease-out group-hover:translate-x-2 dark:text-white sm:text-3xl lg:text-[2.25rem]">
                  {project.title}
                </span>
                <span className="mt-1.5 block text-sm text-slate-600 dark:text-slate-400">{project.tagline}</span>
              </span>
              <span className="hidden text-sm text-slate-600 dark:text-slate-400 md:col-span-2 md:block">
                {project.category}
              </span>
              <span className="hidden truncate font-mono text-xs text-slate-500 md:col-span-3 md:block">
                {project.technologies.slice(0, 3).join(' · ')}
              </span>
              <span className="flex justify-end md:col-span-1 md:pr-2">
                <span className="grid size-10 place-items-center rounded-full border border-[var(--surface-border)] text-slate-700 transition-[background-color,border-color,color,transform] duration-300 group-hover:rotate-45 group-hover:border-brand-600 group-hover:bg-brand-700 group-hover:text-white dark:text-slate-300">
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {preview && (
          <m.div
            key="preview"
            aria-hidden="true"
            style={{ left: springX, top: springY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="surface shadow-pop pointer-events-none fixed z-40 hidden w-[22rem] overflow-hidden rounded-2xl lg:block"
          >
            <div className="relative aspect-[16/10] bg-slate-900">
              <AnimatePresence mode="popLayout" initial={false}>
                <m.div
                  key={preview.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={preview.images[0].src}
                    alt={`${preview.title} preview`}
                    fill
                    sizes="352px"
                    className="object-cover object-top"
                  />
                </m.div>
              </AnimatePresence>
            </div>
            <p className="border-t border-[var(--surface-border)] px-3.5 py-2.5 text-xs text-slate-600 dark:text-slate-400">
              {preview.metrics[0].value} · {preview.metrics[0].label}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding container-wide overflow-x-clip">
      <SectionHeader
        sectionId="projects"
        title="AI Projects You Can Try Live"
        subtitle={`Each one solves a real problem and is live to try: an AI assistant that cites its sources, a churn model that tells teams who's about to leave, a log analyser that caught 588 login attacks, and ${PROJECTS.length - 3} more.`}
      />

      <div className="flex flex-col gap-24 lg:gap-32">
        {FEATURED.map((project, index) => (
          <FeaturedProject key={project.slug} project={project} index={index} />
        ))}
      </div>

      {MORE.length > 0 && (
        <Reveal className="mt-24 lg:mt-32">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              More Shipped Projects
            </h3>
            <Link
              href="/case-studies"
              className={clsx(
                'inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline underline-offset-4 dark:text-brand-400 rounded',
                focusRing
              )}
            >
              All Case Studies <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <ProjectIndex projects={MORE} startIndex={FEATURED.length} />
        </Reveal>
      )}
    </section>
  )
}
