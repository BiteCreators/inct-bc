import React, { InputHTMLAttributes, forwardRef, useId } from 'react'

import { cn } from '../../utils'

type Props = {
  checked?: boolean
  label: string
} & InputHTMLAttributes<HTMLInputElement>

export const Radio = forwardRef<HTMLInputElement, Props>(
  ({ checked, disabled, label, name, onChange, value, ...props }: Props, ref) => {
    const id = useId()

    return (
      <div className={'py-2 mb-3'}>
        <input
          checked={checked}
          className={'peer hidden'}
          disabled={disabled}
          id={id}
          name={name}
          onChange={onChange}
          ref={ref}
          type={'radio'}
          value={value as string}
          {...props}
        />
        <label
          className={cn(
            'font-primary text-sm text-light-100 font-weight400 flex gap-2.5 cursor-pointer peer-checked:[&>span:after]:bg-light-100',
            disabled && 'opacity-60 cursor-default'
          )}
          htmlFor={id}
        >
          <span
            className={cn(
              'w-5 h-5 cursor-pointer rounded-full bg-dark-900 border-2 border-light-100 flex items-center justify-center duration-300 global-hover:hover:bg-dark-300 active:bg-dark-100 focus:bg-dark-500 before:w-9 before:h-9 before:rounded-full before:duration-300 before:absolute before:-z-10 global-hover:hover:before:bg-dark-300 active:before:bg-dark-100 focus:before:bg-dark-500 after:w-2.5 after:h-2.5 after:rounded-full',
              disabled &&
                'opacity-60 cursor-default global-hover:hover:before:bg-transparent global-hover:hover:bg-transparent active:before:bg-transparent active:bg-transparent focus:before:bg-transparent focus:bg-transparent'
            )}
          ></span>
          <span>{label}</span>
        </label>
      </div>
    )
  }
)

Radio.displayName = 'input'
