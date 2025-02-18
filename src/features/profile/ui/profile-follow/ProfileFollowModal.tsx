import React from 'react'

import { UserProfile } from '@/entities/followers/types/followers.types'
import { useFollowContext } from '@/features/profile/ui/profile-follow/FollowModalContext'
import { FollowModalItems } from '@/features/profile/ui/profile-follow/FollowModalItems'
import { ActionConfirmation, Modal } from '@byte-creators/ui-kit'

type Props = {
  currentUserProfile: UserProfile
  isOpen: boolean
  onClose: () => void
  type: 'followers' | 'following'
}
export const ProfileFollowModal = ({ currentUserProfile, isOpen, onClose, type }: Props) => {
  const {
    confirmOpen,
    currentFollowerName,
    followers,
    followersList,
    following,
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
          title={type === 'followers' ? `${following} Followers` : `${followers} Following`}
        >
          {followingList && followersList && (
            <FollowModalItems currentUserProfile={currentUserProfile} type={type} />
          )}
        </Modal>
      }
    </>
  )
}
