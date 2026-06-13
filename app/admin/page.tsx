import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { isValidSession, SESSION_COOKIE } from '@/lib/auth'
import AdminDashboard from './AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  if (!isValidSession(cookieStore.get(SESSION_COOKIE)?.value)) {
    redirect('/admin/login')
  }
  return <AdminDashboard email={process.env.ADMIN_EMAIL ?? 'admin'} />
}
