import React from 'react'

import { postsApi } from '@/common/api/posts.api'
import { PersonAdd, PersonRemove } from '@/common/assets/icons/components'
import { Dropdown } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'
import { DropdownItem } from '@/common/ui/dropdown/Dropdown'
import { CopyIcon, DeleteIcon, EditIcon, TrashIcon } from '@storybook/icons'
import { useParams } from 'next/navigation'

type callBack = () => void
type Props = {
  className?: string
  follow?: boolean
  isMyPost: boolean
  setEditMode: (mode: boolean) => void
}
export const DropdownPost = ({ className, follow, isMyPost, setEditMode }: Props) => {
  const forDrop: DropdownItem[] = []
  const [deletePost] = postsApi.useDeletePostMutation()
  const params = useParams()
  const postId = Number(params?.id) ?? null
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()
  const deletePostHandler = async () => {
    const isConfirmed = await requestConfirmation()

    if (isConfirmed) {
      deletePost({ postId })
    }
  }

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
        icon: <PersonRemove />,
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
      onClick: () => {},
    })
  }

  return (
    <>
      <ActionConfirmation
        isOpen={confirmOpen}
        message={
          'Do you really want to close the edition of the publication? If you close changes won’t be saved'
        }
        onConfirm={handleConfirm}
        onReject={handleReject}
        setIsOpen={setConfirmOpen}
        title={'Close Post'}
      />
      <Dropdown className={className} items={forDrop} />
    </>
  )
}
