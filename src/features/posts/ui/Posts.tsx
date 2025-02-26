import { useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { postsApi } from '@/entities/posts'
import { Typography } from '@byte-creators/ui-kit'
import { useIntersectionObserver, useMediaQuery } from '@byte-creators/utils'
import { skipToken } from '@reduxjs/toolkit/query'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export const Posts = () => {
  const [pageSize, setPageSize] = useState(8)
  const params = useParams<{ id: string }>()
  const paginationRef = useRef<HTMLDivElement>(null)
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  const { data, isFetching, isLoading } = postsApi.useGetPublicPostsByUserIdQuery(
    params !== null
      ? {
          pageSize,
          userId: Number(params.id),
        }
      : skipToken
  )

  //TODO: remove ts ignore
  //@ts-ignore
  useIntersectionObserver(paginationRef, () => {
    if (!isFetching && data?.totalCount !== data?.items.length) {
      setPageSize(prev => prev + 8)
    }
  })
  //todo: fix skeleton size
  const skeletonItems = Array.from({ length: 5 }, (_, index) => (
    <Skeleton
      className={`rounded-md ${isLargeScreen ? '!w-[260px] !h-[260px]' : '!w-[108px] !h-[108px]'}`}
      key={index}
    />
  ))

  return (
    <div className={'my-7 md:my-2'}>
      {!isLoading && data?.items && data?.items.length < 1 ? (
        <Typography> user has no publications yet </Typography>
      ) : (
        <div
          className={`grid gap-4 ${
            isLargeScreen ? 'grid-cols-4' : 'grid-cols-2'
          } sm:grid-cols-3 md:grid-cols-4`}
        >
          {data?.items.map(post => (
            <Link
              className={'hover:scale-[1.013] duration-75'}
              href={`/profile/${params.id}/publications/${post.id}`}
              key={post.id}
            >
              <img
                alt={'post-img'}
                className={'w-full h-auto rounded-md'}
                height={isLargeScreen ? 260 : 108}
                src={post.images[0]?.url}
                width={isLargeScreen ? 260 : 108}
              />
            </Link>
          ))}
          {/* Добавляем скелетоны в сетку */}
          {(isFetching || isLoading) && skeletonItems}
          <div ref={paginationRef}></div>
        </div>
      )}
    </div>
  )
}
