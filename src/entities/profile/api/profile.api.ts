import { inctagramApi } from '@/common/api/inct.api'
import { Avatar } from '@/common/types/api.types'
import { UserProfile } from '@/entities/followers/types/followers.types'

import { EditProfileBody, Profile } from '../types/profile.type'

type ProfileResponse = {
  avatars: Avatar[]
  createdAt: string
  id: number
}

export const profileApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    deleteAvatarProfile: builder.mutation<void, void>({
      invalidatesTags: ['Profile'],
      query: body => ({
        body,
        method: 'DELETE',
        url: 'v1/users/profile/avatar',
      }),
    }),
    deleteProfile: builder.mutation<void, void>({
      invalidatesTags: ['Profile'],
      query: body => ({
        body,
        method: 'DELETE',
        url: 'v1/users/profile',
      }),
    }),
    deleteProfileForId: builder.mutation<void, { id: number }>({
      invalidatesTags: (result, error, { id }) => [{ id, type: 'Profile' }],
      query: ({ id }) => ({
        method: 'DELETE',
        url: `v1/users/profile/${id}`,
      }),
    }),
    editProfile: builder.mutation<void, EditProfileBody>({
      invalidatesTags: ['Profile'],
      query: body => ({
        body,
        method: 'PUT',
        url: 'v1/users/profile',
      }),
    }),
    getProfile: builder.query<Profile & ProfileResponse, void>({
      providesTags: ['Profile'],
      query: () => ({
        method: 'GET',
        url: 'v1/users/profile',
      }),
    }),
    getPublicProfile: builder.query<UserProfile, { id: number }>({
      query: ({ id }) => ({
        url: `v1/public-user/profile/${id}`,
      }),
    }),
    setAvatarProfile: builder.mutation<Avatar[], { file: File }>({
      invalidatesTags: ['Profile'],
      query: ({ file }) => {
        const formData = new FormData()

        formData.append('file', file)

        return {
          body: formData,
          method: 'POST',
          url: 'v1/users/profile/avatar',
        }
      },
    }),
  }),
})
