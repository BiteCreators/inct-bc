import React, { ComponentProps } from 'react'

import { cn } from '@/common/utils/cn'

type ButtonProps = {
  variant?: 'outline' | 'primary' | 'secondary' | 'text'
} & ComponentProps<'button'>

export const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'font-weight600 w-auto py-1.5 px-4 rounded-sm text-md text-slate-50 disabled:opacity-50 box-border focus:outline-primary-900 focus:outline-2 focus:outline',
        variant === 'primary' && 'bg-primary-500 active:bg-primary-700 hover:bg-primary-100',
        variant === 'secondary' && 'bg-dark-300 active:bg-dark-500 hover:bg-dark-100',
        variant === 'outline' &&
          'bg-none border-primary-500 border text-primary-500 active:border-primary-700 active:text-primary-700 hover:border-primary-100 hover:text-primary-100',
        variant === 'text' && 'bg-none text-primary-500'
      )}
      {...props}
    />
  )
}
