import { Input } from '@/common/components/input/Input'
import { SearchInput } from '@/common/components/input/SearchInput'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Input,
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'default',
    placeholder: 'Epam@epam.com',
  },
  render: args => {
    return (
      <div className={'max-w-[279px]'}>
        <SearchInput {...args} />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'disabled',
    placeholder: 'Epam@epam.com',
  },
  render: args => {
    return (
      <div className={'max-w-[279px]'}>
        <SearchInput {...args} />
      </div>
    )
  },
}

export const Error: Story = {
  args: {
    error: 'Error text',
    id: 'error',
    isError: true,
    placeholder: 'Epam@epam.com',
  },
  render: args => {
    return (
      <div className={'max-w-[279px]'}>
        <SearchInput {...args} />
      </div>
    )
  },
}
