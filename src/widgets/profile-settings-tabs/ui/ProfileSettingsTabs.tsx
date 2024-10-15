import { useState } from 'react'

import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { TabsBase } from '@/common/ui'
import { CurrentDevice, SessionsList } from '@/features/devices'
import { EditProfileForm } from '@/features/edit-profile'

type TabValues = 'account-management' | 'devices' | 'general-information' | 'my-payments'

export const ProfileSettingsTabs = () => {
  const [selectedTab, setSelectedTab] = useState<TabValues>('general-information')
  const t = useScopedTranslation('Navigation')

  return (
    <TabsBase<TabValues>
      ariaLabel={'profile management tabs'}
      onClick={value => setSelectedTab(value)}
      tabsData={[
        {
          content: <EditProfileForm />,
          label: 'General information',
          value: 'general-information',
        },
        {
          content: (
            <div className={'flex flex-col gap-[18px]'}>
              <CurrentDevice />
              <SessionsList />
            </div>
          ),
          label: t.devices,
          value: 'devices',
        },
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
