import type { NextRequest } from 'next/server'

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const BOT_PATTERN = /bot|crawl|spider|slurp|headless|lighthouse|preview/i

export function clean(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim().slice(0, max)
  return trimmed || undefined
}

export function uuid(value: unknown): string | undefined {
  return typeof value === 'string' && UUID_PATTERN.test(value) ? value.toLowerCase() : undefined
}

export function isBot(req: NextRequest): boolean {
  return BOT_PATTERN.test(req.headers.get('user-agent') ?? '')
}

/** Reduces a referrer URL to its hostname, dropping links from this site itself. */
export function externalReferrer(value: unknown, ownHost: string): string | undefined {
  const url = clean(value, 500)
  if (!url) return undefined
  try {
    const host = new URL(url).hostname
    return host === ownHost ? undefined : host
  } catch {
    return undefined
  }
}

function deviceFrom(ua: string): string {
  if (/ipad|tablet/.test(ua)) return 'tablet'
  if (/mobi|android|iphone/.test(ua)) return 'mobile'
  return 'desktop'
}

function browserFrom(ua: string): string | undefined {
  if (/edg(e|a|ios)?\//.test(ua)) return 'Edge'
  if (/opr\/|opera/.test(ua)) return 'Opera'
  if (/samsungbrowser/.test(ua)) return 'Samsung Internet'
  if (/firefox|fxios/.test(ua)) return 'Firefox'
  if (/chrome|crios/.test(ua)) return 'Chrome'
  if (/safari/.test(ua)) return 'Safari'
  return undefined
}

function osFrom(ua: string): string | undefined {
  if (/windows/.test(ua)) return 'Windows'
  if (/android/.test(ua)) return 'Android'
  if (/iphone|ipad|ipod/.test(ua)) return 'iOS'
  if (/mac os x|macintosh/.test(ua)) return 'macOS'
  if (/cros/.test(ua)) return 'ChromeOS'
  if (/linux/.test(ua)) return 'Linux'
  return undefined
}

function geoHeader(req: NextRequest, name: string): string | undefined {
  const value = req.headers.get(name)
  if (!value) return undefined
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

/** Device and approximate location, from the user agent and Vercel's geo headers. */
export function requestContext(req: NextRequest) {
  const ua = (req.headers.get('user-agent') ?? '').toLowerCase()
  return {
    deviceType: deviceFrom(ua),
    browser: browserFrom(ua),
    os: osFrom(ua),
    country: geoHeader(req, 'x-vercel-ip-country'),
    region: geoHeader(req, 'x-vercel-ip-country-region'),
    city: geoHeader(req, 'x-vercel-ip-city'),
  }
}
