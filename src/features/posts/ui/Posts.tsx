import { useEffect, useState } from 'react'

import { Loader } from '@/common/ui'
import { postsApi } from '@/entities/posts'

export const Posts = () => {
  const [pageSize, setPageSize] = useState(8)

  const { data, isFetching, isLoading } = postsApi.useGetPublicPostsByUserIdQuery({
    pageSize,
    userId: 1565, // userId получать в props
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

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={'flex gap-5 justify-center flex-wrap'}>
      {data?.items.map(post => {
        return <img height={260} key={post.id} src={post.images[0]?.url} width={260} />
      })}
    </div>
  )
}
