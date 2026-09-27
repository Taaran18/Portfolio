import { SITE } from '@/lib/site'
import { HERO_DESCRIPTION } from '@/content/hero'
import { ABOUT_STATS, ABOUT_TECH_STACK } from '@/content/about'
import { EXPERIENCES } from '@/content/experience'
import { PROJECTS } from '@/content/projects'
import { CASE_STUDIES } from '@/content/case-studies'
import { SKILLS, SKILL_CATEGORY_LABELS } from '@/content/skills'
import { CERTIFICATIONS } from '@/content/certifications'
import { PUBLISHED_PAPERS } from '@/content/research'
import { LEADERSHIP_ROLES } from '@/content/leadership'
import { SOCIAL_LINKS } from '@/content/social'
import { formatMonthYear } from '@/lib/format'
import type { KnowledgeEntry } from '@/lib/chatbot/types'

export { ASSISTANT, STARTER_QUESTIONS } from '@/content/chatbot-ui'

const CURATED: KnowledgeEntry[] = [
  {
    id: 'identity',
    topic: 'identity',
    keywords: ['who are you', 'who is taaran', 'about taaran', 'introduce yourself', 'what do you do'],
    question: 'Who is Taaran Jain?',
    answer: `${SITE.description}\n\n${HERO_DESCRIPTION}`,
    featured: true,
  },
  {
    id: 'current-role',
    topic: 'experience',
    keywords: ['current job', 'current role', 'where do you work', 'what are you working on now'],
    question: 'What does Taaran currently work on?',
    answer: (() => {
      const current = EXPERIENCES.find((e) => e.current)
      if (!current) return "Taaran's current role isn't listed yet — check the Experience page for the latest."
      return `Taaran is currently ${current.role} at ${current.company}. ${current.description}`
    })(),
    featured: true,
  },
  {
    id: 'contact',
    topic: 'contact',
    keywords: ['contact', 'email', 'reach out', 'get in touch', 'talk to taaran'],
    question: 'How can I contact Taaran?',
    answer: `You can reach Taaran directly at ${SITE.email}, or use the contact form on this site. He's also active on LinkedIn: ${SITE.socials.linkedin}`,
    featured: true,
  },
  {
    id: 'availability',
    topic: 'availability',
    keywords: [
      'available',
      'hire',
      'hiring',
      'freelance',
      'open to work',
      'looking for a job',
      'full-time',
      'collaborate',
    ],
    question: 'Is Taaran available for hire?',
    answer:
      'Yes — Taaran is open to full-time AI/ML engineering roles, freelance projects, and research collaborations. If you have an interesting problem involving data or intelligence, reach out via the contact form or email.',
    featured: true,
  },
  {
    id: 'location',
    topic: 'identity',
    keywords: ['location', 'based', 'located', 'where is taaran from', 'city', 'country'],
    question: 'Where is Taaran based?',
    answer: `Taaran is based in ${SITE.location}.`,
  },
  {
    id: 'resume',
    topic: 'contact',
    keywords: ['resume', 'cv', 'download resume'],
    question: "Can I see Taaran's resume?",
    answer: `Sure — here's his resume: ${SITE.resumeUrl}`,
  },
  {
    id: 'tech-stack',
    topic: 'skills',
    keywords: ['tech stack', 'technologies', 'tools', 'what does taaran use'],
    question: "What's Taaran's tech stack?",
    answer: `Taaran works primarily with: ${ABOUT_TECH_STACK.join(', ')}.`,
    featured: true,
  },
  {
    id: 'github',
    topic: 'contact',
    keywords: ['github', 'code', 'open source', 'repositories'],
    question: "What's Taaran's GitHub?",
    answer: `${SOCIAL_LINKS.find((s) => s.id === 'github')?.href} — most of the projects below have their source linked there.`,
  },
  {
    id: 'stats',
    topic: 'identity',
    keywords: ['experience level', 'years of experience', 'how many projects', 'background summary'],
    question: 'What are some quick stats about Taaran?',
    answer: ABOUT_STATS.map((s) => `${s.value} ${s.label}`).join(' · '),
  },
]

