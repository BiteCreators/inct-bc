// Need to use the React-specific entry point to import createApi

import { Post } from '@/app/inct.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const inctagramApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram.work/api/' }),
  endpoints: builder => ({
    forgotPassword: builder.mutation<void, RecoveryPassword>({
      query: body => ({
        body,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `/v1/auth/password-recovery`,
      }),
    }),
    getAllPostsTest: builder.query<Post, void>({
      query: () => {
        return { url: `/v1/public-posts/all/` }
      },
    }),
  }),
  reducerPath: 'inctagramApi',
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useForgotPasswordMutation, useGetAllPostsTestQuery } = inctagramApi

export type RecoveryPassword = {
  baseUrl: string
  email: string
  recaptcha: string
}
