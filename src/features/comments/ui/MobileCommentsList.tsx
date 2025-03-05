import React, { useEffect, useRef, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { selectUserId } from '@/entities/auth/model/auth.slice'
import { Comment } from '@/entities/comments/types/comments.types'
import { PostComment } from '@/features/comments'
import { Button } from '@byte-creators/ui-kit'
import { cn } from '@byte-creators/utils'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type Props = {
  comments?: Comment[]
  description: React.ReactNode
  handleAnswerClick: (data: { commentId: number; postId: number; userName: string }) => void
  isLoading?: boolean
}

export const MobileCommentsList = ({
  comments,
  description,
  handleAnswerClick,
  isLoading = false,
}: Props) => {
  const [showViewAllButton, setShowViewAllButton] = useState(false)
  const commentsContainerRef = useRef<HTMLDivElement>(null)
  const params = useParams<{ id: string; postId: string }>()
  const id = params?.id
  const postId = params?.postId
  const currentUserId = useAppSelector(selectUserId)

  const skeletonComments = Array.from({ length: 3 }).map((_, index) => (
    <SkeletonTheme baseColor={'#3f3e3e'} highlightColor={'#575656'} key={index}>
      <div className={'mb-4'}>
        <Skeleton className={'h-6 mb-2'} />
        <Skeleton className={'h-4 w-3/5'} />
      </div>
    </SkeletonTheme>
  ))

  useEffect(() => {
    if (commentsContainerRef.current) {
      const containerHeight = commentsContainerRef.current.scrollHeight

      if (comments) {
        if (comments.length > 1 || containerHeight > 85) {
          setShowViewAllButton(true)
        } else {
          setShowViewAllButton(false)
        }
      }
    }
  }, [comments])

  let content

  if (isLoading) {
    content = skeletonComments
  } else if (!currentUserId) {
    content = (
      <span>
        Please{' '}
        <Link className={'text-primary-300'} href={'/auth/sign-in'}>
          Log In
        </Link>{' '}
        to see comments
      </span>
    )
  } else if (comments && comments.length === 0) {
    content = 'No comments'
  } else if (comments && comments.length > 0) {
    content = comments.map(comment => (
      <PostComment comment={comment} handleAnswerClick={handleAnswerClick} key={comment.id} />
    ))
  }

  if (!isLoading && currentUserId && showViewAllButton) {
    return (
      <div className={'max-w-[480px] max-h-[564px] flex flex-col overflow-hidden'}>
        <div className={'flex-1 w-full px-0'}>
          {description}
          <Button className={'pt-0 px-0 border-none text-light-900 text-sm'} variant={'text'}>
            <Link href={`/profile/${id}/publications/${postId}/comments`}>
              {`View all comments (${comments?.length})`}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={'max-w-[480px] max-h-[564px] flex flex-col overflow-hidden'}>
      <div className={'flex-1 w-full px-0'}>
        {description}
        <div className={cn('overflow-hidden')} ref={commentsContainerRef}>
          {content}
        </div>
      </div>
    </div>
  )
}
