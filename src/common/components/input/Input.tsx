import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

import { cn } from '@/common/utils/cn'

type Props = {
  error?: FieldError | string
  icon?: ReactNode
  inputPaddingLeft?: string
  isError?: boolean
  isLeftIcon?: boolean
  isRightIcon?: boolean
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      disabled,
      error,
      icon,
      id,
      inputPaddingLeft = '8px',
      isError,
      isLeftIcon,
      isRightIcon,
      label,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error) || isError

    return (
      <div className={cn('relative mb-4', className)}>
        {label && (
          <label
            className={cn(
              'block leading-[24px] text-sm font-normal',
              disabled ? 'text-dark-100' : 'text-light-900'
            )}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div
          className={cn([
            `
            relative flex items-center
            border border-dark-100 rounded-sm bg-transparent
            focus-within:border-primary-500 focus-within:active:border-primary-500
            hover:border-light-900
            disabled:border-dark-100 disabled:hover:border-dark-100 disabled:active:border-dark-100
          `,
            disabled && '!border-dark-100',
            hasError && 'border-danger-500',
            className,
          ])}
        >
          {icon && isLeftIcon && (
            <span className={'absolute inset-y-0 left-0 pl-3 flex items-center text-light-900'}>
              {icon}
            </span>
          )}
          <input
            className={cn([
              `
              w-full
              pr-[6px] py-2 text-md text-light-100 outline-none outline-offset-0
              bg-transparent
              placeholder:text-light-900
              active:bg-dark-500
              focus:outline-none 
              disabled:active:bg-inherit disabled:placeholder:text-dark-100
              hover:placeholder:text-light-900 
              `,
              className,
            ])}
            disabled={disabled}
            id={id}
            ref={ref}
            style={{ paddingLeft: inputPaddingLeft }}
            {...props}
          />
          {icon && isRightIcon && (
            <span className={'flex items-center pr-1 mr-[0.5rem]'}>{icon}</span>
          )}
        </div>
        {hasError && (
          <p className={'text-sm text-danger-500'}>
            {typeof error === 'string' ? error : error?.message || 'Invalid input'}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
