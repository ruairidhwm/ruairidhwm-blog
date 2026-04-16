'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import {
  THEME_STORAGE_KEY,
  resolveTheme,
  type ThemePreference,
} from 'app/lib/theme'

function applyDocumentClass(pref: ThemePreference) {
  const root = document.documentElement
  root.classList.toggle('dark', resolveTheme(pref) === 'dark')
}

interface ThemeContextValue {
  preference: ThemePreference
  setPreference: (p: ThemePreference) => void
  resolved: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>('light')
  const [resolved, setResolved] = useState<'light' | 'dark'>('light')

  useLayoutEffect(() => {
    const stored = localStorage.getItem(
      THEME_STORAGE_KEY
    ) as ThemePreference | null
    const pref: ThemePreference =
      stored === 'dark' || stored === 'system' || stored === 'light'
        ? stored
        : 'light'
    setPreferenceState(pref)
    applyDocumentClass(pref)
    setResolved(resolveTheme(pref))
  }, [])

  useEffect(() => {
    if (preference !== 'system') return
    const mq = globalThis.matchMedia('(prefers-color-scheme: dark)')
    function onChange() {
      applyDocumentClass('system')
      setResolved(resolveTheme('system'))
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [preference])

  const setPreference = useCallback((p: ThemePreference) => {
    setPreferenceState(p)
    localStorage.setItem(THEME_STORAGE_KEY, p)
    applyDocumentClass(p)
    setResolved(resolveTheme(p))
  }, [])

  const value = useMemo(
    () => ({
      preference,
      setPreference,
      resolved,
    }),
    [preference, setPreference, resolved]
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}
