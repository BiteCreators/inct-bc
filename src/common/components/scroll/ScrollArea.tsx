import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/common/utils/cn'
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { ScrollBar } from './ScrollBar'

export const ScrollAria = forwardRef<
  ElementRef<typeof ScrollArea.Root>,
  { orientation?: 'horizontal' | 'vertical' } & ComponentPropsWithoutRef<typeof ScrollArea.Root>
>(({ children, className, orientation = 'vertical', ...props }, ref) => {
  return (
    <ScrollArea.Root
      className={cn(
        'relative overflow-hidden w-[200px] h-80 py-3 px-3 rounded border-[1px] border-dark-100 bg-dark-500',
        className
      )}
      ref={ref}
      {...props}
    >
      <ScrollArea.Viewport className={'h-full w-full rounded'}>{children}</ScrollArea.Viewport>
      <ScrollBar orientation={orientation} />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
})
