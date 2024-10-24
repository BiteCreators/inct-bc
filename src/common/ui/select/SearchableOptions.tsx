import React from 'react'

import { Input, SelectItem } from '@/common/ui'
import { useRouter } from 'next/router'

export const SearchableOptions = ({ options }: { options: string[] }) => {
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
        .filter(options => options.toLowerCase().includes(searchValue.toLowerCase()))
        .map(option => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
    </>
  )
}
