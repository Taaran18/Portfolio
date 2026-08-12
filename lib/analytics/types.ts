export type AnalyticsEventType = 'page_view' | 'link_click'

export interface AnalyticsEvent {
  id: string
  type: AnalyticsEventType
  path: string
  label?: string
  href?: string
  referrer?: string
  device: 'mobile' | 'tablet' | 'desktop'
  country?: string
  visitor: string
  at: number
}

export interface CountRow {
  key: string
  count: number
}

export interface AnalyticsSummary {
  totals: {
    views: number
    clicks: number
    visitors: number
    viewsToday: number
    visitorsToday: number
  }
  series: { date: string; views: number; visitors: number }[]
  topPages: CountRow[]
  topLinks: CountRow[]
  referrers: CountRow[]
  devices: CountRow[]
  countries: CountRow[]
  recent: AnalyticsEvent[]
  storage: { driver: string; durable: boolean; note?: string }
}
