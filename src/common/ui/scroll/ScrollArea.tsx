import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/common/lib/utils/cn'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { ScrollBar } from './ScrollBar'

export const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  { orientation?: 'horizontal' | 'vertical' } & ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.Root
  >
>(({ children, className, orientation = 'vertical', ...props }, ref) => {
  return (
    <ScrollAreaPrimitive.Root
      className={cn('relative overflow-hidden', className)}
      ref={ref}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className={'h-full w-full rounded'}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation={orientation} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
})
