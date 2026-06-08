import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  decorators: [(Story) => <div className="w-[380px]"><Story /></div>],
  argTypes: {
    status: { control: 'radio', options: ['idle', 'observing'] },
  },
}
export default meta

type Story = StoryObj<typeof Header>

export const Idle: Story = { args: { status: 'idle' } }
export const Observing: Story = { args: { status: 'observing' } }
