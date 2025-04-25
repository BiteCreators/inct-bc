import React from 'react'

import { Comment } from '@/entities/comments/types/comments.types'
import { CommentsList } from '@/features/comments'

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
  return (
    <CommentsList
      comments={comments}
      description={description}
      handleAnswerClick={handleAnswerClick}
      isLoading={isLoading}
      mobile
      showViewAllButton={comments && comments.length > 1}
    />
  )
}
