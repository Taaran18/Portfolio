import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

const ROUTES = [
  '',
  '/about',
  '/experience',
  '/leadership',
  '/projects',
  '/research',
  '/skills',
  '/certifications',
  '/contact',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }))
}
