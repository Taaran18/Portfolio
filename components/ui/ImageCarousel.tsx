'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import clsx from 'clsx'
import { shimmerBlurDataURL } from '@/lib/image-placeholder'
import ImageLightbox from '@/components/ui/ImageLightbox'
import type { ProjectImage } from '@/types'

interface Props {
  images: ProjectImage[]
  label: string
  interval?: number
  priority?: boolean
  sizes: string
  className?: string
  onIndexChange?: (index: number) => void
  onCycleComplete?: () => void
}

const SWIPE_THRESHOLD = 40

export default function ImageCarousel({
  images,
  label,
  interval = 3000,
  priority = false,
  sizes,
  className,
  onIndexChange,
  onCycleComplete,
}: Props) {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [viewerOpen, setViewerOpen] = useState(false)
  const swiped = useRef(false)
  const openedWithPointer = useRef(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const pointerStart = useRef<number | null>(null)

  const count = images.length
  const paused = hovered || focused || !inView || reducedMotion || !pageVisible || viewerOpen
  const indexChangeRef = useRef(onIndexChange)
  const cycleCompleteRef = useRef(onCycleComplete)

  useEffect(() => {
    indexChangeRef.current = onIndexChange
    cycleCompleteRef.current = onCycleComplete
  })

  useEffect(() => {
    indexChangeRef.current?.(index)
  }, [index])

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === 'visible')
    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])
  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const hasCycleHandler = Boolean(onCycleComplete)

  useEffect(() => {
    if (paused || (count < 2 && !hasCycleHandler)) return
    const id = window.setTimeout(() => {
      if (index === count - 1 && cycleCompleteRef.current) cycleCompleteRef.current()
      else go(index + 1)
    }, interval)
    return () => window.clearTimeout(id)
  }, [paused, count, index, interval, go, hasCycleHandler])

  function handlePointerDown(event: React.PointerEvent) {
    pointerStart.current = event.clientX
    swiped.current = false
  }

  function openViewer(event: React.MouseEvent) {
    if (swiped.current) {
      swiped.current = false
      return
    }
    openedWithPointer.current = event.detail > 0
    setViewerOpen(true)
  }

  function closeViewer() {
    setViewerOpen(false)
    if (openedWithPointer.current) {
      requestAnimationFrame(() => (document.activeElement as HTMLElement | null)?.blur())
    }
  }

  function handlePointerUp(event: React.PointerEvent) {
    if (pointerStart.current === null) return
    const delta = event.clientX - pointerStart.current
    pointerStart.current = null
    if (Math.abs(delta) < SWIPE_THRESHOLD) return
    swiped.current = true
    go(delta < 0 ? index + 1 : index - 1)
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(index - 1)
    }
  }

  if (count === 0) return null

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
      onKeyDown={handleKeyDown}
      className={clsx('group/carousel relative aspect-[16/10] overflow-hidden bg-slate-900', className)}
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (pointerStart.current = null)}
        className={clsx(
          'flex h-full touch-pan-y select-none',
          !reducedMotion && 'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'
        )}
        style={{ transform: `translateX(-${index * 100}%)` }}
        aria-live={paused ? 'polite' : 'off'}
      >
        {images.map((image, i) => (
          <div
            key={image.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${image.caption}`}
            aria-hidden={i !== index}
            inert={i !== index}
            className="relative h-full w-full shrink-0"
          >
            <button
              type="button"
              onClick={openViewer}
              aria-label={`View screenshot ${i + 1} full screen: ${image.caption}`}
              className="absolute inset-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                draggable={false}
                priority={priority && i === 0}
                placeholder="blur"
                blurDataURL={shimmerBlurDataURL()}
                className="object-cover object-top"
                sizes={sizes}
              />
            </button>
          </div>
        ))}
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm transition-opacity duration-200 sm:opacity-0 sm:group-hover/carousel:opacity-100"
      >
        <Maximize2 size={12} /> <span className="hidden sm:inline">View full screen</span>
      </span>

      {viewerOpen && (
        <ImageLightbox images={images} index={index} label={label} onIndexChange={go} onClose={closeViewer} />
      )}

      {count > 1 && (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-4 pb-3">
            <p className="min-w-0 truncate text-xs font-medium text-white/90 sm:text-sm" aria-hidden="true">
              {images[index].caption}
            </p>
            <div className="flex shrink-0 items-center gap-1.5">
              {images.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show screenshot ${i + 1} of ${count}: ${image.caption}`}
                  aria-current={i === index}
                  className="group/dot flex h-6 items-center focus-visible:outline-none"
                >
                  <span
                    className={clsx(
                      'block h-1.5 rounded-full transition-all duration-300 group-focus-visible/dot:ring-2 group-focus-visible/dot:ring-white',
                      i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50 group-hover/dot:bg-white/80'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {(['prev', 'next'] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => go(dir === 'prev' ? index - 1 : index + 1)}
              aria-label={dir === 'prev' ? 'Previous screenshot' : 'Next screenshot'}
              className={clsx(
                'absolute top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-opacity duration-200 hover:bg-black/65 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex sm:opacity-0 sm:group-hover/carousel:opacity-100',
                dir === 'prev' ? 'left-3' : 'right-3'
              )}
            >
              {dir === 'prev' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          ))}
        </>
      )}
    </div>
  )
}
