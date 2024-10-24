export type Response<T> = {
  items: T
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}
export type Params = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
export type SearchParams = { cursor?: number; search?: string } & Omit<
  Params,
  'sortBy' | 'sortDirection'
>
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
  images: Image[]
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
export type Image = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export type Posts = Response<Omit<Post, 'images'>[]>

export type PostLikes = { isLiked: boolean } & Likes

export type Like = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}
export type Avatar = Omit<Image, 'uploadId'>

export type Likes = { nextCursor?: number; prevCursor: number } & Response<Like[]>

export type CreatePostBody = {
  childrenMetadata: { uploadId: string }[]
  description?: string
}
export enum Reaction {
  DISLIKE = 'DISLIKE',
  LIKE = 'LIKE',
  NONE = 'NONE',
}
