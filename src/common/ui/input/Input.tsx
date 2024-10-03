import { InputHTMLAttributes, forwardRef } from 'react'

import { EyeOffOutline, EyeOutline, SearchOutline } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'

import { useInput } from './useInput'

type Props = {
  error?: string
  inputType?: 'default' | 'reveal' | 'search'
  label?: string
  onSearchClick?: () => void
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { className, disabled, error, id, inputType = 'default', label, onSearchClick, ...props },
    ref
  ) => {
    const {
      changeShowContentHandler,
      inputId,
      inputPaddingLeft,
      inputTypeToShow,
      showContent,
      svgColor,
    } = useInput({ disabled, inputType })

    return (
      <div className={cn('relative', className)}>
        {label && (
          <label
            className={cn(
              'block leading-6 text-sm font-normal',
              disabled ? 'text-dark-100' : 'text-light-900'
            )}
            htmlFor={id ?? inputId}
          >
            {label}
          </label>
        )}
        <div
          className={cn([
            'relative flex items-center',
            'border border-dark-100 rounded-sm bg-transparent',
            'focus-within:border-primary-500 focus-within:active:border-primary-500',
            'hover:border-light-900',
            'disabled:border-dark-100 disabled:hover:border-dark-100 disabled:active:border-dark-100',
            disabled && '!border-dark-100',
            error && 'border-danger-500',
            className,
          ])}
        >
          {inputType === 'search' && (
            <span className={'absolute inset-y-0 left-0 pl-3 flex items-center text-light-900'}>
              <button
                className={cn([
                  'focus:outline-none cursor-pointer',
                  disabled && 'cursor-default',
                  className,
                ])}
                onClick={onSearchClick}
                type={'button'}
              >
                <SearchOutline className={`fill-current ${svgColor}`} />
              </button>
            </span>
          )}
          <input
            className={cn([
              'w-full h-9 pr-[6px] py-2',
              'bg-transparent text-md text-light-100 outline-none outline-offset-0',
              'placeholder:text-light-900 active:bg-dark-500 focus:outline-none',
              'disabled:active:bg-inherit disabled:placeholder:text-dark-100',
              'hover:placeholder:text-light-900',
              className,
            ])}
            id={id ?? inputId}
            type={inputTypeToShow}
            {...props}
            disabled={disabled}
            ref={ref}
            style={{ paddingLeft: inputPaddingLeft }}
          />
          {inputType === 'reveal' && (
            <span className={'flex items-center pr-1 mr-[0.5rem]'}>
              <button
                className={cn([
                  'focus:outline-none cursor-pointer',
                  disabled && 'cursor-default',
                  className,
                ])}
                onClick={changeShowContentHandler}
                type={'button'}
              >
                {showContent ? (
                  <EyeOutline className={`fill-current ${svgColor}`} />
                ) : (
                  <EyeOffOutline className={`fill-current ${svgColor}`} />
                )}
              </button>
            </span>
          )}
        </div>
        {error && <p className={'text-sm absolute text-danger-500'}>{error ?? 'invalid input'}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
