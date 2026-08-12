import { NextRequest, NextResponse } from 'next/server'
import { getResponder } from '@/lib/chatbot'
import { StaticKnowledgeResponder } from '@/lib/chatbot/staticResponder'
import type { ChatMessage } from '@/lib/chatbot/types'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const message = typeof body?.message === 'string' ? body.message.trim() : ''

  if (!message) return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  if (message.length > 500) return NextResponse.json({ error: 'Message is too long.' }, { status: 400 })

  const history: ChatMessage[] = Array.isArray(body?.history) ? body.history.slice(-6) : []

  try {
    const reply = await getResponder().respond(message, history)
    return NextResponse.json(reply)
  } catch {
    const reply = await new StaticKnowledgeResponder().respond(message, history)
    return NextResponse.json(reply)
  }
}
