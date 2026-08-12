'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { EXPERIENCES } from '@/content/experience'
import { formatMonthYear } from '@/lib/format'
import { slideIn } from '@/lib/motion'

export default function Experience() {
  return (
    <section id="experience" className="section-padding container-wide">
      <SectionHeader
        sectionId="experience"
        title="Work Experience"
        subtitle="Shipping AI systems in production across three companies."
      />

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/30 to-transparent -translate-x-1/2" />

        <div className="space-y-12">
          {EXPERIENCES.map((exp, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={exp._id}
                {...slideIn(isLeft ? 'left' : 'right', { delay: i * 0.08 })}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 pl-12 md:pl-0 ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 border-2 border-[var(--bg-primary)] shadow-lg shadow-indigo-500/30 z-10 mt-6" />

                <div className={`md:w-[46%] ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <Card padding="md" hover="lift" borderGradient>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="card-title text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-indigo-700 dark:text-indigo-400 font-semibold">{exp.company}</p>
                      </div>
                      {exp.current && <Badge tone="green">Current</Badge>}
                    </div>

                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 text-xs font-mono mb-4">
                      <Calendar size={12} />
                      <span>{formatMonthYear(exp.startDate)} — {exp.current ? 'Present' : exp.endDate ? formatMonthYear(exp.endDate) : ''}</span>
                    </div>

                    <p className="card-body text-slate-600 dark:text-slate-300 mb-4">{exp.description}</p>

                    <ul className="space-y-1.5 mb-5">
                      {exp.responsibilities.map((r, j) => (
                        <li key={j} className="flex gap-2 text-slate-600 dark:text-slate-400 text-sm">
                          <span className="text-indigo-500 mt-0.5 shrink-0">▸</span>
                          {r}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <Badge key={t} tone="purple" className="font-mono">{t}</Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
