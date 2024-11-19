import React from 'react'

import { ScrollArea } from '@/common/ui'
import { Comment } from '@/entities/comments/types/comments.types'
import { PostComment } from '@/features/comments'

type Props = {
  comments?: Comment[]
  description: React.ReactNode
  handleAnswerClick: (data: { commentId: number; postId: number; userName: string }) => void
}

export const DesktopCommentsList = ({ comments, description, handleAnswerClick }: Props) => {
  return (
    <ScrollArea className={'flex-1 px-6 w-full'}>
      <div className={'flex flex-col min-h-[336px] w-full pt-5 pb-2'}>
        {description}
        {comments && comments.length > 0
          ? comments.map(comment => (
              <PostComment
                comment={comment}
                handleAnswerClick={handleAnswerClick}
                key={comment.id}
              />
            ))
          : 'No comments'}
      </div>
    </ScrollArea>
  )
}
