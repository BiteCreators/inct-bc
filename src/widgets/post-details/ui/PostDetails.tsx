import React from 'react'

import { useMediaQuery } from '@/common/lib/hooks/useMediaQuery'
import { Post } from '@/entities/posts'

import { PostDesktop } from './desktop/PostDesktop'
import { PostMobile } from './mobile/PostMobile'

type Props = {
  post: Post
}

export const PostDetails = ({ post }: Props) => {
  const slidesUrl = post.images.map(image => image.url)
  const isLargeScreen = useMediaQuery('(min-width: 768px)')
  const comments = [
    {
      id: '1',
      text: 'eiusmodcididunt ut laboreagna aliquaeiusmod tempor incididunt ut labore et dolore magna aliquaeiusmod tempor incididunt ut labore et dolore magna aliquaeiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
    { id: '2', text: 'eiusmod' },
    { id: '3', text: 'eiusmod tempor labore et dolore magna aliqua' },
    {
      id: '4',
      text: 'eiusmod tempor incididunt ut labore et dolore magna aliquadolore magna aliqua',
    },
  ]

  if (isLargeScreen) {
    return <PostDesktop comments={comments} post={post} slidesUrl={slidesUrl} />
  } else {
    return <PostMobile comments={comments} post={post} slidesUrl={slidesUrl} />
  }
}
