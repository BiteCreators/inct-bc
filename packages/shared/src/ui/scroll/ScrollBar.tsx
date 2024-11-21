import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'

import { cn } from '../../utils'

export const ScrollBar = forwardRef<
  ElementRef<typeof ScrollArea.ScrollAreaScrollbar>,
  { scrollbarClassName?: string } & ComponentPropsWithoutRef<typeof ScrollArea.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', scrollbarClassName, ...props }, ref) => (
  <ScrollArea.ScrollAreaScrollbar
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-1 border-l-transparent py-[inherit] ',
      orientation === 'horizontal' &&
        'h-3 flex-col border-t border-t-transparent py-1 px-[inherit]',
      className
    )}
    orientation={orientation}
    ref={ref}
    {...props}
  >
    <ScrollArea.ScrollAreaThumb
      className={
        scrollbarClassName +
        'relative flex-1 rounded-full bg-dark-300 global-hover:hover:bg-light-900'
      }
    />
  </ScrollArea.ScrollAreaScrollbar>
))
