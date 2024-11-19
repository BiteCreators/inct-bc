import React from 'react'

import { Button } from '@/common/ui'
import { Follower, WithFollowersCountUserProfile } from '@/entities/followers/types/followers.types'
import { useFollowContext } from '@/features/profile/ui/profile-follow/FollowModalContext'

type Props = {
  currentUserProfile: WithFollowersCountUserProfile
  type: 'followers' | 'following'
  user: Follower
}

export const FollowModalButtons = ({ currentUserProfile, type, user }: Props) => {
  const { followLoading, handleConfirmDeleting, handleFollow, me, removeLoading } =
    useFollowContext()

  return (
    <div className={'flex gap-14'}>
      {me?.userId !== user.userId && (
        <>
          {!user.isFollowing && (
            <Button disabled={followLoading} onClick={() => handleFollow(user.userId)}>
              Follow
            </Button>
          )}
          {user.isFollowing && (
            <Button
              disabled={removeLoading}
              onClick={() => handleConfirmDeleting(user)}
              variant={'outline'}
            >
              Unfollow
            </Button>
          )}
        </>
      )}
      {currentUserProfile.id === user.userId && type === 'following' && (
        <Button
          disabled={removeLoading}
          onClick={() => handleConfirmDeleting(user)}
          variant={'outline'}
        >
          Unfollow
        </Button>
      )}
    </div>
  )
}
