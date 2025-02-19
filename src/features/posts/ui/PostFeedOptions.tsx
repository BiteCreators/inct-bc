import React from 'react'

import { Dropdown } from '@byte-creators/ui-kit'
import {
  CopyOutline,
  MoreHorizontalOutline,
  PersonRemoveOutline,
} from '@byte-creators/ui-kit/icons'

export const PostFeedOptions = () => {
  const items = [
    {
      icon: <PersonRemoveOutline />,
      label: 'Unfollow',
      //onClick: () => {},
    },
    {
      icon: <CopyOutline />,
      label: 'Copy Link',
      //onClick: () => {},
    },
  ]

  return (
    <Dropdown
      className={'absolute top-1 right-0'}
      iconButton={
        <button className={'transition-all duration-300 -m-2 h-6'}>
          <MoreHorizontalOutline />
        </button>
      }
      iconButtonOpen={
        <button className={`text-primary-500 -m-2 h-6`}>
          <MoreHorizontalOutline />
        </button>
      }
      items={items}
    />
  )
}
