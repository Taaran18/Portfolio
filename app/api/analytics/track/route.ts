import { NextRequest, NextResponse } from 'next/server'
import { recordPageView } from '@/lib/analytics/store'
import { clean, externalReferrer, isBot, requestContext, uuid } from '@/lib/analytics/request'

// A tab left visible for hours isn't reading time; cap what one view can claim.
const MAX_DURATION_SECONDS = 4 * 60 * 60

function boundedInt(value: unknown, max: number): number {
  const n = Number(value)
  return Number.isFinite(n) ? Math.min(Math.max(Math.round(n), 0), max) : 0
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)

  const id = uuid(body?.id)
  const visitorId = uuid(body?.visitorId)
  const sessionId = uuid(body?.sessionId)
  const path = clean(body?.path, 200)
  if (!id || !visitorId || !sessionId || !path) {
    return NextResponse.json({ error: 'Invalid page view' }, { status: 400 })
  }

  if (isBot(req)) return new NextResponse(null, { status: 204 })

  const screenWidth = boundedInt(body?.screenWidth, 10_000)

  try {
    await recordPageView({
      id,
      visitorId,
      sessionId,
      path,
      pageTitle: clean(body?.pageTitle, 200),
      referrer: externalReferrer(body?.referrer, req.nextUrl.hostname),
      utmSource: clean(body?.utmSource, 100),
      utmMedium: clean(body?.utmMedium, 100),
      utmCampaign: clean(body?.utmCampaign, 100),
      screenWidth: screenWidth || undefined,
      language: clean(body?.language, 35),
      durationSeconds: boundedInt(body?.durationSeconds, MAX_DURATION_SECONDS),
      maxScrollPercent: boundedInt(body?.maxScrollPercent, 100),
      ...requestContext(req),
    })
  } catch (err) {
    console.error('Analytics error:', err)
    return NextResponse.json({ error: 'Failed to record page view' }, { status: 500 })
  }

  return new NextResponse(null, { status: 204 })
}
