'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

interface Paper {
  id: string
  title: string
  authors?: string
  venue?: string
  year: string
  summary: string
  link: string
  category: string
}

const PUBLISHED: Paper[] = [
  {
    id: 'p1',
    title: 'A Review of Deep Reinforcement Learning Techniques in Algorithmic and Quantitative Trading',
    year: 'Nov 2024',
    summary: 'A systematic review of DRL methods applied to algorithmic trading — benchmarking frameworks like AlphaOptimizerNet, QTNet, and FinRL against challenges of market volatility, transaction costs, and the exploration-exploitation tradeoff. Evaluates DDQN and RDMM approaches and outlines what is still needed before DRL systems are production-robust.',
    link: 'https://drive.google.com/file/d/1JrQr3GPGTdiZVVmTB8NyQrjBRennxn4-/view?usp=sharing',
    category: 'Finance',
  },
  {
    id: 'p2',
    title: 'AI-Driven Medical Diagnostic System: Incorporating Deep Learning for a More Effective Healthcare Model',
    year: 'Apr 2024',
    summary: 'Presents a multi-modal diagnostic system combining deep learning and NLP to automate disease detection, medical image analysis, and drug identification. Integrates Gemini for real-time AI insights on a Django/React Native stack — targeting reduced diagnostic time, human error, and cost, especially in remote and underserved healthcare settings.',
    link: 'https://drive.google.com/file/d/1xuDjC77PjfrImIh8O-SiCckdHI8ioUfh/view?usp=sharing',
    category: 'Healthcare',
  },
]

function PaperCard({ paper, i }: { paper: Paper; i: number }) {
  return (
    <motion.a
      href={paper.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group glass rounded-2xl p-6 border border-black/5 dark:border-white/5
        hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10
        hover:scale-[1.02] transition-all duration-300 flex flex-col gap-3 block"
    >
      <div className="flex flex-wrap items-center gap-2">
        {paper.venue && (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
            {paper.venue}
          </span>
        )}
        <span className="text-xs text-slate-400 font-mono">{paper.year}</span>
      </div>

      <h3 className="text-slate-900 dark:text-white font-bold text-sm leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex-1">
        {paper.title}
      </h3>

      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-1 text-justify">
        {paper.summary}
      </p>

      <div className="flex items-center justify-between pt-2 mt-auto">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 border border-purple-500/20 text-purple-500 dark:text-purple-400">
          {paper.category}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-cyan-500 transition-colors">
          <span>View Paper</span>
          <ExternalLink size={12} />
        </div>
      </div>
    </motion.a>
  )
}

export default function Research() {
  return (
    <section id="research" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        label="05 / Research"
        title="Research"
        subtitle="Papers I've published — at the intersection of AI, financial markets, and healthcare."
      />

      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {PUBLISHED.map((paper, i) => (
          <PaperCard key={paper.id} paper={paper} i={i} />
        ))}
      </div>
    </section>
  )
}
