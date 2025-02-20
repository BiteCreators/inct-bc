import { useRef, useState } from 'react'

import { postsApi } from '@/entities/posts'
import { PostFeed } from '@/features/posts'
import { Alert, LinearLoader } from '@byte-creators/ui-kit'
import { useIntersectionObserver, useScopedTranslation } from '@byte-creators/utils'

const Feed = () => {
  const [pageSize, setPageSize] = useState(8)
  const triggerRef = useRef<HTMLDivElement>(null)
  const t = useScopedTranslation('Posts')

  const {
    data: postsData,
    isError: postsIsError,
    isFetching,
    isLoading,
    isSuccess,
  } = postsApi.useGetFollowerPublicationsQuery(
    { pageSize },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  )

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
      {postsIsError && (
        <Alert
          canClose={false}
          className={'mb-9'}
          message={t.errors.failedToLoadPosts}
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
