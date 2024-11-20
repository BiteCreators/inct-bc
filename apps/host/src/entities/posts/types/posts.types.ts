import { Avatar } from '@/common/types/api.types'

export type PublicPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
  totalUsers: number
}
export type PublicPostsRequest = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  userId: number
}
export type Post = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: { uploadId: string } & Avatar[]
  isLiked: boolean
  likesCount: number
  location?: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}
type Owner = {
  firstName: string
  lastName: string
}
export type CreatePostRequest = {
  childrenMetadata: { uploadId: string }[]
  description?: string
}
