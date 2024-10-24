import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/common/lib/utils/cn'
import { Button, Typography } from '@/common/ui'
import { PostComment } from '@/features/posts/ui/post/commonUi/PostComment'
import { PostDescription } from '@/features/posts/ui/post/commonUi/PostDescription'
import { Post } from '@/pages/profile/[id]/publications/[postId]/SinglePostPage'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type Props = {
  comments: { id: string; text: string }[]
  post: Post
}

export const PostDescriptionCommentsBlock = ({ comments, post }: Props) => {
  const [showViewAllButton, setShowViewAllButton] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const commentsContainerRef = useRef<HTMLDivElement>(null)
  const params = useParams<{ id: string; postId: string }>()
  const id = params?.id
  const postId = params?.postId

  useEffect(() => {
    if (commentsContainerRef.current) {
      const containerHeight = commentsContainerRef.current.scrollHeight

      if (comments.length > 1 || containerHeight > 85) {
        setShowViewAllButton(true)
      } else {
        setShowViewAllButton(false)
      }
    }
  }, [comments])

  return (
    <div className={'max-w-[480px] max-h-[564px] flex flex-col overflow-hidden'}>
      <div className={'flex-1 w-full px-0'}>
        <PostDescription post={post} />
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
          {expanded ? (
            comments.map(comment => <PostComment key={comment.id} text={comment.text} />)
          ) : (
            <PostComment key={comments[0].id}>
              <Typography className={'truncate-multiline'} variant={'regular-text'}>
                {comments[0].text}
              </Typography>
            </PostComment>
          )}
        </div>
      </div>
    </div>
  )
}
