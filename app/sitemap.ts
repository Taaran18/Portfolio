import type { MetadataRoute } from 'next'
import { ALL_PAGES } from '@/content/sections'
import { BLOG_POSTS } from '@/content/blog'
import { CASE_STUDIES } from '@/content/case-studies'
import { LEGAL_DOCS } from '@/content/legal'
import { PROJECTS } from '@/content/projects'
import { SITE_UPDATED, SITE_URL } from '@/lib/site'

const FALLBACK_MODIFIED = new Date(SITE_UPDATED)

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

function studyImages(slug: string, cover?: string) {
  const project = PROJECTS.find((p) => p.caseStudySlug === slug)
  if (project?.images.length) return project.images.map((image) => `${SITE_URL}${image.src}`)
  return cover ? [`${SITE_URL}${cover}`] : []
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
    ...(section.path === '/projects'
      ? { images: PROJECTS.flatMap((project) => project.images.map((image) => `${SITE_URL}${image.src}`)) }
      : {}),
    ...(section.path === '/case-studies'
      ? { images: CASE_STUDIES.flatMap((study) => (study.imageUrl ? [`${SITE_URL}${study.imageUrl}`] : [])) }
      : {}),
  }))

  const caseStudies = CASE_STUDIES.map((study) => ({
    url: `${SITE_URL}/case-studies/${study.slug}`,
    lastModified: study.publishedAt ? new Date(study.publishedAt) : FALLBACK_MODIFIED,
    changeFrequency: 'yearly' as const,
    priority: 0.8,
    images: studyImages(study.slug, study.imageUrl),
  }))

  const posts = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : FALLBACK_MODIFIED,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  const legal = LEGAL_DOCS.map((doc) => ({
    url: `${SITE_URL}${doc.path}`,
    lastModified: new Date(doc.updated),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }))

  return [home, ...pages, ...caseStudies, ...posts, ...legal]
}
