import type { Meta, StoryObj } from '@storybook/react-vite'
import { SectionLabel } from './SectionLabel'

const meta: Meta<typeof SectionLabel> = {
  title: 'Atoms/SectionLabel',
  component: SectionLabel,
}
export default meta

type Story = StoryObj<typeof SectionLabel>

export const LiveSelection: Story = { args: { children: 'LIVE SELECTION' } }
export const Captures: Story = { args: { children: 'CAPTURES' } }
