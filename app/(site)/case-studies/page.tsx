import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import JsonLd from '@/components/JsonLd'
import { CASE_STUDIES } from '@/content/case-studies'
import { caseStudyListSchema } from '@/lib/seo'

const description =
  'In-depth engineering case studies by Taaran Jain — architecture decisions, tradeoffs, and what broke, on production AI and ML systems.'

export const metadata: Metadata = {
  title: 'Case Studies',
  description,
  alternates: { canonical: '/case-studies' },
  openGraph: { title: 'Case Studies — Taaran Jain', description, url: '/case-studies' },
}

export default function CaseStudiesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={caseStudyListSchema()} />

      <section className="section-padding container-wide">
        <SectionHeader
          sectionId="case-studies"
          title="Case Studies"
          subtitle="The reasoning behind the systems — constraints, architecture, tradeoffs, and the parts that did not work first time."
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {CASE_STUDIES.map((study) => (
            <Card key={study.slug} padding="md" hover="lift" className="flex flex-col">
              <div className="flex flex-wrap gap-2 mb-4">
                {study.stack.slice(0, 3).map((tech) => (
                  <Badge key={tech} tone="cyan" className="font-mono">
                    {tech}
                  </Badge>
                ))}
              </div>

              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {study.title}
              </h2>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-3">{study.tagline}</p>

              <p className="card-body text-slate-600 dark:text-slate-400 mb-6 flex-1 text-left">{study.summary}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                {study.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-lg font-bold text-gradient leading-none">{metric.value}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>

              <Link
                href={`/case-studies/${study.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:gap-2.5 transition-all mt-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded"
              >
                Read case study <ArrowRight size={15} />
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
