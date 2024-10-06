import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/common/lib/utils/cn'
import * as ScrollArea from '@radix-ui/react-scroll-area'

export const ScrollBar = forwardRef<
  ElementRef<typeof ScrollArea.ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollArea.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollArea.ScrollAreaScrollbar
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-3 border-l-transparent px-1 py-[inherit] ',
      orientation === 'horizontal' &&
        'h-3 flex-col border-t border-t-transparent py-1 px-[inherit]',
      className
    )}
    orientation={orientation}
    ref={ref}
    {...props}
  >
    <ScrollArea.ScrollAreaThumb
      className={'relative flex-1 rounded-full bg-dark-300 global-hover:hover:bg-light-900'}
    />
  </ScrollArea.ScrollAreaScrollbar>
))
