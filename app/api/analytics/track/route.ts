import { NextRequest, NextResponse } from 'next/server'
import { deviceFrom, record, visitorHash } from '@/lib/analytics/store'
import type { AnalyticsEventType } from '@/lib/analytics/types'

const VALID: AnalyticsEventType[] = ['page_view', 'link_click']

function clean(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim().slice(0, max)
  return trimmed || undefined
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const type = body?.type as AnalyticsEventType

  if (!VALID.includes(type)) {
    return NextResponse.json({ error: 'Invalid event type' }, { status: 400 })
  }

  const path = clean(body?.path, 200)
  if (!path) return NextResponse.json({ error: 'Missing path' }, { status: 400 })

  const userAgent = req.headers.get('user-agent') ?? ''
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? req.headers.get('x-real-ip') ?? 'unknown'

  let referrer = clean(body?.referrer, 200)
  if (referrer) {
    try {
      const host = new URL(referrer).hostname
      referrer = host === req.nextUrl.hostname ? undefined : host
    } catch {
      referrer = undefined
    }
  }

  record({
    type,
    path,
    label: clean(body?.label, 80),
    href: clean(body?.href, 300),
    referrer,
    device: deviceFrom(userAgent),
    country: req.headers.get('x-vercel-ip-country') ?? undefined,
    visitor: visitorHash(ip, userAgent),
  })

  return new NextResponse(null, { status: 204 })
}
