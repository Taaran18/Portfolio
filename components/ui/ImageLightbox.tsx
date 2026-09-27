'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import clsx from 'clsx'
import type { ProjectImage } from '@/types'

interface Props {
  images: ProjectImage[]
  index: number
  label: string
  onIndexChange: (index: number) => void
  onClose: () => void
}

const SWIPE_THRESHOLD = 50

export default function ImageLightbox({ images, index, label, onIndexChange, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const pointerStart = useRef<number | null>(null)
  const count = images.length
  const image = images[index]

  function go(next: number) {
    onIndexChange(((next % count) + count) % count)
  }

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (!dialog.open) dialog.showModal()
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
      if (dialog.open) dialog.close()
    }
  }, [])

  function handleKeyDown(event: React.KeyboardEvent) {
    event.stopPropagation()
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(index - 1)
    }
  }

  function handlePointerUp(event: React.PointerEvent) {
    if (pointerStart.current === null) return
    const delta = event.clientX - pointerStart.current
    pointerStart.current = null
    if (Math.abs(delta) >= SWIPE_THRESHOLD) go(delta < 0 ? index + 1 : index - 1)
  }

  const navButton =
    'absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex'

  return createPortal(
    <dialog
      ref={ref}
      aria-label={`${label}: full-screen view`}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onKeyDown={handleKeyDown}
      onClick={(event) => event.stopPropagation()}
      className="lightbox m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-white backdrop:bg-black/90 backdrop:backdrop-blur-sm"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-4 px-4 py-3 sm:px-6">
          <p className="w-14 shrink-0 text-sm tabular-nums text-white/60">
            {index + 1} / {count}
          </p>
          <p className="min-w-0 flex-1 truncate text-center text-sm font-medium sm:text-base" aria-live="polite">
            {image.caption}
          </p>
          <div className="flex w-14 shrink-0 justify-end">
            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label="Close full-screen view"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <div
            className="absolute inset-0 mx-2 touch-pan-y touch-pinch-zoom sm:mx-20"
            onPointerDown={(event) => (pointerStart.current = event.clientX)}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => (pointerStart.current = null)}
          >
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              quality={90}
              draggable={false}
              sizes="100vw"
              className="lightbox-image select-none object-contain"
            />
          </div>
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous screenshot"
                className={clsx(navButton, 'left-4')}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next screenshot"
                className={clsx(navButton, 'right-4')}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="overflow-x-auto px-4 py-4">
            <div className="mx-auto flex w-max gap-2">
              {images.map((thumb, i) => (
                <button
                  key={thumb.src}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show screenshot ${i + 1} of ${count}: ${thumb.caption}`}
                  aria-current={i === index}
                  className={clsx(
                    'relative h-12 w-20 shrink-0 overflow-hidden rounded-md ring-2 ring-inset transition focus-visible:outline-none focus-visible:ring-white sm:h-14 sm:w-24',
                    i === index ? 'opacity-100 ring-white' : 'opacity-50 ring-transparent hover:opacity-90'
                  )}
                >
                  <Image src={thumb.src} alt="" fill sizes="96px" className="object-cover object-top" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </dialog>,
    document.body
  )
}
