import { useState } from 'react'

import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { Button, Typography } from '@/common/ui'
import { authApi } from '@/entities/auth'
import { followersApi } from '@/entities/followers'
import { Profile } from '@/entities/profile'
import { AboutUser, ProfileFollowButton } from '@/features/profile'
import { ProfileFollowModal } from '@/features/profile/ui/ProfileFollowModal'
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

  const { data } = followersApi.useGetUserProfileQuery({
    userName: profile.userName,
  })
  const { data: currentUser } = authApi.useMeQuery()
  const { data: followingList } = followersApi.useGetUsersFollowingQuery({
    userName: currentUser?.userName || '',
  })
  const { data: followersList } = followersApi.useGetFollowersQuery({
    userName: currentUser?.userName || '',
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'followers' | 'following'>('followers')
  const handleOpenModal = (type: 'followers' | 'following') => {
    setModalType(type)
    setIsModalOpen(true)
  }

  // const [follow, { error, isLoading, isSuccess }] = followersApi.useFollowMutation()
  //
  // const handleFollow = async () => {
  //   try {
  //     await follow({ selectedUserId: 1431 }).unwrap()
  //     alert('Successfully followed the user!')
  //   } catch (err) {
  //     console.error('Failed to follow the user:', err)
  //     alert('An error occurred while trying to follow the user.')
  //   }
  // }

  const isCurrentUserProfile = currentUser?.userId === profile.id

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
              count={data?.followingCount}
              // href={`#`}
              label={t.following}
              locale={locale}
              onClick={() => handleOpenModal('following')}
            />
            <ProfileFollowButton
              count={data?.followersCount}
              // href={`#`}
              label={t.followers}
              locale={locale}
              onClick={() => handleOpenModal('followers')}
            />
            {data && (
              <ProfileFollowModal
                currentUserProfile={data}
                followList={modalType === 'followers' ? followersList : followingList}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={modalType}
              />
            )}
            {/*<Button onClick={handleFollow} />*/}
            {/*<ProfileFollowersModal />*/}
            {/*{followingList && <ProfileFollowingModal followingList={followingList} />}*/}
            {/*{followersList && <ProfileFollowersModal followersList={followersList} />}*/}
            <div className={'flex flex-col text-xs sm:text-sm'}>
              <span className={'font-weight700'}>{data?.publicationsCount}</span>
              <span>{t.publications}</span>
            </div>
          </div>
          <AboutUser className={'hidden sm:flex text-left'} text={profile.aboutMe || ''} />
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
