import { profileApi } from '@/entities/profile'
import { AboutUser } from '@/features/profile'
import { FollowProvider } from '@/features/profile/ui/profile-follow/FollowModalContext'
import { UserInfo } from '@/widgets/profile-header/ui/userInfo/UserInfo'
import { Alert, LoaderBlock, Typography } from '@byte-creators/ui-kit'
import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'next/navigation'

import { UserAvatar } from './UserAvatar'
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
        <div
          className={
            'flex box-border min-w-[365px] items-center sm:items-start gap-5 sm:gap-7 md:!gap-9 mb-2 sm:mb-12'
          }
        >
          <UserAvatar
            className={'w-24 sm:w-36 lg:!w-52'}
            isLoading={isLoading}
            src={profile.avatars[0]?.url}
          />
          <FollowProvider currentUserProfile={{ userName: profile.userName }}>
            <UserInfo isLoading={isLoading} userMetadata={<UserMetadata isLoading={isLoading} />} />
          </FollowProvider>
        </div>
        <div>
          {/*<Typography className={'hidden font-weight700 mb-3'} variant={'regular-text'}>*/}
          {/*  {profile.userName}*/}
          {/*</Typography>*/}
          {/*<AboutUser className={'hidden sm:flex text-left text-sm'} text={profile.aboutMe || ''} />*/}
        </div>
      </>
    )
  }
}
