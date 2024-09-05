import { Input } from '@/common/components/input/Input'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Input,
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Email',
    placeholder: 'Epam@epam.com',
  },
}

export const Error: Story = {
  args: {
    error: 'Error text',
    label: 'Email',
    placeholder: 'Epam@epam.com',
  },
}
