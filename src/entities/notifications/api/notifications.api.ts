import { getSocket } from '@/common/api/getSocket'
import { inctagramApi } from '@/common/api/inct.api'
import { Notification } from '@/entities/notifications'

import { NOTIFICATION_MESSAGES } from '../lib/consts'

//TODO: replace with shared type
type PaginationParams = {
  cursor?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

//TODO: replace with shared type
type ResponseWithPagination<T> = {
  items: T[]
  pageSize: number
  totalCount: number
}

export const notificationsApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    deleteNotificationById: builder.mutation<void, { id: number }>({
      invalidatesTags: ['Notifications'],
      query: ({ id }) => ({
        method: 'DELETE',
        url: `v1/notifications/${id}`,
      }),
    }),
    getNotifications: builder.query<ResponseWithPagination<Notification>, PaginationParams>({
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded

          const socket = getSocket()

          socket.on(NOTIFICATION_MESSAGES.NOTIFICATION, (notification: Notification) => {
            updateCachedData(draft => ({ ...draft, items: [...draft.items, notification] }))
          })

          await cacheEntryRemoved
          socket.off(NOTIFICATION_MESSAGES.NOTIFICATION)
        } catch (e) {
          console.error(e)
        }
      },
      providesTags: ['Notifications'],
      query: ({ cursor, ...params }) => ({
        params,
        url: `v1/notifications/${cursor}`,
      }),
    }),
    markAsRead: builder.mutation<void, { ids: number[] }>({
      invalidatesTags: ['Notifications'],
      query: body => ({
        body,
        method: 'PUT',
        url: 'v1/notifications/mark-as-read',
      }),
    }),
  }),
})
