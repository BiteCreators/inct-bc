import React, { useEffect } from 'react'

import { ImageOutline } from '@/common/assets/icons/components'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { Alert, Avatar, Button, Loader } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'
import { useProfileAvatar } from '@/features/edit-profile/lib/hooks/useProfileAvatar'

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
      <div className={'w-1/5 p-2 flex justify-center'}>
        <div className={'mt-16'}>
          <Loader />
        </div>
      </div>
    )
  }

  return (
    <div className={'w-1/5 min-w-56 flex flex-col items-center gap-5 p-2'}>
      {currentAvatar ? (
        <>
          <Avatar
            avatarURL={currentAvatar?.url || ''}
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
      <Button className={'w-full'} onClick={() => setIsOpen(true)} variant={'outline'}>
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
