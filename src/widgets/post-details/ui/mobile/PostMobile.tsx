import React, { ReactNode } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { cn } from '@/common/lib/utils/cn'
import { Avatar, Dropdown, Typography } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'
import { authSlice } from '@/entities/auth'
import { Post } from '@/entities/posts'
import { AddCommentTextarea, MobileCommentsList } from '@/features/comments'
import { PostActionsBlock, PostDescription } from '@/features/posts'

type Props = {
  comments: { id: string; text: string }[]
  post: Post
  slides: ReactNode[]
}

export const PostMobile = ({ comments, post, slides }: Props) => {
  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)

  return (
    <div className={cn(['-my-8 flex flex-col items-center px-4 max-w-[500px] mx-auto'])}>
      <div className={'font-bold py-3 flex justify-between w-full'}>
        <div className={'flex max-h-9 py-0 gap-3 items-center'}>
          <div className={'flex items-center pt-2'}>
            <Avatar avatarURL={post.avatarOwner} imgStyles={'w-9 h-9 object-cover'} />
          </div>
          <Typography variant={'h2'}>{post.userName}</Typography>
        </div>
        <Dropdown className={'-top-0.5 -mr-3'} items={[]} />
      </div>
      <Slider height={'full'} slides={slides} stylesSlider={'max-w-[500px]'} />
      <div className={'max-w-[480px] max-h-[564px] w-full flex flex-col overflow-hidden'}>
        <PostActionsBlock post={post} />
        <div className={cn(['flex-1 w-full px-0', 'md:px-6'])}>
          <div className={cn(['flex flex-col pt-3 gap-5 w-full', !isAuth && 'mb-4'])}>
            <MobileCommentsList comments={comments} description={<PostDescription post={post} />} />
          </div>
        </div>
        {isAuth && <AddCommentTextarea />}
      </div>
    </div>
  )
}
