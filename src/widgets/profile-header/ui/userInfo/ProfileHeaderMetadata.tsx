import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { FollowButton } from '@/widgets/profile-header/ui/userInfo/FollowButton'
import { SendMessageButton } from '@/widgets/profile-header/ui/userInfo/SendMessageButton'
import { useMediaQuery } from '@byte-creators/utils'

type Props = {
  handlerFollowBtn: () => void
  isCommonLoading: boolean
  isFollow: boolean | undefined
  isNotCurrentUser: boolean
  userMetadata: React.ReactNode
}
export const ProfileHeaderMetadata = ({
  handlerFollowBtn,
  isCommonLoading,
  isFollow,
  isNotCurrentUser,
  userMetadata,
}: Props) => {
  const isLargeScreen = useMediaQuery('(min-width: 1066px)')

  return (
    <div>
      {userMetadata}
      {isNotCurrentUser && !isLargeScreen && (
        <div className={'flex gap-3 mb-5 mt-5 sm:mt-0'}>
          {isCommonLoading ? (
            <Skeleton width={100} />
          ) : (
            <FollowButton handlerFollowBtn={handlerFollowBtn} isFollow={isFollow} />
          )}
          <SendMessageButton />
        </div>
      )}
    </div>
  )
}
