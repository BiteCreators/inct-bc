import React, { useState } from 'react'

import {
  useDeleteAvatarProfileMutation,
  useSetAvatarProfileMutation,
} from '@/common/api/profile.api'
import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { Avatar, Button, Loader } from '@/common/ui'
import { ModalAvatar } from '@/features/profile/ui/avatar/ModalAvatar'
import {
  deleteAvatar,
  selectCurrentAvatar,
  setAvatar,
} from '@/features/profile/ui/model/profile.slice'

export const ProfileAvatar = () => {
  const dispatch = useAppDispatch()
  const currentAvatar = useAppSelector(selectCurrentAvatar)

  const [isOpen, setIsOpen] = useState(false)

  const [setAvatarProfile, { isLoading: isLoadingSet }] = useSetAvatarProfileMutation()
  const [deleteAvatarProfile, { isLoading: isLoadingDelete }] = useDeleteAvatarProfileMutation()

  if (isLoadingSet || isLoadingDelete) {
    return <Loader />
  }

  const updateAvatar = async (imgSrc: string, file: File) => {
    try {
      const newAvatar = {
        createdAt: new Date().toISOString(),
        fileSize: file.size,
        height: 150,
        url: imgSrc,
        width: 150,
      }

      await setAvatarProfile({ file }).unwrap()

      dispatch(setAvatar(newAvatar))
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
      dispatch(deleteAvatar(currentAvatar.url))
    } catch (error) {
      console.error('Ошибка при удалении аватара:', error)
    }
  }

  return (
    <div className={'bg-dark-700 w-1/5 min-w-56 flex flex-col items-center gap-5 p-2'}>
      <Avatar
        avatarURL={currentAvatar?.url || ''}
        isNextLink={false}
        onClose={removeAvatar}
        showClose={!!currentAvatar?.url}
        size={200}
      />
      <Button className={'w-full'} onClick={() => setIsOpen(true)} variant={'outline'}>
        Add a Profile Photo
      </Button>

      {isOpen && <ModalAvatar isOpen={isOpen} setIsOpen={setIsOpen} updateAvatar={updateAvatar} />}
    </div>
  )
}
