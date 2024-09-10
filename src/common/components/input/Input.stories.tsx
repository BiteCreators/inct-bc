import { Input } from '@/common/components/input/Input'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Input,
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'default',
    label: 'Email',
    placeholder: 'Epam@epam.com',
  },
  render: args => {
    return (
      <div className={'max-w-[279px]'}>
        <Input {...args} />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'disabled',
    label: 'Email',
    placeholder: 'Epam@epam.com',
  },
  render: args => {
    return (
      <div className={'max-w-[279px]'}>
        <Input {...args} />
      </div>
    )
  },
}

export const Error: Story = {
  args: {
    error: 'Error text',
    id: 'error',
    isError: true,
    label: 'Email',
    placeholder: 'Epam@epam.com',
  },
  render: args => {
    return (
      <div className={'max-w-[279px]'}>
        <Input {...args} />
      </div>
    )
  },
}
