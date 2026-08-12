import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'

export type BadgeTone = 'cyan' | 'purple' | 'green' | 'yellow' | 'blue' | 'orange'

const TONE_CLASSES: Record<BadgeTone, string> = {
  cyan: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-800 dark:text-indigo-400',
  purple: 'bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-400',
  green: 'bg-green-500/10 border-green-500/20 text-green-800 dark:text-green-400',
  yellow: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-700 dark:text-yellow-400',
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
  orange: 'bg-orange-400/10 border-orange-400/20 text-orange-700 dark:text-orange-400',
}

interface BadgeProps {
  tone: BadgeTone
  icon?: LucideIcon
  className?: string
  children: React.ReactNode
}

export default function Badge({ tone, icon: Icon, className, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        TONE_CLASSES[tone],
        className
      )}
    >
      {Icon && <Icon size={10} fill="currentColor" />}
      {children}
    </span>
  )
}
