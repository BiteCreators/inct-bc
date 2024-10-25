import { postsApi } from '@/common/api/posts.api'
import { useValidationLimit } from '@/common/lib/hooks/useValidationLimit'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'
import { useParams } from 'next/navigation'

type editPost = {
  changeOpen: (e: boolean) => void
  postText: string
}
export const useEditPost = ({ changeOpen, postText }: editPost) => {
  const params = useParams()
  const postId = Number(params?.id) ?? null

  const [updatePost] = postsApi.useUpdatePostMutation()

  const { correct, handleChange, limit, setValue, value } = useValidationLimit({
    limit: 500,
    startText: postText,
  })
  const saveChanges = () => {
    updatePost({ description: value, postId })
    changeOpen(false)
  }
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()

  const changeModalState = async () => {
    if (value === postText) {
      changeOpen(false)

      return
    }
    setConfirmOpen(true)
    const isConfirmed = await requestConfirmation()

    isConfirmed && setValue(postText)
    changeOpen(!isConfirmed)
    setConfirmOpen(false)
  }

  return {
    changeModalState,
    confirmOpen,
    correct,
    handleChange,
    handleConfirm,
    handleReject,
    limit,
    saveChanges,
    setConfirmOpen,
    setValue,
    value,
  }
}
