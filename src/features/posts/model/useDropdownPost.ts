import { useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { authApi } from '@/entities/auth'
import { postsApi } from '@/entities/posts'
import { useConfirmation, useScopedTranslation } from '@byte-creators/utils'
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
  const { data: me } = authApi.useMeQuery()
  const userId = me ? me.userId : ''
  const [deletePost] = postsApi.useDeletePostMutation()
  const t = useScopedTranslation('Posts')
  const params = useParams()
  const postId = Number(params?.postId) ?? null

  const deletePostHandler = async () => {
    const isConfirmed = await requestConfirmation()

    if (isConfirmed) {
      try {
        await deletePost({ postId }).unwrap()
        await router.push(`/profile/${userId}`)
      } catch (error) {
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
    t,
  }
}
