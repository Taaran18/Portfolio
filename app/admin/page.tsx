import { FolderKanban, Briefcase, Cpu, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { projects, experience, skills } from '@/lib/dataStore'

export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
  const projectCount = projects.getAll().length
  const experienceCount = experience.getAll().length
  const skillCount = skills.getAll().length

  const stats = [
    { label: 'Projects', value: projectCount, icon: FolderKanban, href: '/admin/projects', color: 'from-cyan-500 to-blue-500' },
    { label: 'Experience', value: experienceCount, icon: Briefcase, href: '/admin/experience', color: 'from-purple-500 to-pink-500' },
    { label: 'Skills', value: skillCount, icon: Cpu, href: '/admin/skills', color: 'from-orange-500 to-yellow-500' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-slate-400 text-sm">
          Manage your portfolio content. Changes save to JSON files — commit &amp; redeploy to publish.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="group bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-all hover:-translate-y-0.5"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
              <Icon size={20} className="text-white" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-slate-400 text-sm">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Add new project', href: '/admin/projects' },
            { label: 'Add experience entry', href: '/admin/experience' },
            { label: 'Add a skill', href: '/admin/skills' },
            { label: 'View live portfolio', href: '/', external: true },
          ].map(({ label, href, external }) => (
            <Link
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm transition-all"
            >
              {external && <ExternalLink size={14} className="text-cyan-400" />}
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Info box */}
      <div className="mt-6 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
        <p className="text-amber-300 text-sm">
          <span className="font-semibold">Note:</span> The admin panel writes directly to the{' '}
          <code className="font-mono text-xs bg-amber-500/10 px-1 rounded">data/*.json</code> files
          in your project. Run <code className="font-mono text-xs bg-amber-500/10 px-1 rounded">npm run dev</code>{' '}
          locally to make changes, then <code className="font-mono text-xs bg-amber-500/10 px-1 rounded">git commit</code>{' '}
          and push to deploy updates to Vercel.
        </p>
      </div>
    </div>
  )
}
