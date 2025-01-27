import { useState } from 'react'

import { postsApi } from '@/entities/posts'
import { LoaderBlock, Typography } from '@byte-creators/ui-kit'
import { skipToken } from '@reduxjs/toolkit/query'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export const Posts = () => {
  const [pageSize, setPageSize] = useState(8)
  const params = useParams<{ id: string }>()

  const { data, isFetching, isLoading } = postsApi.useGetPublicPostsByUserIdQuery(
    params !== null
      ? {
          pageSize,
          userId: Number(params.id),
        }
      : skipToken
  )

  return (
    <div className={'flex gap-5 justify-center flex-wrap relative'}>
      {isFetching && <LoaderBlock portal />}
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
        </>
      )}
    </div>
  )
}
