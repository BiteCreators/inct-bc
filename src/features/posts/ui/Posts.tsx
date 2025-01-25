import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { postsApi } from '@/entities/posts'
import { ImageWithSkeleton } from '@/features/posts/ui/ImageWithSkeleton'
import { LoaderBlock, Typography } from '@byte-creators/ui-kit'
//TODO: (?)
import debounce from 'lodash/debounce'
import Link from 'next/link'

type Props = {
  userId: number
}

export const Posts = ({ userId }: Props) => {
  const [pageSize, setPageSize] = useState(8)

  const { data, isFetching, isLoading } = postsApi.useGetPublicPostsByUserIdQuery({
    pageSize,
    userId: userId,
  })

  useEffect(() => {
    const scroll = document.querySelector('#scrollAreaViewport')

    const handleScroll = debounce(() => {
      if (scroll) {
        if (
          scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight <= 50 &&
          !isFetching &&
          data?.items?.length === pageSize
        ) {
          setPageSize(prevPageSize => prevPageSize + 8)
        }
      }
    }, 200)

    const handleResize = debounce(() => {
      if (scroll) {
        if (
          scroll.scrollHeight <= window.innerHeight &&
          !isFetching &&
          data?.items?.length === pageSize
        ) {
          setPageSize(prevPageSize => prevPageSize + 8)
        }
      }
    }, 200)

    scroll?.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      scroll?.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [isFetching, pageSize])

  const skeletonItems = Array.from({ length: 5 }, (_, index) => (
    <Skeleton className={'!w-64 !h-64 rounded-md'} key={index} />
  ))

  //todo: check whether need to use the ImageWithSkeleton utility here
  return (
    <div className={'flex gap-5 justify-center flex-wrap relative'}>
      {(isFetching || isLoading) && skeletonItems}
      {!isLoading && data?.items && data?.items.length < 1 ? (
        <Typography> user has no publications yet </Typography>
      ) : (
        <>
          {data?.items.map(post => (
            <Link
              className={'hover:scale-[1.013] duration-75'}
              href={`/profile/${userId}/publications/${post.id}`}
              key={post.id}
            >
              <img alt={'post-img'} height={260} src={post.images[0]?.url} width={260} />
            </Link>
          ))}
        </>
      )}
    </div>
  )
}
