import type { Meta, StoryObj } from '@storybook/react-vite'
import { LogoIcon } from './LogoIcon'

const meta: Meta<typeof LogoIcon> = {
  title: 'Atoms/LogoIcon',
  component: LogoIcon,
}
export default meta

type Story = StoryObj<typeof LogoIcon>

export const Default: Story = {}
