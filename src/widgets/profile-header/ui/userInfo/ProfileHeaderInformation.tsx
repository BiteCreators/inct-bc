import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { UserProfile } from '@/entities/followers/types/followers.types'
import { AboutUser } from '@/features/profile'
import { FollowButton } from '@/widgets/profile-header/ui/userInfo/FollowButton'
import { SendMessageButton } from '@/widgets/profile-header/ui/userInfo/SendMessageButton'
import { SettingsButton } from '@/widgets/profile-header/ui/userInfo/SettingsButton'
import { useMediaQuery } from '@byte-creators/utils'

type Props = {
  handlerFollowBtn: () => void
  isCommonLoading: boolean
  isCurrentUserProfile: boolean
  isFollow: boolean | undefined
  isNotCurrentUser: boolean
  profile: UserProfile
  userMetadata: React.ReactNode
}
export const ProfileHeaderInformation = ({
  handlerFollowBtn,
  isCommonLoading,
  isCurrentUserProfile,
  isFollow,
  isNotCurrentUser,
  profile,
  userMetadata,
}: Props) => {
  const isLargeScreen = useMediaQuery('(min-width: 1066px)')
  const isSuperSmallScreen = useMediaQuery('(max-width: 440px)')

  return (
    <div>
      {isSuperSmallScreen ? (
        <div className={'mt-12 -ml-[115px]'}>
          <AboutUser className={'mb-5 text-left'} text={profile?.aboutMe || ''} />
          <div className={isCurrentUserProfile ? 'mb-6' : ''}>{userMetadata}</div>
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
          {isCurrentUserProfile && <SettingsButton profile={profile} />}
        </div>
      ) : (
        <AboutUser className={'mt-5 flex text-left'} text={profile?.aboutMe || ''} />
      )}
    </div>
  )
}
