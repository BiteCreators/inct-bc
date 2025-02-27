import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { authApi } from '@/entities/auth'
import { profileApi } from '@/entities/profile'
import { AboutUser } from '@/features/profile'
import { useProfileFollow } from '@/features/profile/model/useProfileFollow'
import { Alert, Button, Typography } from '@byte-creators/ui-kit'
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

  const isNotCurrentUser = currentUser !== undefined && currentUser?.userId !== profile?.id

  const {
    error,
    followLoading,
    handleDeleteFollower,
    handleFollow,
    isFollow,
    isFollowingLoading,
    removeLoading,
  } = useProfileFollow({ userName: profile?.userName || '' })

  const handlerFollowBtn = () => {
    if (isFollow) {
      handleDeleteFollower(Number(params.id), false)
    } else {
      handleFollow(Number(params.id))
    }
  }

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
          {isNotCurrentUser && (
            <div className={'flex gap-3'}>
              {isLoading || removeLoading || followLoading || isFollowingLoading ? (
                <Skeleton width={100} />
              ) : (
                <Button onClick={handlerFollowBtn}>{isFollow ? 'Unfollow' : 'Follow'}</Button>
              )}
              <Button variant={'secondary'}>Send message</Button>
            </div>
          )}
        </div>
        {userMetadata}
        {isLoading ? (
          <Skeleton count={2} />
        ) : (
          <AboutUser className={'hidden sm:flex text-left'} text={profile.aboutMe || ''} />
        )}
        {error && <Alert message={error} type={'error'} />}
      </div>
    )
  }

  return null
}
