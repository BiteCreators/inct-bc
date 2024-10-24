import React from 'react'

import { cn } from '@/common/lib/utils/cn'
import { Avatar, Dropdown, Typography } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'
import { AddPostTextarea } from '@/features/posts/ui/post/commonUi/AddPostTextarea'
import { PostEngagementBlock } from '@/features/posts/ui/post/commonUi/PostEngagementBlock'
import { PostDescriptionCommentsBlock } from '@/features/posts/ui/post/mobile/PostDescriptionCommentsBlock'
import { Post } from '@/pages/profile/[id]/publications/[postId]/SinglePostPage'

type Props = {
  comments: { id: string; text: string }[]
  post: Post
  slidesUrl: string[]
}

export const PostMobile = ({ comments, post, slidesUrl }: Props) => {
  return (
    <div className={cn(['-my-8 flex flex-col items-center px-4 max-w-[500px] mx-auto'])}>
      <>
        <div className={'font-bold py-3 flex justify-between w-full'}>
          <div className={'flex max-h-9 py-0 gap-3 items-center'}>
            <div className={'flex items-center pt-2'}>
              <Avatar avatarURL={post.avatarOwner} imgStyles={'w-9 h-9 object-cover'} />
            </div>
            <Typography variant={'h2'}>{post.userName}</Typography>
          </div>
          <Dropdown className={'-top-0.5 -mr-3'} items={[]} />
        </div>
        <Slider height={'full'} sliderStyles={'max-w-[500px]'} slidesUrl={slidesUrl} />
        <>
          <div className={'max-w-[480px] max-h-[564px] w-full flex flex-col overflow-hidden'}>
            <PostEngagementBlock post={post} />
            <div className={cn(['flex-1 w-full px-0', 'md:px-6'])}>
              <div className={'flex flex-col pt-3 gap-5 w-full'}>
                <PostDescriptionCommentsBlock comments={comments} post={post} />
              </div>
            </div>
            <AddPostTextarea />
          </div>
        </>
      </>
    </div>
  )
}
