import { authSlice } from '@/entities/auth'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work/api/',
  credentials: 'include',
  prepareHeaders: headers => {
    const accessToken = document.cookie.split('accessToken=')[1]

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = (await baseQuery(
          { method: 'POST', url: '/v1/auth/update-tokens' },
          api,
          extraOptions
        )) as any

        if (refreshResult.data) {
          const token = refreshResult.data.accessToken

          document.cookie = `accessToken=${token};max-age=2678400;secure;path=/;samesite=lax`
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(authSlice.actions.setAccessToken(null))
          document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
