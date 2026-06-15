import type { Meta, StoryObj } from '@storybook/react-vite'
import { CaptureItem } from './CaptureItem'

const meta: Meta<typeof CaptureItem> = {
  title: 'Molecules/CaptureItem',
  component: CaptureItem,
  decorators: [(Story) => <div className="w-[348px]"><Story /></div>],
  args: { onDelete: () => {} },
}
export default meta

type Story = StoryObj<typeof CaptureItem>

export const Default: Story = {
  args: {
    capture: {
      id: '1',
      text: 'Sparse attention reduces quadratic complexity to near-linear, enabling transformers to scale.',
      pageTitle: 'Attention Is All You Need',
      url: 'https://arxiv.org/abs/1706.03762',
      timestamp: Date.now(),
    },
  },
}

export const WithFavicon: Story = {
  args: {
    capture: {
      id: '2',
      text: 'Most tokens attend only to a local window — global attention is wasteful for long-sequence modeling.',
      pageTitle: 'Longformer: The Long-Document Transformer',
      url: 'https://distill.pub/2021/gnn-intro/',
      timestamp: Date.now(),
      favicon: 'https://distill.pub/favicon.ico',
    },
  },
}
