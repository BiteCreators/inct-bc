import { useState } from 'react'

import { Followers } from '@/features/user/followers/ui/Followers'
import { TabsBase } from '@packages/shared/ui'

type TabValues = 'followers' | 'following' | 'payments' | 'uploaded-photos'

type Props = {}

export const CurrentUserTabs = ({}: Props) => {
  const [selectedTab, setSelectedTab] = useState<TabValues>('uploaded-photos')

  return (
    <TabsBase<TabValues>
      ariaLabel={'profile management tabs'}
      onClick={value => setSelectedTab(value)}
      tabsData={[
        {
          content: <div>Uploaded photos</div>,
          label: 'Uploaded photos',
          value: 'uploaded-photos',
        },
        {
          content: <div>Payments</div>,
          label: 'Payments',
          value: 'payments',
        },
        {
          content: <Followers />,
          label: 'Followers',
          value: 'followers',
        },
        {
          content: <div>Following</div>,
          label: 'Following',
          value: 'following',
        },
      ]}
      value={selectedTab}
    />
  )
}
