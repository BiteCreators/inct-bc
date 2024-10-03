import React, { ChangeEvent, forwardRef } from 'react'

import { cn } from '@/common/lib/utils/cn'

import { Radio } from './Radio'

type RadioOptions = {
  label: string
  name?: string
  value: string
}

export type RadioGroupProps = {
  disabled?: boolean
  error?: string
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void
  options: RadioOptions[]
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ disabled, error, onChange, options }: RadioGroupProps, ref) => {
    return (
      <div className={cn('relative')}>
        {options.map((option, i) => {
          return (
            <Radio
              disabled={disabled}
              key={i}
              label={option.label}
              name={'radioName'}
              onChange={onChange}
              ref={ref}
              value={option.value}
            />
          )
        })}
        <span className={cn('absolute text-danger-500 -bottom-4')}>{error && error}</span>
      </div>
    )
  }
)
