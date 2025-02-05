import React from 'react'

import { Like } from '@/entities/posts/types/likes.types'
import { Avatar } from '@byte-creators/ui-kit'

type Props = {
  items: Like[]
}

export const LikesAvatars = ({ items }: Props) => {
  const avatarsToShow = items.slice(0, 3)

  return (
    <div className={'flex mr-5'}>
      {avatarsToShow.map((item, index) => (
        <Avatar
          avatarURL={item.avatars[0].url}
          imgStyles={'w-6'}
          key={item.avatars[0].url}
          linkContainerClassname={items.length > 1 ? '-mr-2' : ''}
        />
      ))}
    </div>
  )
}
