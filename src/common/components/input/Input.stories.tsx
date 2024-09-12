import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/common/components/button/Button'
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

export const Search: Story = {
  args: {
    id: 'search',
    inputType: 'search',
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

export const SearchError: Story = {
  args: {
    error: 'Error text',
    id: 'search',
    inputType: 'search',
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

export const SearchDisabled: Story = {
  args: {
    disabled: true,
    id: 'search',
    inputType: 'search',
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

export const Reveal: Story = {
  args: {
    id: 'reveal',
    inputType: 'reveal',
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

export const RevealError: Story = {
  args: {
    error: 'Error text',
    id: 'reveal',
    inputType: 'reveal',
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

export const RevealDisabled: Story = {
  args: {
    disabled: true,
    id: 'reveal',
    inputType: 'reveal',
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

export const HookForm: Story = {
  args: {
    id: 'default',
    label: 'Email',
    placeholder: 'Epam@epam.com',
  },
  render: args => {
    const { control, handleSubmit } = useForm()

    const onSubmit = (data: any) => {
      alert(JSON.stringify(data, null, 2))
    }

    return (
      <form
        className={'flex flex-col items-center max-w-[279px] mx-auto"'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name={'email'}
          render={({ field, fieldState }) => (
            <Input
              {...args}
              {...field}
              error={fieldState.error?.message}
              isError={!!fieldState.error}
            />
          )}
        />
        <Button type={'submit'}>Submit</Button>
      </form>
    )
  },
}
