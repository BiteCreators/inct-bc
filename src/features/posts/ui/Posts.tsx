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
    // <div className={'flex gap-5 justify-center flex-wrap'}>
    <div
      className={'grid grid-cols-3 gap-1 sm:gap-3 mt-[30px] xl:mx-[65px] lg:grid-cols-4 md:gap-4'}
    >
      {data?.items.map(post => {
        return (
          <div className={'min-w-[108px] sm:min-w-[150px]'} key={post.id}>
            <img height={260} src={post.images[0]?.url} width={260} />
          </div>
        )
      })}
    </div>
  )
}
