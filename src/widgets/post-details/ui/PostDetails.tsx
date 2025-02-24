import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { selectUserId } from '@/entities/auth/model/auth.slice'
import { commentsApi } from '@/entities/comments'
import { Post, postsApi } from '@/entities/posts'
import { useHandleNavigateToImage } from '@/features/posts/model/useHandleNavigateToImage'
import { Alert } from '@byte-creators/ui-kit'
import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'next/navigation'

import { PostDetailsSlide } from './PostDetailsSlide'
import { PostDesktop } from './desktop/PostDesktop'

export const PostDetails = () => {
  const params = useParams()

  const currentUserId = useAppSelector(selectUserId)

  const { data: post } = postsApi.useGetPublicPostByIdQuery(
    params !== null ? { postId: Number(params.postId) } : skipToken
  )

  const {
    data: commentsData,
    error,
    isLoading,
  } = commentsApi.useGetCommentsQuery(currentUserId ? { postId: post?.id || 0 } : skipToken)

  const handleNavigateToImage = useHandleNavigateToImage(post as Post)
  const slides = post?.images.map((image: any, i) => (
    <PostDetailsSlide handleNavigateToImage={handleNavigateToImage} image={image} key={i} />
  ))

  let comments = commentsData?.items

  if (currentUserId) {
    const currentUserComments = commentsData?.items.filter(
      comment => comment.from.id === currentUserId
    )
    const commentsWithoutCurrentUser = commentsData?.items.filter(
      comment => comment.from.id !== currentUserId
    )

    if (currentUserComments && commentsWithoutCurrentUser) {
      comments = [...currentUserComments, ...commentsWithoutCurrentUser]
    }
  }

  return (
    <>
      <PostDesktop comments={comments} isLoading={isLoading} post={post} slides={slides || []} />
      {error && <Alert message={'Comments loaded failed'} type={'error'} />}
    </>
  )
}