const EXPERIENCE_ENTRIES: KnowledgeEntry[] = EXPERIENCES.map((exp) => ({
  id: `experience-${exp._id}`,
  topic: 'experience',
  keywords: [exp.company, exp.role, ...exp.technologies],
  question: `What did Taaran do at ${exp.company}?`,
  answer: `${exp.role} at ${exp.company} (${formatMonthYear(exp.startDate)} – ${exp.current ? 'Present' : exp.endDate ? formatMonthYear(exp.endDate) : ''}).\n${exp.description}\n\nHighlights:\n${exp.responsibilities.map((r) => `- ${r}`).join('\n')}`,
}))

const PROJECT_ENTRIES: KnowledgeEntry[] = PROJECTS.map((project) => ({
  id: `project-${project.slug}`,
  topic: 'projects',
  keywords: [project.title, ...project.technologies],
  question: `Tell me about ${project.title}`,
  answer: `${project.title} — ${project.description}\n\nThe problem: ${project.problem}\n\nThe solution, in Taaran's words: ${project.solution}\n\nImpact:\n${project.impact.map((i) => `- ${i}`).join('\n')}\n\nBuilt with: ${project.technologies.join(', ')}.${
    project.liveUrl ? `\nLive: ${project.liveUrl}` : ''
  }${project.githubUrl ? `\nCode: ${project.githubUrl}` : ''}${
    project.caseStudySlug ? `\nCase study: /case-studies/${project.caseStudySlug}` : ''
  }`,
}))

const PROJECTS_OVERVIEW: KnowledgeEntry = {
  id: 'projects-overview',
  topic: 'projects',
  keywords: ['projects', 'show me your work', 'what have you built', 'portfolio projects', 'best project'],
  question: 'What projects has Taaran built?',
  answer: `Taaran has shipped ${PROJECTS.length} live projects:\n${PROJECTS.map((p) => `- ${p.title}: ${p.tagline}`).join('\n')}\n\nAsk about any of them by name, for example how it works, the hardest problem or the results. Screenshots and live demos are on /projects.`,
  featured: true,
}

export const PROJECT_ALIASES: Record<string, string[]> = {
  'nexus-ai': ['nexus', 'nexusai', 'ai assistant project', 'decision board'],
  'ml-insights': ['ml insights', 'mlinsight', 'ml insight', 'no code ml', 'automl', 'model comparison tool'],
  'self-driven-car': [
    'self driven car',
    'self driving car',
    'self-driving car',
    'selfdriving car',
    'car simulator',
    'neat car',
    'neuroevolution project',
    'driving simulator',
  ],
  grabbit: ['grab bit', 'media downloader', 'video downloader', 'downloader'],
  logvera: ['log vera', 'log analyser', 'log analyzer', 'log analytics', 'log tool'],
  comet: ['url shortener', 'link shortener', 'short link', 'short links', 'shortener'],
  decidex: ['decide x', 'churn', 'churn prediction', 'churn model', 'retention tool'],
}

