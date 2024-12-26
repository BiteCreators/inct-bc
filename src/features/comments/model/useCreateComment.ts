import { useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { commentsApi } from '@/entities/comments'

export const useCreateComment = ({
  answerData,
  contentComment,
  postId,
  setContentComment,
}: {
  answerData?: {
    commentId: number
    postId: number
    userName: string
  } | null
  contentComment: string
  postId: string
  setContentComment: (text: string) => void
}) => {
  const isAnswer = !!answerData
  const [createComment] = commentsApi.useCreateCommentMutation()
  const [createAnswerComment] = commentsApi.useCreateAnswerCommentMutation()
  const { handleApiError } = useHandleApiError('Posts')
  const [apiError, setApiError] = useState('')
  const handleCreateAnswerComment = async () => {
    try {
      if (contentComment && isAnswer) {
        await createAnswerComment({
          commentId: answerData.commentId,
          content: contentComment,
          postId: answerData.postId,
        })
        setContentComment('')
      }
    } catch (error) {
      handleApiError({ error, setApiError })
    }
  }

  const handleCreateComment = async () => {
    try {
      if (contentComment) {
        await createComment({ content: contentComment, postId: Number(postId) })
        setContentComment('')
      }
    } catch (error) {
      handleApiError({ error, setApiError })
    }
  }

  return { apiError, handleCreateAnswerComment, handleCreateComment, isAnswer, setApiError }
}
