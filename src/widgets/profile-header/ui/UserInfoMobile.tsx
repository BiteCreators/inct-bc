import { profileApi } from '@/entities/profile'
import { AboutUser } from '@/features/profile'
import { Typography } from '@byte-creators/ui-kit'
import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'next/navigation'

export const UserInfoMobile = () => {
  const params = useParams<{ id: string }>()

  const { data: profile } = profileApi.useGetPublicProfileQuery(
    params !== null ? { id: Number(params.id) } : skipToken
  )

  if (profile) {
    return (
      <div>
        <Typography className={'sm:hidden font-weight700 mb-3'} variant={'regular-text'}>
          {profile.userName}
        </Typography>
        <AboutUser className={'flex sm:hidden text-left text-sm'} text={profile.aboutMe || ''} />
      </div>
    )
  }

  return null
}
