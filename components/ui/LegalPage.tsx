import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ArticleBody from '@/components/ui/ArticleBody'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { legalPageSchema } from '@/lib/seo'
import { LEGAL_DOCS, type LegalDoc } from '@/content/legal'
import { formatLongDate } from '@/lib/format'

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const related = LEGAL_DOCS.filter((d) => d.id !== doc.id)

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <JsonLd schema={legalPageSchema(doc)} />
      <article className="section-padding container-wide">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs trail={[{ label: doc.title }]} className="mb-10" />
          <header className="mb-12 pb-8 border-b border-[var(--surface-border)] text-center">
            <p className="text-brand-700 dark:text-brand-400 font-mono text-sm tracking-[0.3em] uppercase mb-4">
              Legal
            </p>
            <h1 className="heading-lg text-gradient mb-4">{doc.title}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-500 font-mono mb-6">
              Last updated <time dateTime={doc.updated}>{formatLongDate(doc.updated)}</time>
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{doc.summary}</p>
          </header>

          <ArticleBody sections={doc.sections} />

          <nav aria-label="Other legal pages" className="mt-16 pt-8 border-t border-[var(--surface-border)]">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-4">
              Also Read
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {related.map((d) => (
                <li key={d.id}>
                  <Link
                    href={d.path}
                    className="group surface surface-raise flex h-full items-center justify-between gap-4 rounded-2xl p-5 hover:border-brand-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
                  >
                    <span className="card-title text-slate-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                      {d.title}
                    </span>
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </article>
    </main>
  )
}
