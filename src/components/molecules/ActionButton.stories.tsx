import type { Meta, StoryObj } from '@storybook/react-vite'
import { ActionButton } from './ActionButton'

const meta: Meta<typeof ActionButton> = {
  title: 'Molecules/ActionButton',
  component: ActionButton,
  decorators: [(Story) => <div className="w-[160px]"><Story /></div>],
  argTypes: {
    variant: { control: 'radio', options: ['play', 'add'] },
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof ActionButton>

export const Play: Story = { args: { variant: 'play' } }
export const Add: Story = { args: { variant: 'add' } }
export const AddDisabled: Story = { args: { variant: 'add', disabled: true } }
