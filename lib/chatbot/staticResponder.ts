import Fuse from 'fuse.js'
import { KNOWLEDGE_BASE, FEATURED_QUESTIONS } from '@/content/chatbot'
import { SITE, whatsappUrl } from '@/lib/site'
import type { ChatResponder, ChatReply, ChatMessage, ChatAction, KnowledgeEntry } from './types'

const FALLBACK_TEXT =
  'That one is outside what I know. Taaran can answer it properly himself — reach him directly below, or ask me something about his work, projects, or experience.'

const MIN_MATCH_SCORE = 3

function contactActions(): ChatAction[] {
  const wa = whatsappUrl('Hi Taaran, I had a question your site assistant could not answer.')
  return [
    ...(wa ? [{ label: 'Message on WhatsApp', href: wa, kind: 'whatsapp' as const }] : []),
    { label: 'Send an email', href: `mailto:${SITE.email}`, kind: 'email' as const },
    { label: 'Use the contact form', href: '/contact', kind: 'contact' as const },
  ]
}

const STOPWORDS = new Set([
  'what',
  'whats',
  'who',
  'where',
  'when',
  'why',
  'which',
  'is',
  'are',
  'your',
  'you',
  'the',
  'a',
  'an',
  'do',
  'does',
  'did',
  'can',
  'could',
  'tell',
  'me',
  'about',
  'how',
  'i',
  'to',
  'of',
  'for',
  'in',
  'on',
  'with',
  'my',
])

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function significantWords(text: string): string[] {
  return normalize(text)
    .split(' ')
    .filter((w) => w.length >= 4 && !STOPWORDS.has(w))
}

function bestSubstringMatch(message: string): KnowledgeEntry | null {
  const normalized = normalize(message)
  const words = significantWords(message)
  let bestEntry: KnowledgeEntry | null = null
  let bestScore = 0

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0
    for (const keyword of entry.keywords) {
      const kw = keyword.toLowerCase()
      if (normalized.includes(kw)) score += kw.split(' ').length * 3
    }
    for (const word of words) {
      if (entry.keywords.some((k) => k.toLowerCase().includes(word))) score += 1
    }

    const isBetter =
      score > bestScore ||
      (score > 0 && score === bestScore && (!bestEntry || entry.keywords.length < bestEntry.keywords.length))
    if (isBetter) {
      bestScore = score
      bestEntry = entry
    }
  }

  return bestScore >= MIN_MATCH_SCORE ? bestEntry : null
}

const KEYWORD_INDEX = KNOWLEDGE_BASE.flatMap((entry) => entry.keywords.map((keyword) => ({ id: entry.id, keyword })))

const FUZZY_THRESHOLD = 0.2
const MIN_FUZZY_WORD_LENGTH = 5

const fuse = new Fuse(KEYWORD_INDEX, {
  keys: ['keyword'],
  threshold: FUZZY_THRESHOLD,
  ignoreLocation: true,
  includeScore: true,
})

function fuzzyKeywordMatch(message: string): KnowledgeEntry | null {
  const candidates = significantWords(message).filter((w) => w.length >= MIN_FUZZY_WORD_LENGTH)
  if (candidates.length === 0) return null

  let bestId: string | null = null
  let bestScore = Infinity
  for (const word of candidates) {
    const [hit] = fuse.search(word, { limit: 1 })
    if (hit?.score !== undefined && hit.score < bestScore) {
      bestScore = hit.score
      bestId = hit.item.id
    }
  }

  if (bestId === null || bestScore > FUZZY_THRESHOLD) return null
  return KNOWLEDGE_BASE.find((e) => e.id === bestId) ?? null
}

function pickSuggestions(excludeId?: string, count = 3): string[] {
  const excludeQuestion = KNOWLEDGE_BASE.find((e) => e.id === excludeId)?.question
  const pool = FEATURED_QUESTIONS.filter((q) => q !== excludeQuestion)
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export class StaticKnowledgeResponder implements ChatResponder {
  async respond(message: string, _history: ChatMessage[] = []): Promise<ChatReply> {
    const trimmed = message.trim()
    if (!trimmed) return { text: FALLBACK_TEXT, suggestions: pickSuggestions(), actions: contactActions() }

    const match = bestSubstringMatch(trimmed) ?? fuzzyKeywordMatch(trimmed)
    if (!match) return { text: FALLBACK_TEXT, suggestions: pickSuggestions(), actions: contactActions() }

    return { text: match.answer, suggestions: pickSuggestions(match.id) }
  }
}
