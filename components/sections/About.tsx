'use client'

import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { ABOUT_STATS, ABOUT_TRAITS, ABOUT_TECH_STACK } from '@/content/about'
import { getSocialLink } from '@/content/social'
import { PROJECTS } from '@/content/projects'

export default function About() {
  return (
    <section id="about" className="section-padding container-wide">
      <SectionHeader
        sectionId="about"
        title="An AI Engineer Who Builds the Whole App"
        subtitle={`Give me a problem and I'll take it all the way to a product people can use. ${PROJECTS.length} of them are live on this site.`}
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="flex flex-col gap-6 lg:col-span-6">
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            I&apos;m <span className="font-semibold text-slate-900 dark:text-white">Taaran</span>, an AI Engineer based
            in Jaipur, India. Over two years I&apos;ve worked across{' '}
            <span className="font-semibold text-slate-900 dark:text-white">3 companies</span> and delivered client work
            in <span className="font-semibold text-slate-900 dark:text-white">6+ industries</span>, building AI that
            businesses rely on every day.
          </p>
          <p className="leading-relaxed text-slate-600 dark:text-slate-400">
            I started in data science, moved on to machine learning and deep learning models that catch anomalies in
            production systems, and now focus on LLM products: retrieval systems that cite their sources and AI agents
            that decide which tool to use. I also build the backend and the interface around them, so an idea goes from
            rough concept to a product people can actually use.
          </p>
          <p className="leading-relaxed text-slate-600 dark:text-slate-400">
            I judge my work by one thing: whether the AI actually holds up for the people using it. That means caring
            about how accurate it is, how fast it responds and what it costs to run, and it&apos;s what I&apos;d bring
            to your team.
          </p>

          <div className="flex flex-col gap-6 pt-2 lg:mt-auto">
            <div className="flex flex-wrap gap-2">
              {ABOUT_TECH_STACK.map((tech) => (
                <Badge key={tech} tone="cyan" className="font-mono">
                  {tech}
                </Badge>
              ))}
            </div>
            <div>
              <Button
                as="a"
                href={getSocialLink('resume').href}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="text-sm"
              >
                View Resume
              </Button>
            </div>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6 lg:auto-rows-fr">
          {ABOUT_TRAITS.map((trait) => (
            <StaggerItem
              key={trait.title}
              className="group surface surface-raise rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40"
            >
              <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-700 dark:text-brand-400 transition-transform duration-300 group-hover:-rotate-6">
                <trait.icon size={20} />
              </span>
              <h3 className="card-title mb-1.5 text-slate-900 dark:text-white">{trait.title}</h3>
              <p className="card-body text-slate-600 dark:text-slate-400">{trait.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Stagger
        as="dl"
        className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-border)] lg:grid-cols-4"
      >
        {ABOUT_STATS.map((stat) => (
          <StaggerItem key={stat.label} className="flex flex-col bg-[var(--surface-bg)] p-6 md:p-8">
            <dt className="order-2 mt-1 text-sm text-slate-600 dark:text-slate-400">{stat.label}</dt>
            <dd className="font-display text-4xl font-bold tracking-tight text-gradient md:text-5xl">{stat.value}</dd>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
