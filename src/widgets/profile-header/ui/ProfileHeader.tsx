import { Avatar, Button, Typography } from '@/common/ui'
import { ProfileFollowButton } from '@/features/profile'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import exampleImage from '../../../../public/examples/exampleAvatar.png'

export const ProfileHeader = () => {
  const username = 'URLProfile'
  const publications = '345'
  const followingCount = 123
  const followersCount = 234
  const params = useParams<{ id: string }>()
  const id = params?.id

  return (
    <div className={'flex gap-9 mb-12'}>
      <Avatar avatarURL={exampleImage.src} href="#" isNextLink={false} size={204} />
      <div className={'flex-1 text-white'}>
        <div className={'flex justify-between mb-5'}>
          <Typography variant="h1">{username}</Typography>
          <Button asChild variant={'secondary'}>
            <Link href={`/profile/${id}/settings`}>Profile Settings</Link>
          </Button>
        </div>
        <div className={'flex gap-20 text-sm mb-5'}>
          <ProfileFollowButton count={followingCount} label={'Following'} href={`#`} />
          <ProfileFollowButton count={followersCount} label={'Followers'} href={`#`} />
          <div className={'flex flex-col'}>
            <span className={'font-weight700'}>{publications}</span>
            <span>Publications</span>
          </div>
        </div>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </div>
    </div>
  )
}
