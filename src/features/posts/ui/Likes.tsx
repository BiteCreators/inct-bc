import React from 'react'

import { PostLikesResponse } from '@/entities/posts'
import { Typography } from '@byte-creators/ui-kit'
import { cn } from '@byte-creators/utils'

import { LikesAvatars } from './LikesAvatars'

type Props = {
  className?: string
  postLikes?: PostLikesResponse
}

export const Likes = ({ className, postLikes }: Props) => {
  return (
    <div className={cn(['flex', className])}>
      {postLikes?.items && postLikes.items.length > 0 && <LikesAvatars items={postLikes.items} />}
      <div className={cn(['flex pt-1', postLikes?.items?.length === 1 && '-ml-3'])}>
        <Typography variant={'regular-text'}>{postLikes?.totalCount}</Typography>
        <Typography className={'font-bold ml-1'} variant={'regular-text'}>
          &#34;Like&#34;
        </Typography>
      </div>
    </div>
  )
}
