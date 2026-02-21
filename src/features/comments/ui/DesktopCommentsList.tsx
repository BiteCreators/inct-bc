import React from 'react'

import { Comment } from '@/entities/comments/types/comments.types'
import { CommentsList } from '@/features/comments'
import { ScrollArea } from '@byte-creators/ui-kit'

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
  return (
    <ScrollArea>
      <CommentsList
        comments={comments}
        description={description}
        handleAnswerClick={handleAnswerClick}
        isLoading={isLoading}
      />
    </ScrollArea>
  )
}
