import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/common/lib/utils/cn'
import { Button, Typography } from '@/common/ui'
import { Comment } from '@/entities/comments/types/comments.types'
import { PostComment } from '@/features/comments'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type Props = {
  comments?: Comment[]
  description: React.ReactNode
}

export const MobileCommentsList = ({ comments, description }: Props) => {
  const [showViewAllButton, setShowViewAllButton] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const commentsContainerRef = useRef<HTMLDivElement>(null)
  const params = useParams<{ id: string; postId: string }>()
  const id = params?.id
  const postId = params?.postId

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

  if (comments && comments.length > 0) {
    if (expanded) {
      content = comments.map(comment => <PostComment comment={comment} key={comment.id} />)
    } else {
      content = (
        <PostComment comment={comments[0]} key={comments[0].id}>
          <Typography className={'truncate-multiline'} variant={'regular-text'}>
            {comments[0].content}
          </Typography>
        </PostComment>
      )
    }
  } else {
    content = 'No comments'
  }

  return (
    <div className={'max-w-[480px] max-h-[564px] flex flex-col overflow-hidden'}>
      <div className={'flex-1 w-full px-0'}>
        {description}
        {showViewAllButton && !expanded && (
          <Button className={'mb-2 pt-0 px-0 border-none text-light-900 text-sm'} variant={'text'}>
            <Link href={`/profile/${id}/publications/${postId}/comments`}>
              View all comments (6)
            </Link>
          </Button>
        )}
        <div
          className={cn('flex flex-col gap-5 overflow-hidden', expanded ? '' : 'max-h-[85px]')}
          ref={commentsContainerRef}
        >
          {content}
        </div>
      </div>
    </div>
  )
}
