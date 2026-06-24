import { createContext } from 'react'

export type Theme = 'light' | 'dark'

export const ext = typeof chrome !== 'undefined' && chrome.runtime?.id ? chrome : null

export function getThemeFromDocument(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
