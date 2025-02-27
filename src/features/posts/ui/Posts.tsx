import { useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { postsApi } from '@/entities/posts'
import { Typography } from '@byte-creators/ui-kit'
import { useIntersectionObserver } from '@byte-creators/utils'
import { skipToken } from '@reduxjs/toolkit/query'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export const Posts = () => {
  const [pageSize, setPageSize] = useState(8)
  const params = useParams<{ id: string }>()
  const paginationRef = useRef<HTMLDivElement>(null)

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
    <Skeleton className={'!w-64 !h-64 rounded-md'} key={index} />
  ))

  return (
    <div className={'flex gap-5 justify-center flex-wrap relative'}>
      {!isLoading && data?.items && data?.items.length < 1 ? (
        <Typography> user has no publications yet </Typography>
      ) : (
        <>
          {data?.items.map(post => (
            <Link
              className={'hover:scale-[1.013] duration-75'}
              href={`/profile/${params.id}/publications/${post.id}`}
              key={post.id}
            >
              <img alt={'post-img'} height={260} src={post.images[0]?.url} width={260} />
            </Link>
          ))}
          <div ref={paginationRef}></div>
        </>
      )}
      {(isFetching || isLoading) && skeletonItems}
    </div>
  )
}
