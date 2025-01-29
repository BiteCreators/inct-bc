import { useEffect, useRef, useState } from 'react'

export const useCommentState = () => {
  const [contentComment, setContentComment] = useState<string>('')
  const [answerData, setAnswerData] = useState<{
    commentId: number
    postId: number
    userName: string
  } | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const handleAnswerClick = (data: { commentId: number; postId: number; userName: string }) => {
    setAnswerData(data)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  useEffect(() => {
    if (answerData) {
      setContentComment(`@${answerData.userName} `)
    } else {
      setContentComment('')
    }
  }, [answerData])

  useEffect(() => {
    if (
      answerData &&
      contentComment &&
      contentComment.split(' ')[0].slice(1) !== answerData.userName
    ) {
      setAnswerData(null)
      setContentComment('')
    }
  }, [contentComment, answerData])

  return { answerData, contentComment, handleAnswerClick, setContentComment, textareaRef }
}
