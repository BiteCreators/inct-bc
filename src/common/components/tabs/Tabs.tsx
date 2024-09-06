import React from 'react'

import { cn } from '@/common/utils/cn'
import * as Tabs from '@radix-ui/react-tabs'

type Props = {
  children?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  value: string
  variant?: 'primary' | 'secondary'
}

const baseTriggerClasses =
  'bg-gray-300 h-[33px] flex-1 flex items-center justify-center text-md font-weight600 font-primary ' +
  'text-primary-700 bg-dark-700 border-b-2 border-primary-700 !rounded-none ' +
  'data-[state=active]:bg-primary-100 cursor-pointer hover:bg-primary-900 focus:outline outline-primary-700 mb-1'

const TabTrigger = ({ children, disabled, onClick, value, variant }: Props) => (
  <Tabs.Trigger
    className={cn(
      baseTriggerClasses,
      variant === 'secondary' && 'text-dark-100 border-dark-100',
      disabled && 'opacity-60'
    )}
    disabled={disabled}
    onClick={onClick}
    value={value}
  >
    {children}
  </Tabs.Trigger>
)

export const TabsBase = ({ children, disabled, onClick, variant = 'primary' }: Props) => (
  <Tabs.Root className={'flex flex-col w-[400px]'} defaultValue={'tab1'}>
    <Tabs.List aria-label={'Manage your account'} className={'shrink-0 flex'}>
      <TabTrigger disabled={disabled} onClick={onClick} value={'tab1'} variant={variant}>
        {children} 1
      </TabTrigger>
      <TabTrigger disabled={disabled} onClick={onClick} value={'tab2'} variant={variant}>
        {children} 2
      </TabTrigger>
      <TabTrigger disabled={disabled} onClick={onClick} value={'tab3'} variant={variant}>
        {children} 3
      </TabTrigger>
    </Tabs.List>
    <Tabs.Content value={'tab1'}>Content 1</Tabs.Content>
    <Tabs.Content value={'tab2'}>Content 2</Tabs.Content>
    <Tabs.Content value={'tab3'}>Content 3</Tabs.Content>
  </Tabs.Root>
)
