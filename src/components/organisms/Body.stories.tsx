import type { Meta, StoryObj } from '@storybook/react-vite'
import { Body } from './Body'

const meta: Meta<typeof Body> = {
  title: 'Organisms/Body',
  component: Body,
  decorators: [(Story) => <div className="flex w-[380px] flex-col" style={{ height: 478 }}><Story /></div>],
  args: {
    liveText: '',
    captures: [],
    onPlay: () => {},
    onAdd: () => {},
  },
  argTypes: {
    liveText: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof Body>

export const EmptyIdle: Story = {}

export const TextSelected: Story = {
  args: {
    liveText: 'The act of highlighting is an act of illuminating what matters.',
  },
}
