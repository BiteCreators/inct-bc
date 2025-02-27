import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { selectUserId } from '@/entities/auth/model/auth.slice'
import { Comment } from '@/entities/comments/types/comments.types'
import { PostComment } from '@/features/comments'
import { ScrollArea } from '@byte-creators/ui-kit'
import Link from 'next/link'

type Props = {
  comments?: Comment[]
  description: React.ReactNode
  handleAnswerClick: (data: { commentId: number; postId: number; userName: string }) => void
  isLoading?: boolean
}

export const DesktopCommentsList = ({
  comments,
  description,
  handleAnswerClick,
  isLoading = false,
}: Props) => {
  const currentUserId = useAppSelector(selectUserId)

  const skeletonComments = Array.from({ length: 3 }).map((_, index) => (
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
    if (comments && comments.length > 0) {
      return comments.map(comment => (
        <PostComment comment={comment} handleAnswerClick={handleAnswerClick} key={comment.id} />
      ))
    }

    return currentUserId ? (
      <span>No comments</span>
    ) : (
      <span>
        Please{' '}
        <Link className={'text-primary-300'} href={'/auth/sign-in'}>
          Log In
        </Link>{' '}
        to see comments
      </span>
    )
  }

  return (
    <ScrollArea className={'flex-1 px-6 w-full'}>
      <div className={'flex flex-col min-h-[336px] w-full pt-5 pb-2'}>
        {description}
        {renderComments()}
      </div>
    </ScrollArea>
  )
}
