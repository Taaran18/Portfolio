'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Project } from '@/types'

interface Props {
  open: boolean
  onClose: () => void
  initial: Project | null
  onSaved: () => void
}

type FormData = Omit<Project, '_id' | 'technologies'> & { technologiesStr: string }

export default function ProjectModal({ open, onClose, initial, onSaved }: Props) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>()

  useEffect(() => {
    if (open) {
      reset(initial
        ? { ...initial, technologiesStr: initial.technologies.join(', ') }
        : { featured: false, order: 0, technologiesStr: '' }
      )
    }
  }, [open, initial, reset])

  const onSubmit = async (data: FormData) => {
    const payload: Partial<Project> = {
      ...data,
      technologies: data.technologiesStr.split(',').map((t) => t.trim()).filter(Boolean),
    }
    delete (payload as Record<string, unknown>).technologiesStr

    const url = initial ? `/api/projects/${initial._id}` : '/api/projects'
    const method = initial ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      toast.success(initial ? 'Project updated!' : 'Project created!')
      onSaved()
      onClose()
    } else {
      toast.error('Failed to save')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#0a0a1f] border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/8">
          <h2 className="text-white font-bold text-lg">{initial ? 'Edit Project' : 'New Project'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Field label="Title" required>
            <input {...register('title', { required: true })} placeholder="Project name" className={inputCls} />
          </Field>

          <Field label="Short Description" required>
            <textarea {...register('description', { required: true })} rows={2} placeholder="One-line description" className={inputCls} />
          </Field>

          <Field label="Long Description">
            <textarea {...register('longDescription')} rows={3} placeholder="Detailed description..." className={inputCls} />
          </Field>

          <Field label="Technologies (comma-separated)">
            <input {...register('technologiesStr')} placeholder="React, TypeScript, Node.js" className={inputCls} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Live URL">
              <input {...register('liveUrl')} type="url" placeholder="https://..." className={inputCls} />
            </Field>
            <Field label="GitHub URL">
              <input {...register('githubUrl')} type="url" placeholder="https://github.com/..." className={inputCls} />
            </Field>
          </div>

          <Field label="Image URL">
            <input {...register('imageUrl')} type="url" placeholder="https://..." className={inputCls} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Order">
              <input {...register('order', { valueAsNumber: true })} type="number" className={inputCls} />
            </Field>
            <Field label="Featured">
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input {...register('featured')} type="checkbox" className="w-4 h-4 accent-cyan-400" />
                <span className="text-slate-300 text-sm">Mark as featured</span>
              </label>
            </Field>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-sm hover:opacity-90 disabled:opacity-50 transition-all">
              {isSubmitting ? 'Saving...' : initial ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const inputCls = 'w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 text-sm transition-all'

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
