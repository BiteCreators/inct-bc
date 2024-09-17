import React, { ChangeEvent } from 'react'

import { Radio } from '@/common/components/radioGroup/Radio'
import { cn } from '@/common/utils/cn'

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

export const RadioGroup = ({ disabled, error, onChange, options }: RadioGroupProps) => {
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
            value={option.value}
          />
        )
      })}
      <span className={cn('absolute text-danger-500 -bottom-4')}>{error && error}</span>
    </div>
  )
}
