import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmptyState } from './EmptyState'

const meta: Meta<typeof EmptyState> = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  decorators: [(Story) => <div className="flex h-64 w-[348px]"><Story /></div>],
}
export default meta

type Story = StoryObj<typeof EmptyState>

export const Default: Story = {}
