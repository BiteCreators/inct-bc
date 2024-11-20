import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { Alert, Button, Typography } from '@/common/ui'
import { authApi } from '@/entities/auth'
import { Profile } from '@/entities/profile'
import { useFollowers } from '@/features/followers/model/useFollowers'
import { AboutUser, ProfileFollowButton } from '@/features/profile'
import Link from 'next/link'
import { useRouter } from 'next/router'

import exampleImage from '../../../../public/examples/exampleAvatar.png'

type Props = {
  profile: Profile
}

export const ProfileHeader = ({ profile }: Props) => {
  const router = useRouter()
  const locale = router.locale === 'en' ? 'en' : 'ru'
  const t = useScopedTranslation('Profile')
  const tNav = useScopedTranslation('Navigation')

  const { data: currentUser } = authApi.useMeQuery()

  const {
    apiError,
    handleFollow,
    isCurrentUserProfile,
    isFollow,
    isLoadingFollow,
    isLoadingUnFollow,
    userProfile,
  } = useFollowers(profile, currentUser)

  return (
    <>
      <div className={'flex items-center sm:items-start gap-5 sm:gap-7 md:!gap-9 mb-2 sm:mb-12'}>
        <div className={'self-start'}>
          <div className={'w-20 sm:w-36 lg:!w-52'}>
            <img
              alt={'Avatar'}
              className={'rounded-full object-cover w-full h-full'}
              src={profile.avatars[0]?.url || exampleImage.src}
            />
          </div>
        </div>
        <div className={'flex-1 text-white'}>
          <div className={'hidden justify-between mb-5 sm:flex gap-5'}>
            <Typography
              className={'whitespace-nowrap overflow-hidden text-ellipsis'}
              variant={'h1'}
            >
              {profile.userName}
            </Typography>
            {isCurrentUserProfile && (
              <Button asChild className={'hidden md:flex text-center'} variant={'secondary'}>
                <Link href={`/profile/${profile.id}/settings`}>{tNav.profileSettings}</Link>
              </Button>
            )}
          </div>
          <div className={'flex gap-5 sm:gap-7 lg:!gap-20 text-sm sm:mb-5'}>
            <ProfileFollowButton
              count={userProfile?.followingCount}
              href={`#`}
              label={t.following}
              locale={locale}
            />
            <ProfileFollowButton
              count={userProfile?.followersCount}
              href={`#`}
              label={t.followers}
              locale={locale}
            />
            <div className={'flex flex-col text-xs sm:text-sm'}>
              <span className={'font-weight700'}>{userProfile?.publicationsCount}</span>
              <span>{t.publications}</span>
            </div>
          </div>
          <AboutUser className={'hidden sm:flex text-left'} text={profile.aboutMe || ''} />
        </div>
        {!isCurrentUserProfile && (
          <div className={'flex gap-4'}>
            <Button disabled={isLoadingFollow || isLoadingUnFollow} onClick={handleFollow}>
              {!isFollow ? t.follow : t.unfollow}
            </Button>
            <Button variant={'secondary'}>{t.sendMessage}</Button>
            {apiError && (
              <Alert
                className={'absolute mt-10 right-16'}
                message={apiError}
                purpose={'alert'}
                type={'error'}
              />
            )}
          </div>
        )}
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
