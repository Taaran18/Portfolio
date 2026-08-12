import { KNOWLEDGE_BASE, FEATURED_QUESTIONS } from '@/content/chatbot'
import { SITE } from '@/lib/site'
import type { ChatResponder, ChatReply, ChatMessage } from './types'

const SYSTEM_PROMPT = `You are the AI assistant embedded in ${SITE.name}'s portfolio site. Answer questions about ${SITE.name} using ONLY the knowledge base below. Be concise (2-4 sentences), friendly, and speak about ${SITE.name} in the third person. If the question isn't covered by the knowledge base, say so honestly and suggest the visitor use the contact form.

KNOWLEDGE BASE:
${KNOWLEDGE_BASE.map((e) => `Q: ${e.question}\nA: ${e.answer}`).join('\n\n')}`

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
        max_tokens: 300,
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
