import React, { ComponentProps } from 'react'

import { cn } from '@/common/utils/cn'
import { Slot } from '@radix-ui/react-slot'

type ButtonProps = {
  asChild?: boolean
  variant?: 'outline' | 'primary' | 'secondary' | 'text'
} & ComponentProps<'button'>

export const Button = ({ asChild, className, variant = 'primary', ...props }: ButtonProps) => {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={cn(
        'font-weight600 w-auto py-1.5 px-4 rounded-sm text-md text-slate-50',
        'disabled:opacity-50',
        'focus:outline-primary-900 focus:outline-2 focus:outline',
        variant === 'primary' && 'bg-primary-500',
        'hover:bg-primary-700',
        'active:bg-primary-900',
        'disabled:bg-primary-500 disabled:hover:bg-primary-500',
        variant === 'secondary' && [
          'bg-dark-300',
          'hover:bg-dark-500',
          'active:bg-dark-600',
          'disabled:bg-dark-300 disabled:hover:bg-dark-300',
        ],
        variant === 'outline' && [
          'bg-none border-primary-500 border text-primary-500',
          'hover:border-primary-700 hover:text-primary-700',
          'disabled:border-primary-500 disabled:text-primary-500 disabled:hover:border-primary-500 disabled:hover:text-primary-500',
        ],
        variant === 'text' && [
          'bg-none text-primary-500',
          'hover:text-primary-700',
          'hover:bg-transparent w-max p-0',
          'disabled:text-primary-500 disabled:hover:text-primary-500',
        ],
        className
      )}
      {...props}
    />
  )
}

export default () => (
  <Slot>
    <div>Hello</div>
  </Slot>
)
