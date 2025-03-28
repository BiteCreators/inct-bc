import { useEffect } from 'react'

import { Personalization } from '@/features/personalization'
import { LocationsProps } from '@/pages/profile/[id]/settings'
import { TabsBase } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const EditProfileForm = dynamic(
  () => import('@/features/edit-profile').then(mod => mod.EditProfileForm),
  { ssr: true }
)

const AccountManagement = dynamic(
  () => import('@/features/payments').then(mod => mod.AccountManagement),
  { ssr: true }
)

const CurrentDevice = dynamic(() => import('@/features/devices').then(mod => mod.CurrentDevice), {
  ssr: true,
})
const SessionsList = dynamic(() => import('@/features/devices').then(mod => mod.SessionsList), {
  ssr: true,
})
const MyPayments = dynamic(
  () => import('@/features/payments/ui/MyPayments').then(mod => mod.MyPayments),
  { ssr: true }
)

type TabValues =
  | 'account-management'
  | 'devices'
  | 'general-information'
  | 'my-payments'
  | 'personalization'

export const ProfileSettingsTabs = ({ cities, countries }: LocationsProps) => {
  const tNav = useScopedTranslation('Navigation')
  const tPers = useScopedTranslation('Personalization')
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
    if (router.query.tab) {
      if (router.query.tab.includes('success=true')) {
        router.push(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              success: true,
              tab: 'account-management',
            },
          },
          undefined,
          { shallow: true }
        )
      }
      if (router.query.tab.includes('success=false')) {
        console.error('Transaction failed, please try again')
      }
    }
  }, [router.query.tab])

  return (
    <TabsBase<TabValues>
      ariaLabel={'profile management tabs'}
      onClick={handleTabChange}
      tabsData={[
        {
          content: <EditProfileForm cities={cities} countries={countries} />,
          label: tNav.generalInfo,
          value: 'general-information',
        },
        {
          content: (
            <div className={'flex flex-col gap-[18px]'}>
              <CurrentDevice />
              <SessionsList />
            </div>
          ),
          label: tNav.devices,
          value: 'devices',
        },
        {
          content: <AccountManagement />,
          label: tNav.accountManagement,
          value: 'account-management',
        },
        {
          content: <MyPayments />,
          label: tNav.myPayments,
          value: 'my-payments',
        },
        {
          content: <Personalization />,
          label: tPers.personalization,
          value: 'personalization',
        },
      ]}
      value={selectedTab}
    />
  )
}
