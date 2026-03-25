import Sidebar from '@/components/admin/Sidebar'

export const metadata = {
  title: 'Admin — Portfolio',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout flex min-h-screen bg-[#050510] text-slate-200">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  )
}
