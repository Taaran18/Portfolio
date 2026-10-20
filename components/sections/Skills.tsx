import { Fragment } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import SectionHeader from '@/components/ui/SectionHeader'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import {
  SKILLS,
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_COLORS,
  SKILL_CATEGORIES,
  SKILL_TIER_LABELS,
  SKILL_TIER_ORDER,
  SKILL_EVIDENCE,
  SKILL_ALIASES,
} from '@/content/skills'
import { PROJECTS } from '@/content/projects'
import { EXPERIENCES } from '@/content/experience'
import type { Skill, SkillTier } from '@/types'

const CATEGORY_ORDER = SKILL_CATEGORIES.filter((c) => c !== 'all')

const PIPELINE = [
  { step: 'Language', tool: 'Python' },
  { step: 'Orchestration', tool: 'LangGraph' },
  { step: 'Retrieval', tool: 'RAG · pgvector' },
  { step: 'Models', tool: 'PyTorch · sklearn' },
  { step: 'API', tool: 'FastAPI' },
  { step: 'Interface', tool: 'Next.js' },
  { step: 'Ship', tool: 'Docker · GCP' },
]

const TIER_SHORT: Record<SkillTier, string> = { core: 'Daily', production: 'Production', working: 'Familiar' }

function TierMark({ tier }: { tier: SkillTier }) {
  return (
    <span
      title={SKILL_TIER_LABELS[tier]}
      className={clsx(
        'inline-flex items-center gap-1.5 font-mono text-[0.7rem]',
        tier === 'core' && 'text-brand-700 dark:text-brand-400',
        tier === 'production' && 'text-slate-600 dark:text-slate-400',
        tier === 'working' && 'text-slate-400 dark:text-slate-500'
      )}
    >
      <span
        aria-hidden="true"
        className={clsx(
          'size-2 rounded-full',
          tier === 'core' && 'bg-brand-600',
          tier === 'production' && 'border-2 border-brand-500/70',
          tier === 'working' && 'border border-dashed border-slate-400'
        )}
      />
      {TIER_SHORT[tier]}
    </span>
  )
}

interface Proof {
  label: string
  href?: string
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

function proofFor(skill: Skill): Proof[] {
  const keys = new Set([...skill.name.split('/').map(norm), ...(SKILL_ALIASES[skill.name] ?? [])])
  const curated = SKILL_EVIDENCE[skill.name] ?? []
  const uses = (techs: string[]) => techs.some((t) => keys.has(norm(t)))
  const jobs = EXPERIENCES.filter((e) => uses(e.technologies) || curated.includes(e.company.split(' ')[0])).map(
    (e) => ({ label: e.company.split(' ')[0], href: '/experience' })
  )
  const projects = PROJECTS.filter((p) => uses(p.technologies) || curated.includes(p.slug)).map((p) => ({
    label: p.title,
    href: p.caseStudySlug ? `/case-studies/${p.caseStudySlug}` : p.liveUrl,
  }))
  return [...jobs, ...projects]
}

function ProofLine({ proof }: { proof: Proof[] }) {
  if (proof.length === 0) return null
  const shown = proof.slice(0, 3)
  return (
    <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
      Used in{' '}
      {shown.map((p, i) => (
        <Fragment key={p.label}>
          {p.href ? (
            <Link
              href={p.href}
              className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-brand-700 hover:decoration-brand-500 dark:text-slate-300 dark:decoration-slate-600 dark:hover:text-brand-400"
            >
              {p.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-700 dark:text-slate-300">{p.label}</span>
          )}
          {i < shown.length - 1 && ', '}
        </Fragment>
      ))}
      {proof.length > 3 && ` +${proof.length - 3} more`}
    </p>
  )
}

function byTier(skills: Skill[]) {
  return [...skills].sort((a, b) => SKILL_TIER_ORDER.indexOf(a.tier) - SKILL_TIER_ORDER.indexOf(b.tier))
}

export default function Skills() {
  const groups = CATEGORY_ORDER.map((cat) => ({
    cat,
    skills: byTier(SKILLS.filter((s) => s.category === cat)),
  })).filter((g) => g.skills.length > 0)

  return (
    <section id="skills" className="section-padding container-wide">
      <SectionHeader
        sectionId="skills"
        title="Skills & Tech Stack"
        subtitle="Each skill shows where I've used it, in a project or at work, and how much: every day, in production, or just familiar."
      />

      <Reveal>
        <p className="eyebrow mb-4">How I build an LLM application</p>
        <ol className="surface flex flex-col gap-2 rounded-3xl p-4 sm:p-5 lg:flex-row lg:items-stretch lg:gap-0">
          {PIPELINE.map((item, i) => (
            <Fragment key={item.step}>
              <li className="flex flex-1 items-center gap-3 rounded-2xl px-3 py-2.5 lg:flex-col lg:items-start lg:gap-1 lg:py-3">
                <span className="font-mono text-[0.68rem] text-slate-500">
                  {String(i + 1).padStart(2, '0')} · {item.step}
                </span>
                <span className="font-display font-bold whitespace-nowrap text-slate-900 dark:text-white">
                  {item.tool}
                </span>
              </li>
              {i < PIPELINE.length - 1 && (
                <li aria-hidden="true" className="hidden items-center px-1 text-brand-500/70 lg:flex">
                  <ArrowRight size={16} />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2" delay={0.05}>
        {SKILL_TIER_ORDER.map((tier) => (
          <span key={tier} className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <TierMark tier={tier} />
            <span className="text-slate-400 dark:text-slate-600">=</span>
            {SKILL_TIER_LABELS[tier]}
          </span>
        ))}
      </Reveal>

      <Stagger className="mt-6 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {groups.map(({ cat, skills }) => (
          <StaggerItem key={cat} className="surface mb-4 break-inside-avoid rounded-3xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className={`size-2 shrink-0 rounded-full ${SKILL_CATEGORY_COLORS[cat]?.dot ?? 'bg-slate-400'}`} />
              <h3 className="font-display font-bold text-slate-900 dark:text-white">{SKILL_CATEGORY_LABELS[cat]}</h3>
              <span className="ml-auto font-mono text-xs text-slate-400">{skills.length}</span>
            </div>
            <ul>
              {skills.map((skill) => (
                <li
                  key={skill._id}
                  className="border-b border-dashed border-[var(--surface-border)] py-2.5 last:border-b-0"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[0.95rem] font-medium text-slate-800 dark:text-slate-200">{skill.name}</span>
                    <TierMark tier={skill.tier} />
                  </div>
                  <ProofLine proof={proofFor(skill)} />
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
