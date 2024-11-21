import { Avatar, Typography } from '@packages/shared/ui'
import Link from 'next/link'

type Props = {
  avatarUrl: string
  profileId: number
  userName: string
}

export const UserProfile = ({ avatarUrl, profileId, userName }: Props) => {
  return (
    <div className={'flex gap-3 items-center'}>
      <div className={'w-9 h-9'}>
        <Avatar avatarURL={avatarUrl} href={`/profile/${profileId}`} isNextLink />
      </div>
      <Link
        className={'hover:text-primary-300 text-light-100 duration-75'}
        href={`/profile/${profileId}`}
      >
        <Typography variant={'h3'}>{userName}</Typography>
      </Link>
    </div>
  )
}
