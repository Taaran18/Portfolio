'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, FolderKanban, Briefcase, Cpu, LogOut, ExternalLink } from 'lucide-react'
import clsx from 'clsx'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban, exact: false },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase, exact: false },
  { label: 'Skills', href: '/admin/skills', icon: Cpu, exact: false },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-[#0a0a1f] border-r border-white/5 flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-white/5">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Portfolio</p>
        <h2 className="text-white font-bold text-lg">Admin Panel</h2>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-400 border border-cyan-400/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon size={17} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer actions */}
      <div className="p-4 border-t border-white/5 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <ExternalLink size={17} /> View Site
        </a>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut size={17} /> Sign Out
        </button>
      </div>
    </aside>
  )
}
