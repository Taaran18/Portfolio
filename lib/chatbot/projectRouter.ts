import { PROJECTS } from '@/content/projects'
import { CASE_STUDIES } from '@/content/case-studies'
import { PROJECT_ALIASES } from '@/content/chatbot'
import type { ArticleSection, CaseStudy, Project } from '@/types'
import type { ChatMessage, ChatReply } from './types'

type Facet =
  | 'hardest'
  | 'lessons'
  | 'results'
  | 'decisions'
  | 'constraints'
  | 'architecture'
  | 'stack'
  | 'links'
  | 'timeline'
  | 'caseStudy'
  | 'problem'
  | 'overview'

const FACETS: [Facet, string[]][] = [
  [
    'hardest',
    [
      'hardest',
      'challenge',
      'challenges',
      'challenging',
      'difficult',
      'difficulty',
      'bug',
      'bugs',
      'struggle',
      'tricky',
      'obstacle',
      'went wrong',
      'issue',
      'issues',
    ],
  ],
  [
    'lessons',
    [
      'lesson',
      'lessons',
      'learn',
      'learned',
      'learnt',
      'learning',
      'differently',
      'mistake',
      'mistakes',
      'improve',
      'improvement',
      'next time',
      'regret',
      'retrospective',
    ],
  ],
  [
    'results',
    [
      'result',
      'results',
      'impact',
      'metric',
      'metrics',
      'numbers',
      'performance',
      'accuracy',
      'achieve',
      'achieved',
      'outcome',
      'outcomes',
      'benchmark',
      'benchmarks',
      'fast',
      'speed',
      'latency',
      'recall',
      'precision',
      'tests',
      'tested',
    ],
  ],
  [
    'decisions',
    [
      'decision',
      'decisions',
      'trade off',
      'trade offs',
      'tradeoff',
      'tradeoffs',
      'chose',
      'choose',
      'choice',
      'choices',
      'instead of',
      'why not',
      'alternative',
      'alternatives',
    ],
  ],
  ['constraints', ['constraint', 'constraints', 'requirement', 'requirements', 'privacy', 'cost', 'budget']],
  [
    'architecture',
    [
      'architecture',
      'how does',
      'how do',
      'how is',
      'how it works',
      'work',
      'works',
      'working',
      'design',
      'designed',
      'pipeline',
      'system',
      'under the hood',
      'components',
      'flow',
      'structure',
      'implemented',
      'implementation',
    ],
  ],
  [
    'stack',
    [
      'stack',
      'tech',
      'technology',
      'technologies',
      'built with',
      'made with',
      'framework',
      'frameworks',
      'language',
      'languages',
      'library',
      'libraries',
      'tools',
      'uses',
    ],
  ],
  ['links', ['link', 'links', 'demo', 'live', 'url', 'website', 'try', 'github', 'source', 'repo', 'repository']],
  ['timeline', ['when', 'timeline', 'how long', 'started', 'duration', 'date']],
  ['caseStudy', ['case study', 'deep dive', 'write up', 'writeup', 'article', 'read more']],
  ['problem', ['problem', 'why', 'purpose', 'motivation', 'solve', 'solves', 'pain', 'need']],
]

const TECH_TRIGGERS = ['project', 'projects', 'built', 'build', 'use', 'used', 'uses', 'using', 'which', 'where']

const FOLLOW_UPS: [Facet, (title: string) => string][] = [
  ['architecture', (t) => `How does ${t} work?`],
  ['hardest', (t) => `What was the hardest problem in ${t}?`],
  ['results', (t) => `What results did ${t} get?`],
  ['decisions', (t) => `What trade-offs were made in ${t}?`],
  ['lessons', (t) => `What would be done differently in ${t}?`],
  ['links', (t) => `Where can I try ${t}?`],
]

function normalize(text: string) {
  return ` ${text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()} `
}

function includesPhrase(haystack: string, phrase: string) {
  return haystack.includes(` ${normalize(phrase).trim()} `)
}

function namesFor(project: Project) {
  return [project.title, project.slug.replace(/-/g, ' '), ...(PROJECT_ALIASES[project.slug] ?? [])]
}

function projectsIn(text: string): Project[] {
  const norm = normalize(text)
  return PROJECTS.filter((project) => namesFor(project).some((name) => includesPhrase(norm, name)))
}

