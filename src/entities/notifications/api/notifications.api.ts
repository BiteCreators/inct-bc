import { inctagramApi } from '@/common/api/inct.api'

import { Notification } from '../types/notification.type'
import { getSocket } from '@/common/api/getSocket'
import { NotificationsMessages } from '../types/notifications.messages'

//TODO: replace wity shared type
type PaginationParams = {
  cursor?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

//TODO: replace wity shared type
type ResponseWithPagination<T> = {
  items: T[]
  pageSize: number
  totalCount: number
}

export const notificationsApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    deleteNotificationById: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        method: 'DELETE',
        url: `/v1/notifications/${id}`,
      }),
    }),
    getNotifications: builder.query<ResponseWithPagination<Notification>, PaginationParams>({
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded

          const socket = getSocket()

          //TODO: finish cache update
          socket.on(NotificationsMessages.NOTIFICATION, () => {})

          await cacheEntryRemoved
        } catch (e) {
          console.log(e)
        }
      },
      query: ({ cursor, ...params }) => ({
        params,
        url: `/v1/notifications/${cursor}`,
      }),
    }),
    markAsRead: builder.mutation<void, { ids: number[] }>({
      query: body => ({
        body,
        method: 'PUT',
        url: '/v1/notifications/markAsRead',
      }),
    }),
  }),
})
