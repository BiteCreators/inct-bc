import React from 'react'

import { Alert, Button, Input, Modal, ScrollArea, Typography } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'
import { FollowersResponse, WithFollowersCountUserProfile } from '@/entities/followers'
import { Follower } from '@/entities/followers/types/followers.types'
import { UserProfile } from '@/entities/profile'
import { UseProfileFollow } from '@/features/profile/model/useProfileFollow'

import example from '../../../../public/examples/exampleAvatar.png'

type Props = {
  currentUserProfile: WithFollowersCountUserProfile
  followList: FollowersResponse | undefined
  isOpen: boolean
  onClose: () => void
  type: 'followers' | 'following'
}
export const ProfileFollowModal = ({
  currentUserProfile,
  followList,
  isOpen,
  onClose,
  type,
}: Props) => {
  const {
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
  } = UseProfileFollow()

  return (
    <>
      <ActionConfirmation
        isOpen={confirmOpen}
        message={`Do you really want to delete a Following ${currentFollowerName}?`}
        onConfirm={handleConfirm}
        onReject={handleReject}
        setIsOpen={setConfirmOpen}
        title={'Delete Following'}
      />
      {
        <Modal
          isOpen={isOpen}
          maxWidth={'w-[640px]'}
          mode={'default'}
          onOpenChange={onClose}
          title={
            type === 'followers'
              ? `${currentUserProfile.followersCount} Followers`
              : `${currentUserProfile.followingCount} Following`
          }
        >
          {followList ? (
            <div>
              <Input
                className={'w-full max-w-[596px] mt-4 mb-6'}
                inputType={'search'}
                placeholder={'Search'}
              />
              {apiError && <Alert message={apiError} type={'error'} />}
              <ScrollArea className={'h-[550px]'}>
                <div className={'mr-2 mt-2'}>
                  {followList.items.map((user: Follower) => (
                    <div className={'mb-6 flex justify-between'} key={user.userId}>
                      <UserProfile
                        avatarUrl={user.avatars[0]?.url || example.src}
                        className={'w-72'}
                        profileId={user.userId}
                        userName={user.userName}
                      />
                      <div className={'flex gap-14'}>
                        {type === 'followers' && !user.isFollowing && (
                          <Button
                            disabled={followLoading}
                            onClick={() => handleFollow(user.userId)}
                          >
                            Follow
                          </Button>
                        )}
                        <Button
                          className={type === 'followers' ? 'text-white' : ''}
                          disabled={removeLoading}
                          onClick={() => handleConfirmDeleting(user)}
                          variant={type === 'followers' ? 'text' : 'outline'}
                        >
                          {type === 'followers' ? 'Delete' : 'Unfollow'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div>
              <Typography variant={'regular-text'}>
                No {type === 'followers' ? 'followers' : 'following'}
              </Typography>
            </div>
          )}
        </Modal>
      }
    </>
  )
}
