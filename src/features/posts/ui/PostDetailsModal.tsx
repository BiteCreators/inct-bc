import React from 'react'

import { BookmarkOutline, HeartOutline, PaperPlaneOutline } from '@/common/assets/icons/components'
import { Avatar, Dropdown, Modal, Typography } from '@/common/ui'
import { AddPostTextarea } from '@/features/posts/ui/AddPostTextarea'
import { PostComment } from '@/features/posts/ui/PostComment'

import exampleAvatar from '../../../../public/examples/exampleAvatar.png'

type Props = {}

//type Comment = {
//   answerCount: number
//   content: string
//   createdAt: string
//   from: From
//   id: number
//   isLiked: boolean
//   likeCount: number
//   postId: number
// }

export const PostDetailsModal = ({}: Props) => {
  return (
    <Modal
      className={'w-full'}
      isOpen
      mode={'outside'}
      title={
        <div className={'flex justify-between w-full'}>
          <div className={'flex max-h-9 py-0 gap-3 items-center'}>
            <div className={'flex items-center pt-2'}>
              <Avatar avatarURL={exampleAvatar.src} imgStyles={'w-9 h-9 object-cover'} />
            </div>
            <Typography variant={'h2'}>URLProfile</Typography>
          </div>
          <Dropdown className={'-top-0.5 -mr-3'} items={[]} />
        </div>
      }
    >
      <div className={'-mx-2'}>
        {/*comments map here*/}
        <PostComment />
        <PostComment />
      </div>
      <div
        className={'border-y-[1px] border-dark-100 relative'}
        style={{ marginLeft: '-24px', width: 'calc(100% + 48px)' }}
      >
        <div className={'px-4'}>
          <div className={'flex justify-between'}>
            <div className={'mt-4 mb-3'}>
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
    </Modal>
  )
}
