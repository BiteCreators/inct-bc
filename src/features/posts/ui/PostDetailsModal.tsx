import React from 'react'

import { Close } from '@/common/assets/icons/components'
import { useMediaQuery } from '@/common/lib/hooks/useMediaQuery'
import { cn } from '@/common/lib/utils/cn'
import { Avatar, Dropdown, Modal, ScrollArea, Typography } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'
import { AddPostTextarea } from '@/features/posts/ui/AddPostTextarea'
import { PostComment } from '@/features/posts/ui/PostComment'
import { PostCommentsBlock } from '@/features/posts/ui/PostCommentsBlock'
import { PostEngagementBlock } from '@/features/posts/ui/PostEngagementBlock'
import { Post } from '@/pages/profile/[id]/publications/[postId]/SinglePostPage'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  post: Post
}

export const PostDetailsModal = ({ post }: Props) => {
  const slidesUrl = post.images.map(image => image.url)
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  if (isLargeScreen) {
    return (
      <Modal className={cn(['w-full'])} isOpen maxWidth={'max-w-[980px]'} mode={'custom'}>
        <div className={cn(['flex flex-row'])}>
          <Slider height={'full'} sliderStyles={'max-w-[500px]'} slidesUrl={slidesUrl} />
          <>
            {/*HEADER*/}
            <Dialog.Close
              className={cn(
                'absolute m-5 focus:outline-none cursor-pointer invisible',
                'lg-md:-top-14 lg-md:-right-14',
                'md:visible'
              )}
            >
              <Close className={cn('fill-current text-light-100')} />
            </Dialog.Close>
            {/*--------*/}
            {/*--------------------------MAIN--------------------------*/}
            <div className={'max-w-[480px] max-h-[564px] flex flex-col overflow-hidden'}>
              {/*TITLE*/}
              <Dialog.Title className={cn('font-bold py-3 px-6')}>
                <div className={'flex justify-between w-full'}>
                  <div className={'flex max-h-9 py-0 gap-3 items-center'}>
                    <div className={'flex items-center pt-2'}>
                      <Avatar avatarURL={post.avatarOwner} imgStyles={'w-9 h-9 object-cover'} />
                    </div>
                    <Typography variant={'h2'}>{post.userName}</Typography>
                  </div>
                  <Dropdown className={'-top-0.5 -mr-3'} items={[]} />
                </div>
              </Dialog.Title>
              <div className={'border-y-[1px] border-dark-100'} />
              {/*----------*/}
              {/* Scrollable Comments Area */}
              <ScrollArea className={'flex-1 px-6 w-full'}>
                <div className={'flex flex-col pt-5 gap-5 h-[336px]'}>
                  {/* Comments*/}
                  <div>
                    <PostCommentsBlock />
                    {/*<PostComment />*/}
                    {/*<PostComment />*/}
                    {/*<PostComment />*/}
                    {/*<PostComment />*/}
                    {/*<PostComment />*/}
                    {/*<PostComment />*/}
                    {/*<PostComment />*/}
                    {/*<PostComment />*/}
                  </div>
                  {/*----------*/}
                </div>
              </ScrollArea>
              {/*---------------------------*/}
              <PostEngagementBlock post={post} />
              <AddPostTextarea />
            </div>
            {/*--------------------------------------------------------*/}
          </>
        </div>
      </Modal>
    )
  } else {
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
          {/*----------*/}
          <Slider height={'full'} sliderStyles={'max-w-[500px]'} slidesUrl={slidesUrl} />
          <>
            {/*--------------------------MAIN--------------------------*/}
            <div className={'max-w-[480px] max-h-[564px] w-full flex flex-col overflow-hidden'}>
              {/* Scrollable Comments Area */}
              {/*---------------------------*/}
              <PostEngagementBlock post={post} />
              <div className={cn(['flex-1 w-full px-0', 'md:px-6'])}>
                <div className={'flex flex-col pt-3 gap-5 w-full'}>
                  {/* Comments*/}
                  <PostCommentsBlock />
                  {/*----------*/}
                </div>
              </div>
              <AddPostTextarea />
            </div>
            {/*--------------------------------------------------------*/}
          </>
        </>
        {/*TITLE*/}
      </div>
    )
  }
}
