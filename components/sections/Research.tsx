'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, BookOpen, Star, Glasses } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

interface Paper {
  id: string
  title: string
  authors?: string
  venue?: string
  year: string
  summary: string
  link: string
}

const PUBLISHED: Paper[] = [
  {
    id: 'p1',
    title: 'A Review of Deep Reinforcement Learning Techniques in Algorithmic and Quantitative Trading',
    year: 'Nov 2024',
    summary: 'A systematic review of DRL methods applied to algorithmic trading — benchmarking frameworks like AlphaOptimizerNet, QTNet, and FinRL against challenges of market volatility, transaction costs, and the exploration-exploitation tradeoff. Evaluates DDQN and RDMM approaches and outlines what is still needed before DRL systems are production-robust.',
    link: 'https://drive.google.com/file/d/1JrQr3GPGTdiZVVmTB8NyQrjBRennxn4-/view?usp=sharing',
  },
  {
    id: 'p2',
    title: 'AI-Driven Medical Diagnostic System: Incorporating Deep Learning for a More Effective Healthcare Model',
    year: 'Apr 2024',
    summary: 'Presents a multi-modal diagnostic system combining deep learning and NLP to automate disease detection, medical image analysis, and drug identification. Integrates Gemini for real-time AI insights on a Django/React Native stack — targeting reduced diagnostic time, human error, and cost, especially in remote and underserved healthcare settings.',
    link: 'https://drive.google.com/file/d/1xuDjC77PjfrImIh8O-SiCckdHI8ioUfh/view?usp=sharing',
  },
]

const RECOMMENDED: Paper[] = [
  // Add recommended papers here
]

const READ: Paper[] = [
  // Add read papers here
]

const TABS = [
  { key: 'published',    label: 'Published',    icon: BookOpen, data: PUBLISHED,    empty: 'No published papers yet.' },
  { key: 'recommended',  label: 'Recommended',  icon: Star,     data: RECOMMENDED,  empty: 'No recommendations yet.' },
  { key: 'read',         label: 'Reading List',  icon: Glasses,  data: READ,         empty: 'Reading list is empty.' },
] as const

type TabKey = typeof TABS[number]['key']

function PaperCard({ paper, i }: { paper: Paper; i: number }) {
  return (
    <motion.a
      href={paper.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group glass rounded-2xl p-6 border border-black/5 dark:border-white/5
        hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10
        hover:scale-[1.02] transition-all duration-300 flex flex-col gap-3 block"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-slate-900 dark:text-white font-bold text-sm leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex-1">
          {paper.title}
        </h3>
        <ExternalLink size={14} className="text-slate-400 group-hover:text-cyan-500 transition-colors shrink-0 mt-0.5" />
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2">
        {paper.authors && (
          <span className="text-xs text-slate-400 font-mono">{paper.authors}</span>
        )}
        {paper.authors && (paper.venue || paper.year) && (
          <span className="text-slate-600 dark:text-slate-600 text-xs">·</span>
        )}
        {paper.venue && (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
            {paper.venue}
          </span>
        )}
        <span className="text-xs text-slate-400 font-mono">{paper.year}</span>
      </div>

      {/* Summary */}
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
        {paper.summary}
      </p>
    </motion.a>
  )
}

export default function Research() {
  const [active, setActive] = useState<TabKey>('published')

  const current = TABS.find((t) => t.key === active)!

  return (
    <section id="research" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        label="05 / Research"
        title="Research"
        subtitle="Papers I've published, papers worth reading, and the ones that shaped how I think."
      />

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
              ${active === key
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                : 'glass border border-black/5 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/20'
              }`}
          >
            <Icon size={15} />
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono
              ${active === key ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'}`}>
              {current.key === key ? current.data.length : TABS.find(t => t.key === key)!.data.length}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {current.data.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-sm font-mono">
              {current.empty}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {current.data.map((paper, i) => (
                <PaperCard key={paper.id} paper={paper} i={i} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
