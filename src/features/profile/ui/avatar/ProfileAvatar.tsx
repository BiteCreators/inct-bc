import React, { useState } from 'react'

import {
  useDeleteAvatarProfileMutation,
  useGetProfileQuery,
  useSetAvatarProfileMutation,
} from '@/common/api/profile.api'
import { ImageOutline } from '@/common/assets/icons/components'
import { Avatar, Button, Loader } from '@/common/ui'
import { ModalAvatar } from '@/features/profile/ui/avatar/ModalAvatar'

export const ProfileAvatar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { data: profile, isLoading: isProfileLoading, refetch } = useGetProfileQuery()
  const [setAvatarProfile, { isLoading: isLoadingSet }] = useSetAvatarProfileMutation()
  const [deleteAvatarProfile, { isLoading: isLoadingDelete }] = useDeleteAvatarProfileMutation()

  if (isProfileLoading || isLoadingSet || isLoadingDelete) {
    return <Loader />
  }

  const currentAvatar = profile?.avatars?.[0] || null

  const updateAvatar = async (file: File) => {
    try {
      await setAvatarProfile({ file }).unwrap()
      refetch()
    } catch (error) {
      console.error('Ошибка при установке аватара:', error)
    }
  }

  const removeAvatar = async () => {
    if (!currentAvatar) {
      return
    }
    try {
      await deleteAvatarProfile().unwrap()
      refetch()
    } catch (error) {
      console.error('Ошибка при удалении аватара:', error)
    }
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
