import React from 'react'

import { Follower } from '@/entities/followers/types/followers.types'
import { useFollowContext } from '@/features/profile/ui/profile-follow/FollowModalContext'
import { Button } from '@byte-creators/ui-kit'

type Props = {
  currentUserProfile: { followers: number; following: number; id: number }
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
