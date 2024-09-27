import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Calendar } from '@/common/assets/icons/components'
import { CustomDayPicker } from '@/common/components/datepicker/CustomDayPicker' // Импорт иконки календаря
import { cn } from '@/common/utils/cn'

type DatePickerProps = {
  className?: string
  disabled?: boolean
  error?: null | string
  label: string
  mode: 'range' | 'single'
  placeholder: string
}

export const DatePicker = ({
  className,
  disabled = false,
  error,
  label,
  mode,
  placeholder,
}: DatePickerProps) => {
  const today = new Date()
  const tomorrow = new Date(today)

  tomorrow.setDate(today.getDate() + 1)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today)
  const [range, setRange] = useState<DateRange | undefined>({ from: today, to: tomorrow })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const toggleCalendar = () => {
    if (!disabled) {
      setIsCalendarOpen(!isCalendarOpen)
    }
  }

  const handleSelect = (selected: Date | DateRange | undefined) => {
    if (mode === 'single') {
      setSelectedDate(selected as Date)
    } else {
      setRange(selected as DateRange)
    }
  }

  let inputValue = ''

  if (mode === 'single') {
    inputValue = selectedDate?.toLocaleDateString('en-GB') || ''
  } else if (mode === 'range' && range?.from && range?.to) {
    inputValue = `${range.from.toLocaleDateString('en-GB')} - ${range.to.toLocaleDateString('en-GB')}`
  }

  return (
    <div className={cn('p-2 text-light-100 w-fit', className)}>
      <label className={cn('block', disabled ? 'text-dark-100' : 'text-light-900')}>{label}</label>
      <div className={'relative'}>
        <div
          className={cn(
            'flex items-center bg-dark-500',
            'border border-dark-300 rounded-sm px-2 py-1',
            'hover:border-light-900',
            'focus-within:border-primary-700',
            disabled && 'border-dark-100',
            error && 'border-danger-500'
          )}
        >
          <input
            className={cn(
              'bg-transparent text-light-100 outline-none w-fit',
              disabled && 'text-light-900',
              error && 'text-danger-500'
            )}
            disabled={disabled}
            onClick={toggleCalendar}
            placeholder={placeholder}
            readOnly
            value={inputValue}
          />
          <Calendar
            className={cn(
              'ml-2',
              !disabled && 'cursor-pointer',
              mode === 'range' && 'ml-6',
              error && 'text-danger-500'
            )}
            onClick={toggleCalendar}
          />
        </div>
        {error && <span className={'text-danger-500 text-sm mt-1'}>{error}</span>}
        {isCalendarOpen && !disabled && (
          <div
            className={cn(
              'absolute top-full left-0 px-5 py-4 w-72 h-auto mt-[1px]',
              'bg-dark-500 border border-dark-300 rounded-sm shadow-lg z-10'
            )}
          >
            <CustomDayPicker
              mode={mode}
              onSelect={handleSelect}
              selected={mode === 'single' ? selectedDate : range}
            />
          </div>
        )}
      </div>
    </div>
  )
}
