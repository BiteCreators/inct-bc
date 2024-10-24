import React from 'react'

import { PersonAdd, PersonRemoveOutline } from '@/common/assets/icons/components'
import { Dropdown } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'
import { DropdownItem } from '@/common/ui/dropdown/Dropdown'
import { useDropdownPost } from '@/features/posts/dropdown-post/useDropdownPost'
import { CopyIcon, EditIcon, TrashIcon } from '@storybook/icons'

type Props = {
  className?: string
  follow?: boolean
  isMyPost: boolean
  setEditMode: (mode: boolean) => void
}
export const DropdownPost = ({ className, follow, isMyPost, setEditMode }: Props) => {
  const forDrop: DropdownItem[] = []
  const {
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
        icon: <EditIcon />,
        label: 'Edit post',
        onClick: () => {
          setEditMode(true)
        },
      },
      { icon: <TrashIcon />, label: 'Delete post', onClick: deletePostHandler }
    )
  } else {
    if (follow) {
      forDrop.push({
        icon: <PersonRemoveOutline />,
        label: 'Unfollow',
        onClick: () => {},
      })
    } else {
      forDrop.push({
        icon: <PersonAdd />,
        label: 'Follow',
        onClick: () => {},
      })
    }
    forDrop.push({
      icon: <CopyIcon />,
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
    </>
  )
}
