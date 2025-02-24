import { useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { authApi } from '@/entities/auth'
import { followersApi } from '@/entities/followers'
import { Post, postsApi } from '@/entities/posts'
import { useConfirmation, useScopedTranslation } from '@byte-creators/utils'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const useDropdownPost = ({ post }: { post: Post }) => {
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()
  const [titleConfirmation, setTitleConfirmation] = useState<string>('')
  const [messageConfirmation, setMessageConfirmation] = useState<string>('')
  const router = useRouter()
  const [apiError, setApiError] = useState('')
  const { handleApiError } = useHandleApiError('Posts')

  const copyPostLinkHandler = async () => {
    const url = window.location.href.replace(
      'feed',
      `profile/${post.ownerId}/publications/${post.id}`
    )

    await navigator.clipboard.writeText(url)
  }
  const { data: me } = authApi.useMeQuery()
  const userId = me ? me.userId : ''
  const [deletePost] = postsApi.useDeletePostMutation()
  const [removeFollower] = followersApi.useRemoveFollowerMutation()
  const t = useScopedTranslation('Posts')
  const params = useParams()
  const postId = Number(params?.postId) ?? null

  const deletePostHandler = async () => {
    setMessageConfirmation(t.deletePostQuestion)
    setTitleConfirmation(t.deletePost)
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

  const unfollowHandler = async () => {
    setMessageConfirmation(`${t.doYouWantToUnfollow} ${post.userName}?`)
    setTitleConfirmation(t.unfollow)
    const isConfirmed = await requestConfirmation()

    if (isConfirmed) {
      try {
        await removeFollower({ userId: post.ownerId })
      } catch (error) {
        handleApiError({ error, setApiError })
      }
    }
  }

  return {
    apiError,
    confirmOpen,
    copyPostLinkHandler,
    deletePostHandler,
    handleConfirm,
    handleReject,
    messageConfirmation,
    setConfirmOpen,
    t,
    titleConfirmation,
    unfollowHandler,
  }
}
