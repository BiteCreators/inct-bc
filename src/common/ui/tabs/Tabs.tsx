import React, { ReactNode } from 'react'

import { cn } from '@/common/lib/utils/cn'
import * as Tabs from '@radix-ui/react-tabs'

type Props = {
  ariaLabel: string
  disabled?: boolean
  onClick?: (value: string) => void
  tabsData: TabsData[]
  value: string
}

type TabsData = {
  buttonName: string
  content: ReactNode
  id: string
}

export const TabsBase = ({ ariaLabel, disabled, onClick, tabsData, value }: Props) => (
  <Tabs.Root className={cn('flex flex-col w-full')} onValueChange={onClick} value={value}>
    <Tabs.List aria-label={ariaLabel} className={'shrink-0 flex'}>
      {tabsData.map(tab => (
        <Tabs.Trigger
          className={cn(
            'flex-1 flex items-center justify-center h-[33px] rounded-sm',
            'text-md font-weight-600 font-primary',
            'cursor-pointer px-6 py-2',
            'hover:bg-[#0A0E14] active:bg-[#1C2431]',
            'focus:outline-none focus:outline-primary-700 outline-offset-0',
            'disabled:cursor-default disabled:hover:bg-transparent',
            'data-[state=active]:text-primary-500 data-[state=active]:border-primary-500',
            'data-[state=inactive]:text-dark-100 data-[state=inactive]:border-dark-100',
            'transition-colors transition-border duration-300 ease-in-out relative',
            'after:content-[""] after:bg-dark-100 after:h-[2px] after:absolute after:w-[calc(100%+4px)]',
            'after:-bottom-0.5 after:-left-[2px] data-[state=active]:after:bg-primary-500 after:-z-20',
            'data-[state=active]:after:-z-10'
          )}
          disabled={disabled}
          key={tab.id}
          value={tab.id}
        >
          {tab.buttonName}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
    {tabsData.map(tab => (
      <Tabs.Content
        className={cn('p-4 transition-opacity duration-300 ease-in-out')}
        key={tab.id}
        value={tab.id}
      >
        {tab.content}
      </Tabs.Content>
    ))}
  </Tabs.Root>
)
