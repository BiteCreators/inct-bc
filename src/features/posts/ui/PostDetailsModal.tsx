import React from 'react'

import { Close } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { Avatar, Dropdown, Modal, ScrollArea, Typography } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'
import { AddPostTextarea } from '@/features/posts/ui/AddPostTextarea'
import { PostComment } from '@/features/posts/ui/PostComment'
import { PostEngagementBlock } from '@/features/posts/ui/PostEngagementBlock'
import { Post } from '@/pages/profile/[id]'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  post: Post
}

export const PostDetailsModal = ({ post }: Props) => {
  const slidesUrl = post.images.map(image => image.url)

  return (
    <Modal className={'w-full'} isOpen maxWidth={'max-w-[980px]'} mode={'custom'}>
      <div className={'flex'}>
        <Slider height={'full'} sliderStyles={'max-w-[500px]'} slidesUrl={slidesUrl} />
        <>
          {/*HEADER*/}
          <Dialog.Close
            className={cn('absolute -top-14 -right-14 m-5 focus:outline-none cursor-pointer')}
          >
            <Close className={cn('fill-current text-light-100')} />
          </Dialog.Close>
          {/*----------*/}
          {/*--------------------------MAIN--------------------------*/}
          <div className={'max-w-[480px] max-h-[564px] flex flex-col overflow-hidden'}>
            {/*TITLE*/}
            <Dialog.Title className={cn('text-xl font-bold py-3 px-6')}>
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
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
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
}
