import Link from 'next/link'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'pill'

const BASE =
  'inline-flex items-center justify-center gap-2 font-semibold transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    'px-8 py-3.5 rounded-2xl bg-accent-700 bg-gradient-to-r from-brand-700 to-accent-700 text-white shadow-lg shadow-brand-500/25 hover:opacity-90',

  secondary: 'px-6 py-3 rounded-xl border border-brand-500/40 text-brand-700 dark:text-brand-400 hover:bg-brand-500/10',
  ghost:
    'px-6 py-2.5 rounded-2xl surface text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-brand-500/30',
  pill: 'px-5 py-2 rounded-full text-sm font-medium surface text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
}

const PILL_ACTIVE =
  'bg-accent-700 bg-gradient-to-r from-brand-700 to-accent-700 !text-white shadow-lg shadow-brand-500/20 border-transparent'

interface ButtonOwnProps {
  variant?: ButtonVariant

  active?: boolean
  as?: 'button' | 'a' | 'link'
  href?: string
  className?: string
  children: React.ReactNode
}

type ButtonProps = ButtonOwnProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonOwnProps
  >

export default function Button({
  variant = 'primary',
  active,
  as = 'button',
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = clsx(BASE, VARIANT[variant], variant === 'pill' && active && PILL_ACTIVE, className)

  if (as === 'link' && href) {
    return (
      <Link href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    )
  }

  if (as === 'a' || href) {
    return (
      <a href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
