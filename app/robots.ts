import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

const BLOCKED = ['/api/', '/admin', '/admin/']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: BLOCKED,
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'Claude-User', 'Google-Extended'],
        allow: '/',
        disallow: BLOCKED,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
