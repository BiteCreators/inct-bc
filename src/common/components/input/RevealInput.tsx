import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { FieldError } from 'react-hook-form'

import { Icon } from '@/common/components/icon/Icon'
import { cn } from '@/common/utils/cn'

import { Input } from './Input'

type Props = {
  error?: FieldError | string
  isError?: boolean
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const RevealInput = forwardRef<HTMLInputElement, Props>(
  ({ className, disabled, error, isError, label, ...props }, ref) => {
    const [showContent, setShowContent] = useState(false)

    const svgColor = disabled ? 'text-dark-100' : 'text-light-900'
    const changeShowContentHandler = () => {
      if (!disabled) {
        setShowContent(!showContent)
      }
    }

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
            onClick={changeShowContentHandler}
            type={'button'}
          >
            <Icon
              className={`fill-current ${svgColor}`}
              iconId={`${showContent ? 'eye-outline' : 'eye-off-outline'}`}
              viewBox={'10 -6 1 35'}
              width={'30'}
            />
          </button>
        }
        isError={hasError}
        isRightIcon
        label={label}
        ref={ref}
        type={showContent ? 'text' : 'password'}
        {...props}
      />
    )
  }
)

RevealInput.displayName = 'RevealInput'
