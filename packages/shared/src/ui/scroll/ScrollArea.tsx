import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId, useRef } from 'react'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { cn } from '../../utils'
import { ScrollBar } from './ScrollBar'

export const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  {
    orientation?: 'horizontal' | 'vertical'
    scrollbarClassName?: string
  } & ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ children, className, orientation = 'vertical', scrollbarClassName, ...props }, ref) => {
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
      <ScrollBar orientation={orientation} scrollbarClassName={scrollbarClassName} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
})
