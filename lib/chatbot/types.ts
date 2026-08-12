export interface KnowledgeEntry {
  id: string

  keywords: string[]

  question: string

  answer: string
  topic: 'identity' | 'contact' | 'experience' | 'projects' | 'skills' | 'certifications' | 'leadership' | 'research' | 'availability'

  featured?: boolean
}

export interface ChatMessage {
  id: string
  role: 'user' | 'bot'
  text: string
}

export interface ChatAction {
  label: string
  href: string
  kind: 'whatsapp' | 'email' | 'contact'
}

export interface ChatReply {
  text: string
  suggestions: string[]
  actions?: ChatAction[]
}

export interface ChatResponder {
  respond(message: string, history: ChatMessage[]): Promise<ChatReply>
}
