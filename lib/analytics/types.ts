export interface PageView {
  id: string
  visitorId: string
  sessionId: string
  path: string
  pageTitle?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  deviceType: string
  browser?: string
  os?: string
  screenWidth?: number
  language?: string
  country?: string
  region?: string
  city?: string
  durationSeconds: number
  maxScrollPercent: number
}

export interface CountRow {
  key: string
  count: number
}

export interface RecentView {
  id: string
  path: string
  durationSeconds: number
  at: string
}

export interface AnalyticsSummary {
  totals: {
    views: number
    visitors: number
    viewsToday: number
    visitorsToday: number
    avgSeconds: number
  }
  series: { date: string; views: number; visitors: number }[]
  topPages: CountRow[]
  /** Average seconds on each page, counting only views with a measured time. */
  timeOnPage: CountRow[]
  referrers: CountRow[]
  devices: CountRow[]
  countries: CountRow[]
  recent: RecentView[]
}
