import { ArrowUpRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import { CERTIFICATIONS } from '@/content/certifications'

const ISSUER_MARKS: Record<string, string> = {
  WorldQuant: 'WQ',
  '365 Financial Analyst': '365',
  'DeepLearning.AI': 'DL',
  Google: 'G',
  'Indian School of Business': 'ISB',
  Microsoft: 'MS',
}

function issuerMark(issuer: string) {
  const main = issuer.split('·')[0].trim()
  return ISSUER_MARKS[main] ?? main.slice(0, 2).toUpperCase()
}

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding container-wide">
      <SectionHeader
        sectionId="certifications"
        title="Certifications"
        subtitle={`A WorldQuant Challenge silver, plus ${CERTIFICATIONS.length - 1} credentials in machine learning, deep learning, MLOps and analytics from DeepLearning.AI, Google, Microsoft and ISB.`}
      />

      <Stagger as="ul" className="grid gap-x-10 border-t border-[var(--surface-border)] md:grid-cols-2" gap={0.04}>
        {CERTIFICATIONS.map((cert) => {
          const award = /silver|gold|award/i.test(cert.name)
          return (
            <StaggerItem as="li" key={cert._id} className="border-b border-[var(--surface-border)]">
              <a
                href={cert.credential}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify the ${cert.name} credential from ${cert.issuer} (opens in a new tab)`}
                className="group relative isolate flex items-center gap-4 rounded-lg py-4 pr-1 pl-1 sm:py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-left scale-x-0 rounded-lg bg-brand-500/[0.05] transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-xl border border-[var(--surface-border)] bg-[var(--surface-bg)] font-mono text-xs font-bold text-brand-700 dark:text-brand-400"
                >
                  {issuerMark(cert.issuer)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold leading-snug text-slate-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">
                      {cert.name}
                    </span>
                    {award && (
                      <span className="rounded-full bg-amber-400/15 px-2 py-0.5 font-mono text-[0.65rem] font-medium text-amber-700 dark:text-amber-400">
                        Award
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-sm text-slate-600 dark:text-slate-400">
                    {cert.issuer} · <span className="font-mono text-xs">{cert.date}</span>
                  </span>
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[var(--surface-border)] text-slate-500 transition-[background-color,border-color,color,transform] duration-300 group-hover:rotate-45 group-hover:border-brand-600 group-hover:bg-brand-700 group-hover:text-white">
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </a>
            </StaggerItem>
          )
        })}
      </Stagger>
    </section>
  )
}
