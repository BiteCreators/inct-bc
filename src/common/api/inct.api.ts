import { createReauthBaseQuery, defaultBaseQuery } from '@/common/api/base-queries'
import { baseQueryWithReauth } from '@byte-creators/utils'
import { createApi } from '@reduxjs/toolkit/query/react'

import { isHydrateAction } from '../lib/utils/isHydrateAction'

export const inctagramApi = createApi({
  baseQuery: createReauthBaseQuery(defaultBaseQuery),
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  reducerPath: 'inctagramApi',
  tagTypes: [
    'Me',
    'Profile',
    'PublicProfile',
    'Devices',
    'Posts',
    'Post',
    'Followers',
    'Comment',
    'Answer',
    'Notifications',
    'Messages',
    'Payments',
  ],
})
