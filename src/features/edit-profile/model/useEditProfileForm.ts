import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Profile, profileApi } from '@/common/api/profile.api'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'

import { EditProfileFormData, createEditProfileSchema } from '../lib/schemas/editProfileForm.schema'

type Props = {
  userName?: string
}
export const useEditProfileForm = ({ userName }: Props) => {
  const t = useScopedTranslation('Profile')

  const editProfileSchema = createEditProfileSchema(t)

  const [trigger, { isError, isLoading }] = profileApi.useEditProfileMutation()

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<EditProfileFormData>({
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: undefined,
      firstName: '',
      lastName: '',
      userName: userName ? userName : '',
    },
    mode: 'onChange',
    resolver: zodResolver(editProfileSchema),
  })
  const [message, setMessage] = useState('')
  const [isShowAlert, setIsShowAlert] = useState(false)

  const onSubmit = async (data: EditProfileFormData) => {
    const formData: Profile = { ...data, dateOfBirth: data.dateOfBirth.toLocaleDateString() }

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
