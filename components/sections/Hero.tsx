import { Fragment } from 'react'
import clsx from 'clsx'
import { ArrowRight, FileText } from 'lucide-react'
import Button from '@/components/ui/Button'
import HeroConsole from '@/components/sections/HeroConsole'
import ParallaxLayer from '@/components/ui/ParallaxLayer'
import { HERO_DESCRIPTION, HERO_HEADLINE, HERO_NAME, HERO_ROLE_LINE, HERO_STACK, HERO_STATS } from '@/content/hero'
import { EXPERIENCES } from '@/content/experience'
import { SOCIAL_LINKS } from '@/content/social'
import { SITE } from '@/lib/site'

const PROFILE_LINKS = SOCIAL_LINKS.filter((s) => s.id === 'github' || s.id === 'linkedin' || s.id === 'email')

function MaskWord({ children, className }: { children: string; className?: string }) {
  return <span className={className}>{children}</span>
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-24 sm:pt-28">
      <div aria-hidden="true" className="blueprint radial-mask pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%] bg-[radial-gradient(60%_50%_at_75%_0%,rgba(13,148,136,0.12),transparent)]"
      />

      <div className="container-wide px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 grid items-center gap-14 pt-8 pb-16 xl:min-h-[calc(100svh-7rem)] xl:grid-cols-12 xl:gap-12 lg:pb-24">
        <ParallaxLayer distance={40} className="xl:col-span-7">
          <p className="inline-flex items-center gap-2.5 rounded-full surface py-1.5 pl-2 pr-4 text-sm text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5 rounded-full bg-green-500/15 px-2 py-0.5 font-mono text-[0.7rem] font-medium text-green-700 dark:text-green-400">
              <span className="pulse-dot size-1.5 rounded-full bg-green-500 text-green-500" />
              Open
            </span>
            {SITE.availability}
          </p>

          <h1 id="hero-title" className="mt-8">
            <span className="mb-4 block font-mono text-sm font-medium text-brand-700 dark:text-brand-400">
              {HERO_ROLE_LINE}
            </span>
            <span className="display-1 block">
              {HERO_NAME.map((word, i) => (
                <Fragment key={word}>
                  <MaskWord>{word}</MaskWord>
                  {i < HERO_NAME.length - 1 && ' '}
                </Fragment>
              ))}
            </span>
          </h1>

          <p className="mt-4 max-w-[24ch] font-display text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] font-semibold leading-[1.15] tracking-tight text-slate-700 dark:text-slate-200 text-balance">
            {HERO_HEADLINE.map((word, i) => (
              <Fragment key={word.text}>
                <MaskWord className={word.accent ? 'text-brand-700 dark:text-brand-400' : undefined}>
                  {word.text}
                </MaskWord>
                {i < HERO_HEADLINE.length - 1 && ' '}
              </Fragment>
            ))}
          </p>

          <p className="lead mt-6 max-w-[38rem]">{HERO_DESCRIPTION}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button as="a" href="#projects" variant="primary" className="glow-accent">
              See Live Projects <ArrowRight size={16} />
            </Button>
            <Button as="a" href={SITE.resumeUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
              <FileText size={16} /> View Resume
            </Button>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-[var(--surface-border)] border-y border-[var(--surface-border)]">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col px-3 py-4 first:pl-0 sm:px-5">
                <p className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-slate-600 dark:text-slate-400 sm:text-[0.8rem]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {PROFILE_LINKS.map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-400 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
                >
                  <Icon size={17} strokeWidth={1.75} className="transition-transform group-hover:-rotate-6" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </ParallaxLayer>

        <ParallaxLayer distance={90} className="xl:col-span-5">
          <HeroConsole />
        </ParallaxLayer>
      </div>

      <div className="border-y border-[var(--surface-border)] bg-white/60 dark:bg-black/40 backdrop-blur-sm">
        <div className="container-wide px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:gap-10">
          <p className="shrink-0 text-sm text-slate-600 dark:text-slate-400">
            <span className="eyebrow mr-2">Experience</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              2+ years · {EXPERIENCES.length} companies · 10+ industries
            </span>
          </p>
          <div className="marquee fade-mask-x relative min-w-0 flex-1 overflow-hidden">
            <ul aria-label="Core stack" className="marquee-track flex w-max gap-2.5">
              {[...HERO_STACK, ...HERO_STACK].map((tech, i) => (
                <li
                  key={`${tech}-${i}`}
                  aria-hidden={i >= HERO_STACK.length || undefined}
                  className="rounded-full border border-[var(--surface-border)] bg-[var(--surface-bg)] px-3 py-1.5 font-mono text-[0.78rem] whitespace-nowrap text-slate-600 dark:text-slate-300"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
