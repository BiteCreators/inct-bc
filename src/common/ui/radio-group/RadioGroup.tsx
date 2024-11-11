import React, { ChangeEvent, forwardRef, useState } from 'react'

import { cn } from '@/common/lib/utils/cn'

import { Radio } from './Radio'

type RadioOptions<T extends number | string> = {
  label: string
  name?: string
  value: T
}

export type RadioGroupProps<T extends number | string> = {
  defaultValue?: T
  disabled?: boolean
  error?: string
  name?: string
  onChange?: (value: T) => void
  options: RadioOptions<T>[]
}

export const RadioGroup = forwardRef(function RadioGroup<T extends number | string>(
  { defaultValue, disabled, error, name = 'radioName', onChange, options }: RadioGroupProps<T>,
  ref: React.Ref<HTMLInputElement>
) {
  const [selectedValue, setSelectedValue] = useState<T | undefined>(defaultValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as T

    setSelectedValue(value)
    onChange && onChange(value)
  }

  return (
    <div className={cn('relative')}>
      {options.map((option, i) => {
        return (
          <Radio
            checked={selectedValue === option.value}
            disabled={disabled}
            key={i}
            label={option.label}
            name={name}
            onChange={handleChange}
            ref={ref}
            value={option.value as number | string}
          />
        )
      })}
      <span className={cn('absolute text-danger-500 -bottom-4')}>{error && error}</span>
    </div>
  )
}) as <T extends number | string>(
  props: { ref?: React.Ref<HTMLInputElement> } & RadioGroupProps<T>
) => JSX.Element
