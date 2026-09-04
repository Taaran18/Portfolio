'use client'

import { useEffect, useRef, useState, useId } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { useStreamedText } from './useStreamedText'
import { ASSISTANT, FEATURED_QUESTIONS } from '@/content/chatbot'
import type { ChatAction, ChatMessage } from '@/lib/chatbot/types'

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'bot',
  text: ASSISTANT.welcome,
}

function linkify(text: string) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-indigo-500/50 hover:decoration-indigo-500 break-all"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

function BotBubble({ text, animate }: { text: string; animate: boolean }) {
  const { visible } = useStreamedText(text, 2, 35, !animate)
  return (
    <div className="max-w-[85%] rounded-3xl rounded-bl-sm surface px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line">
      {linkify(visible)}
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [suggestions, setSuggestions] = useState<string[]>(FEATURED_QUESTIONS.slice(0, 4))
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [streamingId, setStreamingId] = useState<string | null>(null)
  const [actions, setActions] = useState<ChatAction[]>([])

  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const idCounter = useRef(0)
  const dialogTitleId = useId()

  function nextId() {
    idCounter.current += 1
    return `m${idCounter.current}`
  }

  useEffect(() => {
    if (open) inputRef.current?.focus()
    else setStreamingId(null)
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, pending])

  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || pending) return
    const userMsg: ChatMessage = { id: nextId(), role: 'user', text: trimmed }
    const historyForRequest = messages.slice(-6)
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setSuggestions([])
    setActions([])
    setPending(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: historyForRequest }),
      })
      const data = await res.json()
      const botId = nextId()
      setMessages((prev) => [
        ...prev,
        { id: botId, role: 'bot', text: data.text ?? 'Something went wrong — try again?' },
      ])
      setStreamingId(botId)
      setActions(data.actions ?? [])
    } catch {
      const botId = nextId()
      setMessages((prev) => [
        ...prev,
        { id: botId, role: 'bot', text: "I'm having trouble connecting right now — please try again in a moment." },
      ])
      setStreamingId(botId)
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <motion.button
        ref={toggleRef}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? `Close ${ASSISTANT.name}` : `Chat with ${ASSISTANT.name}`}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-violet-600 bg-gradient-to-br from-indigo-700 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:opacity-90 hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[70vh] rounded-3xl surface shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--surface-border)] shrink-0">
              <div className="w-9 h-9 rounded-full bg-violet-600 bg-gradient-to-br from-indigo-700 to-violet-600 flex items-center justify-center shrink-0">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p id={dialogTitleId} className="text-sm font-semibold text-slate-900 dark:text-white">
                  {ASSISTANT.name}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{ASSISTANT.tagline}</p>
              </div>
            </div>

            <div
              ref={listRef}
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {messages.map((m) =>
                m.role === 'bot' ? (
                  <BotBubble key={m.id} text={m.text} animate={m.id === streamingId} />
                ) : (
                  <div
                    key={m.id}
                    className="ml-auto max-w-[85%] rounded-3xl rounded-br-sm bg-violet-600 bg-gradient-to-r from-indigo-700 to-violet-600 text-white px-4 py-2.5 text-sm"
                  >
                    {m.text}
                  </div>
                )
              )}
              {pending && (
                <div className="max-w-[60%] rounded-3xl rounded-bl-sm surface px-4 py-3 flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}
            </div>

            {actions.length > 0 && (
              <div className="px-4 pb-3 flex flex-wrap gap-1.5 shrink-0">
                {actions.map((action) => (
                  <a
                    key={action.kind}
                    href={action.href}
                    {...(action.kind === 'contact' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="text-xs px-3 py-1.5 rounded-full bg-indigo-600 text-white font-medium hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            )}

            {suggestions.length > 0 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {suggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    disabled={pending}
                    className="text-xs px-3 py-1.5 rounded-full surface text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/30 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 p-3 border-t border-[var(--surface-border)] shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                aria-label="Message"
                className="flex-1 px-3.5 py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                aria-label="Send message"
                className="w-10 h-10 rounded-full bg-violet-600 bg-gradient-to-br from-indigo-700 to-violet-600 flex items-center justify-center shrink-0 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
              >
                <Send size={15} className="text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
