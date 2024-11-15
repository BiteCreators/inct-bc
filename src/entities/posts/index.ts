export { postsApi } from './api/posts.api'
export { postsHandlers } from './api/posts.mocks'
export { postSlice } from './model/postSlice'

export type {
  CommentLikesRequest,
  CommentLikesResponse,
  PostLikesResponse,
} from './types/likes.types'
export type { Post, PublicPostsResponse } from './types/posts.types'
