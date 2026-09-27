'use client'

import { useEffect, useId, useRef } from 'react'
import { AlertTriangle } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  open: boolean
  title: string
  description: React.ReactNode
  confirmLabel: string
  pendingLabel?: string
  cancelLabel?: string
  tone?: 'danger' | 'default'
  pending?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  pendingLabel,
  cancelLabel = 'Cancel',
  tone = 'default',
  pending = false,
  onConfirm,
  onCancel,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  function handleCancel(event: React.SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault()
    if (!pending) onCancel()
  }

  function handleBackdrop(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget && !pending) onCancel()
  }

  const danger = tone === 'danger'

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={descId}
      onCancel={handleCancel}
      onClick={handleBackdrop}
      className="confirm-dialog surface-nav m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl p-0 text-[var(--text-primary)] backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-start gap-4">
          {danger && (
            <span className="shrink-0 w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-600 dark:text-red-400">
              <AlertTriangle size={18} aria-hidden="true" />
            </span>
          )}
          <div className="min-w-0">
            <h2 id={titleId} className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {title}
            </h2>
            <div id={descId} className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {description}
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            autoFocus
            onClick={onCancel}
            disabled={pending}
            className="px-5 py-2.5 rounded-full surface text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className={clsx(
              'px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              danger
                ? 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500/60'
                : 'bg-brand-700 hover:bg-brand-800 focus-visible:ring-brand-500/60'
            )}
          >
            {pending ? (pendingLabel ?? confirmLabel) : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
}
