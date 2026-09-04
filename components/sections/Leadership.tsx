'use client'

import { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { LEADERSHIP_ROLES, LEADERSHIP_ICON_MAP } from '@/content/leadership'
import { fadeInScale } from '@/lib/motion'

const PREVIEW_COUNT = 3

export default function Leadership() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? LEADERSHIP_ROLES : LEADERSHIP_ROLES.slice(0, PREVIEW_COUNT)

  return (
    <section id="leadership" className="section-padding container-wide">
      <SectionHeader
        sectionId="leadership"
        title="College Leadership"
        subtitle="Leading teams, running events, and building technical communities."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((role, i) => {
          const Icon = LEADERSHIP_ICON_MAP[role.icon]
          return (
            <Card
              key={role._id}
              padding="md"
              hover="lift"
              {...fadeInScale({ delay: (i % PREVIEW_COUNT) * 0.08, duration: 0.55, y: 30 })}
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border border-indigo-500/20 flex items-center justify-center mb-5">
                <Icon size={20} className="text-indigo-600" />
              </div>

              <h3 className="card-title text-slate-900 dark:text-white mb-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {role.title}
              </h3>
              <p className="text-indigo-700 dark:text-indigo-400 text-sm font-semibold mb-1">{role.organisation}</p>
              <p className="text-slate-600 dark:text-slate-400 text-xs font-mono mb-4">{role.period}</p>

              <p className="card-body text-slate-600 dark:text-slate-400 mb-4 text-left">{role.description}</p>

              <ul className="space-y-1.5">
                {role.impact.map((point, j) => (
                  <li key={j} className="flex gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <span className="text-indigo-500 mt-0.5 shrink-0">▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          )
        })}
      </div>

      {LEADERSHIP_ROLES.length > PREVIEW_COUNT && (
        <div className="flex justify-center mt-10">
          <Button variant="ghost" onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Show Less' : `Show More (${LEADERSHIP_ROLES.length - PREVIEW_COUNT} more)`}
          </Button>
        </div>
      )}
    </section>
  )
}