export const PROJECT_REFERENCE = [
  ...PROJECTS.map((p) => {
    const study = CASE_STUDIES.find((s) => s.slug === p.caseStudySlug)
    return [
      `## ${p.title}`,
      `Tagline: ${p.tagline}`,
      `Summary: ${p.description}`,
      `Problem: ${p.problem}`,
      `Solution: ${p.solution}`,
      `Key metrics: ${p.metrics.map((m) => `${m.value} ${m.label}`).join('; ')}`,
      `Impact:\n${p.impact.map((i) => `- ${i}`).join('\n')}`,
      `Technologies: ${p.technologies.join(', ')}`,
      p.liveUrl ? `Live demo: ${p.liveUrl}` : '',
      p.githubUrl ? `Source code: ${p.githubUrl}` : '',
      study
        ? `Case study (/case-studies/${study.slug}), ${study.timeline ?? 'published ' + study.publishedAt}:\n${study.sections
            .map(
              (s) =>
                `### ${s.heading}\n${s.body.join('\n')}${s.bullets ? '\n' + s.bullets.map((b) => `- ${b}`).join('\n') : ''}`
            )
            .join('\n\n')}`
        : '',
    ]
      .filter(Boolean)
      .join('\n')
  }),
].join('\n\n')

const CASE_STUDIES_OVERVIEW: KnowledgeEntry = {
  id: 'case-studies-overview',
  topic: 'projects',
  keywords: ['case study', 'case studies', 'deep dive', 'architecture', 'how did you build', 'trade-offs'],
  question: 'Where can I read how Taaran built these projects?',
  answer: `Taaran has written ${CASE_STUDIES.length} engineering case studies covering the problem, constraints, architecture, trade-offs, the hardest bug and results:\n${CASE_STUDIES.map((s) => `- ${s.title}: ${s.tagline} (/case-studies/${s.slug})`).join('\n')}`,
}

const SKILL_CATEGORY_ENTRIES: KnowledgeEntry[] = Object.entries(SKILL_CATEGORY_LABELS).map(([cat, label]) => {
  const inCategory = SKILLS.filter((s) => s.category === cat)
  return {
    id: `skills-${cat}`,
    topic: 'skills' as const,
    keywords: [label, cat],
    question: `What are Taaran's ${label} skills?`,
    answer: `Under ${label}: ${inCategory.map((s) => s.name).join(', ')}.`,
  }
})

const RESEARCH_ENTRIES: KnowledgeEntry[] = PUBLISHED_PAPERS.map((paper) => ({
  id: `research-${paper._id}`,
  topic: 'research',
  keywords: [paper.title, paper.category, 'research', 'paper', 'publication'],
  question: `Tell me about "${paper.title}"`,
  answer: `${paper.title} (${paper.year}) — ${paper.summary}\n${paper.link}`,
}))

const RESEARCH_OVERVIEW: KnowledgeEntry = {
  id: 'research-overview',
  topic: 'research',
  keywords: ['research', 'papers', 'publications', 'published'],
  question: 'Has Taaran published any research?',
  answer: `Yes — Taaran has published ${PUBLISHED_PAPERS.length} papers at the intersection of AI, financial markets, and healthcare: ${PUBLISHED_PAPERS.map((p) => p.title).join('; ')}.`,
}

const CERTIFICATIONS_ENTRY: KnowledgeEntry = {
  id: 'certifications',
  topic: 'certifications',
  keywords: ['certifications', 'certificates', 'coursera', 'credentials', 'courses'],
  question: 'What certifications does Taaran have?',
  answer: `Taaran holds ${CERTIFICATIONS.length} certifications, including ${CERTIFICATIONS.slice(0, 5)
    .map((c) => c.name)
    .join(', ')}, and more — mostly from DeepLearning.AI, Google, and Microsoft.`,
  featured: true,
}

const LEADERSHIP_ENTRY: KnowledgeEntry = {
  id: 'leadership',
  topic: 'leadership',
  keywords: ['leadership', 'college', 'clubs', 'volunteer', 'extracurricular', 'hackathon'],
  question: "What's Taaran's leadership experience?",
  answer: `Taaran has held ${LEADERSHIP_ROLES.length} leadership roles in college — including ${LEADERSHIP_ROLES.slice(
    0,
    3
  )
    .map((r) => `${r.title} at ${r.organisation}`)
    .join(', ')} — spanning AI/ML mentorship, hackathon organisation, and technical event leadership.`,
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  ...CURATED,
  PROJECTS_OVERVIEW,
  ...PROJECT_ENTRIES,
  CASE_STUDIES_OVERVIEW,
  ...EXPERIENCE_ENTRIES,
  ...SKILL_CATEGORY_ENTRIES,
  CERTIFICATIONS_ENTRY,
  LEADERSHIP_ENTRY,
  RESEARCH_OVERVIEW,
  ...RESEARCH_ENTRIES,
]

export const FEATURED_QUESTIONS: string[] = KNOWLEDGE_BASE.filter((e) => e.featured).map((e) => e.question)
