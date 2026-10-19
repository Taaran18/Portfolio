'use client'

import { usePathname } from 'next/navigation'
import { sectionEyebrow } from '@/content/sections'
import { Reveal } from '@/components/ui/Reveal'

interface Props {
  sectionId: string
  title: string
  subtitle?: string
}

export default function SectionHeader({ sectionId, title, subtitle }: Props) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { index, name } = sectionEyebrow(sectionId, isHome)
  // On a standalone page this header is the page title, so it becomes the h1.
  const Heading = isHome ? 'h2' : 'h1'

  return (
    <div className="mb-12 md:mb-16 grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-12">
      <Reveal className="lg:col-span-7">
        <p className="eyebrow flex items-center gap-3">
          {index && <span>{index}</span>}
          {index && <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />}
          <span>{name}</span>
        </p>
        <Heading className="heading-lg mt-4 text-slate-900 dark:text-white text-balance">{title}</Heading>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.08} className="lg:col-span-5">
          <p className="lead lg:pb-1.5">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
