import React from 'react'

import { ImageOutline } from '@/common/assets/icons/components'
import { Avatar, Button, Loader } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'
import { useProfileAvatar } from '@/features/edit-profile/lib/hooks/useProfileAvatar'

import { ModalAvatar } from './ModalAvatar'

export const ProfileAvatar = () => {
  const {
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

  if (isLoading) {
    return (
      <div className={'bg-dark-700 w-1/5 p-2 flex justify-center'}>
        <div className={'mt-16'}>
          <Loader />
        </div>
      </div>
    )
  }

  return (
    <div className={'bg-dark-700 w-1/5 min-w-56 flex flex-col items-center gap-5 p-2'}>
      {currentAvatar ? (
        <>
          <Avatar
            avatarURL={currentAvatar?.url || ''}
            isNextLink={false}
            onClose={removeAvatar}
            showClose={!!currentAvatar?.url}
            size={200}
          />
          <ActionConfirmation
            isOpen={confirmOpen}
            message={'Are you sure you want to delete the photo?'}
            onConfirm={handleConfirm}
            onReject={handleReject}
            setIsOpen={setConfirmOpen}
            title={'Delete photo'}
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
        Add a Profile Photo
      </Button>
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
