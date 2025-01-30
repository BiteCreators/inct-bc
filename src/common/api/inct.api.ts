import { baseQueryWithReauth } from '@/common/api/base-query'
import { createApi } from '@reduxjs/toolkit/query/react'

import { isHydrateAction } from '../lib/utils/isHydrateAction'

export const inctagramApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  reducerPath: 'inctagramApi',
  tagTypes: [
    'Me',
    'Profile',
    'Devices',
    'Posts',
    'Post',
    'Followers',
    'Comment',
    'Answer',
    'Notifications',
  ],
})
