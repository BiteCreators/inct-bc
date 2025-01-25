import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { profileApi } from '@/entities/profile'
import {
  EditProfileFormData,
  createEditProfileSchema,
} from '@/features/edit-profile/lib/schemas/editProfileForm.schema'
import { useScopedTranslation } from '@byte-creators/utils'
import { zodResolver } from '@hookform/resolvers/zod'

export const useEditProfileForm = () => {
  const t = useScopedTranslation('Profile')
  const editProfileSchema = createEditProfileSchema(t)

  const { data: profile, isLoading: isLoadingGetProfile } = profileApi.useGetProfileQuery()
  const [trigger, { isError, isLoading: isLoadingUpdateProfile }] =
    profileApi.useEditProfileMutation()

  const [message, setMessage] = useState('')
  const [isShowAlert, setIsShowAlert] = useState(false)
  const { handleApiError } = useHandleApiError('Profile')

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
    setError,
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
        dateOfBirth: profile.dateOfBirth ? new Date(profile?.dateOfBirth) : new Date(),
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        userName: profile.userName || '',
      })
    }
  }, [profile, reset])

  const onSubmit = async (data: EditProfileFormData) => {
    const formData = {
      ...data,
      dateOfBirth: data.dateOfBirth.toLocaleDateString(),
    }

    try {
      await trigger(formData).unwrap()
      setMessage(t.settingsSaved)
      setIsShowAlert(true)
    } catch (error) {
      handleApiError({
        error,
        modifyMessage(message, t) {
          if (message.includes('already exists') && message.includes('User with userName')) {
            return { message: t.editProfileError.usernameTaken }
          }

          return { message }
        },
        setApiError: setMessage,
        setError,
      })
      setIsShowAlert(true)
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    isError,
    isLoadingGetProfile,
    isLoadingUpdateProfile,
    isShowAlert,
    isValid,
    message,
    onClose: () => {
      setIsShowAlert(false)
    },
    profile,
    t,
  }
}
