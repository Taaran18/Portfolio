import type { MetadataRoute } from 'next'
import { ALL_PAGES } from '@/content/sections'
import { BLOG_POSTS } from '@/content/blog'
import { CASE_STUDIES } from '@/content/case-studies'
import { SITE_URL } from '@/lib/site'

const FALLBACK_MODIFIED = new Date(Date.UTC(2026, 7, 12))

const priorityByPath: Record<string, number> = {
  '/projects': 0.9,
  '/case-studies': 0.9,
  '/about': 0.8,
  '/experience': 0.8,
  '/contact': 0.8,
  '/blog': 0.8,
  '/research': 0.7,
  '/skills': 0.6,
  '/leadership': 0.5,
  '/certifications': 0.5,
}

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: SITE_URL,
    lastModified: FALLBACK_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 1,
  }

  const pages = ALL_PAGES.map((section) => ({
    url: `${SITE_URL}${section.path}`,
    lastModified: FALLBACK_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: priorityByPath[section.path] ?? 0.6,
  }))

  const caseStudies = CASE_STUDIES.map((study) => ({
    url: `${SITE_URL}/case-studies/${study.slug}`,
    lastModified: study.publishedAt ? new Date(study.publishedAt) : FALLBACK_MODIFIED,
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }))

  const posts = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : FALLBACK_MODIFIED,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [home, ...pages, ...caseStudies, ...posts]
}
