import { db } from '@/lib/db'

export interface Lead {
  source: 'contact_form'
  name: string
  email: string
  subject?: string
  message: string
  pagePath?: string
  landingPath?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  visitorId?: string
  sessionId?: string
  deviceType?: string
  country?: string
  region?: string
  city?: string
  emailSent: boolean
}

export async function saveLead(lead: Lead): Promise<void> {
  await db().query(
    `INSERT INTO taaranjain_leads (
       source, name, email, subject, message, page_path, landing_path, referrer,
       utm_source, utm_medium, utm_campaign, visitor_id, session_id,
       device_type, country, region, city, email_sent
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
    [
      lead.source,
      lead.name,
      lead.email,
      lead.subject ?? null,
      lead.message,
      lead.pagePath ?? null,
      lead.landingPath ?? null,
      lead.referrer ?? null,
      lead.utmSource ?? null,
      lead.utmMedium ?? null,
      lead.utmCampaign ?? null,
      lead.visitorId ?? null,
      lead.sessionId ?? null,
      lead.deviceType ?? null,
      lead.country ?? null,
      lead.region ?? null,
      lead.city ?? null,
      lead.emailSent,
    ]
  )
}
