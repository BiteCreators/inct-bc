import { useState } from 'react'

import { postsApi } from '@/common/api/posts.api'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const useDropdownPost = () => {
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()
  const router = useRouter()
  const [apiError, setApiError] = useState('')
  const { handleApiError } = useHandleApiError('Posts')
  const copyLinkHandler = async () => {
    await navigator.clipboard.writeText(window.location.href)
  }
  const [deletePost] = postsApi.useDeletePostMutation()
  const params = useParams()
  const postId = Number(params?.postId) ?? null

  const deletePostHandler = async () => {
    const isConfirmed = await requestConfirmation()

    if (isConfirmed) {
      try {
        await deletePost({ postId }).unwrap()
        await router.push('/')
      } catch (error) {
        console.log(error)
        handleApiError({ error, setApiError })
      }
    }
  }

  return {
    apiError,
    confirmOpen,
    copyLinkHandler,
    deletePostHandler,
    handleConfirm,
    handleReject,
    setConfirmOpen,
  }
}
