import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusBadge } from './StatusBadge'

const meta: Meta<typeof StatusBadge> = {
  title: 'Molecules/StatusBadge',
  component: StatusBadge,
  argTypes: {
    status: { control: 'radio', options: ['idle', 'observing'] },
  },
}
export default meta

type Story = StoryObj<typeof StatusBadge>

export const Idle: Story = { args: { status: 'idle' } }
export const Observing: Story = { args: { status: 'observing' } }
