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
import { Post } from '@/entities/posts'
import { useDropdownPost } from '@/features/posts/model/useDropdownPost'

type Props = {
  changeEditMode: (e: boolean) => void
  className?: string
  isMyPost: boolean
  post: Post
}
export const DropdownPost = ({ changeEditMode, className, isMyPost, post }: Props) => {
  const forDrop: DropdownItem[] = []
  const isFollow = false
  const {
    apiError,
    confirmOpen,
    copyLinkHandler,
    deletePostHandler,
    handleConfirm,
    handleReject,
    setConfirmOpen,
  } = useDropdownPost()

  if (isMyPost) {
    forDrop.push(
      {
        icon: <Edit2Outline />,
        label: 'Edit post',
        onClick: () => {
          changeEditMode(true)
        },
      },
      { icon: <TrashOutline />, label: 'Delete post', onClick: deletePostHandler }
    )
  } else {
    if (isFollow) {
      forDrop.push({
        icon: <PersonRemoveOutline />,
        label: 'Unfollow',
        onClick: () => {},
      })
    } else {
      forDrop.push({
        icon: <PersonAddOutline />,
        label: 'Follow',
        onClick: () => {},
      })
    }
    forDrop.push({
      icon: <CopyOutline className={'w-[23px] h-[23px]'} />,
      label: 'Copy link',
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
      {apiError && (
        <Alert className={'z-50'} message={apiError} portal purpose={'toast'} type={'error'} />
      )}
    </>
  )
}
