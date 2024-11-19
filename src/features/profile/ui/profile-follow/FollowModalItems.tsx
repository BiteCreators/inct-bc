import React, { useState } from 'react'

import { Alert, Button, Input, ScrollArea, Typography } from '@/common/ui'
import {
  Follower,
  FollowersResponse,
  WithFollowersCountUserProfile,
} from '@/entities/followers/types/followers.types'
import { UserProfile } from '@/entities/profile'

import example from '../../../../../public/examples/exampleAvatar.png'

type Props = {
  apiError: string
  currentUserProfile: WithFollowersCountUserProfile
  followList: FollowersResponse
  followLoading: boolean
  handleConfirmDeleting: (user: Follower) => void
  handleFollow: (userId: number) => Promise<void>
  removeLoading: boolean
  type: 'followers' | 'following'
}
export const FollowModalItems = ({
  apiError,
  currentUserProfile,
  followList,
  followLoading,
  handleConfirmDeleting,
  handleFollow,
  removeLoading,
  type,
}: Props) => {
  const [searchValue, setSearchValue] = useState('')

  const filteredUsers = followList.items.filter(user =>
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
                  <div className={'flex gap-14'}>
                    {currentUserProfile.id !== user.userId && (
                      <>
                        {!user.isFollowing && (
                          <Button
                            disabled={followLoading}
                            onClick={() => handleFollow(user.userId)}
                          >
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
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
