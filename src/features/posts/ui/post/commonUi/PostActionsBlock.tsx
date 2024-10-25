import React from 'react'

import { BookmarkOutline, HeartOutline, PaperPlaneOutline } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { Typography } from '@/common/ui'
import { Post } from '@/entities/posts'

type Props = {
  post: Post
}

export const PostActionsBlock = ({ post }: Props) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={cn(['border-transparent relative', 'md:border-y-[1px] border-dark-100'])}>
      <div className={cn(['pt-4 px-0', 'md:px-6'])}>
        <div className={'flex justify-between mb-3'}>
          <div>
            <button className={'mr-6'}>
              <HeartOutline />
            </button>
            <button>
              <PaperPlaneOutline viewBox={'0 0 26 26'} />
            </button>
          </div>
          <button>
            <BookmarkOutline viewBox={'0 3 24 24'} />
          </button>
        </div>
        <div className={'mb-3'}>
          {/*--------LIKES-----------*/}
          <p>Likes</p>
          {/*------------------------*/}
          <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
            {formattedDate}
          </Typography>
        </div>
      </div>
    </div>
  )
}
