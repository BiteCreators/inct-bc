type ErrorMessage = {
  field: string
  message: string
}

export type ApiErrorResponse = {
  data: {
    error: string
    messages: ErrorMessage[]
    statusCode: number
  }
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
