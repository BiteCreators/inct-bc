import Skeleton from 'react-loading-skeleton'

import { profileApi } from '@/entities/profile'
import { ProfileFollowButton } from '@/features/profile'
import { useModalOpen } from '@/features/profile/model/useModalOpen'
import { FollowProvider } from '@/features/profile/ui/profile-follow/FollowModalContext'
import { ProfileFollowModal } from '@/features/profile/ui/profile-follow/ProfileFollowModal'
import { useScopedTranslation } from '@byte-creators/utils'
import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

type Props = {
  isLoading: boolean
}
export const UserMetadata = ({ isLoading }: Props) => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const locale = router.locale === 'en' ? 'en' : 'ru'

  const { data: profile } = profileApi.useGetPublicProfileQuery(
    params !== null ? { id: Number(params.id) } : skipToken
  )

  const { handleCloseModal, handleOpenModal, isModalOpen, modalType } = useModalOpen()
  const t = useScopedTranslation('Profile')

  if (profile) {
    return (
      <div className={'flex gap-5 sm:gap-7 lg:!gap-20 text-sm sm:mb-5'}>
        <ProfileFollowButton
          count={profile.userMetadata.following}
          isLoading={isLoading}
          label={t.following}
          locale={locale}
          onClick={() => handleOpenModal('following')}
        />
        <ProfileFollowButton
          count={profile.userMetadata.followers}
          isLoading={isLoading}
          label={t.followers}
          locale={locale}
          onClick={() => handleOpenModal('followers')}
        />

        <FollowProvider currentUserProfile={profile}>
          <ProfileFollowModal
            currentUserProfile={profile}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            type={modalType}
          />
        </FollowProvider>

        <div className={'flex flex-col text-xs sm:text-sm'}>
          {isLoading ? (
            <Skeleton height={50} width={90} />
          ) : (
            <>
              <span className={'font-weight700'}>{profile.userMetadata.publications}</span>
              <span>{t.publications}</span>
            </>
          )}
        </div>
      </div>
    )
  }

  return null
}
