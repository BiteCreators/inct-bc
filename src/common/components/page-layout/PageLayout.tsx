import React from 'react'

import { cn } from '@/common/utils/cn'

import { ScrollArea } from '../scroll/ScrollArea'

type Props = {
  children?: React.ReactNode
  footer?: React.ReactNode
  header?: React.ReactNode
  mainClassName?: string
  sidebar?: React.ReactNode
}

export const PageLayout = ({ children, footer, header, mainClassName, sidebar }: Props) => {
  return (
    <div className={cn('min-h-[100vh]')}>
      {!!header && <div className={'sticky top-0'}>{header}</div>}
      <ScrollArea className={'h-[calc(100vh-60px)] flex flex-col'}>
        <div className={cn('flex-grow ', !!sidebar && 'grid grid-cols-[220px_1fr]')}>
          {!!sidebar && <div className={'sticky top-0 left-0 self-start'}>{sidebar}</div>}
          <main className={cn('mt-9', mainClassName)}>{children}</main>
        </div>
        {!!footer && <div>{footer}</div>}
      </ScrollArea>
    </div>
  )
}
