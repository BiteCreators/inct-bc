import { useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { authApi } from '@/entities/auth'
import { WithFollowersCountUserProfile, followersApi } from '@/entities/followers'
import { Follower } from '@/entities/followers/types/followers.types'
import { useConfirmation } from '@byte-creators/utils'

export const useProfileFollow = (currentUserProfile: WithFollowersCountUserProfile) => {
  const { data: followingList } = followersApi.useGetUsersFollowingQuery({
    userName: currentUserProfile.userName,
  })
  const { data: followersList } = followersApi.useGetFollowersQuery({
    userName: currentUserProfile.userName,
  })

  const { data: me } = authApi.useMeQuery()

  const [follow, { isLoading: followLoading }] = followersApi.useFollowMutation()

  const [remove, { isLoading: removeLoading }] = followersApi.useRemoveFollowerMutation()

  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()

  const [currentFollowerName, setCurrentFollowerName] = useState('')
  const [apiError, setApiError] = useState('')
  //todo: use handleAPiError

  // const { handleApiError } = useHandleApiError('Follows')

  const handleFollow = async (userId: number) => {
    try {
      await follow({ selectedUserId: userId }).unwrap()
    } catch (error) {
      // handleApiError({ error, setApiError })
    }
  }

  const handleDeleteFollower = async (userId: number) => {
    const confirmed = await requestConfirmation()

    if (!confirmed) {
      return
    }
    try {
      await remove({ userId }).unwrap()
    } catch (error) {
      // handleApiError({ error, setApiError })
    }
  }

  const handleConfirmDeleting = (user: Follower) => {
    setCurrentFollowerName(user.userName)
    handleDeleteFollower(user.userId)
  }

  return {
    apiError,
    confirmOpen,
    currentFollowerName,
    followLoading,
    followersList,
    followingList,
    handleConfirm,
    handleConfirmDeleting,
    handleFollow,
    handleReject,
    me,
    removeLoading,
    setConfirmOpen,
  }
}
