import React from 'react'

import { Close } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { Modal } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'
import { Post } from '@/entities/posts'
import { AddCommentTextarea } from '@/features/comments'
import { PostActionsBlock } from '@/features/posts'
import * as Dialog from '@radix-ui/react-dialog'

import { PostDescriptionCommentsMap } from '../PostDescriptionCommentsMap'
import { PostModalTitle } from './PostModalTitle'

type Props = {
  comments: { id: string; text: string }[]
  post: Post
  slidesUrl: string[]
}

export const PostDesktop = ({ comments, post, slidesUrl }: Props) => {
  return (
    <Modal
      className={cn(['w-full border-x-8 border-dark-900', 'lg-md:border-none'])}
      isOpen
      maxWidth={'max-w-[980px]'}
      mode={'custom'}
    >
      <div className={cn(['flex flex-row'])}>
        <Slider
          height={'full'}
          sliderStyles={'max-w-[500px] min-w-[390px]'}
          slidesUrl={slidesUrl}
        />
        <>
          <Dialog.Close
            className={cn(
              'absolute m-5 focus:outline-none cursor-pointer invisible',
              'lg-md:-top-14 lg-md:-right-14',
              'md:visible'
            )}
          >
            <Close className={cn('fill-current text-light-100')} />
          </Dialog.Close>
          <div className={'max-w-[480px] max-h-[564px] flex flex-col overflow-hidden'}>
            <PostModalTitle post={post} />
            <div className={'border-y-[1px] border-dark-100'} />
            <PostDescriptionCommentsMap comments={comments} post={post} />
            <PostActionsBlock post={post} />
            <AddCommentTextarea />
          </div>
        </>
      </div>
    </Modal>
  )
}
