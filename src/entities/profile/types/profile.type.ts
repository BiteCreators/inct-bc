import { ProfileAvatars } from './profileAvatars.type'

export type Profile = {
  aboutMe?: string
  city?: string
  country?: string
  dateOfBirth: string
  firstName: string
  lastName: string
  region?: string
  userName: string
  id: number
  avatars: ProfileAvatars[]
}

export type EditProfileBody = Omit<Profile, 'id' | 'avatars'>
