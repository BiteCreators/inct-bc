import { useEffect, useState } from 'react'

import { postsApi } from '@/entities/posts'
import { Typography } from '@packages/shared/ui'
import { LoaderBlock } from '@packages/shared/ui/loader/LoaderBlock'
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
    const handleScroll = () => {
      if (scroll) {
        const value = scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight

        if (value <= 1 && !isFetching) {
          setPageSize(prevPageSize => prevPageSize + 8)
        }
      }
    }

    scroll?.addEventListener('scroll', handleScroll)

    return () => {
      scroll?.removeEventListener('scroll', handleScroll)
    }
  }, [isFetching])

  return (
    <>
      <div className={'flex gap-5 justify-center flex-wrap relative'}>
        {isLoading && <LoaderBlock />}
        {!isLoading && data?.items && data?.items.length < 1 ? (
          <Typography> user has no publications yet </Typography>
        ) : (
          data?.items.map(post => {
            return (
              <Link
                className={'hover:scale-[1.013] duration-75'}
                href={`/profile/${userId}/publications/${post.id}`}
                key={post.id}
              >
                <img height={260} src={post.images[0]?.url} width={260} />
              </Link>
            )
          })
        )}
      </div>
    </>
  )
}
