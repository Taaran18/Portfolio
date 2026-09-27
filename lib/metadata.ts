import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

const SHARE_IMAGE_ALT = `${SITE.name} | ${SITE.primaryRole}`

export const OG_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: SHARE_IMAGE_ALT }
export const TWITTER_IMAGE = { url: '/twitter-image', width: 1200, height: 630, alt: SHARE_IMAGE_ALT }

export const TWITTER_HANDLE = '@Taaran18'

interface PageMetadataInput {
  title: string
  shareTitle?: string
  description: string
  path: string
  article?: {
    publishedTime: string
    modifiedTime?: string
    tags?: string[]
  }
  keywords?: string[]
}

export function pageMetadata({
  title,
  shareTitle = `${title} | ${SITE.name}`,
  description,
  path,
  article,
  keywords,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      siteName: SITE.name,
      locale: 'en_US',
      url: path,
      title: shareTitle,
      description,
      images: [OG_IMAGE],
      ...(article
        ? {
            type: 'article',
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            authors: [SITE.url],
            tags: article.tags,
          }
        : { type: 'website' }),
    },
    twitter: {
      card: 'summary_large_image',
      creator: TWITTER_HANDLE,
      title: shareTitle,
      description,
      images: [TWITTER_IMAGE],
    },
  }
}
