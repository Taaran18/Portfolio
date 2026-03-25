'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Skill } from '@/types'

interface Props {
  open: boolean
  onClose: () => void
  initial: Skill | null
  onSaved: () => void
}

const inputCls = 'w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 text-sm transition-all'

const CATEGORIES = ['frontend', 'backend', 'database', 'devops', 'other']

export default function SkillModal({ open, onClose, initial, onSaved }: Props) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<Skill>()

  useEffect(() => {
    if (open) reset(initial ?? { level: 80, category: 'frontend', order: 0 })
  }, [open, initial, reset])

  const onSubmit = async (data: Skill) => {
    const url = initial ? `/api/skills/${initial._id}` : '/api/skills'
    const method = initial ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, level: Number(data.level) }),
    })

    if (res.ok) { toast.success(initial ? 'Updated!' : 'Created!'); onSaved(); onClose() }
    else toast.error('Failed to save')
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0a0a1f] border border-white/10 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/8">
          <h2 className="text-white font-bold text-lg">{initial ? 'Edit Skill' : 'New Skill'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
              Skill Name <span className="text-red-400">*</span>
            </label>
            <input {...register('name', { required: true })} placeholder="e.g. React / Next.js" className={inputCls} />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
              Category <span className="text-red-400">*</span>
            </label>
            <select {...register('category', { required: true })} className={inputCls + ' bg-[#0a0a1f]'}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-[#0a0a1f]">{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
              Proficiency Level (0–100) <span className="text-red-400">*</span>
            </label>
            <input {...register('level', { required: true, min: 0, max: 100 })} type="number" min={0} max={100} className={inputCls} />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">Order</label>
            <input {...register('order', { valueAsNumber: true })} type="number" className={inputCls} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-sm hover:opacity-90 disabled:opacity-50 transition-all">
              {isSubmitting ? 'Saving...' : initial ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
