import { useState } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { authSlice } from '@/entities/auth'
import { Post, postsApi } from '@/entities/posts'
import { Reaction } from '@/entities/posts/types/likes.types'
import { useRouter } from 'next/router'

export const useLikePost = (post: Post) => {
  const [apiError, setApiError] = useState<string>('')
  const { handleApiError } = useHandleApiError('Common')
  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)

  const [updateLikeStatusPost] = postsApi.useUpdateLikeStatusPostMutation()
  const { data: postLikes, refetch } = postsApi.useGetPostLikesQuery({ postId: post.id })
  const router = useRouter()

  const handleLike = async () => {
    if (!isAuth) {
      await router.push(`/auth/sign-in`)
    }
    const newLikeStatus = postLikes?.isLiked ? 'NONE' : 'LIKE'

    try {
      await updateLikeStatusPost({
        likeStatus: newLikeStatus as Reaction,
        postId: post.id,
      }).unwrap()
      refetch()
    } catch (error) {
      handleApiError({ error, setApiError })
    }
  }

  return {
    apiError,
    handleLike,
    postLikes,
  }
}
