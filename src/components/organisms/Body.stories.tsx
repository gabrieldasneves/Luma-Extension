import type { Meta, StoryObj } from '@storybook/react-vite'
import { Body } from './Body'

const meta: Meta<typeof Body> = {
  title: 'Organisms/Body',
  component: Body,
  decorators: [(Story) => <div className="flex w-[380px] flex-col" style={{ height: 478 }}><Story /></div>],
  args: {
    status: 'idle',
    liveText: '',
    liveSource: null,
    captures: [],
    onToggleObserving: () => {},
    onAdd: () => {},
    onDelete: () => {},
  },
  argTypes: {
    status: { control: 'radio', options: ['idle', 'observing'] },
    liveText: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof Body>

export const EmptyIdle: Story = {}

export const TextSelected: Story = {
  args: {
    status: 'observing',
    liveText: 'The act of highlighting is an act of illuminating what matters.',
    liveSource: { pageTitle: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762' },
  },
}

export const WithCaptures: Story = {
  args: {
    status: 'observing',
    liveText: '',
    captures: [
      { id: '1', text: 'Sparse attention reduces quadratic complexity.', pageTitle: 'Arxiv', url: 'https://arxiv.org/abs/1706.03762', timestamp: Date.now() },
      { id: '2', text: 'Most tokens attend only to a local window.', pageTitle: 'Distill', url: 'https://distill.pub', timestamp: Date.now() },
    ],
  },
}
