import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import ArticleBody from '@/components/ui/ArticleBody'
import ArticleToc from '@/components/ui/ArticleToc'
import ShareRail from '@/components/ui/ShareRail'
import JsonLd from '@/components/JsonLd'
import { CASE_STUDIES, getCaseStudy } from '@/content/case-studies'
import { caseStudySchema } from '@/lib/seo'
import { shimmerBlurDataURL } from '@/lib/image-placeholder'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      type: 'article',
      title: `${study.title} — Case Study`,
      description: study.summary,
      url: `/case-studies/${study.slug}`,
      publishedTime: study.publishedAt,
    },
  }
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={caseStudySchema(study)} />

      <article className="section-padding container-wide">
        <div className="mx-auto max-w-[1500px] lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <aside className="hidden lg:block lg:col-span-2">
            <ArticleToc sections={study.sections} />
          </aside>

          <div className="lg:col-span-7 min-w-0">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded"
            >
              <ArrowLeft size={15} /> All case studies
            </Link>

            <header className="mb-12">
              <h1 className="heading-lg text-slate-900 dark:text-white mb-3">{study.title}</h1>
              <p className="text-lg text-indigo-600 dark:text-indigo-400 mb-6">{study.tagline}</p>

              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 py-6 border-y border-[var(--surface-border)]">
                <div>
                  <dt className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-1">Role</dt>
                  <dd className="text-sm text-slate-700 dark:text-slate-300">{study.role}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-1">Timeline</dt>
                  <dd className="text-sm text-slate-700 dark:text-slate-300">{study.timeline}</dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-2 mt-6">
                {study.stack.map((tech) => (
                  <Badge key={tech} tone="cyan" className="font-mono">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {study.liveUrl && (
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/40 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
                  >
                    Live demo <ExternalLink size={14} />
                  </a>
                )}
                {study.githubUrl && (
                  <a
                    href={study.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--surface-border)] text-slate-700 dark:text-slate-300 text-sm font-medium hover:border-indigo-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
                  >
                    <Github size={14} /> Source
                  </a>
                )}
              </div>
            </header>

            {study.imageUrl && (
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden surface mb-14">
                <Image
                  src={study.imageUrl}
                  alt={`${study.title} interface`}
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL={shimmerBlurDataURL()}
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-14">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="surface rounded-3xl p-5 text-center">
                  <p className="text-2xl font-bold text-gradient">{metric.value}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{metric.label}</p>
                </div>
              ))}
            </div>

            <ArticleBody sections={study.sections} />
          </div>

          <aside className="hidden lg:block lg:col-span-3">
            <ShareRail title={study.title} path={`/case-studies/${study.slug}`} />
          </aside>
        </div>
      </article>
    </main>
  )
}
