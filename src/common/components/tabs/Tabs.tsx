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
  <Tabs.Root
    className={cn('flex flex-col w-full min-w-[300px]')}
    onValueChange={onClick}
    value={value}
  >
    <Tabs.List aria-label={ariaLabel} className={'shrink-0 flex'}>
      {tabsData.map(tab => (
        <Tabs.Trigger
          className={cn(
            'mb-1 flex-1 flex items-center justify-center h-[33px]',
            'text-md font-weight-600 font-primary',
            'border-b-2 cursor-pointer',
            'hover:bg-[#0A0E14]',
            'active:bg-[#1C2431]',
            'focus-visible:outline-none focus-visible:border-primary-700',
            'disabled:opacity-60 disabled:cursor-default disabled:hover:bg-transparent',
            'data-[state=active]:text-primary-500 data-[state=active]:border-primary-500',
            'data-[state=inactive]:text-dark-100 data-[state=inactive]:border-dark-100',
            'transition-colors transition-border duration-300 ease-in-out'
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
