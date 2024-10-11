import { inctagramApi } from './inct.api'

type Session = {
  browserName: string
  browserVersion: string
  deviceId: number
  deviceName: string
  deviceType: string
  ip: string
  lastActive: string
  osName: string
  osVersion: string
}

type GetSessionsResponse = {
  current: Session
  others: Session[]
}

export const devicesApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    getSessions: builder.query<GetSessionsResponse, void>({
      providesTags: ['Devices'],
      query: () => ({
        url: 'v1/sessions',
      }),
    }),
    terminateAllSessions: builder.mutation({
      invalidatesTags: ['Devices'],
      query: () => ({
        method: 'DELETE',
        url: 'v1/sessions/terminate-all',
      }),
    }),
    terminateSessionById: builder.mutation<void, { deviceId: number }>({
      invalidatesTags: ['Devices'],
      query: ({ deviceId }) => ({
        method: 'DELETE',
        url: `v1/sessions/${deviceId}`,
      }),
    }),
  }),
})
