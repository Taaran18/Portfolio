'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Experience } from '@/types'
import ExperienceModal from '@/components/admin/ExperienceModal'

export default function AdminExperience() {
  const [items, setItems] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Experience | null>(null)

  const load = () => {
    setLoading(true)
    fetch('/api/experience').then((r) => r.json()).then(setItems).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience entry?')) return
    const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Deleted'); load() }
    else toast.error('Failed')
  }

  const openCreate = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (e: Experience) => { setEditing(e); setModalOpen(true) }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Experience</h1>
          <p className="text-slate-400 text-sm mt-1">{items.length} entries</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20">
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {loading ? (
        <div className="text-slate-500 py-20 text-center">Loading...</div>
      ) : (
        <div className="space-y-3">
          {items.map((exp) => (
            <div key={exp._id} className="flex items-start gap-4 bg-white/3 border border-white/8 rounded-xl p-4 hover:border-white/15 transition-all">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold text-sm">{exp.role}</h3>
                  {exp.current && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/20">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-cyan-400 text-xs mt-0.5">{exp.company}</p>
                <p className="text-slate-500 text-xs mt-1">
                  {exp.startDate} → {exp.current ? 'Present' : exp.endDate}
                </p>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {exp.technologies.slice(0, 5).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-xs font-mono text-purple-400/70 bg-purple-400/5 border border-purple-400/10">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(exp)} className="p-2 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(exp._id!)} className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-16 text-slate-600">No experience entries yet.</div>
          )}
        </div>
      )}

      <ExperienceModal open={modalOpen} onClose={() => setModalOpen(false)} initial={editing} onSaved={load} />
    </div>
  )
}
