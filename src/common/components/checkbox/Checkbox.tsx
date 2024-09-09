import React, { ChangeEvent, ComponentProps, useId, useState } from 'react'

import { cn } from '@/common/utils/cn'

type CheckboxProps = {
  text?: string
} & ComponentProps<'input'>

export const Checkbox = ({
  checked,
  className,
  disabled,
  id,
  onChange,
  text,
  ...props
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked)
  const checkboxId = useId()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.currentTarget.checked)
    onChange && onChange(e)
  }

  return (
    <div className={'inline-flex items-center'}>
      <input
        checked={isChecked}
        className={'absolute z-(-1) opacity-0 '}
        disabled={disabled}
        id={id ?? checkboxId}
        onChange={handleChange}
        type={'checkbox'}
        {...props}
      />
      <label
        className={cn(
          `
          relative
          bg-inherit
          w-8 h-8
          rounded-2xl
          checked: 
          active:bg-dark-100
          hover:bg-dark-300
          focus:bg-dark-500
          before:inline-block
          before:content-['']
          before:absolute
          before:left-2
          before:top-2
          before:w-4
          before:h-4
          before:border-solid
          before:border-2
          before:rounded-sm`,
          isChecked && !disabled && 'before:bg-light-100 before:border-none ',
          isChecked && disabled && 'before:bg-dark-100 before:border-none',
          !isChecked && disabled && 'before:border-light-900',
          !isChecked && !disabled && 'before:border-light-500',
          className
        )}
        htmlFor={id ?? checkboxId}
      ></label>
      {text && (
        <span className={cn('mx-1 font-weight400 text-sm', disabled && 'text-light-900')}>
          {text}
        </span>
      )}
    </div>
  )
}
