import { useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { commentsApi } from '@/entities/comments'
import { Answer, Comment } from '@/entities/comments/types/comments.types'
import { Reaction } from '@/entities/posts/types/likes.types'
import { useGetRelativeTime } from '@byte-creators/utils'

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
  const [apiError, setApiError] = useState('')
  const { handleApiError } = useHandleApiError('Posts')
  const handleUpdateLikeStatusAnswer = async (answer: Answer) => {
    try {
      await updateLikeStatusAnswer({
        answerId: answer.id,
        commentId: comment.id,
        likeStatus: answer.isLiked ? Reaction.DISLIKE : Reaction.LIKE,
        postId: comment.postId,
      })
    } catch (error) {
      handleApiError({ error, setApiError })
    }
  }
  const handleUpdateLikeStatusComment = async () => {
    try {
      await updateLikeStatusComment({
        commentId: comment.id,
        likeStatus: comment.isLiked ? Reaction.DISLIKE : Reaction.LIKE,
        postId: comment.postId,
      })
    } catch (error) {
      handleApiError({ error, setApiError })
    }
  }

  return {
    answers,
    answersCount,
    apiError,
    handleUpdateLikeStatusAnswer,
    handleUpdateLikeStatusComment,
    isAnswersExist,
    isAnswersOpen,
    relativeTime,
    setApiError,
    setIsAnswersOpen,
  }
}
