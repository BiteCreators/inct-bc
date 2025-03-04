import React from 'react'

import { UserProfile } from '@/entities/followers/types/followers.types'
import { useFollowContext } from '@/features/profile/ui/profile-follow/FollowModalContext'
import { FollowModalItems } from '@/features/profile/ui/profile-follow/FollowModalItems'
import { ActionConfirmation, Modal } from '@byte-creators/ui-kit'

type Props = {
  currentUserProfile: { followers: number; following: number; id: number }
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
    isFollowersLoading,
    isFollowingLoading,
    setConfirmOpen,
  } = useFollowContext()

  //TODO: separate followers and following queries
  if (!isFollowingLoading && !isFollowersLoading) {
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
            className={'sm:m-0 w-[350px] sm:w-[450px] xl:w-[640px]'}
            isOpen={isOpen}
            maxWidth={'max-w-[640px]'}
            mode={'default'}
            onOpenChange={onClose}
            title={type === 'followers' ? `${followers} Followers` : `${following} Following`}
          >
            {followingList && followersList && (
              <FollowModalItems currentUserProfile={currentUserProfile} type={type} />
            )}
          </Modal>
        }
      </>
    )
  }
}
