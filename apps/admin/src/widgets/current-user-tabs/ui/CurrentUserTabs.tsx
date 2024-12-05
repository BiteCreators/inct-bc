import { useState } from 'react'

import { Followers } from '@/features/user/followers'
import { Following } from '@/features/user/following/'
import { Payments } from '@/features/user/payments/'
import { UploadedPhotos } from '@/features/user/uploadedPhotos/'
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
          content: <Followers />,
          label: 'Followers',
          value: 'followers',
        },
        {
          content: <Following />,
          label: 'Following',
          value: 'following',
        },
      ]}
      value={selectedTab}
    />
  )
}
