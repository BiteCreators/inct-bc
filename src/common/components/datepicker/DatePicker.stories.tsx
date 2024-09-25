import { DatePicker } from '@/common/components/datepicker/DatePicker'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: DatePicker,
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const SingleDatePicker: Story = {
  args: {
    label: 'Date',
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

export const DisabledDatePicker: Story = {
  args: {
    disabled: true,
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
