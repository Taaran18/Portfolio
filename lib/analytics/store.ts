import { db } from '@/lib/db'
import type { PageView } from './types'

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
