import React from 'react'

import { ImageOutline } from '@/common/assets/icons/components'
import { Avatar, Button, Loader } from '@/common/ui'
import { useProfileAvatar } from '@/features/profile/lib/hooks/useProfileAvatar'
import { ModalAvatar } from '@/features/profile/ui/avatar/ModalAvatar'

export const ProfileAvatar = () => {
  const { currentAvatar, isLoading, isOpen, removeAvatar, setIsOpen, updateAvatar } =
    useProfileAvatar()

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
        <Avatar
          avatarURL={currentAvatar?.url || ''}
          isNextLink={false}
          onClose={removeAvatar}
          showClose={!!currentAvatar?.url}
          size={200}
        />
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
