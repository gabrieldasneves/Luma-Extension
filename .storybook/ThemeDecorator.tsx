import type { Decorator } from '@storybook/react-vite'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import type { Theme } from '@/contexts/theme-context'

export const ThemeDecorator: Decorator = (Story, { globals }) => {
  const theme: Theme = globals.theme === 'light' ? 'light' : 'dark'

  return (
    <ThemeProvider key={theme} initialTheme={theme}>
      <Story />
    </ThemeProvider>
  )
}
