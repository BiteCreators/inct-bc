import { Avatar, WithPaginationResponse } from '@/common/types/api.types'

export type UsersInfoResponse = {
  nextCursor: null | number
  prevCursor: number
} & WithPaginationResponse<UsersInfo>

export type UsersInfo = {
  avatars: Avatar[]
  createdAt: string
  firstName: string
  id: number
  lastName: string
  userName: string
}

export type FollowersResponse = {
  nextCursor: null | number
  prevCursor: number
} & WithPaginationResponse<Follower>

export type Follower = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}
export type WithFollowersCountUserProfile = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  followersCount: number
  followingCount: number
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  lastName: string
  publicationsCount: number
  region: null | string
  userName: string
}

type UserMetadata = {
  followers: number
  following: number
  publications: number
}

export type UserProfile = {
  aboutMe: string
  avatars: Avatar[]
  id: number
  onClick: () => void
  userMetadata: UserMetadata
  userName: string
}
