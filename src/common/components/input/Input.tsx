import { InputHTMLAttributes, ReactNode, useState } from 'react'

import { cn } from '@/common/utils/cn'

type Props = {
  error?: string
  icon?: ReactNode
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({ className, error, icon, label, ...props }: Props) => {
  const [isFocused, setIsFocused] = useState(false)

  let borderColor = 'border-dark-100'
  let placeholderColor = 'text-light-900'

  if (error) {
    borderColor = 'border-danger-500'
    placeholderColor = 'text-light-100'
  } else if (props.disabled) {
    borderColor = 'border-light-100'
    placeholderColor = 'text-dark-300'
  }

  const inputClassName = cn(
    'w-[279px] h-[36px] pt-[6px] pb-[6px] pl-[12px]',
    `disabled: opacity-50`,
    'outline-offset-0',
    'bg-current: bg-dark-500',
    'placeholder:font-weight-400 placeholder:text-[16px] placeholder:leading-[24px] placeholder:text-light-100',
    'focus:outline-none focus:outline-primary-500 focus:border-2 focus:ring-0 ',
    // props.disabled ? 'placeholder: text-dark-300' : 'hover:border hover:border-light-900',
    'border',
    'rounded-sm',
    borderColor,
    placeholderColor,
    isFocused ? 'bg-dark-500 text-light-100' : '',
    className
  )

  return (
    <div className={'relative mb-4'} style={{ left: '24px', position: 'absolute', top: '12px' }}>
      {label && (
        <label
          className={cn(
            'block leading-[24px] text-sm font-normal',
            props.disabled ? 'text-dark-100' : 'text-light-900',
            className
          )}
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
          className={inputClassName}
          {...props}
          disabled={props.disabled}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          placeholder={isFocused && !props.disabled ? '' : props.placeholder}
        />
      </div>
      {error && <span className={'text-sm text-danger-500 block'}>{error}</span>}
    </div>
  )
}
