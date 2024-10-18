import { DatePicker } from '@/common/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: DatePicker,
} satisfies Meta<typeof DatePicker>

export default meta

//type Story = StoryObj<typeof meta>

export const SingleDatePicker = {
  // args: {
  //   label: 'Date',
  //   mode: 'single',
  // },
  render: () => {
    return (
      <div className={'max-w-[300px]'}>
        <DatePicker label={'Date'} mode={'single'} selectedDate={null} />
      </div>
    )
  },
}

export const DisabledDatePicker = {
  args: {
    disabled: true,
    label: 'Select a Date',
    mode: 'single',
  },
  render: () => {
    return (
      <div className={'max-w-[300px]'}>
        <DatePicker disabled label={'Select a Date'} mode={'single'} selectedDate={null} />
      </div>
    )
  },
}

export const ErrorDatePicker: Story = {
  args: {
    error: 'Error',
    label: 'Select a Date',
    mode: 'single',
  },
  render: args => {
    return (
      <div className={'max-w-[300px]'}>
        <DatePicker {...args} />
      </div>
    )
  },
}

export const RangeDatePicker: Story = {
  args: {
    label: 'Select Date Range',
    mode: 'range',
  },
  render: args => {
    return (
      <div className={'max-w-[400px]'}>
        <DatePicker {...args} />
      </div>
    )
  },
}
