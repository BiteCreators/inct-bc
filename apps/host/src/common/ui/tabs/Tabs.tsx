import React, { ReactNode } from 'react'

import { cn } from '@/common/lib/utils/cn'
import { ScrollArea } from '@/common/ui'
import * as Tabs from '@radix-ui/react-tabs'

type Props<T extends string> = {
  ariaLabel: string
  className?: string
  disabled?: boolean
  listClassName?: string
  onClick?: (value: T) => void
  tabsData: TabsData<T>[]
  value: string
}

type TabsData<T extends string> = {
  content: ReactNode
  label: string
  value: T
}

export const TabsBase = <T extends string = string>({
  ariaLabel,
  className,
  disabled,
  listClassName,
  onClick,
  tabsData,
  value,
}: Props<T>) => {
  return (
    <Tabs.Root
      className={cn('flex flex-col w-full', className)}
      onValueChange={onClick as (value: string) => void}
      value={value}
    >
      <div className={'mb-6'}>
        <ScrollArea className={''} orientation={'horizontal'}>
          <Tabs.List
            aria-label={ariaLabel}
            className={cn('flex gap-0.5 justify-between p-1', listClassName)}
          >
            {tabsData.map(tab => (
              <Tabs.Trigger
                className={cn(
                  'flex-1 py-1.5 px-2 h-auto cursor-pointer rounded-sm',
                  'text-md text-dark-100 font-weight-600 font-primary hover:text-primary-500',
                  'global-hover:hover:bg-[#0A0E14] active:bg-[#1C2431]',
                  'focus:outline-none focus:outline-primary-700 !outline-offset-0',
                  'disabled:cursor-default disabled:global-hover:hover:bg-transparent',
                  'data-[state=active]:text-primary-500 data-[state=active]:border-primary-500',
                  'data-[state=inactive]:border-dark-100',
                  'transition-colors transition-border duration-300 ease-in-out relative',
                  'after:content-[""] after:bg-dark-100 after:h-[2px] after:absolute after:w-[calc(100%+2px)]',
                  'after:-bottom-0.5 after:left-[-1px] data-[state=active]:after:bg-primary-500',
                  'hover:after:bg-primary-500 after:pointer-events-none text-nowrap md:text-wrap'
                )}
                disabled={disabled}
                key={tab.value}
                value={tab.value}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </ScrollArea>
      </div>
      {tabsData.map(tab => (
        <Tabs.Content
          className={cn('transition-opacity duration-300 ease-in-out')}
          key={tab.value}
          value={tab.value}
        >
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
