import { baseQueryWithReauth } from '@/common/api/base-query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const inctagramApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  tagTypes: ['Me', 'Profile', 'Devices'],
})
