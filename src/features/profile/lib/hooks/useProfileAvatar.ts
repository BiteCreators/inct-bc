import { useState } from 'react'

import { profileApi } from '@/common/api/profile.api'

export const useProfileAvatar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { data: profile, isLoading: isProfileLoading } = profileApi.useGetProfileQuery()
  const [setAvatarProfile, { isLoading: isLoadingSet }] = profileApi.useSetAvatarProfileMutation()
  const [deleteAvatarProfile, { isLoading: isLoadingDelete }] =
    profileApi.useDeleteAvatarProfileMutation()

  const isLoading = isProfileLoading || isLoadingSet || isLoadingDelete
  const currentAvatar = profile?.avatars?.[0] || null

  const updateAvatar = async (file: File) => {
    try {
      await setAvatarProfile({ file }).unwrap()
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
    } catch (error) {
      console.error('Ошибка при удалении аватара:', error)
    }
  }

  return {
    currentAvatar,
    isLoading,
    isOpen,
    removeAvatar,
    setIsOpen,
    updateAvatar,
  }
}
