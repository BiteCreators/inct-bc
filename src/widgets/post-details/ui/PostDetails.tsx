import { commentsApi } from '@/entities/comments'
import { postsApi } from '@/entities/posts'
import { Alert } from '@byte-creators/ui-kit'
import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { PostDetailsSlide } from './PostDetailsSlide'
import { PostDesktop } from './desktop/PostDesktop'

export const PostDetails = () => {
  const params = useParams()

  const { data: post } = postsApi.useGetPublicPostByIdQuery(
    params !== null ? { postId: Number(params.postId) } : skipToken
  )

  const router = useRouter()

  const handleNavigateToImage = (imageUrl: string) => {
    const proxyUrl = `/api/proxy?path=${encodeURIComponent(imageUrl)}`

    router.push({
      pathname: `/profile/${post?.ownerId}/publications/${post?.id}/view`,
      query: { image: proxyUrl },
    })
  }
  const slides = post?.images.map((image: any, i) => (
    <PostDetailsSlide handleNavigateToImage={handleNavigateToImage} image={image} key={i} />
  ))

  const { data, error, isLoading } = commentsApi.useGetCommentsQuery({ postId: post?.id || 0 })

  const comments = data?.items

  return (
    <>
      <PostDesktop comments={comments} isLoading={isLoading} post={post} slides={slides || []} />
      {error && <Alert message={'Comments loaded failed'} type={'error'} />}
    </>
  )
}
