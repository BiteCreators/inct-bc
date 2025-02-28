import { useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { postsApi } from '@/entities/posts'
import { Typography } from '@byte-creators/ui-kit'
import { cn, useIntersectionObserver, useMediaQuery } from '@byte-creators/utils'
import { skipToken } from '@reduxjs/toolkit/query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import mock from 'public/examples/mock.png'

export const Posts = () => {
  const [pageSize, setPageSize] = useState(8)
  const params = useParams<{ id: string }>()
  const paginationRef = useRef<HTMLDivElement>(null)
  const isSuperSmallScreen = useMediaQuery('(max-width: 400px)')
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

  const skeletonItems = Array.from({ length: 5 }, (_, index) => (
    <Skeleton className={'rounded-md w-full aspect-[1]'} key={index} />
  ))

  return (
    <div className={'my-7 md:my-2'}>
      {!isLoading && data?.items && data?.items.length < 1 ? (
        <Typography> user has no publications yet </Typography>
      ) : (
        <div
          className={cn([
            'gap-2 sm:gap-4',
            isSuperSmallScreen
              ? 'mr-12'
              : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4',
          ])}
        >
          {data?.items.map(post => (
            <Link
              className={'hover:scale-[1.013] duration-75'}
              href={`/profile/${params.id}/publications/${post.id}`}
              key={post.id}
            >
              <img
                alt={'post-img'}
                className={cn([
                  'h-auto rounded-md',
                  isSuperSmallScreen ? 'mx-auto mb-4 min-w-[330px] max-w-full' : 'w-full',
                ])}
                src={post.images[0]?.url || mock.src}
              />
            </Link>
          ))}
          {(isFetching || isLoading) && skeletonItems}
          {/*{skeletonItems}*/}
          <div ref={paginationRef}></div>
        </div>
      )}
    </div>
  )
}
