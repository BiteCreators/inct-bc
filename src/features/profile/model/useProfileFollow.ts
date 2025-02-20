import { useState } from 'react'

import { authApi } from '@/entities/auth'
import { followersApi } from '@/entities/followers'
import { Follower, UserProfile } from '@/entities/followers/types/followers.types'
import { useConfirmation } from '@byte-creators/utils'

export const useProfileFollow = (currentUserProfile: { userName: string }) => {
  const [error, setError] = useState<null | string>(null)
  const { data: followingList, isLoading: isFollowingLoading } =
    followersApi.useGetUsersFollowingQuery({
      userName: currentUserProfile.userName,
    })
  const { data: followersList, isLoading: isFollowersLoading } = followersApi.useGetFollowersQuery({
    userName: currentUserProfile.userName,
  })

  const { data: me } = authApi.useMeQuery()
  const [follow, { isLoading: followLoading }] = followersApi.useFollowMutation()

  const [remove, { isLoading: removeLoading }] = followersApi.useRemoveFollowerMutation()

  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()

  const [currentFollowerName, setCurrentFollowerName] = useState('')
  
  const following = followingList?.items.length
  const followers = followersList?.items.length

  const isFollow = followersList?.items.map(item => item.userId).includes(me?.userId || 0)

  const handleFollow = async (userId: number) => {
    try {
      await follow({ selectedUserId: userId }).unwrap()
    } catch (error) {
      setError('follow request error')
    }
  }

  const handleDeleteFollower = async (userId: number, onConfirmed: boolean = true) => {
    if (onConfirmed) {
      const confirmed = await requestConfirmation()

      if (!confirmed) {
        return
      }
    }

    try {
      await remove({ userId }).unwrap()
    } catch (error) {
      setError('unfollow request error')
    }
  }

  const handleConfirmDeleting = (user: Follower) => {
    setCurrentFollowerName(user.userName)
    handleDeleteFollower(user.userId)
  }

  return {
    confirmOpen,
    currentFollowerName,
    error,
    followLoading,
    followers,
    followersList,
    following,
    followingList,
    handleConfirm,
    handleConfirmDeleting,
    handleDeleteFollower,
    handleFollow,
    handleReject,
    isFollow,
    isFollowersLoading,
    isFollowingLoading,
    me,
    removeLoading,
    setConfirmOpen,
  }
}
