import { InputHTMLAttributes } from 'react'

import { Icon } from '@/common/components/icon/Icon'
import { cn } from '@/common/utils/cn'

import { Input } from './Input'

type Props = {
  error?: string
  isError?: boolean
  onSearchClick?: (value: any) => void
} & InputHTMLAttributes<HTMLInputElement>

export const SearchInput = (props: Props) => {
  const svgColor = props.disabled ? 'text-dark-100' : 'text-light-900'

  return (
    <Input
      icon={
        <button
          className={cn([
            `
            focus:outline-none 
            ${props.disabled ? 'cursor-default' : 'cursor-pointer'}
            `,
            props.className,
          ])}
          onClick={props.onSearchClick}
          type={'button'}
        >
          <Icon
            className={`fill-current ${svgColor}`}
            iconId={'search-outline'}
            viewBox={'0 -8 30 40'}
            width={'30'}
          />
        </button>
      }
      inputPaddingLeft={'42px'}
      isLeftIcon
      {...props}
    />
  )
}
