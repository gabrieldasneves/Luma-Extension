import type { Meta, StoryObj } from '@storybook/react-vite'
import { CaptureList } from './CaptureList'

const captures = [
  {
    id: '1',
    text: 'Sparse attention reduces quadratic complexity to near-linear, enabling transformers to scale.',
    pageTitle: 'Attention Is All You Need',
    url: 'https://arxiv.org/abs/1706.03762',
    timestamp: Date.now() - 120000,
  },
  {
    id: '2',
    text: 'Most tokens attend only to a local window — global attention is wasteful for long-sequence modeling.',
    pageTitle: 'Longformer',
    url: 'https://distill.pub/2021/gnn-intro/',
    timestamp: Date.now() - 60000,
  },
  {
    id: '3',
    text: 'FlashAttention uses tiling to cut HBM reads/writes — 2–4× faster than standard attention, exact results.',
    pageTitle: 'FlashAttention',
    url: 'https://github.com/Dao-AILab/flash-attention',
    timestamp: Date.now(),
  },
]

const meta: Meta<typeof CaptureList> = {
  title: 'Molecules/CaptureList',
  component: CaptureList,
  decorators: [(Story) => <div className="w-[348px]"><Story /></div>],
  args: { onDelete: () => {} },
}
export default meta

type Story = StoryObj<typeof CaptureList>

export const Default: Story = { args: { captures } }
