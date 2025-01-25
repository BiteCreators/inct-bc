import Skeleton from 'react-loading-skeleton'

import { authApi } from '@/entities/auth'
import { followersApi } from '@/entities/followers'
import { Profile } from '@/entities/profile'
import { AboutUser, ProfileFollowButton } from '@/features/profile'
import { useModalOpen } from '@/features/profile/model/useModalOpen'
import { FollowProvider } from '@/features/profile/ui/profile-follow/FollowModalContext'
import { ProfileFollowModal } from '@/features/profile/ui/profile-follow/ProfileFollowModal'
import { Button, Typography } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'
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

  const { data, isLoading } = followersApi.useGetUserProfileQuery({
    userName: profile.userName,
  })
  const { data: currentUser } = authApi.useMeQuery()
  const { handleCloseModal, handleOpenModal, isModalOpen, modalType } = useModalOpen()

  const isCurrentUserProfile = currentUser?.userId === profile.id

  return (
    <>
      <div className={'flex items-center sm:items-start gap-5 sm:gap-7 md:!gap-9 mb-2 sm:mb-12'}>
        <div className={'self-start'}>
          <div className={'w-20 sm:w-36 lg:!w-52'}>
            {isLoading ? (
              <Skeleton className={'aspect-square !rounded-full'} />
            ) : (
              <img
                alt={'Avatar'}
                className={'rounded-full object-cover w-full h-full'}
                src={profile.avatars[0]?.url || exampleImage.src}
              />
            )}
          </div>
        </div>
        <div className={'flex-1 text-white'}>
          <div className={'hidden justify-between mb-5 sm:flex gap-5'}>
            <Typography
              className={'whitespace-nowrap overflow-hidden text-ellipsis'}
              variant={'h1'}
            >
              {isLoading ? <Skeleton width={160} /> : profile.userName}
            </Typography>
            {isCurrentUserProfile && (
              <Button asChild className={'hidden md:flex text-center'} variant={'secondary'}>
                <Link href={`/profile/${profile.id}/settings`}>{tNav.profileSettings}</Link>
              </Button>
            )}
          </div>
          <div className={'flex gap-5 sm:gap-7 lg:!gap-20 text-sm sm:mb-5'}>
            <ProfileFollowButton
              count={isLoading ? undefined : data?.followingCount}
              isLoading={isLoading}
              label={t.following}
              locale={locale}
              onClick={() => handleOpenModal('following')}
            />
            <ProfileFollowButton
              count={isLoading ? undefined : data?.followersCount}
              isLoading={isLoading}
              label={t.followers}
              locale={locale}
              onClick={() => handleOpenModal('followers')}
            />
            {data && (
              <FollowProvider currentUserProfile={data}>
                <ProfileFollowModal
                  currentUserProfile={data}
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  type={modalType}
                />
              </FollowProvider>
            )}
            <div className={'flex flex-col text-xs sm:text-sm'}>
              {isLoading ? (
                <Skeleton height={50} width={90} />
              ) : (
                <>
                  <span className={'font-weight700'}>{data?.publicationsCount}</span>
                  <span>{t.publications}</span>
                </>
              )}
            </div>
          </div>
          {isLoading ? (
            <Skeleton count={2} />
          ) : (
            <AboutUser className={'hidden sm:flex text-left'} text={profile.aboutMe || ''} />
          )}
        </div>
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
