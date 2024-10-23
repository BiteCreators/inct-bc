import { Avatar, Params, Response, SearchParams } from '@/entities/posts'

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

export type Answer = { commentId: number } & Omit<Comment, 'answerCount' | 'postId'>

export type CommentAnswersRequest = { commentId: number; postId: number } & Params

export type CommentLikesRequest = { commentId: number; postId: number } & SearchParams

export type CommentAnswers = Response<Answer[]>

export type Comments = Response<Comment[]>

export type AnswerLikesRequest = {
  answerId: number
  commentId: number
  postId: number
} & SearchParams
