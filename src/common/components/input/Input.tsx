import { InputHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/common/utils/cn'

type Props = {
  error?: string
  icon?: ReactNode
  inputPaddingLeft?: string | undefined
  isError?: boolean
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({
  className,
  disabled,
  error,
  icon,
  id,
  inputPaddingLeft,
  isError,
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
      <div className={'relative'}>
        {icon && (
          <span className={'absolute inset-y-0 left-0 pl-3 flex items-center text-light-900'}>
            {icon}
          </span>
        )}
        <input
          className={cn([
            `
            w-[100%]
            pr-[6px] py-2 text-md text-light-100 outline-none outline-offset-0
            border border-dark-100 rounded-sm bg-transparent
            placeholder:text-light-900
            active:bg-dark-500 active:border-light-100
            focus:outline-primary-500 focus:border-transparent focus:active:border-transparent
            disabled:active:bg-inherit disabled:active:border-dark-100  disabled:placeholder:text-dark-100
            disabled:hover:border-dark-100
            hover:placholder:text-light-900 hover:border-light-900
            `,
            isError && 'border-danger-500',
            className,
          ])}
          id={id}
          {...props}
          disabled={disabled}
          style={{ paddingLeft: `${inputPaddingLeft ? inputPaddingLeft : '8px'}` }}
        />
      </div>
      {isError && <p className={'text-sm text-danger-500'}>{error ?? 'invalid input'}</p>}
    </div>
  )
}
