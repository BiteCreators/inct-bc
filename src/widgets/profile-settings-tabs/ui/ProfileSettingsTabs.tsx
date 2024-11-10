import { useState } from 'react'

import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { TabsBase } from '@/common/ui'
import { CurrentDevice, SessionsList } from '@/features/devices'
import { EditProfileForm } from '@/features/edit-profile'
import { AccountManagement } from '@/features/payments'
import { MyPayments } from '@/features/payments/ui/MyPayments'
import { MyPaymentsTest } from '@/features/payments/ui/MyPaymentsTest'

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
          label: t.generalInfo,
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
          content: <AccountManagement />,
          label: t.accountManagement,
          value: 'account-management',
        },
        {
          // content: <MyPayments />,
          content: <MyPaymentsTest />,
          label: t.myPayments,
          value: 'my-payments',
        },
      ]}
      value={selectedTab}
    />
  )
}
