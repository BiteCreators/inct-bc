import React from 'react'

import { PersonAdd, PersonRemove } from '@/common/assets/icons/components'
import { Dropdown } from '@/common/ui'
import { DropdownItem } from '@/common/ui/dropdown/Dropdown'
import { CopyIcon, EditIcon } from '@storybook/icons'

type Props = {
  follow?: boolean
  isMyPost: boolean
}
export const DropdownPost = ({ follow, isMyPost }: Props) => {
  const forDrop: DropdownItem[] = []

  if (isMyPost) {
    forDrop.push(
      { icon: <EditIcon />, label: 'Edit post', onClick: () => {} },
      { icon: <CopyIcon />, label: 'Delete post', onClick: () => {} }
    )
  } else {
    if (follow) {
      forDrop.push({ icon: <PersonRemove />, label: 'Unfollow', onClick: () => {} })
    } else {
      forDrop.push({ icon: <PersonAdd />, label: 'Follow', onClick: () => {} })
    }
    forDrop.push({ icon: <CopyIcon />, label: 'Copy link', onClick: () => {} })
  }

  return <Dropdown items={forDrop} />
}
