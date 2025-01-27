import { wrapper } from '@/application/store'
import { provideAuthState } from '@/entities/auth'
import { postsApi } from '@/entities/posts'
import { profileApi } from '@/entities/profile'
import { Posts } from '@/features/posts'
import { ProfileHeader } from '@/widgets/profile-header'
import { cn } from '@byte-creators/utils'

export default function CurrentProfile() {
  return (
    <div className={cn('px-[15px] md:pl-6 md:pr-16')}>
      <ProfileHeader />
      <Posts />
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const accessToken = context.req.cookies.accessToken

  provideAuthState({ accessToken, dispatch: store.dispatch })

  const { id } = context.params as { id: string }

  store.dispatch(profileApi.endpoints.getPublicProfile.initiate({ id: Number(id) }))
  store.dispatch(
    postsApi.endpoints.getPublicPostsByUserId.initiate({ pageSize: 8, userId: Number(id) })
  )

  await Promise.all(store.dispatch(profileApi.util.getRunningQueriesThunk()))

  return {
    props: {},
  }
})
