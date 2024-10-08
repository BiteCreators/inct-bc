import React, { ReactNode } from 'react'

import { cn } from '@/common/lib/utils/cn'
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
      <div className={'overflow-x-auto h-full'}>
        <Tabs.List aria-label={ariaLabel} className={cn('shrink-0 flex', listClassName)}>
          {tabsData.map(tab => (
            <Tabs.Trigger
              className={cn(
                'flex md:flex-1 items-center justify-center h-[33px] rounded-sm',
                'text-md font-weight-600 font-primary',
                'cursor-pointer px-2 md:px-6 py-2',
                'global-hover:hover:bg-[#0A0E14] active:bg-[#1C2431]',
                'focus:outline-none focus:outline-primary-700 outline-offset-0',
                'disabled:cursor-default disabled:global-hover:hover:bg-transparent',
                'data-[state=active]:text-primary-500 data-[state=active]:border-primary-500',
                'data-[state=inactive]:text-dark-100 data-[state=inactive]:border-dark-100',
                'transition-colors transition-border duration-300 ease-in-out relative',
                'after:content-[""] after:bg-dark-100 after:h-[2px] after:absolute after:w-[calc(100%+4px)]',
                'after:-bottom-0.5 after:-left-[2px] data-[state=active]:after:bg-primary-500 after:-z-20',
                'data-[state=active]:after:-z-10'
              )}
              disabled={disabled}
              key={tab.value}
              value={tab.value}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>
      {tabsData.map(tab => (
        <Tabs.Content
          className={cn('p-4 transition-opacity duration-300 ease-in-out')}
          key={tab.value}
          value={tab.value}
        >
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
