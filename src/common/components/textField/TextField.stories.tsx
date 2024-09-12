import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/common/components/button/Button'
import { TextField } from '@/common/components/textField/TextField'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextField> = {
  component: TextField,
}

export default meta

type FormData = {
  text: string
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const methods = useForm<FormData>()

    const onSubmit = (data: FormData) => {
      alert(JSON.stringify(data, null, 2))
    }

    return (
      <FormProvider {...methods}>
        <form
          className={'flex flex-col items-start max-w-[300px]'}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <TextField
            {...args}
            className={'w-full'}
            label={'Default'}
            name={'text'}
            placeholder={'Enter text...'}
            rules={{ required: 'This field is required' }}
          />
          <div className={'flex w-full justify-center'}>
            <Button className={'max-w-[130px]'} type={'submit'}>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    )
  },
}

export const Search: Story = {
  render: args => {
    const methods = useForm<FormData>()

    const onSubmit = (data: FormData) => {
      alert(JSON.stringify(data, null, 2))
    }

    return (
      <FormProvider {...methods}>
        <form
          className={'flex flex-col items-start max-w-[300px]'}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <TextField
            {...args}
            className={'w-full'}
            inputType={'search'}
            label={'Search'}
            name={'text'}
            placeholder={'Enter text...'}
            rules={{ required: 'This field is required' }}
          />
          <div className={'flex w-full justify-center'}>
            <Button className={'max-w-[130px]'} type={'submit'}>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    )
  },
}

export const Reveal: Story = {
  render: args => {
    const methods = useForm<FormData>()

    const onSubmit = (data: FormData) => {
      alert(JSON.stringify(data, null, 2))
    }

    return (
      <FormProvider {...methods}>
        <form
          className={'flex flex-col items-start max-w-[300px]'}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <TextField
            {...args}
            className={'w-full'}
            inputType={'reveal'}
            label={'Reveal'}
            name={'text'}
            placeholder={'Enter text...'}
            rules={{ required: 'This field is required' }}
          />
          <div className={'flex w-full justify-center'}>
            <Button className={'max-w-[130px]'} type={'submit'}>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    )
  },
}
