import { inctagramApi } from '@/common/api/inct.api'
import { WithSortPaginationParams } from '@/common/types/api.types'
import {
  CommentLikesRequest,
  CommentLikesResponse,
  Reaction,
} from '@/entities/posts/types/likes.types'

import { AnswersRequest, AnswersResponse, Comment, CommentsResponse } from '../types/comments.types'

export const commentsApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<Comment, { content: string; postId: string }>({
      invalidatesTags: ['Comment'],
      query: ({ content, postId }) => ({
        body: { content },
        method: 'POST',
        url: `v1/posts/${postId}/comments`,
      }),
    }),
    getAnswerLikes: builder.query<CommentLikesResponse, { answerId: number } & CommentLikesRequest>(
      {
        query: data => {
          const { answerId, commentId, postId, ...params } = data

          return {
            params,
            url: `v1/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
          }
        },
      }
    ),
    getAnswers: builder.query<AnswersResponse, AnswersRequest>({
      query: data => {
        const { commentId, postId, ...params } = data

        return {
          params,
          url: `v1/posts/${postId}/comments/${commentId}/answers`,
        }
      },
    }),
    getCommentLikes: builder.query<CommentLikesResponse, CommentLikesRequest>({
      query: data => {
        const { commentId, postId, ...params } = data

        return {
          params,
          url: `v1/posts/${postId}/comments/${commentId}/likes`,
        }
      },
    }),
    getComments: builder.query<CommentsResponse, { postId: number } & WithSortPaginationParams>({
      providesTags: ['Comment'],
      query: data => {
        const { postId, ...params } = data

        return {
          params,
          url: `v1/posts/${postId}/comments`,
        }
      },
    }),
    updateLikeStatusComment: builder.mutation<
      void,
      { commentId: number; likeStatus: Reaction; postId: number }
    >({
      invalidatesTags: ['Comment'],
      query: ({ commentId, likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `v1/posts/${postId}/comments/${commentId}/like-status`,
      }),
    }),
  }),
})
