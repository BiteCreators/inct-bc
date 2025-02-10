import { DefaultLayout } from '@/application/layouts/DefautlLayout'
import { wrapper } from '@/application/store'
import { postsApi } from '@/entities/posts'
import { RegisteredUsers } from '@/widgets/registered-users/RegisteredUsers'
import { LinearLoader } from '@byte-creators/ui-kit'
import { PostCard } from '@byte-creators/ui-kit/components'
import { cn } from '@byte-creators/utils'
import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'next/navigation'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const endCursorPostId = context.params?.endCursorPostId
    ? Number(context.params.endCursorPostId)
    : undefined

  await store
    .dispatch(
      postsApi.endpoints.getAllPublicPosts.initiate(
        endCursorPostId ? { endCursorPostId } : { pageSize: 4 }
      )
    )
    .unwrap()

  return {
    props: {},
  }
})

const Main = () => {
  const params = useParams<{ endCursorPostId: string }>()

  let queryParams

  if (params !== null) {
    if (params.endCursorPostId) {
      queryParams = { endCursorPostId: Number(params.endCursorPostId), pageSize: 4 }
    } else {
      queryParams = { pageSize: 4 }
    }
  } else {
    queryParams = skipToken
  }

  const { data: postsData, isLoading } = postsApi.useGetAllPublicPostsQuery(queryParams, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  if (isLoading) {
    return (
      <div className={'flex h-60 justify-center items-center'}>
        <LinearLoader isLoading={isLoading} />
      </div>
    )
  }

  if (!postsData?.items.length) {
    return <p>No posts found</p>
  }

  const { items: posts } = postsData

  return (
    <div className={cn('max-w-[972px] mr-[20%] ml-[10%]')}>
      <div>
        <RegisteredUsers usersCount={postsData.totalCount} />
      </div>
      <div className={'pt-6'}>
        <div className={'grid grid-cols-4 gap-3'}>
          {posts.map(post => (
            <PostCard
              avatarOwner={post.avatarOwner}
              createdAt={post.createdAt}
              description={post.description}
              isAdmin={false}
              key={post.id}
              ownerId={post.ownerId}
              postContainerHeight={post.images[0].height}
              postId={post.id}
              postImageUrl={post.images[0].url}
              postSize={post.images[0].width}
              userName={post.userName}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

Main.getLayout = DefaultLayout

export default Main
