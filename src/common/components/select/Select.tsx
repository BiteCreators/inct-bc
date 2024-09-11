'use client'
import React, { forwardRef } from 'react'

import { cn } from '@/common/utils/cn'
import * as SelectPrimitive from '@radix-ui/react-select'
import { motion } from 'framer-motion'

import { Icon } from '../icon/Icon'

type Props = {
  className?: string
  error?: string
  icon?: React.ReactNode
  id?: string
  isError?: boolean
  label?: string
  maxWidth?: string
  placeholder?: string
  width?: string
} & SelectPrimitive.SelectProps

export const Select = ({
  children,
  className,
  error,
  icon,
  id,
  isError,
  label,
  maxWidth = '210px',
  open,
  placeholder,
  required,
  width,
  ...props
}: Props) => {
  return (
    <div className={cn('flex relative flex-col', className)} style={{ maxWidth, width }}>
      {label && (
        <label
          className={cn(
            `
            text-sm text-light-900
            `,
            required && 'after:content-["*"] after:text-light-900 after:text-sm after:ml-0.5'
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <SelectPrimitive.Root {...props} open={open}>
        <SelectPrimitive.Trigger
          className={cn(
            `
            flex justify-between
            border-dark-100 border
            active:outline-none 
            text-md 
            px-3 py-[6px]
            data-[placeholder]:text-light-900
            outline-none
            rounded-sm
            outline-offset-0 focus:outline-primary-500 focus:outline-2
            data-[state="open"]:bg-dark-500 data-[state="open"]:border-light-100
            data-[state="open"]:rounded-b-none
            data-[disabled]:data-[placeholder]:text-dark-100 
            transition-[outline-color]
            delay-75
            group
            `,
            isError && 'border-danger-500'
          )}
          id={id}
        >
          <div className={'flex gap-3 align-center'}>
            {icon}
            <SelectPrimitive.Value className={'text-light-100'} placeholder={placeholder} />
          </div>
          <SelectPrimitive.Icon className={'ml-2'}>
            <Icon
              className={cn(
                `
                fill-current text-light-100 
                group-[[data-state="open"]]:rotate-180
                transition-transform
                delay-100
                `
              )}
              height={'20px'}
              iconId={'arrow-ios-Up'}
              viewBox={'2.5 1 20 20'}
              width={'20px'}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            asChild
            className={cn(
              `
              border border-light-100 border-t-[0px]
              rounded-b-sm
              bg-dark-500
              z-10
              w-[var(--radix-select-trigger-width)]
              `
            )}
            position={'popper'}
          >
            <motion.div
              animate={{ transform: 'translateY(0)' }}
              exit={{ transform: 'translateY(-15px)' }}
              initial={{ transform: 'translateY(-15px)' }}
              transition={{ duration: 0.1 }}
            >
              {children}
            </motion.div>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {isError && (
        <p
          className={cn(
            `
            absolute bottom-[-24px] -z-20
            text-sm text-danger-500
            `
          )}
        >
          {error ?? 'invalid input'}
        </p>
      )}
    </div>
  )
}

type ItemProps = {} & SelectPrimitive.SelectItemProps

Select.Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ children, className, ...props }: ItemProps, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        className={cn(
          `
          px-3 py-[6px]
          text-md
          hover:text-primary-500 hover:bg-dark-300 hover:outline-none
          cursor-pointer
          delay-[0.01s]
          transition-colors
          `,
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
  }
)