import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { authApi } from '@/entities/auth'
import { profileApi } from '@/entities/profile'
import { useProfileFollow } from '@/features/profile/model/useProfileFollow'
import { ProfileHeaderInformation } from '@/widgets/profile-header/ui/userInfo/ProfileHeaderInformation'
import { ProfileHeaderMetadata } from '@/widgets/profile-header/ui/userInfo/ProfileHeaderMetadata'
import { UserInfoHeader } from '@/widgets/profile-header/ui/userInfo/UserInfoHeader'
import { Alert } from '@byte-creators/ui-kit'
import { useMediaQuery } from '@byte-creators/utils'
import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'next/navigation'

type Props = {
  isLoading: boolean
  userMetadata: React.ReactNode
}
export const UserInfo = ({ isLoading, userMetadata }: Props) => {
  const params = useParams<{ id: string }>()
  const isSuperSmallScreen = useMediaQuery('(max-width: 440px)')
  const { data: profile } = profileApi.useGetPublicProfileQuery(
    params !== null ? { id: Number(params.id) } : skipToken
  )

  const { data: currentUser } = authApi.useMeQuery()

  const isCurrentUserProfile = currentUser?.userId === profile?.id
  const isNotCurrentUser = currentUser !== undefined && currentUser?.userId !== profile?.id

  const {
    error,
    followLoading,
    handleDeleteFollower,
    handleFollow,
    isFollow,
    isFollowingLoading,
    removeLoading,
  } = useProfileFollow({ userName: profile?.userName || '' })
  const isCommonLoading = isLoading || removeLoading || followLoading || isFollowingLoading

  const handlerFollowBtn = () => {
    if (isFollow) {
      handleDeleteFollower(Number(params.id), false)
    } else {
      handleFollow(Number(params.id))
    }
  }

  if (profile) {
    return (
      <div className={'flex-1 text-white'}>
        <UserInfoHeader
          handlerFollowBtn={handlerFollowBtn}
          isCommonLoading={isCommonLoading}
          isCurrentUserProfile={isCurrentUserProfile}
          isFollow={isFollow}
          isLoading={isLoading}
          isNotCurrentUser={isNotCurrentUser}
          profile={profile}
        />

        {!isSuperSmallScreen && (
          <ProfileHeaderMetadata
            handlerFollowBtn={handlerFollowBtn}
            isCommonLoading={isCommonLoading}
            isFollow={isFollow}
            isNotCurrentUser={isNotCurrentUser}
            userMetadata={userMetadata}
          />
        )}

        {isLoading ? (
          <Skeleton count={2} />
        ) : (
          <ProfileHeaderInformation
            handlerFollowBtn={handlerFollowBtn}
            isCommonLoading={isCommonLoading}
            isCurrentUserProfile={isCurrentUserProfile}
            isFollow={isFollow}
            isNotCurrentUser={isNotCurrentUser}
            profile={profile}
            userMetadata={userMetadata}
          />
        )}

        {error && <Alert message={error} type={'error'} />}
      </div>
    )
  }

  return null
}
