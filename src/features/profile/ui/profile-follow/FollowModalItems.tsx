import React, { useState } from 'react'

import { authApi } from '@/entities/auth'
import { Follower, WithFollowersCountUserProfile } from '@/entities/followers/types/followers.types'
import { UserProfile } from '@/entities/profile'
import { FollowModalButtons } from '@/features/profile/ui/profile-follow/FollowModalButtons'
import { useFollowContext } from '@/features/profile/ui/profile-follow/FollowModalContext'
import { Alert, Input, ScrollArea, Typography } from '@byte-creators/ui-kit'

import example from '../../../../../public/examples/exampleAvatar.png'

type Props = {
  currentUserProfile: WithFollowersCountUserProfile
  type: 'followers' | 'following'
}
export const FollowModalItems = ({ currentUserProfile, type }: Props) => {
  const { apiError, followersList, followingList } = useFollowContext()

  const followList = type === 'followers' ? followersList : followingList

  const [searchValue, setSearchValue] = useState('')

  if (!followList || !followList.items) {
    return null
  }

  const filteredUsers = followList.items.filter((user: Follower) =>
    user.userName.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <div>
      {followList.items.length === 0 ? (
        <div className={'mr-2 mt-2 h-[550px]'}>
          <Typography variant={'regular-text'}>The list is empty</Typography>
        </div>
      ) : (
        <div>
          <Input
            className={'w-full max-w-[596px] mt-4 mb-6'}
            inputType={'search'}
            onChange={e => setSearchValue(e.target.value)}
            placeholder={'Search'}
            value={searchValue}
          />
          {apiError && <Alert message={apiError} type={'error'} />}
          <ScrollArea className={'h-[550px]'}>
            <div className={'mr-2 mt-2'}>
              {filteredUsers.map((user: Follower) => (
                <div className={'mb-6 flex justify-between'} key={user.userId}>
                  <UserProfile
                    avatarUrl={user.avatars[0]?.url || example.src}
                    className={'w-72'}
                    profileId={user.userId}
                    userName={user.userName}
                  />
                  <FollowModalButtons
                    currentUserProfile={currentUserProfile}
                    type={type}
                    user={user}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
