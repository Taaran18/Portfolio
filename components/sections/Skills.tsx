'use client'

import { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import {
  SKILLS,
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_COLORS,
  SKILL_CATEGORIES,
  SKILL_TIER_LABELS,
  SKILL_TIER_ORDER,
  SKILL_TIER_STYLES,
  type SkillCategory,
} from '@/content/skills'
import { fadeInScale } from '@/lib/motion'
import type { Skill } from '@/types'

const CATEGORY_ORDER = SKILL_CATEGORIES.filter((c) => c !== 'all')

const pillBase = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border'

function SkillPill({ skill }: { skill: Skill }) {
  return (
    <span className={`${pillBase} ${SKILL_TIER_STYLES[skill.tier]}`} title={SKILL_TIER_LABELS[skill.tier]}>
      {skill.name}
    </span>
  )
}

function byTier(skills: Skill[]) {
  return [...skills].sort(
    (a, b) => SKILL_TIER_ORDER.indexOf(a.tier) - SKILL_TIER_ORDER.indexOf(b.tier)
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all')

  const groups =
    activeCategory === 'all'
      ? CATEGORY_ORDER.map((cat) => ({ cat, skills: SKILLS.filter((s) => s.category === cat) })).filter(
          (g) => g.skills.length > 0
        )
      : [{ cat: activeCategory, skills: SKILLS.filter((s) => s.category === activeCategory) }]

  return (
    <section id="skills" className="section-padding container-wide">
      <SectionHeader
        sectionId="skills"
        title="Technical Skills"
        subtitle="What I reach for, grouped by how deeply I have actually used it."
      />

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {SKILL_CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant="pill"
            active={activeCategory === cat}
            aria-pressed={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-1.5"
          >
            {cat === 'all' ? `All (${SKILLS.length})` : SKILL_CATEGORY_LABELS[cat]}
          </Button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start max-w-6xl mx-auto">
        {groups.map(({ cat, skills }, gi) => (
          <Card key={cat} padding="sm" hover="subtle" {...fadeInScale({ delay: (gi % 6) * 0.05, y: 20 })}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2 h-2 rounded-full shrink-0 ${SKILL_CATEGORY_COLORS[cat]?.dot ?? 'bg-slate-400'}`} />
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                {SKILL_CATEGORY_LABELS[cat]}
              </h3>
              <span className="ml-auto text-xs font-mono text-slate-400 dark:text-slate-600">
                {skills.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {byTier(skills).map((skill) => (
                <SkillPill key={skill._id} skill={skill} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
