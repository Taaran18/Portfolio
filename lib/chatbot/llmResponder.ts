import { KNOWLEDGE_BASE, FEATURED_QUESTIONS, PROJECT_REFERENCE } from '@/content/chatbot'
import { SITE } from '@/lib/site'
import type { ChatResponder, ChatReply, ChatMessage } from './types'

const SYSTEM_PROMPT = `You are the AI assistant embedded in ${SITE.name}'s portfolio site. Answer questions about ${SITE.name} using ONLY the knowledge base and project reference below. Speak about ${SITE.name} in the third person, be friendly and factual, and never invent numbers, users or features. Keep general answers to 2-4 sentences. For questions about a project (how it works, design decisions, the hardest problem, results, stack, lessons), answer in up to 6 sentences with the specific details and numbers from the reference, then point to the project's case study path. If something isn't covered, say so honestly and suggest the contact form.

KNOWLEDGE BASE:
${KNOWLEDGE_BASE.map((e) => `Q: ${e.question}\nA: ${e.answer}`).join('\n\n')}

PROJECT REFERENCE:
${PROJECT_REFERENCE}`

export class LlmResponder implements ChatResponder {
  async respond(message: string, history: ChatMessage[]): Promise<ChatReply> {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL ?? 'gpt-4o-mini',
        temperature: 0.4,
        max_tokens: 500,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history.slice(-6).map((m) => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text })),
          { role: 'user', content: message },
        ],
      }),
    })

    if (!res.ok) throw new Error(`OpenAI request failed: ${res.status}`)

    const data = await res.json()
    const text: string | undefined = data.choices?.[0]?.message?.content
    if (!text) throw new Error('OpenAI response had no content')

    const shuffled = [...FEATURED_QUESTIONS].sort(() => Math.random() - 0.5)
    return { text, suggestions: shuffled.slice(0, 3) }
  }
}
