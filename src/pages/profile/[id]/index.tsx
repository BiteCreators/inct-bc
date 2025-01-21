import { wrapper } from '@/application/store'
import { inctagramApi } from '@/common/api/inct.api'
import { provideAuthState } from '@/entities/auth'
import { postsApi } from '@/entities/posts'
import { Profile, profileApi } from '@/entities/profile'
import { Posts } from '@/features/posts'
import { ProfileHeader } from '@/widgets/profile-header'
import { cn } from '@byte-creators/utils'
import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

type Props = {
  profile: Profile
}

export default function CurrentProfile() {
  return (
    <div className={cn('px-[15px] md:pl-6 md:pr-16')}>
      <ProfileHeader />
      {/* <Posts userId={profile.id} /> */}
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const accessToken = context.req.cookies.accessToken

  provideAuthState({ accessToken, dispatch: store.dispatch })

  const { id } = context.params as { id: string }

  store.dispatch(profileApi.endpoints.getPublicProfile.initiate({ id: Number(id) }))
  store.dispatch(postsApi.endpoints.getPublicPostsByUserId.initiate({ userId: Number(id) }))

  await Promise.all(store.dispatch(profileApi.util.getRunningQueriesThunk()))

  return {
    props: {},
  }
})
