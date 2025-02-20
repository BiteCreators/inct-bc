import React from 'react'

import { Post } from '@/entities/posts'
import { useLikePost } from '@/features/posts/model/useLikePost'
import { Alert, Typography } from '@byte-creators/ui-kit'
import { cn } from '@byte-creators/utils'

import { ActionButtonGroup } from './ActionButtonGroup'
import { Likes } from './Likes'

type Props = {
  post: Post
}

export const PostActionsBlock = ({ post }: Props) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(post.createdAt))
  const { apiError, handleLike, postLikes } = useLikePost(post)

  return (
    <div className={cn(['border-transparent relative', 'md:border-y-[1px] border-dark-100'])}>
      <div className={cn(['pt-4 px-0', 'md:px-6'])}>
        <ActionButtonGroup className={'m-0 mb-3'} handleLike={handleLike} postLikes={postLikes} />
        <div className={'mb-3'}>
          <Likes className={'mb-2'} postLikes={postLikes} />
          {apiError && (
            <Alert
              canClose={false}
              message={apiError}
              portal={false}
              purpose={'alert'}
              type={'error'}
            />
          )}
          <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
            {formattedDate}
          </Typography>
        </div>
      </div>
    </div>
  )
}