function withoutNames(text: string) {
  let norm = normalize(text)
  for (const project of PROJECTS) {
    for (const name of namesFor(project)) {
      const phrase = normalize(name).trim()
      if (phrase) norm = norm.split(` ${phrase} `).join(' ')
    }
  }
  return norm
}

function facetIn(text: string): Facet | null {
  const norm = withoutNames(text)
  for (const [facet, words] of FACETS) {
    if (words.some((w) => includesPhrase(norm, w))) return facet
  }
  return null
}

function studyFor(project: Project): CaseStudy | undefined {
  return CASE_STUDIES.find((s) => s.slug === project.caseStudySlug)
}

function findSection(study: CaseStudy | undefined, test: (heading: string) => boolean) {
  return study?.sections.find((s) => test(s.heading))
}

function sentences(text: string, count: number) {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .slice(0, count)
    .join(' ')
}

const GENERIC_WORDS = new Set([
  'what',
  'does',
  'made',
  'make',
  'have',
  'with',
  'this',
  'that',
  'project',
  'about',
  'tell',
  'were',
  'used',
  'using',
  'from',
  'into',
  'your',
])

function headingMatch(project: Project, message: string) {
  const study = studyFor(project)
  if (!study) return null
  const words = withoutNames(message)
    .split(' ')
    .filter((w) => w.length >= 4 && !GENERIC_WORDS.has(w))
  let best: { section: ArticleSection; score: number } | null = null
  for (const section of study.sections) {
    const heading = normalize(section.heading)
    const score = words.filter((w) => heading.includes(` ${w} `)).length
    if (score > (best?.score ?? 0)) best = { section, score }
  }
  return best && best.score >= 2 ? best.section : null
}

function sectionText(section: ArticleSection, paragraphs = 2, bullets = 8) {
  const body = section.body.slice(0, paragraphs).join('\n\n')
  const list = section.bullets
    ?.slice(0, bullets)
    .map((b) => `- ${b}`)
    .join('\n')
  return list ? `${body}\n\n${list}` : body
}

function caseStudyLink(project: Project) {
  return project.caseStudySlug ? `Full case study: /case-studies/${project.caseStudySlug}` : ''
}

function linksText(project: Project) {
  return [
    project.liveUrl ? `Live demo: ${project.liveUrl}` : '',
    project.caseStudySlug ? `Case study: /case-studies/${project.caseStudySlug}` : '',
    project.githubUrl ? `Source code: ${project.githubUrl}` : '',
    `All projects: /projects`,
  ]
    .filter(Boolean)
    .join('\n')
}

