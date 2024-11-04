import React, { ComponentProps, forwardRef, useState } from 'react'

import { cn } from '@/common/lib/utils/cn'
import { mergeRefs } from '@/common/lib/utils/mergeRefs'
import { toArray } from '@vitest/utils'

import { useTextArea } from './useTextArea'

export type TextAreaProps = {
  className?: string
  error?: string
  isCorrect?: boolean
  isError?: boolean
  label?: string
  limitCount?: number
  resize?: 'auto' | 'manual-x' | 'manual-y'
} & ComponentProps<'textarea'>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      disabled,
      error,
      id,
      isCorrect,
      isError,
      label,
      limitCount,
      onChange,
      required,
      resize = 'auto',
      ...props
    }: TextAreaProps,
    ref
  ) => {
    if (limitCount) {
      limitCount = limitCount < 0 ? undefined : limitCount
    }
    const { handleChange, textAreaId, textAreaRef } = useTextArea({
      autoResize: resize === 'auto',
      onChange,
    })
    const currentCount = props.value?.toString().length ?? 0

    return (
      <div className={'flex flex-col'}>
        {!!label && (
          <label
            className={cn(
              'text-light-900  text-sm',
              disabled && 'text-dark-100',
              required && 'after:content-["*"] after:ml-0.5 after: text-light-900'
            )}
            htmlFor={id ?? textAreaId}
          >
            {label}
          </label>
        )}
        <textarea
          className={cn([
            'px-3 py-1.5 min-h-9',
            'outline-none outline-offset-0',
            'text-light-100 text-md',
            'border border-dark-100 rounded-sm',
            'bg-dark-500',
            'focus:outline-primary-500 focus:border-dark-500',
            'active:focus:border-dark-500 active:border-light-100 active:border',
            'disabled:text-dark-100 disabled:active:border-dark-100',
            'placeholder:text-light-900 placeholder:text-md',
            'overflow-y-hidden resize-none',
            'transition-[outline-color] duration-100',
            isError && 'border-danger-500',
            resize === 'manual-y' && 'overflow-y-auto resize-y',
            resize === 'manual-x' && 'overflow-x-auto resize-x',
            className,
          ])}
          disabled={disabled}
          id={id ?? textAreaId}
          onChange={handleChange}
          ref={mergeRefs([ref, textAreaRef])}
          required={required}
          {...props}
        />
        {!!limitCount && (
          <div
            className={`flex justify-end text-light-900 text-xs ${!isCorrect && 'text-red-700'}`}
          >{`${currentCount}/${limitCount}`}</div>
        )}
        {isError && <p className={'text-danger-500 text-sm'}>{error ?? 'invalid data'}</p>}
      </div>
    )
  }
)
