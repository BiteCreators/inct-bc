import React from 'react'

import {
  CopyOutline,
  Edit2Outline,
  PersonAddOutline,
  PersonRemoveOutline,
  TrashOutline,
} from '@/common/assets/icons/components'
import { Alert, Dropdown } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'
import { DropdownItem } from '@/common/ui/dropdown/Dropdown'
import { MeResponse } from '@/entities/auth/api/auth.api'
import { Post } from '@/entities/posts'
import { Profile } from '@/entities/profile'
import { useFollowers } from '@/features/followers/model/useFollowers'
import { useDropdownPost } from '@/features/posts/model/useDropdownPost'

type Props = {
  changeEditMode: (e: boolean) => void
  className?: string
  currentUser: MeResponse | undefined
  isMyPost: boolean
  post: Post
  profile: Profile
}

export const DropdownPost = ({
  changeEditMode,
  className,
  currentUser,
  isMyPost,
  profile,
}: Props) => {
  const { apiError: apiErrorFollow, handleFollow, isFollow } = useFollowers(profile, currentUser)

  const forDrop: DropdownItem[] = []
  const {
    apiError: apiErrorRemovePost,
    confirmOpen,
    copyLinkHandler,
    deletePostHandler,
    handleConfirm,
    handleReject,
    setConfirmOpen,
    t,
  } = useDropdownPost()

  if (isMyPost) {
    forDrop.push(
      {
        icon: <Edit2Outline />,
        label: t.editPost,
        onClick: () => {
          changeEditMode(true)
        },
      },
      { icon: <TrashOutline />, label: t.deletePost, onClick: deletePostHandler }
    )
  } else {
    if (isFollow) {
      forDrop.push({
        icon: <PersonRemoveOutline />,
        label: t.unfollow,
        onClick: handleFollow,
      })
    } else {
      forDrop.push({
        icon: <PersonAddOutline />,
        label: t.follow,
        onClick: handleFollow,
      })
    }
    forDrop.push({
      icon: <CopyOutline className={'w-[23px] h-[23px]'} />,
      label: t.copyLink,
      onClick: copyLinkHandler,
    })
  }

  return (
    <>
      <ActionConfirmation
        isOpen={confirmOpen}
        message={'Are you sure you want to delete this post?'}
        onConfirm={handleConfirm}
        onReject={handleReject}
        setIsOpen={setConfirmOpen}
        title={'Delete Post'}
      />
      <Dropdown className={className} items={forDrop} />
      {(apiErrorRemovePost || apiErrorFollow) && (
        <Alert
          className={'z-50'}
          message={apiErrorRemovePost || apiErrorFollow}
          portal
          purpose={'toast'}
          type={'error'}
        />
      )}
    </>
  )
}
