'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, ExternalLink, Github, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Project } from '@/types'
import ProjectModal from '@/components/admin/ProjectModal'

export default function AdminProjects() {
  const [items, setItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)

  const load = () => {
    setLoading(true)
    fetch('/api/projects')
      .then((r) => r.json())
      .then(setItems)
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Deleted'); load() }
    else toast.error('Delete failed')
  }

  const openCreate = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (p: Project) => { setEditing(p); setModalOpen(true) }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-slate-400 text-sm mt-1">{items.length} projects in your portfolio</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-500">Loading...</div>
      ) : (
        <div className="space-y-3">
          {items.map((project) => (
            <div
              key={project._id}
              className="flex items-center gap-4 bg-white/3 border border-white/8 rounded-xl p-4 hover:border-white/15 transition-all group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-semibold text-sm truncate">{project.title}</h3>
                  {project.featured && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shrink-0">
                      <Star size={9} fill="currentColor" /> Featured
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-xs truncate">{project.description}</p>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {project.technologies.slice(0, 5).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-xs font-mono text-cyan-400/70 bg-cyan-400/5 border border-cyan-400/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all">
                    <ExternalLink size={15} />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                    <Github size={15} />
                  </a>
                )}
                <button onClick={() => openEdit(project)}
                  className="p-2 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(project._id!)}
                  className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-16 text-slate-600">
              No projects yet. Click &quot;Add Project&quot; to create one.
            </div>
          )}
        </div>
      )}

      <ProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initial={editing}
        onSaved={load}
      />
    </div>
  )
}
