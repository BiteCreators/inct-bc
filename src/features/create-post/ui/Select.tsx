import React, { forwardRef, useId } from 'react'

import { ExpandOutline } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import * as SelectPrimitive from '@radix-ui/react-select'

type Props = { id?: string } & SelectPrimitive.SelectProps

export const Select = forwardRef<HTMLButtonElement, Props>(
  ({ children, defaultValue, id }, ref) => {
    const selectId = useId()

    return (
      <SelectPrimitive.Root defaultValue={defaultValue}>
        <SelectPrimitive.Trigger
          className={cn(
            'bg-dark-500 bg-opacity-80 p-1.5 focus:outline-0 rounded-sm',
            'hover:text-primary-500 z-100',
            'data-[state="open"]:text-primary-500'
          )}
          id={id ?? selectId}
          ref={ref}
        >
          <ExpandOutline />
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            asChild
            className={cn('min-w-40 p-3 bg-dark-500 bg-opacity-80 z-[51] rounded-sm gap-3')}
            position={'popper'}
            side={'top'}
            sideOffset={2}
          >
            <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
  }
)

type ItemProps = {} & SelectPrimitive.SelectItemProps

export const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ children, className, ...props }: ItemProps, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        className={cn(
          'flex gap-7 justify-between items-center text-light-900 cursor-pointer',
          'hover:text-light-100',
          'data-[state="checked"]:text-light-100'
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </SelectPrimitive.Item>
    )
  }
)
