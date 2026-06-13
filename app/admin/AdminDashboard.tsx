'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, LogOut, ExternalLink, FolderGit2,
  Briefcase, FileText, Award, Mail,
} from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Projects', href: '/projects', icon: FolderGit2 },
  { label: 'Experience', href: '/experience', icon: Briefcase },
  { label: 'Research', href: '/research', icon: FileText },
  { label: 'Certifications', href: '/certifications', icon: Award },
  { label: 'Contact', href: '/contact', icon: Mail },
]

export default function AdminDashboard({ email }: { email: string }) {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <LayoutDashboard size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs">{email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-red-500 hover:border-red-500/40 text-sm font-medium transition-colors disabled:opacity-50"
        >
          <LogOut size={15} /> {loggingOut ? 'Logging out…' : 'Log out'}
        </button>
      </div>

      {/* Welcome */}
      <div className="glass rounded-2xl p-8 border border-black/5 dark:border-white/5 mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
          Welcome back 👋
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          You&apos;re signed in to the portfolio admin. This is your private dashboard —
          content editing can be added here later. For now, jump to any section of the
          live site below.
        </p>
      </div>

      {/* Quick links */}
      <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-4">
        Quick links
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className="group glass rounded-xl p-5 border border-black/5 dark:border-white/5 hover:border-cyan-500/30 hover:scale-[1.02] transition-all flex items-center justify-between"
          >
            <span className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium">
              <Icon size={18} className="text-cyan-500" /> {label}
            </span>
            <ExternalLink size={14} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
          </a>
        ))}
      </div>
    </main>
  )
}
