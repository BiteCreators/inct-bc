import type { Meta, StoryObj } from '@storybook/react'

import { TextArea } from './TextArea'

const meta: Meta<typeof TextArea> = {
  component: TextArea,
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    id: 'default',
    label: 'text area',
    placeholder: 'text area',
    resize: 'manual-x',
  },
}

export const Required: Story = {
  args: {
    id: 'required',
    label: 'required',
    required: true,
  },
}

export const Error: Story = {
  args: {
    error: 'error message',
    id: 'error',
    isError: true,
    label: 'with error',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'disabled',
    label: 'disabled',
  },
}
