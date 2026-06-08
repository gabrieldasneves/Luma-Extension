import type { Meta, StoryObj } from '@storybook/react-vite'
import { LivePreview } from './LivePreview'

const meta: Meta<typeof LivePreview> = {
  title: 'Molecules/LivePreview',
  component: LivePreview,
  decorators: [(Story) => <div className="w-[348px]"><Story /></div>],
  argTypes: {
    text: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof LivePreview>

export const Empty: Story = {}

export const WithText: Story = {
  args: {
    text: 'The act of highlighting is an act of illuminating what matters. Luma captures every fragment of meaning as you read.',
  },
}
