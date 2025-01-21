import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { Avatar, Typography } from '@byte-creators/ui-kit'
import { cn } from '@byte-creators/utils'
import Link from 'next/link'

type Props = {
  avatarUrl: string
  className?: string
  isLoading?: boolean
  profileId: number
  userName: string
}

export const UserProfile = ({
  avatarUrl,
  className,
  isLoading = false,
  profileId,
  userName,
}: Props) => {
  return (
    <SkeletonTheme baseColor={'#2b2b2b'} highlightColor={'#575656'}>
      <div className={cn(className, 'flex gap-3 items-center')}>
        <div className={'w-9 h-9'}>
          {isLoading ? (
            <Skeleton className={'aspect-square !rounded-full'} />
          ) : (
            <Avatar avatarURL={avatarUrl || ''} href={`/profile/${profileId}`} isNextLink />
          )}
        </div>
        <div>
          {isLoading ? (
            <Skeleton height={20} width={150} />
          ) : (
            <Link
              className={'hover:text-primary-300 text-light-100 duration-75'}
              href={`/profile/${profileId}`}
            >
              <Typography variant={'h3'}>{userName}</Typography>
            </Link>
          )}
        </div>
      </div>
    </SkeletonTheme>
  )
}
