import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  decorators: [(Story) => <div className="w-[380px]"><Story /></div>],
  argTypes: {
    status: { control: 'radio', options: ['idle', 'observing'] },
    activeView: { control: 'radio', options: ['captures', 'images'] },
  },
}
export default meta

type Story = StoryObj<typeof Header>

export const CapturesIdle: Story = {
  args: { status: 'idle', activeView: 'captures', onViewChange: () => undefined },
}

export const ImagesIdle: Story = {
  args: { status: 'idle', activeView: 'images', onViewChange: () => undefined },
}

export const Observing: Story = {
  args: { status: 'observing', activeView: 'captures', onViewChange: () => undefined },
}
