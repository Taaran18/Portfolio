import type { Metadata } from 'next'
import AdminLoginForm from './AdminLoginForm'

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

export default function AdminLoginPage() {
  return <AdminLoginForm />
}
