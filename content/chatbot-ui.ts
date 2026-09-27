import { SITE } from '@/lib/site'

export const ASSISTANT = {
  name: 'Manav',
  tagline: `${SITE.name.split(' ')[0]}'s AI assistant`,
  welcome: `Hi, I'm Manav — ${SITE.name.split(' ')[0]}'s AI assistant. Ask me about his projects, skills, or experience, or pick a question below.`,
} as const

export const STARTER_QUESTIONS = [
  'Who is Taaran Jain?',
  'What projects has Taaran built?',
  'How does Nexus AI work?',
  'Is Taaran available for hire?',
]
