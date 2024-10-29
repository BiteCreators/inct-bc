import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { postsApi } from '@/common/api/posts.api'
import { useValidationLimit } from '@/common/lib/hooks/useValidationLimit'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'
import { changeStatusLoading } from '@/entities/posts/model/postSlice'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

type editPost = {
  changeEditMode: (e: boolean) => void
  postText: string
}
export const useEditPost = ({ changeEditMode, postText }: editPost) => {
  const params = useParams()
  const dispatch = useDispatch()
  const postId = Number(params?.postId) ?? null
  const router = useRouter()
  const isLoading = useSelector((state: RootState) => state.post.isLoading)
  const [updatePost] = postsApi.useUpdatePostMutation()
  const refreshData = async () => {
    await router.replace(router.asPath)
    // dispatch()
  }

  const { correct, handleChange, limit, setValue, value } = useValidationLimit({
    limit: 500,
    startText: postText,
  })

  const saveChanges = async () => {
    dispatch(changeStatusLoading(true))
    await updatePost({ description: value, postId })
    await refreshData()

    changeEditMode(false)
    dispatch(changeStatusLoading(false))
  }
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()

  const changeModalState = async () => {
    if (value === postText) {
      changeEditMode(false)

      return
    }
    setConfirmOpen(true)
    const isConfirmed = await requestConfirmation()

    isConfirmed && setValue(postText)
    changeEditMode(!isConfirmed)
    setConfirmOpen(false)
  }

  return {
    changeModalState,
    confirmOpen,
    correct,
    handleChange,
    handleConfirm,
    handleReject,
    isLoading,
    limit,
    saveChanges,
    setConfirmOpen,
    setValue,
    value,
  }
}
