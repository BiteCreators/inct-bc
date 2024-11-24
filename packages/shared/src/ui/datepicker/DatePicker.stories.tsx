import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Meta, StoryObj } from '@storybook/react'

import { DatePicker } from './DatePicker'

const meta = {
  component: DatePicker,
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const SingleDatePicker: Story = {
  args: {
    label: 'Date',
    mode: 'single',
    selectedDate: null,
  },
  render: args => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const handleDateChange = (date: Date | DateRange | undefined) => {
      if (date instanceof Date) {
        setSelectedDate(date)
      }
    }

    return (
      <div className={'max-w-[300px]'}>
        <DatePicker {...args} onDateChange={handleDateChange} selectedDate={selectedDate} />
      </div>
    )
  },
}

export const DisabledDatePicker: Story = {
  args: {
    disabled: true,
    label: 'Select a Date',
    mode: 'single',
    selectedDate: null,
  },
  render: args => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const handleDateChange = (date: Date | DateRange | undefined) => {
      if (date instanceof Date) {
        setSelectedDate(date)
      }
    }

    return (
      <div className={'max-w-[300px]'}>
        <DatePicker {...args} onDateChange={handleDateChange} selectedDate={selectedDate} />
      </div>
    )
  },
}

export const ErrorDatePicker: Story = {
  args: {
    error: 'Error',
    label: 'Select a Date',
    mode: 'single',
    selectedDate: new Date(),
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
    selectedDate: null,
  },
  render: args => {
    return (
      <div className={'max-w-[400px]'}>
        <DatePicker {...args} />
      </div>
    )
  },
}
