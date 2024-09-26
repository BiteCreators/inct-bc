import React, { ReactNode } from 'react'

import { cn } from '@/common/utils/cn'
import * as Tabs from '@radix-ui/react-tabs'

type Props = {
  ariaLabel: string
  disabled?: boolean
  onClick?: () => void
  tabsData: TabsData[]
  value?: string
  variant?: 'primary' | 'secondary'
}

type TabsData = {
  buttonName: string
  content: ReactNode
  id: string
}

export const TabsBase = ({
  ariaLabel,
  disabled,
  onClick,
  tabsData,
  variant = 'primary',
}: Props) => (
  <Tabs.Root className={cn('flex flex-col w-full min-w-[300px]')}>
    <Tabs.List aria-label={ariaLabel} className={'shrink-0 flex'}>
      {tabsData.map(tab => (
        <Tabs.Trigger
          className={cn(
            'mb-1 flex-1 flex items-center justify-center h-[33px]',
            'text-md font-weight-600 font-primary text-primary-500',
            'border-b-2 border-primary-700',
            'cursor-pointer focus:outline outline-primary-700',
            'focus:rounded-sm',
            !disabled && 'active:bg-[#101722]',
            !disabled && 'hover:bg-[#0A0E14]',
            variant === 'secondary' && 'text-dark-100 border-dark-100',
            disabled && 'opacity-60 cursor-default hover:bg-transparent'
          )}
          disabled={disabled}
          key={tab.id}
          onClick={onClick}
          value={tab.id}
        >
          {tab.buttonName}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
    {tabsData.map(tab => (
      <Tabs.Content className={'p-4'} key={tab.id} value={tab.id}>
        {tab.content}
      </Tabs.Content>
    ))}
  </Tabs.Root>
)
