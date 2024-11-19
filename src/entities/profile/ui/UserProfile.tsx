import React from 'react'

import { cn } from '@/common/lib/utils/cn'
import { Avatar, Typography } from '@/common/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  avatarUrl: string
  className?: string
  profileId: number
  userName: string
}

export const UserProfile = ({ avatarUrl, className, profileId, userName }: Props) => {
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    // Закрытие модалки при переходе
    router.push(
      {
        pathname: `/profile/${profileId}`, // Новый путь
        query: {}, // Убираем query-параметры модалки
      },
      undefined,
      { shallow: false } // Полный переход
    )
  }

  return (
    <div className={cn(className, 'flex gap-3 items-center')}>
      <div className={'w-9 h-9'}>
        <Avatar avatarURL={avatarUrl} href={`/profile/${profileId}`} isNextLink />
      </div>
      <Link
        className={'hover:text-primary-300 text-light-100 duration-75'}
        href={`/profile/${profileId}`}
        onClick={handleClick}
      >
        <Typography variant={'h3'}>{userName}</Typography>
      </Link>
    </div>
  )
}
