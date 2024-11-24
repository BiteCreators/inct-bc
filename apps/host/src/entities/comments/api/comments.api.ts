import { inctagramApi } from '@/common/api/inct.api'
import { WithSortPaginationParams } from '@/common/types/api.types'
import { CommentLikesRequest, CommentLikesResponse } from '@/entities/posts/types/likes.types'

import { AnswersRequest, AnswersResponse, CommentsResponse } from '../types/comments.types'

export const commentsApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
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
