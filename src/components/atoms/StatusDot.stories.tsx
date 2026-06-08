import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusDot } from './StatusDot'

const meta: Meta<typeof StatusDot> = {
  title: 'Atoms/StatusDot',
  component: StatusDot,
  argTypes: {
    active: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof StatusDot>

export const Idle: Story = { args: { active: false } }
export const Observing: Story = { args: { active: true } }
