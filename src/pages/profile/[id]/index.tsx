import { wrapper } from '@/application/store'
import { provideAuthState } from '@/entities/auth'
import { Profile } from '@/entities/profile'
import { Posts } from '@/features/posts'
import { ProfileHeader } from '@/widgets/profile-header'
import { cn } from '@byte-creators/utils'

type Props = {
  profile: Profile
}

//TODO: fix posts component and rewrite it to use ssr
export default function CurrentProfile({ profile }: Props) {
  return (
    <div className={cn('px-[15px] md:pl-6 md:pr-16')}>
      <ProfileHeader profile={profile} />
      <Posts userId={profile.id} />
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const accessToken = context.req.cookies.accessToken

  provideAuthState({ accessToken, dispatch: store.dispatch })

  const { id } = context.params as { id: string }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/public-user/profile/${id}`)

    if (!res.ok) {
      return { notFound: true }
    }
    const profile: Profile = await res.json()

    return {
      props: { profile },
    }
  } catch (error) {
    return { notFound: true }
  }
})