function metricsLine(project: Project) {
  return project.metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`).join(' · ')
}

function overview(project: Project) {
  return [
    `${project.title}: ${project.tagline}.`,
    project.description,
    `The problem: ${project.problem}`,
    `The solution: ${project.solution}`,
    `Key numbers: ${metricsLine(project)}`,
    linksText(project),
  ].join('\n\n')
}

function answerFor(project: Project, facet: Facet, message = ''): string {
  const study = studyFor(project)
  const link = caseStudyLink(project)
  const withLink = (text: string) => (link ? `${text}\n\n${link}` : text)

  switch (facet) {
    case 'problem': {
      const section = study?.sections[0]
      return withLink(
        section
          ? `${project.title}: ${section.heading}\n\n${sectionText(section, 2)}`
          : `The problem ${project.title} solves: ${project.problem}`
      )
    }
    case 'constraints': {
      const section = findSection(study, (h) => /constraint/i.test(h))
      return withLink(section ? sectionText(section) : `${project.title}: ${project.solution}`)
    }
    case 'architecture': {
      const section = findSection(study, (h) => /architecture|together|pipeline|how .* works?/i.test(h))
      return withLink(
        section
          ? `How ${project.title} works:\n\n${sectionText(section, 1)}`
          : `How ${project.title} works: ${project.solution}\n\nBuilt with ${project.technologies.join(', ')}.`
      )
    }
    case 'decisions': {
      const whys = study?.sections.filter((s) => /^why /i.test(s.heading)) ?? []
      if (!whys.length) return withLink(`${project.title}: ${project.solution}`)
      const asked = withoutNames(message)
        .split(' ')
        .filter((w) => w.length >= 4)
      const scored = whys
        .map((section) => ({
          section,
          score: asked.filter((w) => normalize(section.heading).includes(` ${w} `)).length,
        }))
        .sort((a, b) => b.score - a.score)
      if (scored[0].score > 0) {
        return withLink(`${scored[0].section.heading}\n\n${sectionText(scored[0].section, 2)}`)
      }
      return withLink(
        `Key design decisions in ${project.title}:\n\n${whys
          .map((s) => `${s.heading}\n${sentences(s.body[0], 3)}`)
          .join('\n\n')}`
      )
    }
    case 'hardest': {
      const section = findSection(study, (h) => /hardest/i.test(h))
      return withLink(
        section
          ? `${section.heading}\n\n${sectionText(section, 2)}`
          : `The main challenge in ${project.title}: ${project.problem}`
      )
    }
    case 'results':
      return withLink(
        `${project.title} by the numbers: ${metricsLine(project)}\n\nImpact:\n${project.impact
          .map((i) => `- ${i}`)
          .join('\n')}`
      )
    case 'lessons': {
      const section = findSection(study, (h) => /differently|lesson/i.test(h))
      return withLink(
        section
          ? `What would be done differently in ${project.title}:\n\n${sectionText(section, 2)}`
          : overview(project)
      )
    }
    case 'stack': {
      const extras = study?.stack.filter((t) => !project.technologies.includes(t)) ?? []
      return withLink(
        `${project.title} is built with ${project.technologies.join(', ')}.${
          extras.length ? ` The case study also covers ${extras.join(', ')}.` : ''
        }`
      )
    }
    case 'links':
      return `${project.title} links:\n${linksText(project)}`
    case 'timeline':
      return withLink(
        study?.timeline
          ? `${project.title} was built over ${study.timeline}.`
          : `${project.title}'s case study was published in ${new Date(study?.publishedAt ?? Date.now()).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}.`
      )
    case 'caseStudy':
      return study
        ? `${study.title} case study: ${study.summary}\n\nIt covers:\n${study.sections.map((s) => `- ${s.heading}`).join('\n')}\n\nRead it here: /case-studies/${study.slug}`
        : overview(project)
    default:
      return overview(project)
  }
}

function followUps(project: Project, facet: Facet) {
  return FOLLOW_UPS.filter(([f]) => f !== facet)
    .slice(0, 3)
    .map(([, q]) => q(project.title))
}

function techIn(text: string) {
  const norm = normalize(text)
  const techs = new Set(PROJECTS.flatMap((p) => p.technologies))
  return [...techs].filter((t) => t.length >= 3 && includesPhrase(norm, t))
}

function lastProjectFrom(history: ChatMessage[]): Project | undefined {
  for (const message of [...history].reverse()) {
    if (message.role !== 'user') continue
    const [project] = projectsIn(message.text)
    if (project) return project
  }
  return undefined
}

export function answerProjectQuestion(message: string, history: ChatMessage[]): ChatReply | null {
  const mentioned = projectsIn(message)
  const facet = facetIn(message)

  if (mentioned.length > 1) {
    return {
      text: mentioned
        .map((p) => `${p.title}: ${p.tagline}.\n${p.description}\nKey numbers: ${metricsLine(p)}`)
        .join('\n\n'),
      suggestions: mentioned.slice(0, 3).map((p) => `Tell me about ${p.title}`),
    }
  }

  const project = mentioned[0] ?? (facet ? lastProjectFrom(history) : undefined)
  if (project) {
    const section = headingMatch(project, message)
    if (section) {
      return {
        text: `${section.heading}\n\n${sectionText(section, 2)}\n\n${caseStudyLink(project)}`.trim(),
        suggestions: followUps(project, 'overview'),
      }
    }
    const chosen = facet ?? 'overview'
    return { text: answerFor(project, chosen, message), suggestions: followUps(project, chosen) }
  }

  const techs = techIn(message)
  const norm = normalize(message)
  if (techs.length && TECH_TRIGGERS.some((w) => includesPhrase(norm, w))) {
    const matches = PROJECTS.filter((p) => techs.some((t) => p.technologies.includes(t)))
    if (matches.length) {
      return {
        text: `Projects that use ${techs.join(' and ')}:\n\n${matches
          .map((p) => `- ${p.title}: ${p.tagline}`)
          .join('\n')}\n\nAsk about any of them by name for the details.`,
        suggestions: matches.slice(0, 3).map((p) => `Tell me about ${p.title}`),
      }
    }
  }

  return null
}
