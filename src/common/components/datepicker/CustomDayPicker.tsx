import {
  DateRange,
  DayPicker,
  DayPickerProps,
  Matcher,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from 'react-day-picker'

import { DayPickerStyle } from '@/common/components/datepicker/CustomDayPickerStyles'

type Props = {
  classNames?: any
  mode: 'range' | 'single'
  month?: Date
  onMonthChange?: (month: Date) => void
  onSelect: (selected: Date | DateRange | undefined) => void
  selected: Date | DateRange | undefined
} & Omit<DayPickerProps, 'mode' | 'onSelect' | 'selected'>

export const CustomDayPicker = ({
  classNames,
  mode,
  month,
  onMonthChange,
  onSelect,
  selected,
  ...props
}: Props) => {
  const handleSelectSingle: SelectSingleEventHandler = selectedDate => {
    if (selected && selectedDate && selectedDate.getTime() === (selected as Date)?.getTime()) {
      onSelect(undefined)
    } else {
      onSelect(selectedDate)
    }
  }

  const handleSelectRange: SelectRangeEventHandler = selectedRange => {
    const { from, to } = selectedRange || {}
    const startDate = (selected as DateRange)?.from
    const endDate = (selected as DateRange)?.to

    if (
      from &&
      to &&
      startDate &&
      endDate &&
      from.getTime() === startDate.getTime() &&
      to.getTime() === endDate.getTime()
    ) {
      onSelect(undefined)
    } else if (from && to && from.getTime() === to.getTime()) {
      onSelect({ from, to: undefined })
    } else {
      onSelect(selectedRange)
    }
  }

  const startDate = (selected as DateRange)?.from
  const endDate = (selected as DateRange)?.to

  const customModifiers: Record<string, Matcher | Matcher[]> = {
    end: endDate || false,
    middle: startDate && endDate ? { after: startDate, before: endDate } : false,
    start: startDate || false,
    today: new Date(),
    weekend: [{ dayOfWeek: 0 }, { dayOfWeek: 6 }],
  }

  const hoverInsideRange = ' hover:bg-gray-400'

  const modifiersClassNames = {
    end: 'bg-primary-900 rounded-r-full' + hoverInsideRange,
    middle: 'bg-primary-900' + hoverInsideRange,
    outside: 'text-light-900',
    selected: mode === 'single' ? 'bg-primary-900 rounded-full' : 'bg-primary-900',
    start: 'bg-primary-900 rounded-l-full' + hoverInsideRange,
    today: 'text-primary-500',
    weekend: 'text-danger-300',
  }

  if (mode === 'single') {
    return (
      <DayPicker
        autoFocus
        classNames={{ ...DayPickerStyle, ...classNames }}
        mode={'single'}
        modifiers={customModifiers}
        modifiersClassNames={modifiersClassNames}
        month={month}
        onMonthChange={onMonthChange}
        onSelect={handleSelectSingle}
        selected={selected as Date | undefined}
        weekStartsOn={1}
        {...props}
      />
    )
  }

  return (
    <DayPicker
      autoFocus
      classNames={{ ...DayPickerStyle, ...classNames }}
      mode={'range'}
      modifiers={customModifiers}
      modifiersClassNames={modifiersClassNames}
      month={month}
      onMonthChange={onMonthChange}
      onSelect={handleSelectRange}
      selected={selected as DateRange | undefined}
      weekStartsOn={1}
      {...props}
    />
  )
}
