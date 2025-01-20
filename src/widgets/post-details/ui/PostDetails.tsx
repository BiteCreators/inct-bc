import React from 'react'

import { commentsApi } from '@/entities/comments'
import { Post } from '@/entities/posts'
import { PostDetailsSlide } from '@/widgets/post-details/ui/PostDetailsSlide'
import { useMediaQuery } from '@byte-creators/utils'
import { useRouter } from 'next/router'

import { PostDesktop } from './desktop/PostDesktop'
import { PostMobile } from './mobile/PostMobile'

type Props = {
  post: Post
}

export const PostDetails = ({ post }: Props) => {
  const router = useRouter()
  const handleNavigateToImage = (imageUrl: string) => {
    const proxyUrl = `/api/proxy?path=${encodeURIComponent(imageUrl)}`

    router.push({
      pathname: `/profile/${post.ownerId}/publications/${post.id}/view`,
      query: { image: proxyUrl },
    })
  }
  const slides = post.images.map((image: any, i) => (
    <PostDetailsSlide handleNavigateToImage={handleNavigateToImage} image={image} key={i} />
  ))
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  const { data, error } = commentsApi.useGetCommentsQuery({ postId: post.id })

  const comments = data?.items

  if (isLargeScreen) {
    return <PostDesktop comments={comments} post={post} slides={slides} />
  } else {
    return <PostMobile comments={comments} post={post} slides={slides} />
  }
}
