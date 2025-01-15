import React from 'react'

import { commentsApi } from '@/entities/comments'
import { Post } from '@/entities/posts'
import { Button } from '@byte-creators/ui-kit'
import { EyeOutline } from '@byte-creators/ui-kit/icons'
import { cn, useMediaQuery } from '@byte-creators/utils'
import { useRouter } from 'next/router'

import { PostDesktop } from './desktop/PostDesktop'
import { PostMobile } from './mobile/PostMobile'

type Props = {
  post: Post
}

export const PostDetails = ({ post }: Props) => {
  // Обработка навигации к PostImageView
  const router = useRouter()
  const handleNavigateToImage = (imageUrl: string) => {
    const proxyUrl = `/api/proxy?path=${encodeURIComponent(imageUrl)}`

    router.push({
      pathname: `/profile/${post.ownerId}/publications/${post.id}/view`,
      query: { image: proxyUrl },
    })
  }
  //TODO: remove any
  const slides = post.images.map((image: any, i) => (
    <div className={'w-full h-full relative'} key={i}>
      <img alt={'postImg'} className={'h-full object-cover object-center sc'} src={image.url} />
      <Button
        className={cn(
          'text-2xl absolute inset-0 m-auto opacity-0',
          'transition-opacity duration-300 hover:opacity-100',
          'px-36 focus:outline-none active:outline-none !outline-none'
        )}
        onClick={() => handleNavigateToImage(image.url)}
        variant={'text'}
      >
        <div
          style={{
            backgroundColor: '#4B4B4B',
            borderRadius: '50%',
            display: 'inline-block',
            padding: '8px',
          }}
        >
          <EyeOutline className={'text-light-100 transform scale-150'} />
        </div>
      </Button>
    </div>
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
