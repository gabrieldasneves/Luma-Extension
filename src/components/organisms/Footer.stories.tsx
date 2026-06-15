import type { Meta, StoryObj } from '@storybook/react-vite'
import { Footer } from './Footer'

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Footer',
  component: Footer,
  decorators: [(Story) => <div className="w-[380px]"><Story /></div>],
  args: {
    onDownload: () => undefined,
  },
  argTypes: {
    captureCount: { control: { type: 'number', min: 0 } },
  },
}
export default meta

type Story = StoryObj<typeof Footer>

export const NoCaptures: Story = { args: { captureCount: 0 } }
export const WithCaptures: Story = { args: { captureCount: 5 } }
