import { InputHTMLAttributes, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

import { Icon } from '@/common/components/icon/Icon'
import { cn } from '@/common/utils/cn'

import { Input } from './Input'

type Props = {
  error?: FieldError | string
  isError?: boolean
  onSearchClick?: (value: any) => void
} & InputHTMLAttributes<HTMLInputElement>

export const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ className, disabled, error, isError, onSearchClick, ...props }, ref) => {
    const svgColor = disabled ? 'text-dark-100' : 'text-light-900'

    const hasError = Boolean(error) || isError

    return (
      <Input
        disabled={disabled}
        error={error}
        icon={
          <button
            className={cn([
              `
              focus:outline-none 
              ${disabled ? 'cursor-default' : 'cursor-pointer'}
              `,
              className,
            ])}
            onClick={onSearchClick}
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
        isError={hasError}
        isLeftIcon
        ref={ref}
        {...props}
      />
    )
  }
)

SearchInput.displayName = 'SearchInput'
