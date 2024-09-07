import React, { ComponentProps, forwardRef } from 'react'

import { cn } from '@/common/utils/cn'

import { useTextArea } from './useTextArea'

type Props = {
  className?: string
  error?: string
  isError?: boolean
  label?: string
  resize?: 'auto' | 'manual-x' | 'manual-y'
} & ComponentProps<'textarea'>

export const TextArea = forwardRef<HTMLDivElement, Props>(
  (
    {
      className,
      disabled,
      error,
      id,
      isError,
      label,
      onChange,
      resize = 'auto',
      value,
      ...props
    }: Props,
    ref
  ) => {
    const { handleChange, textAreaRef } = useTextArea({ autoResize: resize === 'auto', onChange })

    return (
      <div className={'flex flex-col'} ref={ref}>
        {!!label && (
          <label
            className={cn(['text-light-900  text-sm', disabled && 'text-dark-100'])}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <textarea
          className={cn([
            `
            outline-none
            px-3 
            py-1.5 
            text-light-100 
            bg-dark-500 
            border 
            border-dark-100 
            rounded-sm
            focus:outline-primary-500
            focus:border-dark-500
            active:focus:border-dark-500
            active:border-light-100
            active:border
            disabled:text-dark-100
            disabled:active:border-dark-100
            placeholder:text-light-900
            placeholder:text-md
            resize-none
            outline-offset-0
            overflow-y-hidden
            min-h-9
            text-md
            transition-[outline-color]
            ease-linear
            duration-200
            `,
            isError && 'border-danger-500',
            resize === 'manual-y' && 'overflow-y-auto resize-y',
            resize === 'manual-x' && 'overflow-x-auto resize-x',
            className,
          ])}
          disabled={disabled}
          id={id}
          onChange={handleChange}
          ref={textAreaRef}
          {...props}
        />
        {isError && <p className={'text-danger-500 text-sm'}>{error ?? 'invalid data'}</p>}
      </div>
    )
  }
)
