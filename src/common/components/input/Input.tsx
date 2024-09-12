import { InputHTMLAttributes, forwardRef, useState } from 'react'

import { Icon } from '@/common/components/icon/Icon'
import { cn } from '@/common/utils/cn'

type Props = {
  error?: string
  inputType?: 'default' | 'reveal' | 'search'
  label?: string
  onSearchClick?: (value: any) => void
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { className, disabled, error, id, inputType = 'default', label, onSearchClick, ...props },
    ref
  ) => {
    const svgColor = disabled ? 'text-dark-100' : 'text-light-900'
    const inputPaddingLeft = inputType === 'search' ? '42px' : '8px'
    const [showContent, setShowContent] = useState(false)

    const changeShowContentHandler = () => {
      if (!disabled) {
        setShowContent(prev => !prev)
      }
    }
    const inputTypeToShow = inputType === 'reveal' && !showContent ? 'password' : 'text'

    return (
      <div className={cn('relative mb-4', className)}>
        {label && (
          <label
            className={cn(
              'block leading-[24px] text-sm font-normal',
              disabled ? 'text-dark-100' : 'text-light-900'
            )}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div
          className={cn([
            `
            relative flex items-center
            border border-dark-100 rounded-sm bg-transparent
            focus-within:border-primary-500 focus-within:active:border-primary-500
            hover:border-light-900
            disabled:border-dark-100 disabled:hover:border-dark-100 disabled:active:border-dark-100
          `,
            disabled && '!border-dark-100',
            error && 'border-danger-500',
            className,
          ])}
        >
          {inputType === 'search' && (
            <span className={'absolute inset-y-0 left-0 pl-3 flex items-center text-light-900'}>
              <button
                className={cn([
                  `
                focus:outline-none 
                ${disabled ? 'cursor-default' : 'cursor-pointer'}
                `,
                  className,
                ])}
                onClick={onSearchClick}
                type={'button'}
              >
                <Icon
                  className={`fill-current ${svgColor}`}
                  iconId={'search-outline'}
                  viewBox={'0 -8 30 40'}
                  width={'30'}
                />
              </button>
            </span>
          )}
          <input
            className={cn([
              `
              w-full
              pr-[6px] py-2 text-md text-light-100 outline-none outline-offset-0
              bg-transparent
              placeholder:text-light-900
              active:bg-dark-500
              focus:outline-none 
              disabled:active:bg-inherit disabled:placeholder:text-dark-100
              hover:placeholder:text-light-900 
              `,
              className,
            ])}
            id={id}
            type={inputTypeToShow}
            {...props}
            disabled={disabled}
            ref={ref}
            style={{ paddingLeft: `${inputPaddingLeft}` }}
          />
          {inputType === 'reveal' && (
            <span className={'flex items-center pr-1 mr-[0.5rem]'}>
              <button
                className={cn([
                  `
                focus:outline-none 
                ${disabled ? 'cursor-default' : 'cursor-pointer'}
                `,
                  className,
                ])}
                onClick={changeShowContentHandler}
                type={'button'}
              >
                <Icon
                  className={`fill-current ${svgColor}`}
                  iconId={`${showContent ? 'eye-outline' : 'eye-off-outline'}`}
                  viewBox={'10 -6 1 35'}
                  width={'30'}
                />
              </button>
            </span>
          )}
        </div>
        {error && <p className={'text-sm text-danger-500'}>{error ?? 'invalid input'}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
