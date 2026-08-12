import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isValidSession, SESSION_COOKIE } from '@/lib/auth'
import { allEvents, clearEvents, storageInfo } from '@/lib/analytics/store'
import type { AnalyticsEvent, AnalyticsSummary, CountRow } from '@/lib/analytics/types'

const DAY = 86_400_000

async function authorised(): Promise<boolean> {
  const store = await cookies()
  return isValidSession(store.get(SESSION_COOKIE)?.value)
}

function tally(events: AnalyticsEvent[], pick: (e: AnalyticsEvent) => string | undefined, limit = 8): CountRow[] {
  const counts = new Map<string, number>()
  for (const event of events) {
    const key = pick(event)
    if (!key) continue
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

function dayKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10)
}

export async function GET(req: NextRequest) {
  if (!(await authorised())) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const days = Math.min(Math.max(Number(req.nextUrl.searchParams.get('days') ?? 30), 1), 90)
  const since = Date.now() - days * DAY
  const events = allEvents().filter((e) => e.at >= since)

  const views = events.filter((e) => e.type === 'page_view')
  const clicks = events.filter((e) => e.type === 'link_click')

  const todayKey = dayKey(Date.now())
  const viewsToday = views.filter((e) => dayKey(e.at) === todayKey)

  const series: AnalyticsSummary['series'] = []
  for (let i = days - 1; i >= 0; i--) {
    const key = dayKey(Date.now() - i * DAY)
    const dayViews = views.filter((e) => dayKey(e.at) === key)
    series.push({
      date: key,
      views: dayViews.length,
      visitors: new Set(dayViews.map((e) => e.visitor)).size,
    })
  }

  const summary: AnalyticsSummary = {
    totals: {
      views: views.length,
      clicks: clicks.length,
      visitors: new Set(views.map((e) => e.visitor)).size,
      viewsToday: viewsToday.length,
      visitorsToday: new Set(viewsToday.map((e) => e.visitor)).size,
    },
    series,
    topPages: tally(views, (e) => e.path),
    topLinks: tally(clicks, (e) => e.label ?? e.href),
    referrers: tally(views, (e) => e.referrer),
    devices: tally(views, (e) => e.device, 3),
    countries: tally(views, (e) => e.country, 6),
    recent: [...events].sort((a, b) => b.at - a.at).slice(0, 12),
    storage: storageInfo(),
  }

  return NextResponse.json(summary)
}

export async function DELETE() {
  if (!(await authorised())) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }
  clearEvents()
  return NextResponse.json({ ok: true })
}
