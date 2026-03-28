'use client'

import { motion } from 'framer-motion'

interface Props {
  label: string
  title: string
  subtitle?: string
}

export default function SectionHeader({ label, title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center mb-16"
    >
      <p className="text-cyan-500 font-mono text-sm tracking-[0.3em] uppercase mb-4">{label}</p>
      <h2 className="heading-lg text-gradient mb-4">{title}</h2>
      {subtitle && (
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
