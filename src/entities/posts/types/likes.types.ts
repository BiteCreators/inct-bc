import {
  Avatar,
  WithPaginationResponse,
  WithSearchPaginationParams,
} from '@/common/types/api.types'

export type PostLikesResponse = {
  isLiked: boolean
  nextCursor?: number
  prevCursor: number
} & WithPaginationResponse<Like>

type Like = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}
export enum Reaction {
  DISLIKE = 'DISLIKE',
  LIKE = 'LIKE',
  NONE = 'NONE',
}
export type CommentLikesResponse = Omit<PostLikesResponse, 'isLiked'>
export type CommentLikesRequest = { commentId: number; postId: number } & WithSearchPaginationParams
