import { profileApi } from '@/entities/profile'
import { AboutUser } from '@/features/profile'
import { Alert, LoaderBlock, Typography } from '@byte-creators/ui-kit'
import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'next/navigation'

import { UserAvatar } from './UserAvatar'
import { UserInfo } from './UserInfo'
import { UserMetadata } from './UserMetadata'

export const ProfileHeader = () => {
  const params = useParams<{ id: string }>()

  const {
    data: profile,
    error,
    isError,
    isLoading,
  } = profileApi.useGetPublicProfileQuery(params !== null ? { id: Number(params.id) } : skipToken)

  if (isError) {
    //TODO: handle error
    return <Alert message={JSON.stringify(error)} purpose={'alert'} type={'error'} />
  }

  if (isLoading) {
    return <LoaderBlock />
  }

  if (profile) {
    return (
      <>
        <div className={'flex items-center sm:items-start gap-5 sm:gap-7 md:!gap-9 mb-2 sm:mb-12'}>
          <UserAvatar isLoading={isLoading} src={profile.avatars[0]?.url} />
          <UserInfo isLoading={isLoading} userMetadata={<UserMetadata isLoading={isLoading} />} />
        </div>
        <div>
          <Typography className={'sm:hidden font-weight700 mb-3'} variant={'regular-text'}>
            {profile.userName}
          </Typography>
          <AboutUser className={'flex sm:hidden text-left text-sm'} text={profile.aboutMe || ''} />
        </div>
      </>
    )
  }
}
