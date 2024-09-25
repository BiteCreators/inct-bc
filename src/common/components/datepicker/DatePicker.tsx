import { useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'

import { Calendar } from '@/common/assets/icons/components'
import { cn } from '@/common/utils/cn'

type Props = {
  className?: string
  disabled?: boolean
  error?: null | string
  label: string
  mode: 'range' | 'single'
}

export const DatePicker = ({ className, disabled = false, error, label, mode }: Props) => {
  const today = new Date()
  const tomorrow = new Date(today)

  tomorrow.setDate(today.getDate() + 1)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today)
  const [range, setRange] = useState<DateRange | undefined>({ from: today, to: tomorrow })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const DayPickerStyle = {
    active: 'bg-blue-800 text-white w-9 h-9 rounded-full flex items-center justify-center',
    caption: 'text-white text-center font-semibold mb-10',
    chevron: 'fill-white',
    day: 'hover:bg-primary-900 focus:bg-primary-900 text-center w-9 h-9 rounded-full flex items-center justify-center',
    disabled: 'bg-gray-300 text-gray-600',
    focus:
      'border-2 border-blue-500 text-white w-9 h-9 rounded-full flex items-center justify-center',
    hover: 'bg-blue-700 text-white w-9 h-9 rounded-full flex items-center justify-center',
    month_grid: 'w-full text-center',
    nav: 'flex justify-end items-center',
    nav_button_next: 'p-1 hover:bg-gray-700 rounded-full',
    nav_button_previous: 'p-1 hover:bg-gray-700 rounded-full',
    other_month: 'text-gray-500',

    // стили для диапазона
    range_end: 'bg-primary-900 rounded-r-full w-9 h-9 flex items-center justify-center',
    range_middle: 'bg-primary-900 w-9 h-9 flex items-center justify-center',
    range_start: 'bg-primary-900 rounded-l-full w-9 h-9 flex items-center justify-center',

    // Для выбранного дня
    selected: 'bg-blue-600 text-white w-9 h-9 rounded-full flex items-center justify-center',

    // Сегодняшний день
    today: 'w-9 h-9 flex items-center justify-center text-primary-500',

    // Недели
    week: 'grid grid-cols-7',
    weekdays: 'grid grid-cols-7 gap-0 text-center font-semibold mt-5',

    // Выходные (красные)
    weekend: 'text-danger-300',
  }

  const toggleCalendar = () => {
    if (!disabled) {
      setIsCalendarOpen(!isCalendarOpen)
    }
  }

  const handleDayClick = (date: Date | undefined) => {
    if (mode === 'single') {
      setSelectedDate(date)
    } else {
      const newRange = { from: range?.from || date, to: date } // Обновляем диапазон

      setRange(newRange)
    }
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) {
      return ''
    }

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date)
  }

  let inputValue = ''

  if (mode === 'single') {
    inputValue = formatDate(selectedDate)
  } else if (range?.from && range?.to) {
    inputValue = `${formatDate(range.from)} - ${formatDate(range.to)}`
  }

  return (
    <div className={cn('p-2 text-light-100 w-fit', className)}>
      <label className={cn('block', disabled ? 'text-dark-100' : 'text-light-900')}>{label}</label>
      <div className={cn('relative')}>
        <div
          className={cn(
            'flex items-center bg-dark-500',
            'border border-dark-300 rounded-sm px-2 py-1',
            'hover:border-light-900',
            'focus-within:border-primary-700',
            disabled && 'border-dark-100',
            error && 'border-danger-500'
          )}
          onClick={toggleCalendar}
        >
          <input
            className={cn(
              'bg-transparent text-light-100 outline-none w-fit',
              disabled && 'text-light-900',
              error && 'text-danger-500'
            )}
            disabled={disabled}
            readOnly
            type={'text'}
            value={inputValue}
          />
          <Calendar className={cn(error && 'text-danger-500')} />
        </div>
        {error && <span className={'text-danger-500 text-sm mt-1'}>{error}</span>}

        {isCalendarOpen && !disabled && (
          <div
            className={cn(
              'absolute top-full left-0 px-5 py-4 w-72 h-auto mt-[1px]',
              'bg-dark-500 border border-dark-300 rounded-sm shadow-lg z-10'
            )}
          >
            <DayPicker
              classNames={DayPickerStyle}
              mode={'range'}
              onSelect={setRange}
              selected={range}
            />
          </div>
        )}
      </div>
    </div>
  )
}
