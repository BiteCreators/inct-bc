import {
  DateRange,
  DayPicker,
  DayPickerProps,
  Matcher,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from 'react-day-picker'

import { Variants, motion } from 'framer-motion'

import { DayPickerStyle } from './CustomDayPickerStyles'

type Props = {
  classNames?: any
  mode: 'range' | 'single'
  month?: Date
  onMonthChange?: (month: Date) => void
  onSelect: (selected: Date | DateRange | undefined) => void
  selected: Date | DateRange | null | undefined
} & Omit<DayPickerProps, 'mode' | 'onSelect' | 'selected'>

const calendarAnimation: Variants = {
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
  },
  initial: {
    opacity: 0,
    scale: 0.9,
  },
}

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

  const modifiersClassNames = {
    end: 'rounded-r-full',
    outside: 'text-light-900',
    selected: mode === 'single' ? 'bg-primary-900 rounded-full' : 'bg-primary-900',
    start: 'rounded-l-full',
    today: 'text-primary-500',
    weekend: 'text-danger-300',
  }

  return (
    <motion.div
      animate={'animate'}
      exit={'exit'}
      initial={'initial'}
      transition={calendarAnimation.transition}
      variants={calendarAnimation}
    >
      {mode === 'single' ? (
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
      ) : (
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
      )}
    </motion.div>
  )
}
