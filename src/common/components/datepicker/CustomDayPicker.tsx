import {
  DateRange,
  DayPicker,
  DayPickerProps,
  Matcher,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from 'react-day-picker'

type Props = {
  classNames?: any
  mode: 'range' | 'single'
  onSelect: (selected: Date | DateRange | undefined) => void
  selected: Date | DateRange | undefined
} & Omit<DayPickerProps, 'mode' | 'onSelect' | 'selected'>

export const CustomDayPicker = ({ classNames, mode, onSelect, selected, ...props }: Props) => {
  const handleSelectSingle: SelectSingleEventHandler = selectedDate => {
    onSelect(selectedDate)
  }

  const handleSelectRange: SelectRangeEventHandler = selectedRange => {
    onSelect(selectedRange)
  }

  const startDate = (selected as DateRange)?.from
  const endDate = (selected as DateRange)?.to

  const customModifiers: Record<string, Matcher | Matcher[]> = {
    end: endDate || false,
    middle: startDate && endDate ? { after: startDate, before: endDate } : false,
    start: startDate || false,
    weekend: [{ dayOfWeek: 0 }, { dayOfWeek: 6 }],
  }

  const modifiersClassNames = {
    end: 'bg-primary-900 rounded-r-full',
    middle: 'bg-primary-900',
    start: 'bg-primary-900 rounded-l-full',
    weekend: 'text-danger-300',
  }

  const DayPickerStyle = {
    active: 'bg-primary-900 text-white w-9 h-9 rounded-full flex items-center justify-center',
    caption: 'text-white text-center font-semibold mb-10',
    caption_label: 'font-inter text-md font-bold text-left absolute top-6 ml-2',
    chevron: 'fill-white',
    chevron_icon: 'w-6 h-6 fill-current',
    day: 'hover:bg-primary-700 hover:rounded-full text-center w-9 h-9 flex items-center justify-center cursor-pointer',
    disabled: 'bg-gray-300 text-light-900',
    month_grid: 'w-full text-center',
    nav: 'flex justify-end items-center',
    nav_button: 'w-10 h-10 hover:bg-dark-100 rounded-full flex items-center justify-center',
    other_month: 'text-light-900',
    selected: 'bg-primary-900 text-white w-9 h-9 flex items-center justify-center',
    today: 'w-9 h-9 flex items-center justify-center text-primary-500',
    week: 'grid grid-cols-7',
    weekdays: 'grid grid-cols-7 gap-0 text-center font-semibold mt-5',
    weekend: 'text-danger-300',
  }

  if (mode === 'single') {
    return (
      <DayPicker
        classNames={{ ...DayPickerStyle, ...classNames }}
        mode={'single'}
        modifiers={customModifiers}
        modifiersClassNames={modifiersClassNames}
        onSelect={handleSelectSingle}
        selected={selected as Date | undefined}
        weekStartsOn={1}
        {...props}
      />
    )
  }

  return (
    <DayPicker
      classNames={{ ...DayPickerStyle, ...classNames }}
      mode={'range'}
      modifiers={customModifiers}
      modifiersClassNames={modifiersClassNames}
      onSelect={handleSelectRange}
      selected={selected as DateRange | undefined}
      weekStartsOn={1}
      {...props}
    />
  )
}
