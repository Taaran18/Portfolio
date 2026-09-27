import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import ArticleBody from '@/components/ui/ArticleBody'
import ArticleToc from '@/components/ui/ArticleToc'
import ShareRail from '@/components/ui/ShareRail'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { BLOG_POSTS, getBlogPost } from '@/content/blog'
import { blogPostSchema } from '@/lib/seo'
import { formatLongDate } from '@/lib/format'
import { SITE } from '@/lib/site'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return pageMetadata({
    title: post.title,
    shareTitle: post.title,
    description: post.metaDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    article: { publishedTime: post.publishedAt, tags: post.tags },
  })
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={blogPostSchema(post)} />

      <article className="section-padding container-wide">
        <div className="mx-auto max-w-[1500px] lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <aside className="hidden lg:block lg:col-span-2">
            <ArticleToc sections={post.sections} />
          </aside>

          <div className="lg:col-span-7 min-w-0">
            <Breadcrumbs
              trail={[{ label: 'Blog', href: '/blog' }, { label: post.title }]}
              align="start"
              className="mb-10"
            />

            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-slate-500 dark:text-slate-500 font-mono">
                <time dateTime={post.publishedAt}>{formatLongDate(post.publishedAt)}</time>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={12} /> {post.readingMinutes} min read
                </span>
              </div>

              <h1 className="heading-lg text-slate-900 dark:text-white mb-5">{post.title}</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2 pb-8 border-b border-[var(--surface-border)]">
                {post.tags.map((tag) => (
                  <Badge key={tag} tone="brand" className="font-mono">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            <ArticleBody sections={post.sections} />

            <footer className="mt-16 pt-8 border-t border-[var(--surface-border)]">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Written by <span className="font-medium text-slate-900 dark:text-white">{SITE.name}</span> — AI
                Engineer.{' '}
                <Link href="/contact" className="text-brand-700 dark:text-brand-400 hover:underline">
                  Get in touch
                </Link>
                .
              </p>
            </footer>
          </div>

          <aside className="hidden lg:block lg:col-span-3">
            <ShareRail title={post.title} path={`/blog/${post.slug}`} />
          </aside>
        </div>
      </article>
    </main>
  )
}
