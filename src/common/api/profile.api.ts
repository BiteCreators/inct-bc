import { inctagramApi } from '@/common/api/inct.api'

type ProfileResponse = {
  avatars: Avatars[]
  createdAt: string
  id: number
}

type Avatars = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

type Profile = {
  aboutMe?: string
  city?: string
  country?: string
  dateOfBirth: string
  firstName: string
  lastName: string
  region?: string
  userName: string
}

export const profileApi = inctagramApi.injectEndpoints({
  endpoints: bulder => ({
    deleteAvatarProfile: bulder.mutation<void, void>({
      query: body => ({
        body,
        method: 'DELETE',
        url: 'v1/users/profile/avatar',
      }),
    }),
    deleteProfile: bulder.mutation<void, void>({
      query: body => ({
        body,
        method: 'DELETE',
        url: 'v1/users/profile',
      }),
    }),
    deleteProfileForId: bulder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        method: 'DELETE',
        url: `v1/users/profile/${id}`,
      }),
    }),
    editProfile: bulder.mutation<void, Profile>({
      query: body => ({
        body,
        method: 'PUT',
        url: 'v1/users/profile',
      }),
    }),
    getProfile: bulder.query<Profile & ProfileResponse, void>({
      query: body => ({
        body,
        method: 'GET',
        url: 'v1/users/profile',
      }),
    }),
    setAvatarProfile: bulder.mutation<Avatars[], { file: File }>({
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
