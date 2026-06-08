import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        luma: { name: 'Luma Dark', value: '#1E1E2E' },
        light: { name: 'Light', value: '#ffffff' },
      },
    },
  },
  globals: {
    backgrounds: { value: 'luma' },
  },
}

export default preview
