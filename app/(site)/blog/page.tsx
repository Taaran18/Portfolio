import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import JsonLd from '@/components/JsonLd'
import { BLOG_POSTS } from '@/content/blog'
import { blogListSchema } from '@/lib/seo'
import { formatLongDate } from '@/lib/format'

const description =
  'Writing on applied AI by Taaran Jain — retrieval, LLM applications, and lessons from shipping machine learning systems to production.'

export const metadata: Metadata = {
  title: 'Blog',
  description,
  alternates: { canonical: '/blog' },
  openGraph: { title: 'Blog — Taaran Jain', description, url: '/blog' },
}

export default function BlogPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={blogListSchema()} />

      <section className="section-padding container-wide">
        <SectionHeader
          sectionId="blog"
          title="Writing"
          subtitle="Notes on applied AI — mostly the unglamorous parts that decide whether a system actually works."
        />

        <div className="max-w-3xl mx-auto space-y-6">
          {BLOG_POSTS.map((post) => (
            <Card key={post.slug} padding="md" hover="lift" className="flex flex-col">
              <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-slate-500 dark:text-slate-500 font-mono">
                <time dateTime={post.publishedAt}>{formatLongDate(post.publishedAt)}</time>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={12} /> {post.readingMinutes} min read
                </span>
              </div>

              <h2 className="font-display text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h2>

              <p className="card-body text-slate-600 dark:text-slate-400 mb-5 text-left">{post.excerpt}</p>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} tone="purple" className="font-mono">{tag}</Badge>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:gap-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded"
                >
                  Read <ArrowRight size={15} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
