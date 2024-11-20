import { useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { MeResponse } from '@/entities/auth/api/auth.api'
import { followersApi } from '@/entities/followers'
import { Profile } from '@/entities/profile'

export const useFollowers = (profile: Profile, currentUser: MeResponse | undefined) => {
  const [apiError, setApiError] = useState('')
  const { handleApiError } = useHandleApiError('Profile')

  const { data: userProfile } = followersApi.useGetUserProfileQuery({
    userName: profile.userName,
  })
  const { data: follower } = followersApi.useGetFollowersQuery({
    userName: profile.userName,
  })

  const [follow, { isLoading: isLoadingFollow }] = followersApi.useFollowMutation()
  const [unFollow, { isLoading: isLoadingUnFollow }] = followersApi.useRemoveFollowerMutation()

  const isFollow = follower?.items.map(follow => follow.userId).includes(currentUser!.userId)

  const isCurrentUserProfile = currentUser?.userId === profile.id

  const handleFollow = async () => {
    if (!isFollow) {
      try {
        await follow({ selectedUserId: profile.id }).unwrap()
      } catch (error) {
        handleApiError({ error, setApiError })
      }
    } else {
      try {
        await unFollow({ userId: profile.id }).unwrap()
      } catch (error) {
        handleApiError({ error, setApiError })
      }
    }
  }

  return {
    apiError,
    handleFollow,
    isCurrentUserProfile,
    isFollow,
    isLoadingFollow,
    isLoadingUnFollow,
    userProfile,
  }
}
