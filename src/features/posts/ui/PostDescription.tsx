import React from 'react'

import { Post } from '@/entities/posts'
import { Avatar, Typography } from '@byte-creators/ui-kit'
import { useGetRelativeTime, wordWrapping } from '@byte-creators/utils'

type Props = {
  post: Post
  withTime?: boolean
}

export const PostDescription = ({ post, withTime = true }: Props) => {
  const { getRelativeTime } = useGetRelativeTime()
  const relativeTime = getRelativeTime(new Date(post.createdAt).getTime())

  return (
    <div className={'flex mb-4 gap-3 items-start'}>
      <div className={'flex-shrink-0 pt-1'}>
        <Avatar avatarURL={post.avatarOwner} imgStyles={'w-9 h-9 object-cover'} />
      </div>
      <div className={'flex-1'}>
        <Typography variant={'regular-text'}>
          <span className={'text-base font-weight600 leading-5'}>{post.userName} </span>
          {wordWrapping(post.description)}
        </Typography>
        {withTime && (
          <div className={'mt-1 flex gap-3'}>
            <Typography className={'text-light-900'} variant={'small-text'}>
              {relativeTime}
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}
