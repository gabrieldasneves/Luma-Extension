import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  applyTheme,
  ext,
  getThemeFromDocument,
  ThemeContext,
  type Theme,
} from '@/contexts/theme-context'

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode
  initialTheme?: Theme
}) {
  const [theme, setThemeState] = useState<Theme>(
    () => initialTheme ?? getThemeFromDocument()
  )

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    if (!ext) return
    ext.storage.local.get(['theme'], (r: Record<string, unknown>) => {
      const stored = r.theme
      if (stored === 'light' || stored === 'dark') {
        setThemeState(stored)
      }
    })
  }, [])

  useEffect(() => {
    const chromeExt = ext
    if (!chromeExt) return
    const onStorageChanged = (
      changes: Record<string, chrome.storage.StorageChange>,
      area: string
    ) => {
      if (area !== 'local' || !changes.theme) return
      const next = changes.theme.newValue
      if (next === 'light' || next === 'dark') {
        setThemeState(next)
      }
    }
    chromeExt.storage.onChanged.addListener(onStorageChanged)
    return () => chromeExt.storage.onChanged.removeListener(onStorageChanged)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    ext?.storage.local.set({ theme: next })
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      ext?.storage.local.set({ theme: next })
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
