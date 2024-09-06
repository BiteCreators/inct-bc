import React, { ReactNode } from 'react'

import { cn } from '@/common/utils/cn'
import * as Tabs from '@radix-ui/react-tabs'

type Props = {
  children?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  tabsData: TabsData[]
  variant?: 'primary' | 'secondary'
}

type TabsData = {
  buttonName: string
  content: ReactNode
  id: string
}

const baseTriggerClasses =
  'bg-gray-300 h-[33px] flex-1 flex items-center justify-center text-md font-weight600 font-primary ' +
  'text-primary-700 bg-dark-700 border-b-2 border-primary-700 !rounded-none ' +
  'data-[state=active]:bg-primary-100 cursor-pointer hover:bg-primary-900 focus:outline outline-primary-700 mb-1'

export const TabsBase = ({ disabled, onClick, tabsData, variant = 'primary' }: Props) => (
  <Tabs.Root className={'flex flex-col w-[400px]'} defaultValue={tabsData[0].id}>
    <Tabs.List aria-label={'Manage your account'} className={'shrink-0 flex'}>
      {tabsData.map(tab => (
        <Tabs.Trigger
          className={cn(
            baseTriggerClasses,
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
