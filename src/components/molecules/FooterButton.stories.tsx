import type { Meta, StoryObj } from '@storybook/react-vite'
import { Clock, Download } from 'lucide-react'
import { FooterButton } from './FooterButton'

const meta: Meta<typeof FooterButton> = {
  title: 'Molecules/FooterButton',
  component: FooterButton,
  decorators: [(Story) => <div className="w-[160px]"><Story /></div>],
  argTypes: {
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof FooterButton>

export const Preview: Story = {
  args: {
    icon: <Clock size={12} strokeWidth={1.5} />,
    label: 'Preview',
  },
}

export const PreviewDisabled: Story = {
  args: {
    icon: <Clock size={12} strokeWidth={1.5} />,
    label: 'Preview',
    disabled: true,
  },
}

export const Download_: Story = {
  name: 'Download',
  args: {
    icon: <Download size={12} strokeWidth={1.5} />,
    label: 'Download .docx',
  },
}

export const DownloadDisabled: Story = {
  args: {
    icon: <Download size={12} strokeWidth={1.5} />,
    label: 'Download .docx',
    disabled: true,
  },
}
