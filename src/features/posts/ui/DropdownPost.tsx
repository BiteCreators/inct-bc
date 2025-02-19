import React from 'react'

import { Post } from '@/entities/posts'
import { useDropdownPost } from '@/features/posts/model/useDropdownPost'
import { ActionConfirmation, Alert, Dropdown, DropdownItem } from '@byte-creators/ui-kit'
import {
  CopyOutline,
  Edit2Outline,
  PersonAddOutline,
  PersonRemoveOutline,
  TrashOutline,
} from '@byte-creators/ui-kit/icons'

type Props = {
  changeEditMode: (e: boolean) => void
  className?: string
  classNameButton?: string
  isFollow?: boolean
  isMyPost: boolean
  post: Post
}
export const DropdownPost = ({
  changeEditMode,
  className,
  classNameButton,
  isFollow = false,
  isMyPost,
}: Props) => {
  const forDrop: DropdownItem[] = []
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
      {
        icon: <TrashOutline />,
        label: t.deletePost,
        onClick: deletePostHandler,
      }
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
        message={t.deletePostQuestion}
        onConfirm={handleConfirm}
        onReject={handleReject}
        setIsOpen={setConfirmOpen}
        title={t.deletePost}
      />
      <Dropdown className={className} classNameButton={classNameButton} items={forDrop} />
      {apiError && (
        <Alert className={'z-50'} message={apiError} portal purpose={'toast'} type={'error'} />
      )}
    </>
  )
}
