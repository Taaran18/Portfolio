import { listWith } from '@/lib/format'
import { SITE } from '@/lib/site'
import type { FaqEntry } from '@/types'

export const FAQS: FaqEntry[] = [
  {
    _id: 'roles',
    question: 'What Roles Are You Open To?',
    answer: `Full-time ${listWith(SITE.openToRoles, 'or')} roles. I'm also open to freelance projects and research collaborations if the problem is interesting.`,
  },
  {
    _id: 'location',
    question: 'Where Are You Based, and Do You Work Remotely?',
    answer: `I'm in ${SITE.location}. I'm used to working with remote teams, and I'm open to relocating for the right role.`,
  },
  {
    _id: 'stack',
    question: 'What Do You Actually Build?',
    answer:
      'Mostly LLM apps: RAG pipelines, LangGraph agents, and the machine learning and deep learning models behind them. I build the full stack myself, usually Python and FastAPI on the backend, PyTorch or scikit-learn for the models, and Next.js with TypeScript for the front end.',
  },
  {
    _id: 'experience',
    question: 'How Much Production Experience Do You Have?',
    answer:
      'Two years across three companies, with client work in 10+ industries. I started in data science, moved into machine learning and deep learning on production systems, and now build LLM products. Everything on this site is deployed, so you can try it instead of taking my word for it.',
  },
  {
    _id: 'freelance',
    question: 'Do You Take Freelance or Contract Work?',
    answer: `Yes. I take client work through my studio at ${SITE.freelanceUrl.replace('https://', '')}: websites, web and mobile apps, AI integrations and automation. Projects involving LLMs, RAG, or ML and deep learning prototypes are the best fit.`,
  },
  {
    _id: 'response',
    question: 'How Quickly Do You Reply?',
    answer: `Usually within a day. The form comes straight to my inbox, or you can email ${SITE.email} or message me on WhatsApp.`,
  },
]
