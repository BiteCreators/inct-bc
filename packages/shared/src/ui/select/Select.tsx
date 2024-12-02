'use client'
import React, { forwardRef, useId } from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'
import { motion } from 'framer-motion'

import s from './select.module.css'

import { ArrowIosDownOutline } from '../../assets/icons/components'
import { cn } from '../../utils'

export type SelectProps = {
  className?: string
  error?: string
  icon?: React.ReactNode
  id?: string
  label?: string
  maxWidth?: string
  placeholder?: string
  responsive?: boolean
  width?: string
} & SelectPrimitive.SelectProps

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      children,
      className,
      error,
      icon,
      id,
      label,
      maxWidth,
      open,
      placeholder,
      required,
      responsive = false,
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
        <SelectPrimitive.Root {...props} open={open}>
          <SelectPrimitive.Trigger
            className={cn(
              'flex justify-between',
              'outline-offset-0 outline-none',
              'px-3 py-[6px] text-md',
              'active:outline-none',
              'data-[placeholder]:text-light-900',
              'focus:outline-primary-500 focus:outline-2',
              'data-[state="open"]:rounded-b-none',
              'data-[disabled]:data-[placeholder]:text-dark-100',
              'transition-[outline-color] delay-75',
              'group',
              responsive
                ? [
                    'md:border rounded-sm ',
                    'data-[state="open"]:md:bg-dark-500 data-[state="open"]:md:border-light-100',
                  ]
                : [
                    'border',
                    'data-[state="open"]:bg-dark-500 data-[state="open"]:border-light-100',
                  ],
              error && 'border-danger-500'
            )}
            id={id ?? selectId}
            ref={ref}
          >
            <div className={`flex gap-3 align-center ${responsive && s.selectValue}`}>
              {icon}
              <SelectPrimitive.Value className={`text-light-100`} placeholder={placeholder} />
            </div>
            <SelectPrimitive.Icon className={'ml-2'}>
              <ArrowIosDownOutline
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
                'border border-light-100 border-t-0 mt-0 rounded-sm rounded-b-sm',
                'bg-dark-500 w-[var(--radix-select-trigger-width)]',
                'z-[31] max-h-[300px] overflow-hidden overflow-y-auto',
                responsive && [
                  'border md:border-light-100 md:border-t-0 mt-1 md:mt-0 rounded-sm md:rounded-b-sm w-auto md:w-[var(--radix-select-trigger-width)]',
                ]
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
          'global-hover:hover:text-primary-500 global-hover:hover:bg-dark-300 global-hover:hover:outline-none',
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
