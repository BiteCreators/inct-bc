import { useState } from 'react'

import { TabsBase } from '@/common/ui'

type TabValues = 'account-management' | 'devices' | 'general-information' | 'my-payments'

export const ProfileManagementTabs = () => {
  const [selectedTab, setSelectedTab] = useState<TabValues>('general-information')

  return (
    <TabsBase<TabValues>
      ariaLabel={'profile management tabs'}
      onClick={value => setSelectedTab(value)}
      tabsData={[
        { content: <div>1</div>, label: 'General information', value: 'general-information' },
        { content: <div>2</div>, label: 'Devices', value: 'devices' },
        { content: <div>3</div>, label: 'Account management', value: 'account-management' },
        { content: <div>4</div>, label: 'My payments', value: 'my-payments' },
      ]}
      value={selectedTab}
    />
  )
}
