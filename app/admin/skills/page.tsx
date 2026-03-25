'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Skill } from '@/types'
import SkillModal from '@/components/admin/SkillModal'

const CATEGORY_COLORS: Record<string, string> = {
  frontend: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  backend: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  database: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  devops: 'text-green-400 bg-green-400/10 border-green-400/20',
  other: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
}

export default function AdminSkills() {
  const [items, setItems] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Skill | null>(null)

  const load = () => {
    setLoading(true)
    fetch('/api/skills').then((r) => r.json()).then(setItems).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return
    const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Deleted'); load() }
    else toast.error('Failed')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills</h1>
          <p className="text-slate-400 text-sm mt-1">{items.length} skills</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true) }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20">
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {loading ? (
        <div className="text-slate-500 py-20 text-center">Loading...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((skill) => (
            <div key={skill._id}
              className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl p-4 hover:border-white/15 transition-all group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white font-medium text-sm">{skill.name}</span>
                  <span className={`px-1.5 py-0.5 rounded text-xs border capitalize ${CATEGORY_COLORS[skill.category] ?? ''}`}>
                    {skill.category}
                  </span>
                </div>
                {/* Level bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-600" style={{ width: `${skill.level}%` }} />
                  </div>
                  <span className="text-xs font-mono text-slate-500 shrink-0">{skill.level}%</span>
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditing(skill); setModalOpen(true) }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                  <Pencil size={13} />
                </button>
                <button onClick={() => handleDelete(skill._id!)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-3 text-center py-16 text-slate-600">No skills yet.</div>
          )}
        </div>
      )}

      <SkillModal open={modalOpen} onClose={() => setModalOpen(false)} initial={editing} onSaved={load} />
    </div>
  )
}
