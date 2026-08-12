import { slugify } from '@/lib/format'
import type { ArticleSection } from '@/types'

export default function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.heading} id={slugify(section.heading)} className="space-y-4 scroll-mt-32">
          <h2 className="font-display text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {section.heading}
          </h2>

          {section.body.map((paragraph, i) => (
            <p key={i} className="text-slate-600 dark:text-slate-300 leading-[1.75] text-[15px] md:text-base">
              {paragraph}
            </p>
          ))}

          {section.bullets && (
            <ul className="space-y-2.5 pt-1">
              {section.bullets.map((point) => (
                <li key={point} className="flex gap-3 text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}
