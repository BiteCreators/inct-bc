import { useEffect, useRef, useState } from 'react'

import { useValidationLimit } from '@byte-creators/utils'

export const useCommentState = () => {
  const {
    correct,
    limit,
    setValue: setContentComment,
    value: contentComment,
  } = useValidationLimit({
    limit: 300,
    startText: '',
  })
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

  return {
    answerData,
    contentComment,
    correct,
    handleAnswerClick,
    limit,
    setContentComment,
    textareaRef,
  }
}
