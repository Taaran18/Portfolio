'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Skill } from '@/types'

const SEED_SKILLS: Skill[] = [
  // ML / Deep Learning
  { _id: '1', name: 'Python', level: 95, category: 'frontend', order: 1 },
  { _id: '2', name: 'PyTorch', level: 90, category: 'frontend', order: 2 },
  { _id: '3', name: 'TensorFlow / Keras', level: 82, category: 'frontend', order: 3 },
  { _id: '4', name: 'Scikit-learn', level: 92, category: 'frontend', order: 4 },
  // LLM / NLP
  { _id: '5', name: 'LangChain / LangGraph', level: 88, category: 'backend', order: 5 },
  { _id: '6', name: 'HuggingFace Transformers', level: 90, category: 'backend', order: 6 },
  { _id: '7', name: 'RAG & Vector DBs', level: 85, category: 'backend', order: 7 },
  // Data
  { _id: '8', name: 'Pandas / NumPy', level: 95, category: 'database', order: 8 },
  { _id: '9', name: 'SQL / PostgreSQL', level: 80, category: 'database', order: 9 },
  { _id: '10', name: 'Apache Spark', level: 68, category: 'database', order: 10 },
  // MLOps
  { _id: '11', name: 'Docker / Kubernetes', level: 78, category: 'devops', order: 11 },
  { _id: '12', name: 'AWS / GCP', level: 80, category: 'devops', order: 12 },
  { _id: '13', name: 'MLflow / Weights & Biases', level: 85, category: 'devops', order: 13 },
  // Other
  { _id: '14', name: 'Computer Vision (CV2)', level: 82, category: 'other', order: 14 },
  { _id: '15', name: 'FastAPI / REST APIs', level: 88, category: 'other', order: 15 },
]

const CATEGORIES = ['all', 'frontend', 'backend', 'database', 'devops', 'other'] as const

// Renamed labels for the AI context
const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'ML / Deep Learning',
  backend: 'LLM / NLP',
  database: 'Data Engineering',
  devops: 'MLOps & Cloud',
  other: 'Other Tools',
}

const CATEGORY_COLORS: Record<string, { bar: string; text: string; bg: string; border: string }> = {
  frontend: { bar: 'from-cyan-500 to-blue-500', text: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  backend:  { bar: 'from-purple-500 to-pink-500', text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  database: { bar: 'from-orange-500 to-yellow-500', text: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  devops:   { bar: 'from-green-500 to-teal-500', text: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  other:    { bar: 'from-rose-500 to-fuchsia-500', text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
}

type Category = (typeof CATEGORIES)[number]

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const colors = CATEGORY_COLORS[skill.category] ?? CATEGORY_COLORS.other
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">{skill.name}</span>
        <span className={`text-xs font-mono ${colors.text}`}>{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.05 + 0.2, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${colors.bar}`}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>(SEED_SKILLS)
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  useEffect(() => {
    fetch('/api/skills').then((r) => r.json()).then((data) => { if (data?.length) setSkills(data) }).catch(() => {})
  }, [])

  const filtered = activeCategory === 'all' ? skills : skills.filter((s) => s.category === activeCategory)
  const byCategory = (['frontend', 'backend', 'database', 'devops', 'other'] as const).reduce<Record<string, Skill[]>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat)
    return acc
  }, {})

  return (
    <section id="skills" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        label="04 / Skills"
        title="Technical Skills"
        subtitle="From raw data to deployed models — my toolkit across the full ML engineering stack."
      />

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                : 'glass text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-black/5 dark:border-white/5'
            }`}
          >
            {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {activeCategory === 'all' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(byCategory).map(([cat, catSkills]) => {
            if (!catSkills.length) return null
            const colors = CATEGORY_COLORS[cat]
            return (
              <motion.div key={cat} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 border border-black/5 dark:border-white/5">
                <h3 className={`font-semibold text-sm mb-5 flex items-center gap-2 ${colors.text}`}>
                  <span className={`w-2 h-2 rounded-full ${colors.bg} border ${colors.border}`} />
                  {CATEGORY_LABELS[cat]}
                </h3>
                <div className="space-y-4">
                  {catSkills.map((skill, i) => <SkillBar key={skill._id} skill={skill} index={i} />)}
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto glass rounded-2xl p-8 border border-black/5 dark:border-white/5">
          <div className="space-y-5">
            {filtered.map((skill, i) => <SkillBar key={skill._id} skill={skill} index={i} />)}
          </div>
        </div>
      )}
    </section>
  )
}
