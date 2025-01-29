import { profileApi } from '@/entities/profile'
import { ProfileFollowButton } from '@/features/profile'
import { useModalOpen } from '@/features/profile/model/useModalOpen'
import { useScopedTranslation } from '@byte-creators/utils'
import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const UserMetadata = () => {
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
          label={t.following}
          locale={locale}
          onClick={() => handleOpenModal('following')}
        />
        <ProfileFollowButton
          count={profile.userMetadata.followers}
          label={t.followers}
          locale={locale}
          onClick={() => handleOpenModal('followers')}
        />
        {/* TODO: refactor this */}
        {/* {data && ( */}
        {/*   <FollowProvider currentUserProfile={data}> */}
        {/*     <ProfileFollowModal */}
        {/*       currentUserProfile={data} */}
        {/*       isOpen={isModalOpen} */}
        {/*       onClose={handleCloseModal} */}
        {/*       type={modalType} */}
        {/*     /> */}
        {/*   </FollowProvider> */}
        {/* )} */}
        <div className={'flex flex-col text-xs sm:text-sm'}>
          <span className={'font-weight700'}>{profile.userMetadata.publications}</span>
          <span>{t.publications}</span>
        </div>
      </div>
    )
  }

  return null
}
