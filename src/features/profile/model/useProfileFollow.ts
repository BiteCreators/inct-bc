import { useState } from 'react'

import { authApi } from '@/entities/auth'
import { followersApi } from '@/entities/followers'
import { Follower, UserProfile } from '@/entities/followers/types/followers.types'
import { useConfirmation } from '@byte-creators/utils'

export const useProfileFollow = (currentUserProfile: UserProfile) => {
  const { data: followingList, isLoading: isFollowingLoading } =
    followersApi.useGetUsersFollowingQuery({
      userName: currentUserProfile.userName,
    })
  const { data: followersList, isLoading: isFollowersLoading } = followersApi.useGetFollowersQuery({
    userName: currentUserProfile.userName,
  })

  const following = followingList?.items.length
  const followers = followersList?.items.length

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
    followers,
    followersList,
    following,
    followingList,
    handleConfirm,
    handleConfirmDeleting,
    handleFollow,
    handleReject,
    isFollowersLoading,
    isFollowingLoading,
    me,
    removeLoading,
    setConfirmOpen,
  }
}
