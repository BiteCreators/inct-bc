import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type ErrorMessage = {
  field: string
  message: string
}

export type ApiErrorResponse = {
  data: {
    error: string
    messages: string
    statusCode: number
  }
}

export type ApiErrorResponseWithArray = {
  data: {
    error: string
    messages: ErrorMessage[]
    statusCode: number
  }
}

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error !== null && 'status' in error
}

export const isApiError = (error: unknown): error is ApiErrorResponse => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'messages' in error.data &&
    'error' in error.data &&
    'statusCode' in error.data
  )
}

export const isApiErrorWithArrary = (error: unknown): error is ApiErrorResponseWithArray => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'messages' in error.data &&
    'error' in error.data &&
    'statusCode' in error.data &&
    Array.isArray(error.data.messages)
  )
}
