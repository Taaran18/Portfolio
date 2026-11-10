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
