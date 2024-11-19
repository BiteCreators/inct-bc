import React from 'react'

import { Modal } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'
import { WithFollowersCountUserProfile } from '@/entities/followers'
import { UseProfileFollow } from '@/features/profile/model/useProfileFollow'
import { FollowModalItems } from '@/features/profile/ui/profile-follow/FollowModalItems'

type Props = {
  currentUserProfile: WithFollowersCountUserProfile
  isOpen: boolean
  onClose: () => void
  type: 'followers' | 'following'
}
export const ProfileFollowModal = ({ currentUserProfile, isOpen, onClose, type }: Props) => {
  const {
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
    removeLoading,
    setConfirmOpen,
  } = UseProfileFollow(currentUserProfile)

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
          {followingList && followersList && (
            <FollowModalItems
              apiError={apiError}
              currentUserProfile={currentUserProfile}
              followList={type === 'followers' ? followersList : followingList}
              followLoading={followLoading}
              handleConfirmDeleting={handleConfirmDeleting}
              handleFollow={handleFollow}
              removeLoading={removeLoading}
              type={type}
            />
          )}
        </Modal>
      }
    </>
  )
}
