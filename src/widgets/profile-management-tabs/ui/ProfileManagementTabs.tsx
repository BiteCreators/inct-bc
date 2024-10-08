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
        { buttonName: 'General information', content: <div>1</div>, id: 'general-information' },
        { buttonName: 'Devices', content: <div>2</div>, id: 'devices' },
        { buttonName: 'Account management', content: <div>3</div>, id: 'account-management' },
        { buttonName: 'My payments', content: <div>4</div>, id: 'my-payments' },
      ]}
      value={selectedTab}
    />
  )
}
