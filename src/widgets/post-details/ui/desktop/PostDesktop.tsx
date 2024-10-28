import React from 'react'

import { Close } from '@/common/assets/icons/components'
import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { cn } from '@/common/lib/utils/cn'
import { Modal } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'
import { authSlice } from '@/entities/auth'
import { Post } from '@/entities/posts'
import { AddCommentTextarea, DesktopCommentsList } from '@/features/comments'
import { PostActionsBlock, PostDescription } from '@/features/posts'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/router'

import { PostModalTitle } from './PostModalTitle'

type Props = {
  comments: { id: string; text: string }[]
  post: Post
  slidesUrl: string[]
}

export const PostDesktop = ({ comments, post, slidesUrl }: Props) => {
  const router = useRouter()
  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)
  const postWithPic = post.images.length !== 0

  const handleOpenChange = () => {
    router.back()
  }

  return (
    <Modal
      className={cn([
        'w-full border-x-8',
        postWithPic ? 'border-dark-900' : 'border-none',
        'lg-md:border-none',
      ])}
      isOpen
      maxWidth={postWithPic ? 'max-w-[980px]' : ''}
      mode={'custom'}
      onOpenChange={handleOpenChange}
    >
      <div className={cn(['flex flex-row'])}>
        {postWithPic && (
          <Slider
            height={'full'}
            slidesUrl={slidesUrl}
            stylesSlider={'max-w-[500px] min-w-[390px]'}
          />
        )}
        <>
          <Dialog.Close
            className={cn(
              'absolute m-5 focus:outline-none cursor-pointer',
              postWithPic
                ? 'invisible lg-md:-top-14 lg-md:-right-14 md:visible'
                : '-top-14 -right-14'
            )}
          >
            <Close
              className={cn(
                'fill-current rounded-full text-light-100',
                postWithPic && 'bg-dark-100',
                'lg-md:bg-transparent'
              )}
            />
          </Dialog.Close>
          <div className={'max-w-[480px] max-h-[564px] flex flex-col overflow-hidden'}>
            <PostModalTitle post={post} />
            <div className={'border-y-[1px] border-dark-100'} />
            <DesktopCommentsList
              comments={comments}
              description={<PostDescription post={post} />}
            />
            <PostActionsBlock post={post} />
            {isAuth && <AddCommentTextarea />}
          </div>
        </>
      </div>
    </Modal>
  )
}
