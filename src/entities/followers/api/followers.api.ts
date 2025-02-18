import { inctagramApi } from '@/common/api/inct.api'
import { WithSearchPaginationParams } from '@/common/types/api.types'

import {
  FollowersResponse,
  UsersInfoResponse,
  WithFollowersCountUserProfile,
} from '../types/followers.types'

export const followersApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    follow: builder.mutation<void, { selectedUserId: number }>({
      invalidatesTags: ['Followers'],
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/users/following',
      }),
    }),
    getFollowers: builder.query<FollowersResponse, { userName: string }>({
      providesTags: ['Followers'],
      query: ({ userName }) => ({
        url: `v1/users/${userName}/followers`,
      }),
    }),
    getUserProfile: builder.query<WithFollowersCountUserProfile, { userName: string }>({
      providesTags: ['Followers'],
      query: ({ userName }) => ({
        url: `v1/users/${userName}`,
      }),
    }),
    getUsersFollowing: builder.query<FollowersResponse, { userName: string }>({
      providesTags: ['Followers'],
      query: ({ userName }) => ({
        url: `v1/users/${userName}/following`,
      }),
    }),
    // getUsersInfo: builder.query<UsersInfoResponse, WithSearchPaginationParams>({
    //   providesTags: ['Followers'],
    //   query: params => ({
    //     params,
    //     url: 'v1/users',
    //   }),
    // }),
    getUsersInfo: builder.query<UsersInfoResponse, WithSearchPaginationParams>({
      forceRefetch: ({ currentArg, previousArg }) => {
        const isSearchChanged = currentArg?.search !== previousArg?.search
        const isCursorChanged = currentArg?.cursor !== previousArg?.cursor

        return isSearchChanged || isCursorChanged
      },
      merge: (currentData, newData) => {
        if (currentData.prevCursor === newData.prevCursor) {
          return newData
        }

        return {
          ...currentData,
          items: [...currentData.items, ...newData.items],
          nextCursor: newData.nextCursor,
        }
      },
      providesTags: ['Followers'],
      query: params => ({
        params,
        url: 'v1/users',
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${queryArgs.search}`
      },
    }),

    removeFollower: builder.mutation<void, { userId: number }>({
      invalidatesTags: ['Followers'],
      query: ({ userId }) => ({
        method: 'DELETE',
        url: `v1/users/follower/${userId}`,
      }),
    }),
  }),
})
