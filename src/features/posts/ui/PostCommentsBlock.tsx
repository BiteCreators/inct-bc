import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/common/lib/utils/cn'
import { Button } from '@/common/ui'
import { PostComment } from '@/features/posts/ui/PostComment'

type Props = {}

export const PostDetails = () => {
  const [showAllComments, setShowAllComments] = useState(false)
  const [showViewAllButton, setShowViewAllButton] = useState(false)
  const commentsContainerRef = useRef<HTMLDivElement>(null)

  const handleViewAllComments = () => {
    setShowAllComments(true)
  }

  useEffect(() => {
    if (commentsContainerRef.current) {
      if (commentsContainerRef.current.scrollHeight > 85) {
        setShowViewAllButton(true)
      }
    }
  }, [])

  return (
    <div className={'max-w-[480px] max-h-[564px] flex flex-col overflow-hidden'}>
      <div className={'flex-1 w-full px-0 md:px-6'}>
        {showViewAllButton && !showAllComments && (
          <Button className={'mb-2'} onClick={handleViewAllComments} variant={'text'}>
            View all comments
          </Button>
        )}
        <div
          className={cn('flex flex-col gap-5 overflow-hidden', {
            'max-h-[85px]': !showAllComments,
          })}
          ref={commentsContainerRef}
        >
          <PostComment />
          <PostComment />
          <PostComment />
          <PostComment />
          <PostComment />
        </div>
      </div>
    </div>
  )
}
