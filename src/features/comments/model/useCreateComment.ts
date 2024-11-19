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
      console.log(error)
    }
  }

  const handleCreateComment = async () => {
    try {
      if (contentComment) {
        await createComment({ content: contentComment, postId: Number(postId) })
        setContentComment('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { handleCreateAnswerComment, handleCreateComment, isAnswer }
}
