import { useEffect, useState } from 'react'

export function useStreamedText(text: string, wordsPerTick = 2, tickMs = 35, skip = false) {
  const [visible, setVisible] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!text) {
      setVisible('')
      setDone(true)
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (skip || prefersReducedMotion) {
      setVisible(text)
      setDone(true)
      return
    }

    setVisible('')
    setDone(false)
    const words = text.split(' ')
    let i = 0
    const id = setInterval(() => {
      i += wordsPerTick
      setVisible(words.slice(0, i).join(' '))
      if (i >= words.length) {
        clearInterval(id)
        setDone(true)
      }
    }, tickMs)
    return () => clearInterval(id)
  }, [text, wordsPerTick, tickMs, skip])

  return { visible, done }
}
