import type { Preview } from '@storybook/react-vite'
import { ThemeDecorator } from './ThemeDecorator'
import '../src/index.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Luma color theme',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
    backgrounds: { value: 'luma' },
  },
  parameters: {
    backgrounds: {
      options: {
        luma: { name: 'Luma Dark', value: '#151924' },
        light: { name: 'Light', value: '#ffffff' },
      },
    },
  },
  decorators: [ThemeDecorator],
}

export default preview
