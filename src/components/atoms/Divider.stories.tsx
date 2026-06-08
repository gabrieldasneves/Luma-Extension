import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  decorators: [(Story) => <div className="w-[348px]"><Story /></div>],
}
export default meta

type Story = StoryObj<typeof Divider>

export const Default: Story = {}
