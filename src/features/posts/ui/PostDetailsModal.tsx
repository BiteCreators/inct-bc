import React from 'react'

import {
  BookmarkOutline,
  Close,
  HeartOutline,
  PaperPlaneOutline,
} from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { Avatar, Dropdown, Modal, ScrollArea, Typography } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'
import { AddPostTextarea } from '@/features/posts/ui/AddPostTextarea'
import { PostComment } from '@/features/posts/ui/PostComment'
import * as Dialog from '@radix-ui/react-dialog'

import exampleAvatar from '../../../../public/examples/exampleAvatar.png'

type Props = {}

const slides = [
  'https://i1.sndcdn.com/artworks-nO3R0izz9UnXtHhQ-z1R29Q-t500x500.jpg',
  'https://i1.sndcdn.com/artworks-000066235753-ysrir2-t500x500.jpg',
  'https://i1.sndcdn.com/artworks-000022548343-t02iuc-t500x500.jpg',
]

export const PostDetailsModal = ({}: Props) => {
  return (
    <Modal className={'w-full'} isOpen maxWidth={'max-w-[980px]'} mode={'custom'}>
      <div className={'flex'}>
        <Slider height={'full'} sliderStyles={'max-w-[500px]'} slidesUrl={slides} />
        <>
          {/*HEADER*/}
          <Dialog.Close
            className={cn('absolute -top-14 -right-14 m-5 focus:outline-none cursor-pointer')}
          >
            <Close className={cn('fill-current text-light-100')} />
          </Dialog.Close>
          {/*----------*/}
          <div className={'max-w-[480px] max-h-[564px] flex flex-col overflow-hidden'}>
            {/*TITLE*/}
            <Dialog.Title className={cn('text-xl font-bold py-3 px-6')}>
              <div className={'flex justify-between w-full'}>
                <div className={'flex max-h-9 py-0 gap-3 items-center'}>
                  <div className={'flex items-center pt-2'}>
                    <Avatar avatarURL={exampleAvatar.src} imgStyles={'w-9 h-9 object-cover'} />
                  </div>
                  <Typography variant={'h2'}>URLProfile</Typography>
                </div>
                <Dropdown className={'-top-0.5 -mr-3'} items={[]} />
              </div>
            </Dialog.Title>
            <div className={'border-y-[1px] border-dark-100'} />
            {/*----------*/}
            {/* Scrollable Content Area */}
            <ScrollArea className={'flex-1 px-6 w-full'}>
              <div className={'flex flex-col pt-5 gap-5'}>
                {/* Comments */}
                <div>
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                  <PostComment />
                </div>
              </div>
            </ScrollArea>
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
                  <p>Likes</p>
                  <Typography className={'text-light-900 font-weight600'} variant={'small-text'}>
                    July 3, 2021
                  </Typography>
                </div>
              </div>
            </div>
            <AddPostTextarea />
          </div>
        </>
      </div>
    </Modal>
  )
}
