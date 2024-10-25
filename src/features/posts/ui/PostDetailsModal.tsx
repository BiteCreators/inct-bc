import React, { useState } from 'react'

import {
  BookmarkOutline,
  Close,
  HeartOutline,
  PaperPlaneOutline,
} from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { Avatar, Modal, Typography } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'
import { DropdownPost } from '@/features/posts/dropdown-post/DropdownPost'
import { EditPost } from '@/features/posts/edit-post/ui/EditPost'
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
  const [editMode, setEditMode] = useState<boolean>(false)

  return (
    <>
      <EditPost changeOpen={setEditMode} isOpen={editMode} />
      <Modal className={'w-full'} isOpen={!editMode} maxWidth={'max-w-[960px]'} mode={'custom'}>
        <div className={'flex'}>
          <Slider slidesUrl={slides} />
          <>
            {/*HEADER*/}
            <Dialog.Close
              className={cn('absolute -top-14 -right-14 m-5 focus:outline-none cursor-pointer')}
            >
              <Close className={cn('fill-current text-light-100')} />
            </Dialog.Close>
            {/*----------*/}
            <div className={'max-w-[480px]'}>
              {/*TITLE*/}
              <Dialog.Title className={cn('text-xl font-bold py-3 px-6')}>
                <div className={'flex justify-between w-full'}>
                  <div className={'flex max-h-9 py-0 gap-3 items-center'}>
                    <div className={'flex items-center pt-2'}>
                      <Avatar avatarURL={exampleAvatar.src} imgStyles={'w-9 h-9 object-cover'} />
                    </div>
                    <Typography variant={'h2'}>URLProfile</Typography>
                  </div>
                  <DropdownPost
                    className={'-top-0.5 -mr-3 z-50'}
                    isMyPost
                    setEditMode={setEditMode}
                  />
                  {/*<Dropdown className={'-top-0.5 -mr-3'} items={[]} />*/}
                </div>
              </Dialog.Title>
              {/*----------*/}
              <div>
                <div className={cn('h-px bg-dark-100 w-full')} />
                <div className={'pt-5 px-6'}>
                  {/*comments map here*/}
                  <PostComment />
                  <PostComment />
                </div>
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
                      <Typography
                        className={'text-light-900 font-weight600'}
                        variant={'small-text'}
                      >
                        July 3, 2021
                      </Typography>
                    </div>
                  </div>
                </div>
                <AddPostTextarea />
              </div>
            </div>
          </>
        </div>
      </Modal>
    </>
  )
}
