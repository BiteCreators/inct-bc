import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Profile, profileApi } from '@/common/api/profile.api'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'

import { EditProfileFormData, createEditProfileSchema } from '../lib/schemas/editProfileForm.schema'

export const useEditProfileForm = () => {
  const t = useScopedTranslation('Profile')
  const editProfileSchema = createEditProfileSchema(t)

  const { data: profile, isLoading: isLoadingGetProfile } = profileApi.useGetProfileQuery()
  const [trigger, { isError, isLoading: isLoadingUpdateProfile }] =
    profileApi.useEditProfileMutation()

  const [message, setMessage] = useState('') //сообщение в алерте
  const [isShowAlert, setIsShowAlert] = useState(false)

  const isLoading = isLoadingGetProfile || isLoadingUpdateProfile

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<EditProfileFormData>({
    mode: 'onChange',
    resolver: zodResolver(editProfileSchema),
  })

  useEffect(() => {
    if (profile) {
      reset({
        aboutMe: profile.aboutMe || '',
        city: profile.city || '',
        country: profile.country || '',
        dateOfBirth: profile?.dateOfBirth ? new Date(profile?.dateOfBirth) : new Date(),
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        userName: profile.userName || '',
      })
    }
  }, [profile, reset])

  const onSubmit = async (data: EditProfileFormData) => {
    const formData: Profile = {
      ...data,
      dateOfBirth: data.dateOfBirth.toLocaleDateString(),
    }

    try {
      await trigger(formData).unwrap()
      setMessage(t.settingsSaved)
      setIsShowAlert(true)
    } catch (error) {
      setMessage(t.editProfileError.settingsNotSaved)
      setIsShowAlert(true)
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    isError,
    isLoading,
    isShowAlert,
    isValid,
    message,
    onClose: () => {
      setIsShowAlert(false)
    },
    t,
  }
}
