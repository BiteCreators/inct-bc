import React, { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { format, isValid, parse } from 'date-fns'

import { Calendar } from '../../assets/icons/components'
import { cn } from '../../utils'
import { CustomDayPicker } from './CustomDayPicker'

type Props = {
  className?: string
  disabled?: boolean
  error?: React.ReactNode | string
  inputClassName?: string
  label?: string
  mode: 'range' | 'single'
  onDateChange?: (date: Date | DateRange | undefined) => void
  placeholder?: string
  required?: boolean
  selectedDate: Date | null
}

export const DatePicker = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      disabled = false,
      error,
      inputClassName,
      label,
      mode,
      onDateChange,
      placeholder = 'Choose date',
      required,
      selectedDate,
    }: Props,
    ref
  ) => {
    const today = new Date()
    const tomorrow = new Date(today)

    tomorrow.setDate(today.getDate() + 1)

    const [range, setRange] = useState<DateRange | undefined>({ from: today, to: tomorrow })
    const [month, setMonth] = useState<Date>(today)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const calendarRef = useRef<HTMLDivElement | null>(null)

    const toggleCalendar = () => {
      if (!disabled) {
        setIsCalendarOpen(!isCalendarOpen)
      }
    }

    const handleSelect = (selected: Date | DateRange | undefined) => {
      if (mode === 'single') {
        if (onDateChange) {
          onDateChange(selected as Date)
        }
        setMonth(selected as Date)
        setIsCalendarOpen(false)
      } else {
        const selectedRange = selected as DateRange

        setRange(selectedRange)
        if (onDateChange) {
          onDateChange(selectedRange)
        }
      }
    }

    const formatDateForDisplay = (date: Date | undefined) => {
      return date ? format(date, 'dd/MM/yyyy') : ''
    }

    const formatDateForInput = (date: Date | null | undefined) => {
      return date ? format(date, 'yyyy-MM-dd') : ''
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      const parsedDate = parse(value, 'yyyy-MM-dd', new Date())

      if (isValid(parsedDate)) {
        if (onDateChange) {
          onDateChange(parsedDate)
        }
        if (mode === 'range') {
          setRange({ from: parsedDate, to: parsedDate })
        }
        setMonth(parsedDate)
      } else {
        if (onDateChange) {
          onDateChange(undefined)
        }
        setRange(undefined)
      }
    }

    const inputValue = mode === 'single' ? formatDateForInput(selectedDate && selectedDate) : ''

    const rangeValue =
      mode === 'range' && range?.from && range?.to
        ? `${formatDateForDisplay(range.from)} - ${formatDateForDisplay(range.to)}`
        : ''

    useEffect(() => {
      if (mode === 'single' && selectedDate) {
        setMonth(selectedDate)
      } else if (mode === 'range' && range?.from && range?.to) {
        setRange(range)
      }
    }, [selectedDate, range, mode])

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
          setIsCalendarOpen(false)
        }
      }

      if (isCalendarOpen) {
        document.addEventListener('mousedown', handleClickOutside)
      } else {
        document.removeEventListener('mousedown', handleClickOutside)
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isCalendarOpen])

    return (
      <div className={cn('p-2 text-light-100', className)}>
        <label
          className={cn(
            'block',
            disabled ? 'text-dark-100' : 'text-light-900',
            required && 'after:content-["*"] after:text-danger-500'
          )}
        >
          {label}
        </label>
        <div className={'relative'} ref={calendarRef}>
          <div
            className={cn(
              'flex items-center bg-dark-500',
              'border border-dark-300 rounded-sm px-2 py-1',
              !disabled && 'hover:border-light-900',
              'focus-within:border-primary-700',
              disabled && 'border-dark-100',
              error && 'border-danger-500',
              inputClassName
            )}
          >
            {mode === 'single' ? (
              <input
                className={cn(
                  'bg-transparent text-light-100 outline-none w-fit',
                  disabled && 'text-light-900',
                  error && 'text-danger-500'
                )}
                disabled={disabled}
                onChange={handleInputChange}
                ref={ref}
                type={'date'}
                value={inputValue}
              />
            ) : (
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
                ref={ref}
                value={rangeValue}
              />
            )}
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
                month={month}
                onMonthChange={setMonth}
                onSelect={handleSelect}
                selected={mode === 'single' ? selectedDate : range}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
)
