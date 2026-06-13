import crypto from 'crypto'

/**
 * Lightweight single-admin auth. Credentials live in environment variables
 * (.env.local — gitignored), never in source. The session is an HMAC of the
 * admin email signed with ADMIN_SESSION_SECRET, stored in an HttpOnly cookie.
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? ''
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? ''
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? 'insecure-dev-secret-change-me'

export const SESSION_COOKIE = 'admin_session'
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours

/** Constant-time string comparison to avoid timing attacks. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return crypto.timingSafeEqual(ab, bb)
}

export function credentialsConfigured(): boolean {
  return Boolean(ADMIN_EMAIL && ADMIN_PASSWORD)
}

export function verifyCredentials(email: string, password: string): boolean {
  if (!credentialsConfigured()) return false
  const emailOk = safeEqual(email.trim().toLowerCase(), ADMIN_EMAIL.trim().toLowerCase())
  const passOk = safeEqual(password, ADMIN_PASSWORD)
  return emailOk && passOk
}

export function createSessionToken(): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(ADMIN_EMAIL).digest('hex')
}

export function isValidSession(token?: string | null): boolean {
  if (!token || !credentialsConfigured()) return false
  return safeEqual(token, createSessionToken())
}
