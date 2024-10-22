import { inctagramApi } from '@/common/api/inct.api'
import { Likes, Params } from '@/entities/posts'

import {
  AnswerLikesRequest,
  CommentAnswers,
  CommentAnswersRequest,
  CommentLikesRequest,
  Comments,
} from '../types/comments.type'

export const commentsApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    getAnswerLikes: builder.query<Likes, AnswerLikesRequest>({
      query: data => {
        const { answerId, commentId, postId, ...params } = data

        return {
          params,
          url: `v1/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
        }
      },
    }),
    getCommentAnswers: builder.query<CommentAnswers, CommentAnswersRequest>({
      query: data => {
        const { commentId, postId, ...params } = data

        return {
          params,
          url: `v1/posts/${postId}/comments/${commentId}/answers`,
        }
      },
    }),
    getCommentLikes: builder.query<Likes, CommentLikesRequest>({
      query: data => {
        const { commentId, postId, ...params } = data

        return {
          params,
          url: `v1/posts/${postId}/comments/${commentId}/likes`,
        }
      },
    }),
    getComments: builder.query<Comments, { postId: number } & Params>({
      query: data => {
        const { postId, ...params } = data

        return {
          params,
          url: `v1/posts/${postId}/comments`,
        }
      },
    }),
  }),
})
