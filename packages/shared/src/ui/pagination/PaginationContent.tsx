import React, { forwardRef } from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'
import { motion } from 'framer-motion'

import { ArrowIosDownOutline } from '../../assets/icons/components'
import { cn } from '../../utils'

type MainPaginationButtonsProps = {
  currentPage: number
  onClick: (pageNumber: number) => () => void
  paginationRange: (number | string)[]
}
export const MainPaginationButtons = ({
  currentPage,
  onClick,
  paginationRange,
}: MainPaginationButtonsProps) => {
  return (
    <>
      {paginationRange.map((page: number | string, index: number) => {
        if (typeof page !== 'number') {
          return <PaginationEllipsis key={index} />
        }

        return (
          <PaginationButton
            isSelected={page === currentPage}
            key={index}
            onClick={onClick(page)}
            page={page}
          />
        )
      })}
    </>
  )
}
type PaginationButtonProps = {
  isSelected?: boolean
  onClick: () => void
  page: number
} & React.ComponentProps<'button'>

export const PaginationButton = ({
  className,
  isSelected,
  onClick,
  page,
}: PaginationButtonProps) => {
  return (
    <button
      className={cn(
        'w-6 h-6 rounded-sm ml-3 box-content text-center active:bg-light-100 active:text-dark-900',
        isSelected && 'bg-light-100 text-dark-900',
        !isSelected &&
          'hover:bg-dark-500 focus:border-primary-700 focus:border-2 focus:outline-none',
        className
      )}
      onClick={onClick}
    >
      {page}
    </button>
  )
}

export const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span className={cn('h-6 w-6 ml-3 text-center', className)} {...props}>
    ...
  </span>
)
type SelectPagesPortionProps = {
  className?: string
} & SelectPrimitive.SelectProps

export const SelectPagesPortion = forwardRef<HTMLButtonElement, SelectPagesPortionProps>(
  ({ children, className, defaultValue, ...props }: SelectPagesPortionProps, ref) => {
    return (
      <SelectPrimitive.Root {...props} defaultValue={defaultValue}>
        <SelectPrimitive.Trigger
          className={cn(
            'group inline-flex box-border',
            'min-h-[24px] min-w-[52px]',
            'items-center border border-dark-300',
            'justify-center gap-[5px]',
            'rounded bg-dark-500',
            'pl-1 pr-0.5 text-sm',
            'text-light-100 outline-none',

            className
          )}
          ref={ref}
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon>
            <ArrowIosDownOutline
              className={cn(
                'fill-current text-light-100',
                'group-[[data-state="open"]]:rotate-180',
                'transition-transform delay-100'
              )}
              height={'16'}
              viewBox={'0 0 24 24'}
              width={'16'}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            asChild
            className={cn(
              'border border-dark-300 border-t-0 mt-0 rounded-sm rounded-b-sm',
              'bg-dark-500 w-[var(--radix-select-trigger-width)]',
              'z-10'
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
    )
  }
)

export const SelectPortion = forwardRef<HTMLDivElement, SelectPrimitive.SelectItemProps>(
  ({ children, className, ...props }: SelectPrimitive.SelectItemProps, ref) => {
    return (
      <SelectPrimitive.Item
        className={cn('outline-none text-sm pl-1 text-light-100 hover:bg-dark-100', className)}
        {...props}
        ref={ref}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
  }
)
