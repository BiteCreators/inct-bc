import React from 'react'

import { WithFollowersCountUserProfile } from '@/entities/followers'
import { useFollowContext } from '@/features/profile/ui/profile-follow/FollowModalContext'
import { FollowModalItems } from '@/features/profile/ui/profile-follow/FollowModalItems'
import { ActionConfirmation, Modal } from '@byte-creators/ui-kit'

type Props = {
  currentUserProfile: WithFollowersCountUserProfile
  isOpen: boolean
  onClose: () => void
  type: 'followers' | 'following'
}
export const ProfileFollowModal = ({ currentUserProfile, isOpen, onClose, type }: Props) => {
  const {
    confirmOpen,
    currentFollowerName,
    followersList,
    followingList,
    handleConfirm,
    handleReject,
    setConfirmOpen,
  } = useFollowContext()

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
            <FollowModalItems currentUserProfile={currentUserProfile} type={type} />
          )}
        </Modal>
      }
    </>
  )
}
