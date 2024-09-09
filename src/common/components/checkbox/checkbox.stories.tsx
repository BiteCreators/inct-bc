import { Checkbox } from '@/common/components/checkbox/Checkbox'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Checkbox,
} satisfies Meta<typeof Checkbox>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: false,
    id: 'Default',
  },
  render: args => <Checkbox {...args} />,
}
export const Text: Story = {
  args: {
    checked: true,
    id: 'Text',
    text: 'Checkbox',
  },
  render: args => <Checkbox {...args} />,
}
export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
    id: 'Disabled',
    text: 'Checkbox',
  },
  render: args => <Checkbox {...args} />,
}

export default meta
