import React, { ChangeEvent, ComponentProps, useId, useState } from 'react'

import { cn } from '@/common/utils/cn'

import { Icon } from '../icon/Icon'

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
        className={'absolute z-[-1] opacity-0'}
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
          w-9 h-9
          rounded-2xl
          active:bg-dark-100 
          hover:bg-dark-300 
          focus:bg-dark-500
          disabled:bg-inherit 
          disabled:hover:bg-inherit 
          disabled:active:bg-inherit
          before:inline-block
          before:content-['']
          before:absolute
          before:left-[9px]
          before:top-[9px]
          before:w-[18px]
          before:h-[18px]
          before:border-solid
          before:border-2
          before:rounded-sm`,
          disabled && '!bg-inherit',
          isChecked && !disabled && 'before:bg-light-100 before:border-none',
          isChecked && disabled && 'before:bg-dark-100 before:border-none',
          !isChecked && disabled && 'before:border-light-900',
          !isChecked && !disabled && 'before:border-light-500',
          className
        )}
        htmlFor={id ?? checkboxId}
      >
        {isChecked && (
          <Icon
            className={cn(
              'absolute left-[6px] top-[6px]',
              disabled && `fill-current text-light-500`
            )}
            height={'24'}
            iconId={'checkmark-outline'}
            viewBox={'0 0 24 24'}
            width={'24'}
          />
        )}
      </label>
      {text && (
        <span className={cn('mx-1 font-weight400 text-sm', disabled && 'text-light-900')}>
          {text}
        </span>
      )}
    </div>
  )
}
