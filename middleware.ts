export { default } from 'next-auth/middleware'

/**
 * Protect all /admin routes except /admin/login.
 * NextAuth middleware checks for a valid JWT session automatically.
 */
export const config = {
  matcher: ['/admin/((?!login).*)'],
}
