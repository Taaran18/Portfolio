'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { ABOUT_STATS, ABOUT_TRAITS, ABOUT_TECH_STACK } from '@/content/about'
import { getSocialLink } from '@/content/social'
import { EASE_OUT, slideIn } from '@/lib/motion'

export default function About() {
  return (
    <section id="about" className="section-padding container-wide">
      <SectionHeader
        sectionId="about"
        title="About Me"
        subtitle="I'm obsessed with making machines learn — and making sure what they learn is actually useful."
      />

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <motion.div
          {...slideIn('left', { duration: 0.7, margin: '-80px' })}
          className="space-y-6"
        >
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed text-left">
            Hey! I&apos;m <span className="text-indigo-700 dark:text-indigo-400 font-semibold">Taaran</span>, an AI Engineer
            passionate about building systems at the intersection of{' '}
            <span className="text-violet-600 dark:text-violet-400 font-semibold">large language models</span>,
            deep learning, and real-world applications.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-left">
            I work across the full ML lifecycle — from exploratory data analysis and model research to
            serving models at scale in production. My current focus is on LLM-powered applications:
            retrieval-augmented generation (RAG), agentic AI, and multimodal systems.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-left">
            When I&apos;m not training models or writing code, I&apos;m reading the latest papers on arXiv,
            contributing to open-source AI tools, or experimenting with new architectures.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {ABOUT_TECH_STACK.map((tech) => (
              <Badge key={tech} tone="cyan" className="font-mono">{tech}</Badge>
            ))}
          </div>

          <div className="pt-4">
            <Button as="a" href={getSocialLink('resume').href} target="_blank" rel="noopener noreferrer" variant="secondary" className="text-sm">
              View Resume
            </Button>
          </div>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            {...slideIn('right', { duration: 0.7, margin: '-80px' })}
            className="grid grid-cols-2 gap-4"
          >
            {ABOUT_STATS.map((stat, i) => (
              <Card
                key={stat.label}
                padding="md"
                hover="none"
                borderGradient
                group={false}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE_OUT }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-gradient mb-1">{stat.value}</p>
                <p className="text-slate-600 dark:text-slate-400 text-xs whitespace-nowrap">{stat.label}</p>
              </Card>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ABOUT_TRAITS.map((trait, i) => (
              <Card
                key={trait.title}
                padding="sm"
                hover="subtle"
                initial={{ opacity: 0, scale: 0.82, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE_OUT }}
              >
                <trait.icon size={22} className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="card-title text-slate-900 dark:text-white mb-1">{trait.title}</h3>
                <p className="card-body text-slate-600 dark:text-slate-400">{trait.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
