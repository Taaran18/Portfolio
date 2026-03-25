'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Experience } from '@/types'

interface Props {
  open: boolean
  onClose: () => void
  initial: Experience | null
  onSaved: () => void
}

type FormData = Omit<Experience, '_id' | 'technologies' | 'responsibilities'> & {
  technologiesStr: string
  responsibilitiesStr: string
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

export default function ExperienceModal({ open, onClose, initial, onSaved }: Props) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>()

  useEffect(() => {
    if (open) {
      reset(initial
        ? {
            ...initial,
            technologiesStr: initial.technologies.join(', '),
            responsibilitiesStr: initial.responsibilities.join('\n'),
          }
        : { current: false, order: 0, technologiesStr: '', responsibilitiesStr: '' }
      )
    }
  }, [open, initial, reset])

  const onSubmit = async (data: FormData) => {
    const payload: Partial<Experience> = {
      ...data,
      technologies: data.technologiesStr.split(',').map((t) => t.trim()).filter(Boolean),
      responsibilities: data.responsibilitiesStr.split('\n').map((r) => r.trim()).filter(Boolean),
    }
    delete (payload as Record<string, unknown>).technologiesStr
    delete (payload as Record<string, unknown>).responsibilitiesStr

    const url = initial ? `/api/experience/${initial._id}` : '/api/experience'
    const method = initial ? 'PUT' : 'POST'

    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) { toast.success(initial ? 'Updated!' : 'Created!'); onSaved(); onClose() }
    else toast.error('Failed to save')
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#0a0a1f] border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/8">
          <h2 className="text-white font-bold text-lg">{initial ? 'Edit Experience' : 'New Experience'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Company" required>
              <input {...register('company', { required: true })} placeholder="Company name" className={inputCls} />
            </Field>
            <Field label="Role / Title" required>
              <input {...register('role', { required: true })} placeholder="Senior Engineer" className={inputCls} />
            </Field>
          </div>

          <Field label="Description" required>
            <textarea {...register('description', { required: true })} rows={2} placeholder="Short summary of your role..." className={inputCls} />
          </Field>

          <Field label="Responsibilities (one per line)">
            <textarea {...register('responsibilitiesStr')} rows={4} placeholder={"Built X using Y\nReduced latency by Z%"} className={inputCls} />
          </Field>

          <Field label="Technologies (comma-separated)">
            <input {...register('technologiesStr')} placeholder="React, Node.js, AWS" className={inputCls} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date (YYYY-MM)" required>
              <input {...register('startDate', { required: true })} placeholder="2022-03" className={inputCls} />
            </Field>
            <Field label="End Date (YYYY-MM)">
              <input {...register('endDate')} placeholder="Leave blank if current" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Order">
              <input {...register('order', { valueAsNumber: true })} type="number" className={inputCls} />
            </Field>
            <Field label="Current Role">
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input {...register('current')} type="checkbox" className="w-4 h-4 accent-cyan-400" />
                <span className="text-slate-300 text-sm">I currently work here</span>
              </label>
            </Field>
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
