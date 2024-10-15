import { useState } from 'react'

import { profileApi } from '@/common/api/profile.api'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'

export const useProfileAvatar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { data: profile, isLoading: isProfileLoading } = profileApi.useGetProfileQuery()
  const [setAvatarProfile, { isLoading: isLoadingSet }] = profileApi.useSetAvatarProfileMutation()
  const [deleteAvatarProfile, { isLoading: isLoadingDelete }] =
    profileApi.useDeleteAvatarProfileMutation()
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()

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

    await requestConfirmation()

    try {
      await deleteAvatarProfile().unwrap()
    } catch (error) {
      console.error('Ошибка при удалении аватара:', error)
    }
  }

  return {
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
  }
}
