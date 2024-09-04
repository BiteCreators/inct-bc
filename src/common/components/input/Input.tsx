import { InputHTMLAttributes, ReactNode, useState } from 'react'

type Props = {
  error?: string
  icon?: ReactNode
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({ className, error, icon, label, ...props }: Props) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={'relative mb-4'} style={{ left: '24px', position: 'absolute', top: '12px' }}>
      {label && (
        <label
          className={`block leading-[24px] 
            ${props.disabled ? 'text-dark-100' : 'text-light-900'} 
            ${className}`}
          style={{
            fontSize: '14px',
            fontWeight: '400',
          }}
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
          className={`w-[279px] h-[36px] pt-[6px] pb-[6px] pl-[12px]
            placeholder:${props.disabled ? 'text-light-900' : 'text-dark-300'} 
            placeholder:font-weight-400 
            placeholder:text-[16px] 
            placeholder:leading-[24px]
            focus:outline-none focus:border-primary-500 focus:border-2 focus:ring-0
            ${props.disabled ? '' : 'hover:border hover:border-light-900'} 
            border ${error ? 'border-danger-500' : props.disabled ? 'border-dark-100' : 'border-dark-100'}
            ${isFocused ? 'bg-dark-500 border-accent-500 text-light-100' : ''}
            ${className}`}
          {...props}
          disabled={props.disabled}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          placeholder={isFocused && !props.disabled ? '' : props.placeholder}
          style={{
            backgroundColor: isFocused ? '#171717' : '#171717',
          }}
        />
      </div>
      {error && <span className={'text-sm text-danger-500 mt-1 block'}>{error}</span>}
    </div>
  )
}
