import { InputHTMLAttributes } from 'react'

import { Icon } from '@/common/components/icon/Icon'

import { Input } from './Input'

type Props = {
  error?: string
  isError?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export const SearchInput = (props: Props) => {
  const svgColor = props.disabled ? 'text-dark-100' : 'text-light-900'

  return (
    <Input
      icon={
        <Icon
          className={`fill-current ${svgColor}`}
          iconId={'search-outline'}
          viewBox={'0 -10 30 40'}
          width={'30'}
        />
      }
      inputPaddingLeft={'42px'}
      {...props}
    />
  )
}
