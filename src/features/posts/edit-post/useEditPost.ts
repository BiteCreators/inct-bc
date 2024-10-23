import { ChangeEvent, useState } from 'react'

import { postsApi } from '@/common/api/posts.api'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'
import { useValidationLimit } from '@/features/posts/edit-post/useValidationLimit'
import { useParams } from 'next/navigation'
type editPost = {
  changeOpen: (e: boolean) => void
  postText: string
}
export const useEditPost = ({ changeOpen, postText }: editPost) => {
  const params = useParams()
  const postId = Number(params?.id) ?? null

  const [textAreaText, setTextAreaText] = useState<string>(postText)
  const [updatePost] = postsApi.useUpdatePostMutation()
  const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaText(e.target.value)
  }

  const { correct, limit } = useValidationLimit(textAreaText, 500)
  const saveChanges = () => {
    updatePost({ description: textAreaText, postId })
    changeOpen(false)
  }
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()

  const changeModalState = async () => {
    if (textAreaText === postText) {
      changeOpen(false)

      return
    }
    setConfirmOpen(true)
    const isConfirmed = await requestConfirmation()

    isConfirmed && setTextAreaText(postText)
    changeOpen(!isConfirmed)
    setConfirmOpen(false)
  }

  return {
    changeModalState,
    changeText,
    confirmOpen,
    correct,
    handleConfirm,
    handleReject,
    limit,
    saveChanges,
    setConfirmOpen,
    textAreaText,
  }
}
