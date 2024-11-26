import React from 'react'

import {
  CopyOutline,
  Edit2Outline,
  PersonAddOutline,
  PersonRemoveOutline,
  TrashOutline,
} from '@packages/shared/assets/icons/components'
import { Alert, Dropdown } from '@packages/shared/ui'
import { ActionConfirmation } from '@packages/shared/ui/action-confirmation/ActionComfiirmation'
import { DropdownItem } from '@packages/shared/ui/dropdown/Dropdown'
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
        onClick: () => {},
      })
    } else {
      forDrop.push({
        icon: <PersonAddOutline />,
        label: t.follow,
        onClick: () => {},
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
      {apiError && (
        <Alert className={'z-50'} message={apiError} portal purpose={'toast'} type={'error'} />
      )}
    </>
  )
}
