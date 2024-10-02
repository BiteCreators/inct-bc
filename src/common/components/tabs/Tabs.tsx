import React, { ReactNode } from 'react'

import { cn } from '@/common/utils/cn'
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
            'hover:bg-[#0A0E14]',
            'active:bg-[#1C2431]',
            'focus:outline-none focus:outline-primary-700 outline-offset-0',
            'disabled:opacity-60 disabled:cursor-default disabled:hover:bg-transparent',
            'data-[state=active]:text-primary-500 data-[state=active]:border-primary-500',
            'data-[state=inactive]:text-dark-100 data-[state=inactive]:border-dark-100',
            'transition-colors transition-border duration-300 ease-in-out',
            'group relative'
          )}
          disabled={disabled}
          key={tab.id}
          value={tab.id}
        >
          {tab.buttonName}
          <div
            className={cn(
              'h-[2px] bg-dark-100 absolute -bottom-0.5 left-[-1px] right-[-1px]',
              'group-data-[state=active]:bg-primary-500'
            )}
          ></div>
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
