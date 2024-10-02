import React from 'react'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'

import { isApiError, isApiErrorWithArrary, isFetchBaseQueryError } from '../api-helpers'
import { useScopedTranslation } from './useTranslation'

export const useHandleApiErorr = () => {
  const t = useScopedTranslation('Common')

  const handleApiError = <T extends FieldValues>({
    error,
    modifyMessage,
    setApiError,
    setError,
  }: {
    error: unknown
    modifyMessage?: (message: string) => { field?: Path<T>; message: string }
    setApiError: React.Dispatch<React.SetStateAction<string>>
    setError?: UseFormSetError<T>
  }) => {
    if (isFetchBaseQueryError(error)) {
      if (error.status === 500) {
        setApiError(t.internalServerError)

        return
      }
    }
    if (isApiErrorWithArrary(error)) {
      error.data.messages.forEach(m => {
        const { field, message } = modifyMessage
          ? modifyMessage(m.message)
          : { field: m.field as Path<T>, message: m.message }

        setError
          ? setError(field ?? (m.field as Path<T>), { message, type: 'server' })
          : setApiError(message)
      })

      return
    }
    if (isApiError(error)) {
      const { field, message } = modifyMessage
        ? modifyMessage(error.data.messages)
        : { field: undefined, message: error.data.messages }

      setError && field ? setError(field, { message, type: 'server' }) : setApiError(message)
    }
  }

  return { handleApiError }
}
