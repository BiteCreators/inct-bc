import { cn } from '@/common/lib/utils/cn'
import { Profile } from '@/entities/profile'
import { Posts } from '@/features/posts'
import { ProfileHeader } from '@/widgets/profile-header'
import { GetServerSideProps } from 'next'

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
