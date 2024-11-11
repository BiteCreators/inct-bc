import { ProfileAvatars } from '@/entities/profile'

export type Profile = {
  aboutMe?: string
  avatars: ProfileAvatars[]
  city?: string
  country?: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region?: string
  userName: string
}

export type EditProfileBody = Omit<Profile, 'avatars' | 'id'>
