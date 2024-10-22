import { Avatar, Typography } from '@/common/ui'
import Link from 'next/link'

type Props = {
  avatarUrl: string
  userName: string
  profileId: number
}

export const UserProfile = ({ userName, avatarUrl, profileId }: Props) => {
  return (
    <div className={'flex gap-3 items-center'}>
      <div className="w-9 h-9">
        <Avatar avatarURL={avatarUrl} isNextLink href={`/profile/${profileId}`} />
      </div>
      <Link
        href={`/profile/${profileId}`}
        className="hover:text-primary-300 text-light-100 duration-75"
      >
        <Typography variant="h3">{userName}</Typography>
      </Link>
    </div>
  )
}
