import React, { useState } from 'react'

import { Button, Input, Modal, ScrollArea } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'
import { FollowersResponse, followersApi } from '@/entities/followers'
import { Follower } from '@/entities/followers/types/followers.types'
import { UserProfile } from '@/entities/profile'

import example from '../../../../public/examples/exampleAvatar.png'

type Props = {
  followingList: FollowersResponse
}
export const ProfileFollowingModal = ({ followingList }: Props) => {
  const [remove, { error: removeError, isLoading: removeLoading }] =
    followersApi.useRemoveFollowerMutation()

  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()

  const [currentUserName, setCurrentUserName] = useState('')

  const handleUnfollow = async (userId: number) => {
    const confirmed = await requestConfirmation()

    if (!confirmed) {
      return
    }
    try {
      await remove({ userId }).unwrap()
    } catch (err) {
      //add useHandleApiError
      alert('An error occurred while trying to delete the follower.')
    }
  }

  return (
    <>
      <ActionConfirmation
        isOpen={confirmOpen}
        message={`Do you really want to delete a Following ${currentUserName}?`}
        onConfirm={handleConfirm}
        onReject={handleReject}
        setIsOpen={setConfirmOpen}
        title={'Delete Following'}
      />
      <Modal isOpen maxWidth={'w-[640px]'} mode={'default'} title={'2218 Following'}>
        <div>
          <Input
            className={'w-full max-w-[596px] mt-4 mb-6'}
            inputType={'search'}
            placeholder={'Search'}
          />
          <ScrollArea className={'h-[550px]'}>
            <div className={'mr-2 mt-2'}>
              {followingList.items.map((user: Follower) => (
                <div className={'mb-6 flex justify-between'} key={user.userId}>
                  <UserProfile
                    avatarUrl={user.avatars[0]?.url || example.src}
                    className={'w-72'}
                    profileId={user.userId}
                    userName={user.userName}
                  />
                  {/*isFollowedBy это подписан ли юзер на текущего пользователя*/}
                  {/*isFollowing это подписан ли текущий пользователь на юзера*/}
                  {/*Following это те на которых я подписан*/}
                  {/*Followers это мои подписчики*/}
                  <Button
                    disabled={removeLoading}
                    onClick={() => {
                      setCurrentUserName(user.userName)
                      handleUnfollow(user.userId)
                    }}
                    variant={'outline'}
                  >
                    Unfollow
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </Modal>
    </>
  )
}
