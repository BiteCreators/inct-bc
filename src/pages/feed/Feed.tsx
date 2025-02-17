import { useRef, useState } from 'react'

import { postsApi } from '@/entities/posts'
import { PostFeed } from '@/features/posts'
import { LinearLoader } from '@byte-creators/ui-kit'
import { useIntersectionObserver } from '@byte-creators/utils'
import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'next/navigation'

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
    <div>
      {<LinearLoader isLoading={isLoading || isFetching} />}
      {isSuccess && postsData.items.map(post => <PostFeed key={post.id} post={post} />)}
      <div ref={triggerRef}></div>
    </div>
  )
}

export default Feed
