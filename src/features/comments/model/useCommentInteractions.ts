import { useState } from 'react'

import { useGetRelativeTime } from '@/common/lib/hooks/useGetRelativeTime'
import { commentsApi } from '@/entities/comments'
import { Answer, Comment } from '@/entities/comments/types/comments.types'
import { Reaction } from '@/entities/posts/types/likes.types'

export const useCommentInteractions = ({ comment }: { comment: Comment }) => {
  const { getRelativeTime } = useGetRelativeTime()
  const relativeTime = getRelativeTime(new Date(comment.createdAt).getTime())
  const [updateLikeStatusComment] = commentsApi.useUpdateLikeStatusCommentMutation()
  const { data } = commentsApi.useGetAnswersQuery({ commentId: comment.id, postId: comment.postId })
  const answers = data?.items
  const answersCount = data?.items.length
  const isAnswersExist = !!data?.items.length
  const [isAnswersOpen, setIsAnswersOpen] = useState<boolean>(false)
  const [updateLikeStatusAnswer] = commentsApi.useUpdateLikeStatusAnswerMutation()
  const handleUpdateLikeStatusAnswer = (answer: Answer) => {
    updateLikeStatusAnswer({
      answerId: answer.id,
      commentId: comment.id,
      likeStatus: answer.isLiked ? Reaction.DISLIKE : Reaction.LIKE,
      postId: comment.postId,
    })
  }
  const handleUpdateLikeStatusComment = () => {
    updateLikeStatusComment({
      commentId: comment.id,
      likeStatus: comment.isLiked ? Reaction.DISLIKE : Reaction.LIKE,
      postId: comment.postId,
    })
  }

  return {
    answers,
    answersCount,
    handleUpdateLikeStatusAnswer,
    handleUpdateLikeStatusComment,
    isAnswersExist,
    isAnswersOpen,
    relativeTime,
    setIsAnswersOpen,
  }
}
