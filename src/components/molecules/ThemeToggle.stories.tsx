import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeToggle } from './ThemeToggle'

const meta: Meta<typeof ThemeToggle> = {
  title: 'Molecules/ThemeToggle',
  component: ThemeToggle,
  decorators: [(Story) => <div className="flex w-[380px] justify-end p-4"><Story /></div>],
}
export default meta

type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {}
