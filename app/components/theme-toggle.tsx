'use client'

import { themeToggleWhisper } from 'app/lib/whimsy'
import { useEffect, useRef } from 'react'
import { useTheme } from './theme-provider'

function IconSun() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ThemeToggle() {
  const { resolved, setPreference } = useTheme()
  const isDark = resolved === 'dark'
  const skipIconEnter = useRef(true)

  useEffect(() => {
    skipIconEnter.current = false
  }, [])

  return (
    <button
      type="button"
      onClick={() => setPreference(isDark ? 'light' : 'dark')}
      title={themeToggleWhisper(isDark)}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-[var(--color-muted)] motion-safe:transition-colors hover:text-[var(--color-accent)] focus-visible:text-[var(--color-accent)] focus-visible:outline-none"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span
        key={isDark ? 'sun' : 'moon'}
        className={
          skipIconEnter.current
            ? 'inline-flex'
            : 'theme-toggle-icon inline-flex'
        }
      >
        {isDark ? <IconSun /> : <IconMoon />}
      </span>
    </button>
  )
}
