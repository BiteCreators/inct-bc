import { Avatar } from '@/common/types/api.types'

export type Profile = {
  aboutMe?: string
  avatars: Avatar[]
  city?: string
  country?: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region?: string
  userName: string
}

export type PublicProfileResponse = {
  userMetadata: {
    followers: number
    following: number
    publications: number
  }
} & Pick<Profile, 'aboutMe' | 'avatars' | 'id' | 'userName'>

export type EditProfileBody = Omit<Profile, 'avatars' | 'id'>
