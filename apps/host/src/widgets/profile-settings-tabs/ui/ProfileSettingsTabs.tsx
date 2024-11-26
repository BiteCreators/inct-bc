import { useEffect } from 'react'

import { CurrentDevice, SessionsList } from '@/features/devices'
import { EditProfileForm } from '@/features/edit-profile'
import { AccountManagement, MyPayments } from '@/features/payments'
import { LocationsProps } from '@/pages/profile/[id]/settings'
import { useScopedTranslation } from '@packages/shared/hooks/useTranslation'
import { TabsBase } from '@packages/shared/ui'
import { useRouter } from 'next/router'

type TabValues = 'account-management' | 'devices' | 'general-information' | 'my-payments'

export const ProfileSettingsTabs = ({ cities, countries }: LocationsProps) => {
  const t = useScopedTranslation('Navigation')
  const router = useRouter()
  const selectedTab = (router.query.tab as TabValues) || 'general-information'
  const handleTabChange = (value: TabValues) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          tab: value,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  useEffect(() => {
    if (router.query.success === 'false') {
      console.error('Transaction failed, please try again')
    }
  }, [router.query.success])

  return (
    <TabsBase<TabValues>
      ariaLabel={'profile management tabs'}
      onClick={handleTabChange}
      tabsData={[
        {
          content: <EditProfileForm cities={cities} countries={countries} />,
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
          content: <MyPayments />,
          label: t.myPayments,
          value: 'my-payments',
        },
      ]}
      value={selectedTab}
    />
  )
}
