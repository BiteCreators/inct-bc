import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/application/store'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { postsApi } from '@/entities/posts'
import { postSlice } from '@/entities/posts/model/postSlice'
import { useConfirmation, useScopedTranslation, useValidationLimit } from '@byte-creators/utils'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

type editPost = {
  changeEditMode: (e: boolean) => void
  postText: string
}
export const useEditPost = ({ changeEditMode, postText }: editPost) => {
  const params = useParams()
  const dispatch = useDispatch()
  const { changeStatusSSRPostLoading } = postSlice.actions
  const postId = Number(params?.postId) ?? null
  const router = useRouter()
  const [apiError, setApiError] = useState('')
  //TODO: make a selector for this
  const isSSRPostLoading = useSelector((state: RootState) => state.post.isSSRPostLoading)
  const [updatePost] = postsApi.useUpdatePostMutation()
  const { handleApiError } = useHandleApiError('Posts')
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()
  const t = useScopedTranslation('Posts')
  const refreshData = async () => {
    await router.replace(router.asPath)
  }

  const { correct, handleChange, limit, setValue, value } = useValidationLimit({
    limit: 500,
    startText: postText,
  })

  const saveChanges = async () => {
    dispatch(changeStatusSSRPostLoading(true))
    try {
      await updatePost({ description: value, postId }).unwrap()
      await refreshData()
      changeEditMode(false)
    } catch (error) {
      handleApiError({ error, setApiError })
    }

    dispatch(changeStatusSSRPostLoading(false))
  }

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
    apiError,
    changeModalState,
    confirmOpen,
    correct,
    handleChange,
    handleConfirm,
    handleReject,
    isSSRPostLoading,
    limit,
    saveChanges,
    setConfirmOpen,
    setValue,
    t,
    value,
  }
}
