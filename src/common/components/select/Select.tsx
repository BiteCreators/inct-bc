'use client'
import React, { forwardRef, useId } from 'react'

import { ArrowIosUp } from '@/common/assets/icons/components'
import { cn } from '@/common/utils/cn'
import * as SelectPrimitive from '@radix-ui/react-select'
import { icons } from '@storybook/core/components'
import { motion } from 'framer-motion'

import s from './select.module.css'

export type SelectProps = {
  className?: string
  error?: string
  hideText?: boolean
  icon?: React.ReactNode
  id?: string
  label?: string
  maxWidth?: string
  placeholder?: string
  width?: string
} & SelectPrimitive.SelectProps

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      children,
      className,
      error,
      hideText = false,
      icon,
      id,
      label,
      maxWidth = '210px',
      open,
      placeholder,
      required,
      width,
      ...props
    }: SelectProps,
    ref
  ) => {
    const selectId = useId()

    return (
      <div className={cn('flex relative flex-col', className)} style={{ maxWidth, width }}>
        {label && (
          <label
            className={cn(
              'text-sm text-light-900',
              required && 'after:content-["*"] after:text-light-900 after:text-sm after:ml-0.5'
            )}
            htmlFor={id ?? selectId}
          >
            {label}
          </label>
        )}
        <SelectPrimitive.Root {...props} open>
          <SelectPrimitive.Trigger
            className={cn(
              'flex justify-between',
              'border-dark-100 border rounded-sm outline-offset-0 outline-none',
              'px-3 py-[6px] text-md',
              'active:outline-none',
              'data-[placeholder]:text-light-900',
              'focus:outline-primary-500 focus:outline-2',
              'data-[state="open"]:bg-dark-500 data-[state="open"]:border-light-100',
              'data-[state="open"]:rounded-b-none',
              'data-[disabled]:data-[placeholder]:text-dark-100',
              'transition-[outline-color] delay-75',
              'group',
              error && 'border-danger-500'
            )}
            id={id ?? selectId}
            ref={ref}
          >
            <div className={`flex gap-3 align-center ${s.selectValue}`}>
              {icon}
              <SelectPrimitive.Value className={`text-light-100`} placeholder={placeholder} />
            </div>
            <SelectPrimitive.Icon className={'ml-2'}>
              <ArrowIosUp
                className={cn(
                  'fill-current text-light-100',
                  'group-[[data-state="open"]]:rotate-180',
                  'transition-transform delay-100'
                )}
              />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              asChild
              className={cn(
                'border border-light-100 border-t-0 rounded-b-sm',
                'bg-dark-500 w-[var(--radix-select-trigger-width)]',
                'z-10',
                `${s.selectHidden}`
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
        {error && (
          <p className={cn('absolute -bottom-6 -z-20', 'text-sm text-danger-500')}>
            {error ?? 'invalid input'}
          </p>
        )}
      </div>
    )
  }
)

type ItemProps = {} & SelectPrimitive.SelectItemProps

export const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ children, className, ...props }: ItemProps, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        className={cn(
          'px-3 py-[6px]',
          'text-md cursor-pointer',
          'hover:text-primary-500 hover:bg-dark-300 hover:outline-none',
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
