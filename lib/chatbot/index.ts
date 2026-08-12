import { StaticKnowledgeResponder } from './staticResponder'
import { LlmResponder } from './llmResponder'
import type { ChatResponder } from './types'

export function getResponder(): ChatResponder {
  return process.env.OPENAI_API_KEY ? new LlmResponder() : new StaticKnowledgeResponder()
}

export type { ChatResponder, ChatReply, ChatMessage, KnowledgeEntry } from './types'
