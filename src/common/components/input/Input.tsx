import { InputHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/common/utils/cn'

type Props = {
  error?: string
  icon?: ReactNode
  inputPaddingLeft?: string | undefined
  isError?: boolean
  isLeftIcon?: boolean
  isRightIcon?: boolean
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({
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
}: Props) => {
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
          focus:border-transparent focus:active:border-transparent
          hover:border-light-900
          disabled:border-dark-100 disabled:hover:border-dark-100 disabled:active:border-dark-100
       `,
          disabled && '!border-dark-100',
          isError && 'border-danger-500',
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
            w-[100%]
            pr-[6px] py-2 text-md text-light-100 outline-none outline-offset-0
            bg-transparent
            placeholder:text-light-900
            active:bg-dark-500
            focus:outline-primary-500 
            disabled:active:bg-inherit disabled:placeholder:text-dark-100
            hover:placeholder:text-light-900 
            `,
            className,
          ])}
          id={id}
          {...props}
          disabled={disabled}
          style={{ paddingLeft: `${inputPaddingLeft ? inputPaddingLeft : '8px'}` }}
        />
        {icon && isRightIcon && (
          <span className={'flex items-center pr-1 mr-[0.5rem]'}>{icon}</span>
        )}{' '}
      </div>
      {isError && <p className={'text-sm text-danger-500'}>{error ?? 'invalid input'}</p>}
    </div>
  )
}
