import { useSyncExternalStore } from 'react'

let done = false
const listeners = new Set<() => void>()

export function markIntroDone() {
  if (done) return
  done = true
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useIntroDone() {
  return useSyncExternalStore(
    subscribe,
    () => done,
    () => false
  )
}
