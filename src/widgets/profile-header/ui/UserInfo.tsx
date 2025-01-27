import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { authApi } from '@/entities/auth'
import { profileApi } from '@/entities/profile'
import { AboutUser } from '@/features/profile'
import { Button, Typography } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'
import { skipToken } from '@reduxjs/toolkit/query'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type Props = {
  isLoading: boolean
  userMetadata: React.ReactNode
}

export const UserInfo = ({ isLoading, userMetadata }: Props) => {
  const params = useParams<{ id: string }>()

  const { data: profile } = profileApi.useGetPublicProfileQuery(
    params !== null ? { id: Number(params.id) } : skipToken
  )
  const { data: currentUser } = authApi.useMeQuery()

  const t = useScopedTranslation('Navigation')

  const isCurrentUserProfile = currentUser?.userId === profile?.id

  if (profile) {
    return (
      <div className={'flex-1 text-white'}>
        <div className={'hidden justify-between mb-5 sm:flex gap-5'}>
          <Typography className={'whitespace-nowrap overflow-hidden text-ellipsis'} variant={'h1'}>
            {isLoading ? <Skeleton width={160} /> : profile.userName}
          </Typography>
          {isCurrentUserProfile && (
            <Button asChild className={'hidden md:flex text-center'} variant={'secondary'}>
              <Link href={`/profile/${profile.id}/settings`}>{t.profileSettings}</Link>
            </Button>
          )}
        </div>
        {userMetadata}
        {isLoading ? (
          <Skeleton count={2} />
        ) : (
          <AboutUser className={'hidden sm:flex text-left'} text={profile.aboutMe || ''} />
        )}
      </div>
    )
  }

  return null
}
