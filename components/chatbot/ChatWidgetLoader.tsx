'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false })

// The chat widget is never needed for the first paint, so load it once the browser is idle.
export default function ChatWidgetLoader() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 3000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(() => setReady(true), 2000)
    return () => clearTimeout(id)
  }, [])

  return ready ? <ChatWidget /> : null
}
