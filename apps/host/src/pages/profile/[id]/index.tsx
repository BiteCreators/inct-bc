import { Profile } from '@/entities/profile'
import { cn } from '@packages/shared/utils/cn'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'

const ProfileHeader = dynamic(
  () => import('@/widgets/profile-header').then(mod => mod.ProfileHeader),
  { ssr: true }
)
const Posts = dynamic(() => import('@/features/posts').then(mod => mod.Posts), { ssr: true })

type Props = {
  profile: Profile
}

export default function CurrentProfile({ profile }: Props) {
  return (
    <div className={cn('px-[15px] md:pl-6 md:pr-16')}>
      <ProfileHeader profile={profile} />
      <Posts userId={profile.id} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
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
}
