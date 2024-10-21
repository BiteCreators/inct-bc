import React from 'react'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'

import { LocaleType } from '@/locales/en'

import { isApiError, isApiErrorWithArrary, isFetchBaseQueryError } from '../utils/apiHelpers'
import { useScopedTranslation } from './useTranslation'

export const useHandleApiError = <NT extends keyof LocaleType>(namespace: NT) => {
  const internalT = useScopedTranslation('Common')
  const t = useScopedTranslation(namespace)

  const handleApiError = <T extends FieldValues>({
    error,
    modifyMessage,
    setApiError,
    setError,
  }: {
    error: unknown
    modifyMessage?: (
      message: string,
      t: LocaleType[typeof namespace]
    ) => { field?: Path<T>; message: string }
    setApiError: React.Dispatch<React.SetStateAction<string>>
    setError?: UseFormSetError<T>
  }) => {
    if (isFetchBaseQueryError(error)) {
      if (error.status === 'FETCH_ERROR') {
        setApiError(internalT.errors.networkError)

        return
      }
      if (error.status === 500) {
        setApiError(internalT.errors.internalServerError)

        return
      }
    }
    if (isApiErrorWithArrary(error)) {
      error.data.messages.forEach(m => {
        const { field, message } = modifyMessage
          ? modifyMessage(m.message, t)
          : { field: m.field as Path<T>, message: m.message }

        setError
          ? setError(field ?? (m.field as Path<T>), { message, type: 'server' })
          : setApiError(message)
      })

      return
    }
    if (isApiError(error)) {
      const { field, message } = modifyMessage
        ? modifyMessage(error.data.messages, t)
        : { field: undefined, message: error.data.messages }

      setError && field ? setError(field, { message, type: 'server' }) : setApiError(message)
    }
  }

  return { handleApiError }
}
