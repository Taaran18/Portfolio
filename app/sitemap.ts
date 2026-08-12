import type { MetadataRoute } from 'next'
import { ALL_PAGES } from '@/content/sections'
import { SITE_URL } from '@/lib/site'

const LAST_MODIFIED = new Date(
  process.env.VERCEL_GIT_COMMIT_SHA ? Date.now() : Date.UTC(2026, 7, 12)
)

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: SITE_URL,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 1,
  }

  const priorityByPath: Record<string, number> = {
    '/projects': 0.9,
    '/about': 0.8,
    '/experience': 0.8,
    '/contact': 0.8,
    '/case-studies': 0.9,
    '/blog': 0.8,
    '/research': 0.7,
    '/skills': 0.6,
    '/leadership': 0.5,
    '/certifications': 0.5,
  }

  const pages = ALL_PAGES.map((section) => ({
    url: `${SITE_URL}${section.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: priorityByPath[section.path] ?? 0.6,
  }))

  return [home, ...pages]
}
