import { db } from '@/lib/db'
import type { AnalyticsSummary, CountRow, PageView, RecentView } from './types'

const DAY = 86_400_000

/**
 * Inserts the view, or — when the browser re-sends it on leaving — raises its
 * time and scroll depth. Only the visitor who created a row can update it.
 */
export async function recordPageView(view: PageView): Promise<void> {
  await db().query(
    `INSERT INTO taaranjain_analytics (
       id, visitor_id, session_id, path, page_title, referrer, utm_source, utm_medium, utm_campaign,
       device_type, browser, os, screen_width, language, country, region, city,
       duration_seconds, max_scroll_percent
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
     ON CONFLICT (id) DO UPDATE SET
       duration_seconds = GREATEST(taaranjain_analytics.duration_seconds, EXCLUDED.duration_seconds),
       max_scroll_percent = GREATEST(taaranjain_analytics.max_scroll_percent, EXCLUDED.max_scroll_percent),
       updated_at = now()
     WHERE taaranjain_analytics.visitor_id = EXCLUDED.visitor_id`,
    [
      view.id,
      view.visitorId,
      view.sessionId,
      view.path,
      view.pageTitle ?? null,
      view.referrer ?? null,
      view.utmSource ?? null,
      view.utmMedium ?? null,
      view.utmCampaign ?? null,
      view.deviceType,
      view.browser ?? null,
      view.os ?? null,
      view.screenWidth ?? null,
      view.language ?? null,
      view.country ?? null,
      view.region ?? null,
      view.city ?? null,
      view.durationSeconds,
      view.maxScrollPercent,
    ]
  )
}

// Column names are interpolated, so only these fixed ones are allowed.
type TallyColumn = 'path' | 'referrer' | 'device_type' | 'country'

async function tally(column: TallyColumn, since: Date, limit: number): Promise<CountRow[]> {
  const { rows } = await db().query<CountRow>(
    `SELECT ${column} AS key, count(*)::int AS count FROM taaranjain_analytics
     WHERE created_at >= $1 AND ${column} IS NOT NULL
     GROUP BY ${column} ORDER BY count DESC LIMIT $2`,
    [since, limit]
  )
  return rows
}

export async function summarise(days: number): Promise<AnalyticsSummary> {
  const now = Date.now()
  const since = new Date(now - days * DAY)
  const todayStart = new Date(new Date(now).toISOString().slice(0, 10))

  const [totals, daily, topPages, timeOnPage, referrers, devices, countries, recent] = await Promise.all([
    db().query<AnalyticsSummary['totals']>(
      `SELECT count(*)::int AS views,
              count(DISTINCT visitor_id)::int AS visitors,
              (count(*) FILTER (WHERE created_at >= $2))::int AS "viewsToday",
              (count(DISTINCT visitor_id) FILTER (WHERE created_at >= $2))::int AS "visitorsToday",
              coalesce(round(avg(duration_seconds) FILTER (WHERE duration_seconds > 0)), 0)::int AS "avgSeconds"
       FROM taaranjain_analytics WHERE created_at >= $1`,
      [since, todayStart]
    ),
    db().query<{ date: string; views: number; visitors: number }>(
      `SELECT to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS date,
              count(*)::int AS views, count(DISTINCT visitor_id)::int AS visitors
       FROM taaranjain_analytics WHERE created_at >= $1 GROUP BY 1`,
      [since]
    ),
    tally('path', since, 8),
    db().query<CountRow>(
      `SELECT path AS key, round(avg(duration_seconds))::int AS count FROM taaranjain_analytics
       WHERE created_at >= $1 AND duration_seconds > 0
       GROUP BY path ORDER BY count DESC LIMIT 8`,
      [since]
    ),
    tally('referrer', since, 8),
    tally('device_type', since, 3),
    tally('country', since, 6),
    db().query<RecentView>(
      `SELECT id, path, duration_seconds AS "durationSeconds", created_at AS at FROM taaranjain_analytics
       WHERE created_at >= $1 ORDER BY created_at DESC LIMIT 12`,
      [since]
    ),
  ])

  const byDate = new Map(daily.rows.map((row) => [row.date, row]))
  const series: AnalyticsSummary['series'] = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now - i * DAY).toISOString().slice(0, 10)
    series.push(byDate.get(date) ?? { date, views: 0, visitors: 0 })
  }

  return {
    totals: totals.rows[0],
    series,
    topPages,
    timeOnPage: timeOnPage.rows,
    referrers,
    devices,
    countries,
    recent: recent.rows,
  }
}

export async function clearPageViews(): Promise<void> {
  await db().query('DELETE FROM taaranjain_analytics')
}
