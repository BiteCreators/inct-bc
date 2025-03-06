import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { selectUserId } from '@/entities/auth/model/auth.slice'
import { Comment } from '@/entities/comments/types/comments.types'
import { PostComment } from '@/features/comments'
import { Button } from '@byte-creators/ui-kit'
import { cn } from '@byte-creators/utils'
import Link from 'next/link'

type Props = {
  comments?: Comment[]
  description: React.ReactNode
  handleAnswerClick: (data: { commentId: number; postId: number; userName: string }) => void
  isLoading?: boolean
  mobile?: boolean
  showViewAllButton?: boolean
  skeletonLength?: number
}

export const CommentsList = ({
  comments,
  description,
  handleAnswerClick,
  isLoading = false,
  mobile = false,
  showViewAllButton = false,
  skeletonLength = 3,
}: Props) => {
  const currentUserId = useAppSelector(selectUserId)

  const skeletonComments = Array.from({ length: skeletonLength }).map((_, index) => (
    <SkeletonTheme baseColor={'#3f3e3e'} highlightColor={'#575656'} key={index}>
      <div className={'mb-4'}>
        <Skeleton className={'h-6 mb-2'} />
        <Skeleton className={'h-4 w-3/5'} />
      </div>
    </SkeletonTheme>
  ))

  const renderComments = () => {
    if (isLoading) {
      return skeletonComments
    }

    if (!currentUserId) {
      return (
        <span>
          Please{' '}
          <Link className={'text-primary-300'} href={'/auth/sign-in'}>
            Log In
          </Link>{' '}
          to see comments
        </span>
      )
    }

    if (!comments || comments.length === 0) {
      return 'No comments'
    }

    return comments.map(comment => (
      <PostComment comment={comment} handleAnswerClick={handleAnswerClick} key={comment.id} />
    ))
  }

  if (mobile && showViewAllButton && comments && comments.length > 0) {
    return (
      <div className={'max-w-[480px] max-h-[564px] flex flex-col overflow-hidden'}>
        <div className={'flex-1 w-full px-0'}>
          {description}
          <Button className={'pt-0 px-0 border-none text-light-900 text-sm'} variant={'text'}>
            <Link href={`/profile/${currentUserId}/publications/${comments[0]?.postId}/comments`}>
              {`View all comments (${comments.length})`}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  let heightClass = ''

  if (!mobile) {
    heightClass = comments?.length ? 'min-h-[336px]' : 'h-[290px]'
  }

  return (
    <div className={cn(['flex-1 w-full', !mobile && 'px-6'])}>
      <div className={cn(['flex flex-col w-full pt-2 lg:pt-5 pb-2', heightClass])}>
        {description}
        {renderComments()}
      </div>
    </div>
  )
}
