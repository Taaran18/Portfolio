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
            I&apos;m <span className="font-semibold text-slate-900 dark:text-white">Taaran</span>, an AI Engineer in
            Jaipur, India. I started in data science, moved into machine learning and deep learning on production
            systems, and now build LLM products: retrieval systems that cite their sources and agents that decide which
            tool to use.
          </p>
          <p className="leading-relaxed text-slate-600 dark:text-slate-400">
            The problems I enjoy most are the ones where a model has to earn trust: an answer that needs a source, a
            prediction someone will act on, an alert that can&apos;t cry wolf. That&apos;s why I build the backend and
            the interface myself, so I can see how the AI behaves for the person actually using it.
          </p>
          <p className="leading-relaxed text-slate-600 dark:text-slate-400">
            I make trade-offs deliberately. A smaller model if it&apos;s fast enough, files on disk when one server will
            do, a rule-based fallback when the AI is slow. Each case study shows those choices, the numbers behind them
            and what I&apos;d change next time.
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
        as="div"
        className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-border)] lg:grid-cols-4"
      >
        {ABOUT_STATS.map((stat) => (
          <StaggerItem key={stat.label} className="flex flex-col bg-[var(--surface-bg)] p-6 md:p-8">
            <p className="font-display text-4xl font-bold tracking-tight text-gradient md:text-5xl">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
