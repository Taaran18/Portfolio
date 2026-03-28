'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Skill } from '@/types'

const SKILLS: Skill[] = [
  // Languages
  { _id: 's1',  name: 'Python',               level: 95, category: 'languages',  order: 1 },
  { _id: 's2',  name: 'R',                     level: 68, category: 'languages',  order: 2 },
  { _id: 's3',  name: 'SQL',                   level: 80, category: 'languages',  order: 3 },

  // Full Stack & Frameworks
  { _id: 's4',  name: 'FastAPI',               level: 88, category: 'fullstack',  order: 4 },
  { _id: 's5',  name: 'Django',                level: 75, category: 'fullstack',  order: 5 },
  { _id: 's6',  name: 'Next.js',               level: 72, category: 'fullstack',  order: 6 },
  { _id: 's7',  name: 'REST APIs',             level: 85, category: 'fullstack',  order: 7 },
  { _id: 's8',  name: 'n8n',                   level: 70, category: 'fullstack',  order: 8 },
  { _id: 's9',  name: 'Google Apps Script',    level: 65, category: 'fullstack',  order: 9 },

  // Machine Learning
  { _id: 's10', name: 'Scikit-learn',          level: 90, category: 'ml',         order: 10 },
  { _id: 's11', name: 'Pandas',                level: 92, category: 'ml',         order: 11 },
  { _id: 's12', name: 'NumPy',                 level: 90, category: 'ml',         order: 12 },
  { _id: 's13', name: 'Anomaly Detection',     level: 82, category: 'ml',         order: 13 },
  { _id: 's14', name: 'Time-Series Analysis',  level: 78, category: 'ml',         order: 14 },
  { _id: 's15', name: 'Unsupervised Learning', level: 80, category: 'ml',         order: 15 },

  // Deep Learning
  { _id: 's16', name: 'PyTorch',               level: 85, category: 'dl',         order: 16 },
  { _id: 's17', name: 'TensorFlow / Keras',    level: 85, category: 'dl',         order: 17 },
  { _id: 's18', name: 'OpenCV',                level: 80, category: 'dl',         order: 18 },
  { _id: 's19', name: 'Matplotlib / Seaborn',  level: 87, category: 'dl',         order: 19 },
  { _id: 's20', name: 'Plotly',                level: 82, category: 'dl',         order: 20 },

  // LLM / NLP
  { _id: 's21', name: 'LangChain',             level: 88, category: 'llm',        order: 21 },
  { _id: 's22', name: 'HuggingFace',           level: 87, category: 'llm',        order: 22 },
  { _id: 's23', name: 'RAG',                   level: 85, category: 'llm',        order: 23 },
  { _id: 's24', name: 'Prompt Engineering',    level: 90, category: 'llm',        order: 24 },
  { _id: 's25', name: 'NLP',                   level: 85, category: 'llm',        order: 25 },
  { _id: 's26', name: 'LLMs',                  level: 88, category: 'llm',        order: 26 },

  // Cloud & Tools
  { _id: 's27', name: 'GCP',                   level: 78, category: 'cloud',      order: 27 },
  { _id: 's28', name: 'Docker',                level: 75, category: 'cloud',      order: 28 },
  { _id: 's29', name: 'MySQL',                 level: 78, category: 'database',   order: 29 },
  { _id: 's29b', name: 'MongoDB',             level: 75, category: 'database',   order: 30 },
  { _id: 's29c', name: 'PostgreSQL',          level: 78, category: 'database',   order: 31 },
  { _id: 's30', name: 'Firebase',              level: 70, category: 'database',   order: 32 },
  { _id: 's31', name: 'Looker Studio',         level: 72, category: 'cloud',      order: 31 },
  { _id: 's32', name: 'Power BI',              level: 70, category: 'cloud',      order: 32 },
]

const CATEGORY_LABELS: Record<string, string> = {
  languages: 'Languages',
  fullstack: 'Full Stack',
  ml:        'Machine Learning',
  dl:        'Deep Learning',
  llm:       'LLM / NLP',
  database:  'Databases',
  cloud:     'Cloud & Tools',
}

const CATEGORY_COLORS: Record<string, { bar: string; text: string }> = {
  languages: { bar: 'from-cyan-500 to-blue-500',      text: 'text-cyan-600 dark:text-cyan-400' },
  fullstack: { bar: 'from-violet-500 to-purple-500',  text: 'text-violet-600 dark:text-violet-400' },
  ml:        { bar: 'from-orange-500 to-yellow-500',  text: 'text-orange-600 dark:text-orange-400' },
  dl:        { bar: 'from-pink-500 to-rose-500',      text: 'text-pink-600 dark:text-pink-400' },
  llm:       { bar: 'from-purple-500 to-pink-500',    text: 'text-purple-600 dark:text-purple-400' },
  database:  { bar: 'from-yellow-500 to-orange-400',  text: 'text-yellow-600 dark:text-yellow-400' },
  cloud:     { bar: 'from-green-500 to-teal-500',     text: 'text-green-600 dark:text-green-400' },
}

const CATEGORIES = ['ml', 'dl', 'llm', 'languages', 'database', 'fullstack', 'cloud', 'all'] as const
type Category = (typeof CATEGORIES)[number]

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const colors = CATEGORY_COLORS[skill.category] ?? CATEGORY_COLORS.cloud
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">{skill.name}</span>
        <span className={`text-xs font-mono ${colors.text}`}>{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.06, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${colors.bar}`}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>('ml')
  const filtered = activeCategory === 'all' ? SKILLS : SKILLS.filter((s) => s.category === activeCategory)

  const byCategory = (['ml', 'dl', 'llm', 'languages', 'database', 'fullstack', 'cloud'] as const).reduce<Record<string, Skill[]>>((acc, cat) => {
    acc[cat] = SKILLS.filter((s) => s.category === cat)
    return acc
  }, {})

  return (
    <section id="skills" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        label="06 / Skills"
        title="Technical Skills"
        subtitle="From raw data to deployed models — my toolkit across the full ML engineering stack."
      />

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105 ${
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
          {Object.entries(byCategory).map(([cat, catSkills], gi) => {
            if (!catSkills.length) return null
            const colors = CATEGORY_COLORS[cat]
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: gi * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-6 border border-black/5 dark:border-white/5 hover:scale-[1.02] transition-transform"
              >
                <h3 className={`font-semibold text-sm mb-5 ${colors.text}`}>
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto glass rounded-2xl p-8 border border-black/5 dark:border-white/5"
        >
          <div className="space-y-5">
            {filtered.map((skill, i) => <SkillBar key={skill._id} skill={skill} index={i} />)}
          </div>
        </motion.div>
      )}
    </section>
  )
}
