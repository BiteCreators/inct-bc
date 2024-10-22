import { Image, Post } from '@/app/inct.types'

import { inctagramApi } from './inct.api'

enum Reaction {
  DISLIKE = 'DISLIKE',
  LIKE = 'LIKE',
  NONE = 'NONE',
}
type Response<T> = {
  items: T
  pageSize: number
  totalCount: number
}
type Params = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
type SearchParams = { cursor?: number; search?: string } & Omit<Params, 'sortBy' | 'sortDirection'>

type Like = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}
type Avatar = Omit<Image, 'uploadId'>

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
  avatars: {}[] //в свагере указан массив пустых объектов
  id: number
  username: string
}
type CommentAnswersRequest = { commentId: number; postId: number } & Params

type Answer = { commentId: number } & Omit<Comment, 'answerCount' | 'postId'>

type AnswerLikesRequest = { answerId: number; commentId: number; postId: number } & SearchParams

type CommentLikesRequest = { commentId: number; postId: number } & SearchParams

type CreatePostBody = {
  childrenMetadata: { uploadId: string }[]
  description?: string
}

export const postsApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<Post, CreatePostBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/posts',
      }),
    }),
    createPostImage: builder.mutation<{ images: Image[] }, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData()

        formData.append('file', file)

        return {
          body: formData,
          method: 'POST',
          url: 'v1/posts/image',
        }
      },
    }),
    deletePost: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        method: 'DELETE',
        url: `v1/posts/${postId}`,
      }),
    }),
    deletePostImage: builder.mutation<void, { uploadId: string }>({
      query: ({ uploadId }) => ({
        method: 'DELETE',
        url: `v1/posts/image/${uploadId}`,
      }),
    }),
    getAnswerLikes: builder.query<Response<Like[]>, AnswerLikesRequest>({
      query: data => {
        const { answerId, commentId, postId, ...params } = data

        return {
          params,
          url: `v1/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
        }
      },
    }),
    getCommentAnswers: builder.query<Response<Answer[]>, CommentAnswersRequest>({
      query: data => {
        const { commentId, postId, ...params } = data

        return {
          params,
          url: `v1/posts/${postId}/comments/${commentId}/answers`,
        }
      },
    }),
    getCommentLikes: builder.query<Response<Like[]>, CommentLikesRequest>({
      query: data => {
        const { commentId, postId, ...params } = data

        return {
          params,
          url: `v1/posts/${postId}/comments/${commentId}/likes`,
        }
      },
    }),
    getComments: builder.query<Response<Comment[]>, { postId: number } & Params>({
      query: data => {
        const { postId, ...params } = data

        return {
          params,
          url: `v1/posts/${postId}/comments`,
        }
      },
    }),
    getPostLikes: builder.query<Response<Like[]>, { postId: number } & SearchParams>({
      query: data => {
        const { postId, ...params } = data

        return {
          params,
          url: `v1/posts/${postId}/likes`,
        }
      },
    }),
    getPosts: builder.query<Response<Post[]>, { userName: string } & Params>({
      query: data => {
        const { userName, ...params } = data

        return {
          params,
          url: `v1/posts/${userName}`,
        }
      },
    }),
    updateLikeStatusPost: builder.mutation<void, { likeStatus: Reaction; postId: number }>({
      query: ({ likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `v1/posts/${postId}/like-status`,
      }),
    }),
    updatePost: builder.mutation<void, { description: string; postId: number }>({
      query: ({ description, postId }) => ({
        body: { description },
        method: 'PUT',
        url: `v1/posts/${postId}`,
      }),
    }),
  }),
})
postsApi.useUpdatePostMutation
