import { baseQueryWithReauth } from '@/common/api/base-query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const inctagramApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  tagTypes: ['Me', 'Profile', 'Devices', 'Post', 'Followers', 'Comment', 'Answer', 'Notifications'],
})
