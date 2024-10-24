import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, forwardRef, useId, useRef } from 'react'

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
      <ScrollAreaPrimitive.Viewport
        className={cn('h-full w-full rounded', orientation === 'horizontal' && 'pb-3')}
        id={'scrollAreaViewport'}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation={orientation} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
})
