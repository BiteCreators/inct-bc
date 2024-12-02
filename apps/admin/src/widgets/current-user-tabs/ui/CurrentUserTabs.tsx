import { useState } from 'react'

import { Payments, UploadedPhotos } from '@/features/current-user'
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
          content: <UploadedPhotos />,
          label: 'Uploaded photos',
          value: 'uploaded-photos',
        },
        {
          content: <Payments />,
          label: 'Payments',
          value: 'payments',
        },
        {
          content: <div>Followers</div>,
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
