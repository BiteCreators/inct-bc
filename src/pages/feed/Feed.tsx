import { useRef, useState } from 'react'

import { postsApi } from '@/entities/posts'
import { PostFeed } from '@/features/posts'
import { LinearLoader } from '@byte-creators/ui-kit'
import { useIntersectionObserver } from '@byte-creators/utils'
import { skipToken } from '@reduxjs/toolkit/query'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

const Alert = dynamic(() => import('@byte-creators/ui-kit').then(mod => mod.Alert), {
  ssr: false,
})

const Feed = () => {
  const [pageSize, setPageSize] = useState(8)
  const params = useParams<{ endCursorPostId: string }>()
  const triggerRef = useRef<HTMLDivElement>(null)

  let queryParams

  if (params !== null) {
    if (params.endCursorPostId) {
      queryParams = { endCursorPostId: Number(params.endCursorPostId), pageSize }
    } else {
      queryParams = { pageSize }
    }
  } else {
    queryParams = skipToken
  }
  const {
    data: postsData,
    isError: postsError,
    isFetching,
    isLoading,
    isSuccess,
  } = postsApi.useGetAllPublicPostsQuery(queryParams, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  //TODO: remove ts ignore
  //@ts-ignore
  useIntersectionObserver(triggerRef, () => {
    if (!isFetching && postsData?.totalCount !== postsData?.items.length) {
      setPageSize(prev => prev + 8)
    }
  })

  return (
    <div
      className={
        'px-6 max-w-[514px] relative mx-auto md:mx-0 md:left-0 lg:!mx-auto lg:!left-[-110px]'
      }
    >
      {<LinearLoader isLoading={isLoading || isFetching} />}
      {postsError && (
        <Alert
          canClose={false}
          className={'mb-9'}
          //TODO: add translation of the message
          message={'Failed to load posts. Try again later.'}
          purpose={'alert'}
          type={'error'}
        />
      )}
      {isSuccess && postsData.items.map(post => <PostFeed key={post.id} post={post} />)}
      <div ref={triggerRef}></div>
    </div>
  )
}

export default Feed
