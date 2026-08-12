import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import type { AnalyticsEvent } from './types'

const MAX_EVENTS = 50_000
const DATA_DIR = process.env.ANALYTICS_DIR ?? path.join(process.cwd(), '.data')
const DATA_FILE = path.join(DATA_DIR, 'analytics.json')

let memory: AnalyticsEvent[] = []
let durable: boolean | null = null

function canWriteToDisk(): boolean {
  if (durable !== null) return durable
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true })
    fs.accessSync(DATA_DIR, fs.constants.W_OK)
    durable = true
  } catch {
    durable = false
  }
  return durable
}

function readAll(): AnalyticsEvent[] {
  if (!canWriteToDisk()) return memory
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) as AnalyticsEvent[]
  } catch {
    return []
  }
}

function writeAll(events: AnalyticsEvent[]): void {
  const trimmed = events.slice(-MAX_EVENTS)
  if (!canWriteToDisk()) {
    memory = trimmed
    return
  }
  const tmp = `${DATA_FILE}.tmp`
  fs.writeFileSync(tmp, JSON.stringify(trimmed))
  fs.renameSync(tmp, DATA_FILE)
}

export function storageInfo() {
  const ok = canWriteToDisk()
  return {
    driver: ok ? 'file' : 'memory',
    durable: ok,
    note: ok
      ? undefined
      : 'Filesystem is read-only (serverless). Events reset on every cold start — connect a database to persist.',
  }
}

export function visitorHash(ip: string, userAgent: string): string {
  const salt = process.env.ADMIN_SESSION_SECRET ?? 'analytics-salt'
  return crypto.createHash('sha256').update(`${ip}|${userAgent}|${salt}`).digest('hex').slice(0, 16)
}

export function deviceFrom(userAgent: string): AnalyticsEvent['device'] {
  const ua = userAgent.toLowerCase()
  if (/ipad|tablet/.test(ua)) return 'tablet'
  if (/mobi|android|iphone/.test(ua)) return 'mobile'
  return 'desktop'
}

export function record(event: Omit<AnalyticsEvent, 'id' | 'at'>): void {
  const events = readAll()
  events.push({ ...event, id: crypto.randomUUID(), at: Date.now() })
  writeAll(events)
}

export function allEvents(): AnalyticsEvent[] {
  return readAll()
}

export function clearEvents(): void {
  writeAll([])
  memory = []
}
