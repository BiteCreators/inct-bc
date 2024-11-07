import React from 'react'

import { Input, SelectItem } from '@/common/ui'
import { SelectOptions } from '@/pages/profile/[id]/settings'
import { useRouter } from 'next/router'

export const SearchableOptions = ({ options }: { options: SelectOptions[] }) => {
  const [searchValue, setSearchValue] = React.useState<string>('')
  const { locale } = useRouter()

  return (
    <>
      <Input
        autoFocus
        className={'sticky w-full top-0 bg-dark-700'}
        onChange={e => setSearchValue(e.target.value)}
        placeholder={locale === 'en' ? ' Search' : ' Поиск'}
      />
      {options
        .filter(option => option.name.toLowerCase().includes(searchValue.toLowerCase()))
        .map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.name}
          </SelectItem>
        ))}
    </>
  )
}
