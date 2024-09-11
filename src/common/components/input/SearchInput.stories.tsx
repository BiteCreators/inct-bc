import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/common/components/button/Button'
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
    placeholder: 'search',
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
    placeholder: 'search',
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
    placeholder: 'search',
  },
  render: args => {
    return (
      <div className={'max-w-[279px]'}>
        <SearchInput {...args} />
      </div>
    )
  },
}

export const HookForm: Story = {
  args: {
    id: 'default',
    placeholder: 'search',
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
          name={'search'}
          render={({ field, fieldState }) => (
            <SearchInput
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
