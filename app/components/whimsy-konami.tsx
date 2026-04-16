'use client'

/**
 * Unlocks a softer accent palette + a tiny corner mark for the session.
 * Sequence: ↑ ↑ ↓ ↓ ← → ← → B A (outside inputs).
 */
import { useEffect, useRef, useState } from 'react'

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
] as const

const STORAGE_KEY = 'whimsy-unlocked'
const FLOURISH_MS = 780

type TimerId = ReturnType<typeof globalThis.setTimeout>

export function WhimsyKonami() {
  const [liveStatus, setLiveStatus] = useState('')
  const clearLiveRef = useRef<TimerId | undefined>(undefined)

  useEffect(() => {
    const root = document.documentElement
    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      root.classList.add('whimsy-unlocked')
    }

    let index = 0
    let flourishClear: TimerId | undefined

    function keyMatches(expected: string, key: string) {
      if (expected === 'b' || expected === 'a') {
        return key.toLowerCase() === expected
      }
      return key === expected
    }

    function playUnlockFeedback() {
      globalThis.clearTimeout(clearLiveRef.current)
      setLiveStatus(
        'A softer accent unlocked for this visit. A small mark rests in the corner.'
      )
      clearLiveRef.current = globalThis.setTimeout(
        () => setLiveStatus(''),
        4500
      )

      const reduceMotion = globalThis.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (reduceMotion) return

      root.classList.add('whimsy-unlock-flourish')
      globalThis.clearTimeout(flourishClear)
      flourishClear = globalThis.setTimeout(() => {
        root.classList.remove('whimsy-unlock-flourish')
      }, FLOURISH_MS)
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (
        target?.closest('input, textarea, select, [contenteditable="true"]')
      ) {
        return
      }

      if (keyMatches(SEQUENCE[index], e.key)) {
        index += 1
        if (index === SEQUENCE.length) {
          root.classList.add('whimsy-unlocked')
          sessionStorage.setItem(STORAGE_KEY, '1')
          playUnlockFeedback()
          index = 0
        }
      } else {
        index = keyMatches(SEQUENCE[0], e.key) ? 1 : 0
      }
    }

    globalThis.addEventListener('keydown', onKeyDown)
    return () => {
      globalThis.removeEventListener('keydown', onKeyDown)
      globalThis.clearTimeout(flourishClear)
      globalThis.clearTimeout(clearLiveRef.current)
    }
  }, [])

  return (
    <span className="sr-only" role="status" aria-live="polite" aria-atomic>
      {liveStatus}
    </span>
  )
}
