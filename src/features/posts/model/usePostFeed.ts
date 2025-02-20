import { useEffect, useState } from 'react'

import { commentsApi } from '@/entities/comments'
import { Post } from '@/entities/posts'
import { useGetRelativeTime } from '@byte-creators/utils'

import { useLikePost } from './useLikePost'

export const usePostFeed = ({ post }: { post: Post }) => {
  const [isCommented, setIsCommented] = useState(false)
  const [contentComment, setContentComment] = useState<string>('')

  const { getRelativeTime } = useGetRelativeTime()
  const relativeTime = getRelativeTime(new Date(post.createdAt).getTime())

  const { apiError, handleLike, postLikes } = useLikePost(post)

  const {
    data: comments,
    isError: commentsIsError,
    isLoading: commentsIsLoading,
  } = commentsApi.useGetCommentsQuery({ postId: post.id || 0 })

  useEffect(() => {
    if (comments) {
      if (comments.items.length > 0) {
        setIsCommented(true)
      } else {
        setIsCommented(false)
      }
    }
  }, [comments])

  const hasImages = post.images.length !== 0

  return {
    apiError,
    comments,
    commentsIsError,
    commentsIsLoading,
    contentComment,
    handleLike,
    hasImages,
    isCommented,
    postLikes,
    relativeTime,
    setContentComment,
  }
}
