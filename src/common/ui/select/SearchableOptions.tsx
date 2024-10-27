import React from 'react'

import { Input, SelectItem } from '@/common/ui'
import { Options } from '@/features/profile/model/useSelectCountryCity'
import { useRouter } from 'next/router'

export const SearchableOptions = ({ options }: { options: Options[] }) => {
  const [searchValue, setSearchValue] = React.useState<string>('')
  const { locale } = useRouter()

  return (
    <>
      <Input
        autoFocus
        className={'sticky w-full top-0 bg-dark-700'}
        onChange={e => setSearchValue(e.currentTarget.value)}
        placeholder={locale === 'en' ? ' Search' : ' Поиск'}
      />
      {options
        .filter(option => option.value.toLowerCase().includes(searchValue.toLowerCase()))
        .map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.value}
          </SelectItem>
        ))}
    </>
  )
}
