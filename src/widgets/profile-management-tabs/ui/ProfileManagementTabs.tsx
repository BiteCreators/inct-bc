import { useState } from 'react'

import { TabsBase } from '@/common/ui'
import { SessionsList } from '@/features/devices'

type TabValues = 'account-management' | 'devices' | 'general-information' | 'my-payments'

export const ProfileManagementTabs = () => {
  const [selectedTab, setSelectedTab] = useState<TabValues>('general-information')

  return (
    <TabsBase<TabValues>
      ariaLabel={'profile management tabs'}
      listClassName={'w-max md:w-full h-[35px]'}
      onClick={value => setSelectedTab(value)}
      tabsData={[
        {
          content: <div>general information</div>,
          label: 'General information',
          value: 'general-information',
        },
        { content: <SessionsList />, label: 'Devices', value: 'devices' },
        {
          content: <div>account management</div>,
          label: 'Account management',
          value: 'account-management',
        },
        { content: <div>my paments</div>, label: 'My payments', value: 'my-payments' },
      ]}
      value={selectedTab}
    />
  )
}
