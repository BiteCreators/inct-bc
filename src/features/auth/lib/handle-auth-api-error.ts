import React from 'react'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'

import { isApiError } from '@/common/utils/api-helpers'
import { LocaleType } from '@/locales/en'

export const handleAuthApiError = <T extends FieldValues>({
  error,
  setApiError,
  setError,
  t,
}: {
  error: unknown
  setApiError: React.Dispatch<React.SetStateAction<string>>
  setError: UseFormSetError<T>
  t: LocaleType['Auth']
}) => {
  if (isApiError(error)) {
    if (error.data.statusCode >= 500) {
      setApiError('server error, try again later')

      return
    }
    error.data.messages.forEach(m => {
      let message = m.message

      if (m.message.includes('already exist') && m.message.includes('userName')) {
        message = t.usernameTakenError
      }
      if (m.message.includes('already exist') && m.message.includes('email')) {
        message = t.emailTakenError
      }

      if (m.message.includes('User with this email')) {
        message = t.userNotFound
      }
      setError(m.field as Path<T>, { message, type: 'manual' })
    })
  }
}
