import React from 'react'

import { BookmarkOutline, HeartOutline, PaperPlaneOutline } from '@/common/assets/icons/components'
import { Typography } from '@/common/ui'
import { Post } from '@/pages/profile/[id]'

type Props = {
  post: Post
}

export const PostEngagementBlock = ({ post }: Props) => {
  return (
    <div className={'border-y-[1px] border-dark-100 relative'}>
      <div className={'pt-4 px-6'}>
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
        <div className={'mb-2'}>
          {/*--------LIKES-----------*/}
          <p>Likes</p>
          {/*------------------------*/}
          <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
            {post.createdAt}
          </Typography>
        </div>
      </div>
    </div>
  )
}
