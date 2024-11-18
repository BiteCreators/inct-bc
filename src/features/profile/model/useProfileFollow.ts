import { useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'
import { followersApi } from '@/entities/followers'
import { Follower } from '@/entities/followers/types/followers.types'

export const UseProfileFollow = () => {
  const [follow, { isLoading: followLoading }] = followersApi.useFollowMutation()

  const [remove, { isLoading: removeLoading }] = followersApi.useRemoveFollowerMutation()

  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()

  const [currentFollowerName, setCurrentFollowerName] = useState('')
  const [apiError, setApiError] = useState('')
  const { handleApiError } = useHandleApiError('Follows')

  const handleFollow = async (userId: number) => {
    try {
      await follow({ selectedUserId: userId }).unwrap()
    } catch (error) {
      handleApiError({ error, setApiError })
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
      handleApiError({ error, setApiError })
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
    handleConfirm,
    handleConfirmDeleting,
    handleFollow,
    handleReject,
    removeLoading,
    setConfirmOpen,
  }
}
