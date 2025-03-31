import type { PayloadAction } from '@reduxjs/toolkit'

import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

export const authBaseQuery = fetchBaseQuery({
  baseUrl: '',
  credentials: 'include',
})

export const defaultBaseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work/api',
  credentials: 'include',
})

const mutex = new Mutex()

export const createReauthBaseQuery = (
  baseQuery: typeof defaultBaseQuery,
  logoutAction?: PayloadAction
) => {
  return async (args: any, api: any, extraOptions: any) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    if (result.error?.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()

        try {
          const refreshResult = (await authBaseQuery(
            { method: 'POST', url: '/v1/auth/update-tokens' },
            api,
            extraOptions
          )) as any

          if (refreshResult.data) {
            const token = refreshResult.data.accessToken

            document.cookie = `accessToken=${token}; max-age=2678400; path=/; secure`
            result = await baseQuery(args, api, extraOptions)
          } else if (logoutAction) {
            api.dispatch(logoutAction)
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
}
