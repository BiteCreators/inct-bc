export interface User {
  createdAt: Date
  email: string
  id: number
  profile: Profile
  userBan?: UserBan | null
  userName: string
}
interface Profile {
  aboutMe?: string
  avatars?: Avatar[]
  city?: string
  country?: string
  createdAt: Date
  dateOfBirth?: Date
  firstName?: string
  id: number
  lastName?: string
  region?: string
  userName?: string
}
interface UserBan {
  createdAt: Date
  reason: string
}
interface Avatar {}

export interface UsersPaginationModel {
  pagination: PaginationModel
  users: User[]
}
interface PaginationModel {
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export interface Follow {
  createdAt: Date
  id: number
  userId: number
  userName?: string
}
export interface FollowPaginationModel {
  items: Follow[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}
