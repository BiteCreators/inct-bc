const hoverOutsideRange = ' global-hover:hover:bg-primary-700 '
const navButtonStyle =
  'w-9 h-9 flex items-center justify-center rounded-full transition-all duration-100' +
  ' ease-in-out global-hover:hover:w-9 global-hover:hover:h-9 global-hover:hover:bg-dark-100'

export const DayPickerStyle = {
  active: 'bg-primary-900 w-9 h-9 flex items-center justify-center',
  button_next: navButtonStyle,
  button_previous: navButtonStyle,
  caption: 'text-white text-center font-semibold mb-10',
  caption_label: 'font-inter text-md font-bold text-left absolute top-[22px] ml-2',
  chevron: 'fill-white global-hover:hover:bg-dark-100 rounded-full w-5 h-5',
  day:
    'global-hover:hover:rounded-full relative w-9 h-9 flex items-center justify-center' +
    ' cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300' +
    ' focus-visible:ring-offset-0' +
    hoverOutsideRange,
  day_button: 'w-9 h-9',
  disabled: 'bg-gray-300 text-light-900',
  month_grid: 'w-full text-center',
  nav: 'flex justify-end items-center',
  other_month: 'text-light-900',
  selected: 'bg-primary-900 w-9 h-9 flex items-center justify-center',
  today: 'w-9 h-9 flex items-center justify-center text-primary-500',
  week: 'grid grid-cols-7',
  weekdays: 'grid grid-cols-7 gap-0 text-center font-semibold mt-5',
  weekend: 'text-danger-300',
}
