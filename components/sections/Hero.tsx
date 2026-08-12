'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'
import { HERO_TITLE, HERO_CAPABILITIES, HERO_DESCRIPTION } from '@/content/hero'
import { SOCIAL_LINKS } from '@/content/social'
import { SITE } from '@/lib/site'
import { EASE_OUT } from '@/lib/motion'

const PROFILE_LINKS = SOCIAL_LINKS.filter(
  (s) => s.id === 'github' || s.id === 'linkedin' || s.id === 'email' || s.id === 'resume'
)

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const contentScale   = useTransform(scrollYProgress, [0, 0.6], [1, 0.82])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY       = useTransform(scrollYProgress, [0, 0.6], [0, -60])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const current = HERO_CAPABILITIES[roleIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1800)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40)
      } else {
        setIsDeleting(false)
        setRoleIndex((i) => (i + 1) % HERO_CAPABILITIES.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex, reducedMotion])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="ambient-glow" aria-hidden="true" />

      <motion.div
        style={{ scale: contentScale, opacity: contentOpacity, y: contentY }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full surface border border-indigo-500/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-slate-600 dark:text-slate-300 font-mono">{SITE.availability}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: EASE_OUT }}
          className="heading-xl mb-4 text-slate-900 dark:text-white"
        >
          Hi, I&apos;m{' '}
          <span className="text-gradient">Taaran Jain</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 font-light mb-6 h-10"
        >
          <span className="font-medium text-slate-900 dark:text-white">{HERO_TITLE}</span>
          <span className="mx-2 text-indigo-600 dark:text-indigo-400">·</span>
          <span>{reducedMotion ? HERO_CAPABILITIES[0] : displayed}</span>
          {!reducedMotion && <span className="inline-block w-0.5 h-7 bg-indigo-500 ml-1 animate-blink" />}
        </motion.div>

        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          {HERO_DESCRIPTION}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.5 }}
          className="flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-400 text-sm font-mono mb-10 -mt-4"
        >
          <MapPin size={13} className="text-indigo-600" />
          <span>{SITE.location}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.44, duration: 0.6, ease: EASE_OUT }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <Button as="a" href="#projects" variant="primary" className="glow-accent">
            View My Work
          </Button>
          <Button as="a" href="#contact" variant="secondary">
            Get in Touch
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-6 mb-20"
        >
          {PROFILE_LINKS.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="group flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 rounded">
              <Icon size={22} strokeWidth={1.75} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  )
}
