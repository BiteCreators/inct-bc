import React from 'react'

import { useRouter } from 'next/router'

import { Input } from '../input/Input'
import { ScrollArea } from '../scroll/ScrollArea'
import { SelectItem } from './Select'

type SelectOptions = {
  name: string
  value: string
}

export const SearchableOptions = ({
  options,
  selectedValue,
}: {
  options: { name: string; value: string }[]
  selectedValue: string
}) => {
  const [searchValue, setSearchValue] = React.useState<string>('')
  const { locale } = useRouter()

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  const valueExistsInOptions = filteredOptions.some(option => option.value === selectedValue)

  const selectedOption: SelectOptions | null =
    !valueExistsInOptions && selectedValue
      ? options.filter(option => option.value === selectedValue)[0]
      : null

  const checkFinalOptions = (filteredOptions: SelectOptions[]) => {
    if (selectedOption) {
      return [{ ...selectedOption }, ...filteredOptions]
    } else {
      return [...filteredOptions]
    }
  }

  return (
    <>
      <Input
        autoFocus
        className={'sticky w-full top-0 bg-dark-700'}
        onChange={e => setSearchValue(e.currentTarget.value)}
        placeholder={locale === 'en' ? ' Search' : ' Поиск'}
      />
      <ScrollArea className={'h-[200px]'}>
        {checkFinalOptions(filteredOptions).map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.name}
          </SelectItem>
        ))}
      </ScrollArea>
    </>
  )
}
