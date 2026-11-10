// Browser-only. Gives every visitor a random id (local storage) and every visit
// — one tab session — an id plus how it started, so page views and contact-form
// leads can be tied to the same journey.

const VISITOR_KEY = 'tj_visitor_id'
const SESSION_KEY = 'tj_visit'

export interface Visit {
  visitorId: string
  sessionId: string
  landingPath: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

let current: Visit | null = null

function read(storage: () => Storage, key: string): string | null {
  try {
    return storage().getItem(key)
  } catch {
    return null
  }
}

function write(storage: () => Storage, key: string, value: string): void {
  try {
    storage().setItem(key, value)
  } catch {
    // Storage blocked: the ids still hold for this page load.
  }
}

export function utmParams(search = window.location.search) {
  const params = new URLSearchParams(search)
  return {
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
  }
}

function startVisit(visitorId: string): Visit {
  return {
    visitorId,
    sessionId: crypto.randomUUID(),
    landingPath: window.location.pathname,
    referrer: document.referrer || undefined,
    ...utmParams(),
  }
}

export function currentVisit(): Visit {
  if (current) return current

  let visitorId = read(() => localStorage, VISITOR_KEY)
  if (!visitorId) {
    visitorId = crypto.randomUUID()
    write(() => localStorage, VISITOR_KEY, visitorId)
  }

  try {
    const saved = JSON.parse(read(() => sessionStorage, SESSION_KEY) ?? 'null') as Visit | null
    if (saved?.sessionId && saved.visitorId === visitorId) current = saved
  } catch {
    // Corrupt entry: start a fresh visit below.
  }

  if (!current) {
    current = startVisit(visitorId)
    write(() => sessionStorage, SESSION_KEY, JSON.stringify(current))
  }
  return current
}
