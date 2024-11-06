import { Avatar, WithPaginationResponse, WithSortPaginationParams } from '@/common/types/api.types'

type Comment = {
  answerCount: number
  content: string
  createdAt: string
  from: From
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}
type From = {
  avatars: Avatar[]
  id: number
  username: string
}

type Answer = { commentId: number } & Omit<Comment, 'answerCount' | 'postId'>

export type AnswersRequest = { commentId: number; postId: number } & WithSortPaginationParams

export type AnswersResponse = WithPaginationResponse<Answer>

export type CommentsResponse = WithPaginationResponse<Comment>
