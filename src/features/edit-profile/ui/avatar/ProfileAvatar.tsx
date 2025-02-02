import { useProfileAvatar } from '@/features/edit-profile/lib/hooks/useProfileAvatar'
import { ActionConfirmation, Alert, Avatar, Button, LinearLoader } from '@byte-creators/ui-kit'
import { ImageOutline } from '@byte-creators/ui-kit/icons'
import { useScopedTranslation } from '@byte-creators/utils'

import { ModalAvatar } from './ModalAvatar'

export const ProfileAvatar = () => {
  const {
    apiError,
    confirmOpen,
    currentAvatar,
    handleConfirm,
    handleReject,
    isLoading,
    isOpen,
    removeAvatar,
    setConfirmOpen,
    setIsOpen,
    updateAvatar,
  } = useProfileAvatar()
  const t = useScopedTranslation('Profile')

  if (isLoading) {
    return (
      <div className={'flex h-60 justify-center items-center'}>
        <LinearLoader isLoading={isLoading} />
      </div>
    )
  }

  return (
    <div className={'flex flex-col gap-6 items-center'}>
      {currentAvatar ? (
        <>
          <Avatar
            avatarURL={currentAvatar?.url || ''}
            imgStyles={'w-48'}
            isNextLink={false}
            onClose={removeAvatar}
            showClose={!!currentAvatar?.url}
          />
          <ActionConfirmation
            isOpen={confirmOpen}
            message={t.deletePhoto}
            onConfirm={handleConfirm}
            onReject={handleReject}
            setIsOpen={setConfirmOpen}
            title={t.deletePhotoTitle}
          />
        </>
      ) : (
        <div
          className={
            'bg-dark-500 w-[200px] h-[200px] rounded-full flex justify-center items-center'
          }
        >
          <ImageOutline height={48} viewBox={'0 0 24 24'} width={48} />
        </div>
      )}
      <Button
        className={'w-full max-w-[275px]'}
        onClick={() => setIsOpen(true)}
        variant={'outline'}
      >
        {t.addProfilePhoto}
      </Button>
      {apiError && <Alert duration={3000} message={apiError} purpose={'toast'} type={'error'} />}
      {isOpen && (
        <ModalAvatar
          currentAvatar={currentAvatar}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          updateAvatar={updateAvatar}
        />
      )}
    </div>
  )
}
