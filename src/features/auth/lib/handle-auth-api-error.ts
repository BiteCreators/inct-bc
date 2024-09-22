import { FieldValues, Path, UseFormSetError } from 'react-hook-form'

import { isApiError } from '@/common/utils/api-helpers'
import { LocaleType } from '@/locales/en'

export const handleAuthApiError = <T extends FieldValues>({
  error,
  setError,
  t,
}: {
  error: unknown
  setError: UseFormSetError<T>
  t: LocaleType['Auth']
}) => {
  if (isApiError(error)) {
    error.data.messages.forEach(m => {
      let message = m.message

      if (m.message.includes('already exist') && m.message.includes('userName')) {
        message = t.usernameTakenError
      }
      if (m.message.includes('already exist') && m.message.includes('email')) {
        message = t.emailTakenError
      }

      setError(m.field as Path<T>, { message, type: 'manual' })
    })
  }
}
