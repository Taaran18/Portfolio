'use client'

import { ExternalLink } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { PUBLISHED_PAPERS } from '@/content/research'
import { fadeInScale } from '@/lib/motion'
import type { Paper } from '@/types'

function PaperCard({ paper, i }: { paper: Paper; i: number }) {
  return (
    <Card
      as="a"
      href={paper.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3"
      {...fadeInScale({ delay: i * 0.1, duration: 0.45, y: 24 })}
    >
      <div className="flex flex-wrap items-center gap-2">
        {paper.venue && <Badge tone="cyan">{paper.venue}</Badge>}
        <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">{paper.year}</span>
      </div>

      <h3 className="card-title text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-1">
        {paper.title}
      </h3>

      <p className="card-body text-slate-600 dark:text-slate-400 flex-1 text-left">
        {paper.summary}
      </p>

      <div className="flex items-center justify-between pt-2 mt-auto">
        <Badge tone="purple">{paper.category}</Badge>
        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">
          <span>View Paper</span>
          <ExternalLink size={12} />
        </div>
      </div>
    </Card>
  )
}

export default function Research() {
  return (
    <section id="research" className="section-padding container-wide">
      <SectionHeader
        sectionId="research"
        title="Research"
        subtitle="Papers I've published — at the intersection of AI, financial markets, and healthcare."
      />

      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {PUBLISHED_PAPERS.map((paper, i) => (
          <PaperCard key={paper._id} paper={paper} i={i} />
        ))}
      </div>
    </section>
  )
}
