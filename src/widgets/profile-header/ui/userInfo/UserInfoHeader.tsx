import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { UserProfile } from '@/entities/followers/types/followers.types'
import { FollowButton } from '@/widgets/profile-header/ui/userInfo/FollowButton'
import { SendMessageButton } from '@/widgets/profile-header/ui/userInfo/SendMessageButton'
import { SettingsButton } from '@/widgets/profile-header/ui/userInfo/SettingsButton'
import { Typography } from '@byte-creators/ui-kit'
import { cn, useMediaQuery } from '@byte-creators/utils'

type Props = {
  handlerFollowBtn: () => void
  isCommonLoading: boolean
  isCurrentUserProfile: boolean
  isFollow: boolean | undefined
  isLoading: boolean
  isNotCurrentUser: boolean
  profile: UserProfile
}
export const UserInfoHeader = ({
  handlerFollowBtn,
  isCommonLoading,
  isCurrentUserProfile,
  isFollow,
  isLoading,
  isNotCurrentUser,
  profile,
}: Props) => {
  const isLargeScreen = useMediaQuery('(min-width: 1066px)')
  const isSuperSmallScreen = useMediaQuery('(max-width: 440px)')

  return (
    <div className={'flex justify-between mb-5 gap-3 sm:gap-5'}>
      <Typography
        className={cn([
          isSuperSmallScreen && 'mt-8',
          'whitespace-break-spaces overflow-hidden text-ellipsis',
        ])}
        variant={isLargeScreen ? 'h1' : 'h2'}
      >
        {isLoading ? <Skeleton width={160} /> : profile?.userName}
      </Typography>

      {!isSuperSmallScreen && isCurrentUserProfile && <SettingsButton profile={profile} />}

      {isNotCurrentUser && isLargeScreen && (
        <div className={'flex gap-3'}>
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
