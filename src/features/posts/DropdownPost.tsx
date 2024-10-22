import React from 'react'

import { PersonAdd, PersonRemove } from '@/common/assets/icons/components'
import { Dropdown } from '@/common/ui'
import { DropdownItem } from '@/common/ui/dropdown/Dropdown'
import { CopyIcon, DeleteIcon, EditIcon, TrashIcon } from '@storybook/icons'
type callBack = () => void
type Props = {
  className?: string
  follow?: boolean
  isMyPost: boolean
  setEditMode: (mode: boolean) => void
}
export const DropdownPost = ({ className, follow, isMyPost, setEditMode }: Props) => {
  const forDrop: DropdownItem[] = []

  if (isMyPost) {
    forDrop.push(
      {
        icon: <EditIcon />,
        label: 'Edit post',
        onClick: () => {
          setEditMode(true)
        },
      },
      { icon: <TrashIcon />, label: 'Delete post', onClick: () => {} }
    )
  } else {
    if (follow) {
      forDrop.push({ icon: <PersonRemove />, label: 'Unfollow', onClick: () => {} })
    } else {
      forDrop.push({ icon: <PersonAdd />, label: 'Follow', onClick: () => {} })
    }
    forDrop.push({ icon: <CopyIcon />, label: 'Copy link', onClick: () => {} })
  }

  return <Dropdown className={className} items={forDrop} />
}
