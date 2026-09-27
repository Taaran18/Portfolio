import { SITE } from '@/lib/site'
import type { FaqEntry } from '@/types'

export const FAQS: FaqEntry[] = [
  {
    _id: 'roles',
    question: 'What Roles Are You Open To?',
    answer: `Full-time ${SITE.openToRoles.join(', ')} roles. I also take on freelance projects and research collaborations where the problem is interesting.`,
  },
  {
    _id: 'location',
    question: 'Where Are You Based, and Do You Work Remotely?',
    answer: `I am based in ${SITE.location}, and I work comfortably with remote and distributed teams. I am open to relocating for the right role.`,
  },
  {
    _id: 'stack',
    question: 'What Do You Actually Build?',
    answer:
      'LLM applications, retrieval-augmented generation pipelines, and production ML systems — typically Python and FastAPI on the backend, PyTorch or scikit-learn for modelling, and Next.js when the work needs an interface.',
  },
  {
    _id: 'experience',
    question: 'How Much Production Experience Do You Have?',
    answer:
      'Two years across three companies, currently the sole AI Engineer at e-Marketing.io where I own the full suite of AI products end to end. Every project on this site is deployed, with a live demo you can try.',
  },
  {
    _id: 'freelance',
    question: 'Do You Take Freelance or Contract Work?',
    answer:
      'Yes, alongside full-time conversations. Scoped projects around LLM integration, RAG pipelines, or ML prototyping are the best fit.',
  },
  {
    _id: 'response',
    question: 'How Quickly Do You Reply?',
    answer: `Usually within a day. The contact form reaches me directly, or you can email ${SITE.email} or message me on WhatsApp.`,
  },
]
