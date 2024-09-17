import React, { InputHTMLAttributes, useId } from 'react'

import { cn } from '@/common/utils/cn'

type Props = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>

export const Radio = ({ disabled, label, name, onChange, value, ...props }: Props) => {
  const id = useId()

  return (
    <div className={'py-2 mb-3'}>
      <input
        className={'peer hidden'}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        type={'radio'}
        value={value}
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
            'w-5 h-5 cursor-pointer rounded-full bg-dark-900 border-2 border-light-100 flex items-center justify-center duration-300 hover:bg-dark-300 active:bg-dark-100 focus:bg-dark-500 before:w-9 before:h-9 before:rounded-full before:duration-300 before:absolute before:-z-10 hover:before:bg-dark-300 active:before:bg-dark-100 focus:before:bg-dark-500 after:w-2.5 after:h-2.5 after:rounded-full',
            disabled && 'opacity-60 cursor-default hover:before:bg-transparent'
          )}
        ></span>
        <span>{label}</span>
      </label>
    </div>
  )
}
