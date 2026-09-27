import clsx from 'clsx'

interface Props {
  code: string
  eyebrow: string
  title: string
  description: React.ReactNode
  actions: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export default function StatusPage({ code, eyebrow, title, description, actions, children, className }: Props) {
  return (
    <section className={clsx('relative section-padding container-wide overflow-hidden', className)}>
      <div className="ambient-glow" aria-hidden="true" />

      <div className="relative max-w-2xl mx-auto text-center">
        <p
          aria-hidden="true"
          className="font-mono font-bold text-gradient leading-[1.1] tracking-tighter text-[5.5rem] sm:text-[8rem] md:text-[10rem] select-none"
        >
          {code}
        </p>
        <p className="mt-2 text-brand-700 dark:text-brand-400 font-mono text-sm tracking-[0.3em] uppercase">
          {eyebrow}
        </p>
        <h1 className="heading-lg text-slate-900 dark:text-white mt-4">{title}</h1>
        <div className="mt-4 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
          {description}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          {actions}
        </div>
      </div>

      {children && <div className="relative max-w-3xl mx-auto mt-16">{children}</div>}
    </section>
  )
}
